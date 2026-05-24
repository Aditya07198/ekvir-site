import express from "express";
import cors from "cors";
import { leadRouter } from "./routes/leads";
import { authRouter } from "./routes/auth";
import { errorHandler } from "./middleware/errorHandler";

export function createApp() {
  const app = express();

  const allowedOrigins = (process.env["ALLOWED_ORIGINS"] ?? "http://localhost:3000").split(",");
  const isDev = process.env["NODE_ENV"] !== "production";

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (curl, Postman, server-to-server)
        if (!origin) return callback(null, true);
        // In development allow any localhost port
        if (isDev && /^http:\/\/localhost:\d+$/.test(origin)) return callback(null, true);
        // In production allow only the explicit list
        if (allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error(`CORS: origin ${origin} not allowed`));
      },
      credentials: true,
    })
  );
  app.use(express.json({ limit: "10kb" }));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.use("/api/leads", leadRouter);
  app.use("/api/auth", authRouter);

  app.use(errorHandler);

  return app;
}
