import mongoose from "mongoose";

const connect = async () => {
  try {
    // Line to set 'strictQuery'
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    throw new Error("Connection failed!");
  }
};

export default connect;
