import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection (safe for serverless)
let isConnected = false;
const connectOnce = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};
connectOnce();

// Routes
app.get("/", (req, res) => {
  res.send("Server is live...");
});

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

export default app;
