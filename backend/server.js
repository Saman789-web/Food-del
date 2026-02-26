import { setServers } from "node:dns/promises";
await setServers(["1.1.1.1", "8.8.8.8"]);

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRouter.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { connectDB } from "./config/db.js";

// app config
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// DB connection – wait for DB before starting server
const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server Started on http://localhost:${PORT}`);
  });
};
startServer();


// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// test route
app.get("/", (req, res) => {
  res.send("API WORKING");
});

