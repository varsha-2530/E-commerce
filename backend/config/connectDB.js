import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

if(!process.env.MONGODB_URL){
    throw new Error(
        "please provide MONGODB_URL in the .env file"
    )
    

}

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MONGODB CONNECTED SUCCESSFULLY ! 🚀")
    } catch (error) {
         console.log("mongoDB not connected successfully !");
         process.exit(1)
    }
}

export default connectDB