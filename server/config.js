import mongoose from "mongoose";
import { config } from "dotenv";
config();

const connectDb = async (cb) => {
  try {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        return cb();
      })
      .catch((err) => {
        return console.log(err.message);
      });
  } catch (error) {
    console.log(error.message);
  }
};

export const port = process.env.PORT;

export default connectDb;
