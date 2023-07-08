import mongoose from "mongoose";

const connectMONGODB = async () => {
    try {
        if (mongoose.connection.readyState === 0){
            await mongoose.connect(process.env.MONGODB_URI);
            console.log("Mongo DB Connected!")
        }
    }catch(error){
        console.log(error);
    }
};

export default connectMONGODB;