import mongoose from "mongoose";

const dbConnect = async (req, res) => {
  try {
    mongoose.connection.on("connected", () => {console.log("Database connected successfully!");
    });
    await mongoose.connect(`${process.env.MONGODB_URL}/mern-auth`);
  } catch (error) {
    console.log(error.message);
  }
};


export default dbConnect;