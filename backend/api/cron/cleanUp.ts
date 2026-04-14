import type { VercelRequest, VercelResponse } from '@vercel/node'
import { cleanupChangeRequests } from '../../src/jobs/cleanupChangeRequests.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    try {
        await cleanupChangeRequests()
        res.status(200).json({ ok: true, message: 'Cleanup done' })
    } catch (err) {
        console.error('[Cleanup] Failed:', err)
        res.status(500).json({ error: 'Cleanup failed' })
    }
}