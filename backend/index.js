import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);



app.use(express.json());

app.use(cookieParser());

app.use(morgan());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const PORT = 8000 || process.env.PORT;

app.get("/api/health", (req, res) => {
  res.send("Everything working good 🚀");
});

app.use("/api/user", userRouter)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at: http://localhost:${PORT}`);
  });
});
