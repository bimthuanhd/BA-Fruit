import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

export const connect = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log("Connected!!!"))
  } catch (error) {
    console.log("contect falure!!!")
  }
}