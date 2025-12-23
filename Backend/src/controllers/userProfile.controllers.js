import mongoose, { Mongoose } from "mongoose"
import { User } from "../models/user.model.js";
import { Address } from "../models/address.models.js";
import { UserProfile } from "../models/userProfile.models.js";
import { ApiError } from "../utils/apiError.js"
import { ApiResponse }  from "../utils/apiResponse.js"
import { asyncHandler} from "../utils/asyncHandler.js"


export const createUserProfile = asyncHandler(async (req, res) => {
    const {
        firstName,
        lastName,
        phoneNumber,
        email,
    } = req.body;

    if (
        !firstName || 
        !lastName || 
        !phoneNumber || 
        !email) {
        throw new ApiError(400, "All fields are required");
    }

    const existingProfile = await UserProfile.findOne({
        owner: req.user._id
    });

    if (existingProfile) {
        throw new ApiError(400, "Profile already exists");
    }

    const profile = await UserProfile.create({
        owner: req.user._id,
        firstName,
        lastName,
        phoneNumber,
        email,
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            profile,
            "User profile created successfully"
        )
    );
});


export const getUserProfile = asyncHandler(async(req, res) => {
    let profile = await UserProfile.findOne({
        owner : req.user._id,
    })
    if(!profile) throw new ApiError("400", "Profile does not exist")

    return res.status(200).json(
        new ApiResponse(
            200,
            profile,
            "User Profile fetched successfully "
        )
    )
})

export const updateUserProfile = asyncHandler(async(req, res) => {
    const {
        firstName, 
        lastName, 
        phoneNumber, 
        email
    } = req.body


    if(
        !firstName || 
        !lastName ||
        !phoneNumber ||
        !email 
    ) throw new ApiError("400", "user details is required")

    const profile = await UserProfile.findOneAndUpdate(
        {
            owner: req.user._id,
        },
        {
            $set: {
                firstName, 
                lastName, 
                phoneNumber, 
                email
            }
        },
        {
            new: true
        }
    )
    if(!profile) throw new ApiError("400", "Profile does not exist")

    return res.status(200).json(
        new ApiResponse(200,
            profile,
            "User profile updated successfully"
        )
    )

})