import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(helmet());

app.use(rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
}));

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/heath", (_req,res) => {
    res.json({status: "ok"})
})

import authRouter from "./routes/auth.routes.js"
import memberRouter from "./routes/member.routes.js"

app.use("/api/v1", authRouter);
app.use("/api/v1", memberRouter);


app.use(errorHandler);

export default app