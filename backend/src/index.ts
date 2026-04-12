import "dotenv/config";
import app from "./app.js";
import prisma from "./lib/prisma.js";

const start = async () => {
    await prisma.$connect();
    console.log("✅ Database connected");

    app.listen(process.env.PORT, () => {
        console.log(`🚀 Server running on port ${process.env.PORT}`)
    })
};

start().catch((err) => {
    console.error("❌ Database connection failed.", err);
    process.exit(1);
})