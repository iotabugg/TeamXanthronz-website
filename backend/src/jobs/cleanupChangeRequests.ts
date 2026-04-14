import cron from 'node-cron'
import prisma from '../lib/prisma.js'

export const cleanupChangeRequests = async () => {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const result = await prisma.changeRequest.deleteMany({
        where: {
            status: 'APPROVED',
            resolvedAt: {
                not: null,
                lt: sevenDaysAgo,
            }
        }
    })

    console.log(`[Cleanup] Deleted ${result.count} approved change request(s)`)
}

export const scheduleChangeRequestCleanup = () => {
    if (process.env.NODE_ENV !== 'production') {
        cron.schedule('0 0 * * *', async () => {
            try {
                await cleanupChangeRequests()
            } catch (error) {
                console.error('[Cleanup] Failed to delete old change requests:', error)
            }
        })
        console.log('[Cleanup] Change request cleanup job scheduled')
    }
}