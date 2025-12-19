import mongoose, { Schema } from "mongoose";


const bookMarkSchema = new Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
        book: {
            type: mongoose.Types.ObjectId,
            ref: "Books",
            required: true
        } 
    },
    {
        timestamps: true
    }
)


export const BookMark = mongoose.model("bookMark", bookMarkSchema)