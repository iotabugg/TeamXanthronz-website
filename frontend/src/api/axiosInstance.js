import axios from 'axios'
import { getAccessToken, setAccessToken } from './tokenStore.js'

const BASE_URL = import.meta.env.VITE_API_URL

// ─── Axios instance ───────────────────────────────────────────────────────────

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

// ─── Refresh state ────────────────────────────────────────────────────────────

// tracks whether a refresh call is already in flight
let isRefreshing = false

// queue of callbacks waiting for the new access token
// if two requests fail with 401 at the same time, only one refresh fires
// the second request waits here until the refresh completes
let failedQueue = []

const processQueue = (error, token) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error)
        } else {
            resolve(token)
        }
    })
    failedQueue = []
}

// ─── Request interceptor ──────────────────────────────────────────────────────

api.interceptors.request.use((config) => {
    const token = getAccessToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// ─── Response interceptor ─────────────────────────────────────────────────────

api.interceptors.response.use(
    // if response is successful, just return it as-is
    (response) => response,

    // if response fails, check if it's a 401
    async (error) => {
        const originalRequest = error.config

        // only attempt refresh if:
        // 1. the error is 401
        // 2. we haven't already retried this request (prevents infinite loop)
        // 3. the failing request is not the refresh endpoint itself
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/refresh')
        ) {
            // if a refresh is already in progress, queue this request
            // it will be retried once the refresh completes
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`
                    return api(originalRequest)
                }).catch((err) => Promise.reject(err))
            }

            // mark this request so we don't retry it again if refresh also fails
            originalRequest._retry = true
            isRefreshing = true

            try {
                // attempt to get a new access token using the httpOnly cookie
                const response = await api.post('/refresh')
                const newToken = response.data.data.accessToken

                setAccessToken(newToken)

                // update the header for the original failed request
                originalRequest.headers.Authorization = `Bearer ${newToken}`

                // resolve all queued requests with the new token
                processQueue(null, newToken)

                // retry the original request
                return api(originalRequest)
            } catch (refreshError) {
                // refresh failed — session is dead
                // clear the token and reject all queued requests
                setAccessToken(null)
                processQueue(refreshError, null)
                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    }
)

export default api