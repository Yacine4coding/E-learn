import mongoose from "mongoose";
export default async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connect succesfuly")
  } catch (error) {
    console.log(error);
  }
}
