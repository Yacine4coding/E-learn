import mongoose from "mongoose";
export default async function connectDb() {
  try {
    console.log(process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connect succesfuly")
  } catch (error) {
    console.log(error);
  }
}
