import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRouter.js";
import cartRouter from "./routes/cartRoute.js";
import 'dotenv/config'
import orderRouter from "./routes/orderRoute.js";

dotenv.config();

// app config
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// DB connection
mongoose.connect(process.env.DBURL)
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log("Connected DB:", mongoose.connection.name);

    app.listen(process.env.PORT || 8000, () => {
      console.log("🚀 Server is running");
    });
  })
  .catch((err) => {
    console.log("❌ DB Error:", err.message);
  });


  
// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)




// test route
app.get("/", (req, res) => {
  res.send("API WORKING");
});
