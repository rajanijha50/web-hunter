import mongoose from "mongoose";

export const connectDB = async () =>{
    if (mongoose.connection.readyState >= 1) {
        console.log('MongoDB is already connected ✅✅')
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            bufferCommands: false,
        })
        console.log('MongoDB connected successfully ✅✅')
    } catch (error:any) {
        console.error('MongoDB connection failed!! ❌❌', error.message)
        throw error;
    }
}