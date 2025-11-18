import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { Request, Response } from "express"
import { serve } from "inngest/express";
import { logger } from "./utils/logger";;
import { inngest } from "./inngest/client";
import { functions as inngestFunctions } from "./inngest/functions";
import { connectDB } from "./utils/db";
import path from "path";


import authRouter from "./routes/auth";
import chatRouter from "./routes/chat";
import moodRouter from "./routes/mood";
import testRouter from "./routes/test";
import activityRouter from "./routes/activity";



dotenv.config({
  path: path.resolve(__dirname, "../.env") // points to project root
});


// Create Express app
const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(
  cors({
    origin: ["http://localhost:3000"], // or "*" for testing
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(morgan("dev")); // HTTP request logger
app.use(express.json()); // Parse JSON bodies

// development Set up Inngest endpoint
app.use(
  "/api/inngest",
  serve({ client: inngest, functions: inngestFunctions,  })
);

// production Set up Inngest endpoint
// app.use(
//   "/api/inngest",
//   serve({ client: inngest, functions: inngestFunctions, signingKey: process.env.INNGEST_SIGNING_KEY, })
// );

app.use("/auth", authRouter);
app.use("/chat", chatRouter);
app.use("/api/mood", moodRouter);
app.use("/api/test", testRouter);
app.use("/api/activity", activityRouter);


app.get("/", (req: Request, res: Response) => {
    res.send("Hell0 baby")
})

app.get("/api/chat", (req: Request, res: Response) => {
    res.send("Here for you")
})

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();

    // Then start the server
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      logger.info(
        `Inngest endpoint available at http://localhost:${PORT}/api/inngest`
      );
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();