import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://brexman:bermul2727@cluster0.ohe8ost.mongodb.net/food-delivery')
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB Connection Error:", err));
};
