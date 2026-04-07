import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware.js";

export const app = express();

app.use(helmet());

app.use(rateLimit({windowMs: 15*60*1000, max: 100}));

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))

app.use(express.json());
app.use(cookieParser());

app.get("/heath", (_req,res) => {
    res.json({status: "ok"})
})

app.use(errorHandler);