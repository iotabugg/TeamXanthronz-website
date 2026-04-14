import "dotenv/config";
import app from "./app.js";
import { scheduleChangeRequestCleanup } from "./jobs/cleanupChangeRequests.js";
import prisma from "./lib/prisma.js";

const start = async () => {
    await prisma.$connect();
    console.log("✅ Database connected");

    app.listen(process.env.PORT, () => {
        console.log(`🚀 Server running on port ${process.env.PORT}`)
    })
    if (process.env.NODE_ENV !== 'production') {
      scheduleChangeRequestCleanup()
    }
};

start().catch((err) => {
    console.error("❌ Database connection failed.", err);
    process.exit(1);
})