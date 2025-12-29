import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://brexman:bermul2727@cluster0.ohe8ost.mongodb.net/food-delivery')
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB Connection Error:", err));
};