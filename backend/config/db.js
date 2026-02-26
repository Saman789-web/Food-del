import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // no options needed
    console.log("✅ MongoDB Connected (Atlas)");
    console.log("Connected DB:", mongoose.connection.name);
  } catch (error) {
    console.error("❌ DB Error:", error.message);
    process.exit(1);
  }
};