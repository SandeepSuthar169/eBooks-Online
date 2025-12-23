// first name
// last name
// phoneNumber
// user

import mongoose, {Schema} from "mongoose"

import { User } from "../models/user.model.js"
import { Address } from "../models/address.models.js"

const userProfileSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const UserProfile = mongoose.model("UserProfile", userProfileSchema)