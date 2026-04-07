import { app } from "./app.js";
import dotenv from 'dotenv';
import prisma from "./lib/prisma.js";

dotenv.config({
    path: './env'
})

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