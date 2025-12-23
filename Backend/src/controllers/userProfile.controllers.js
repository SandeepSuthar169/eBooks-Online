import mongoose, { Mongoose } from "mongoose"
import { User } from "../models/user.model.js";
import { Address } from "../models/address.models.js";
import { UserProfile } from "../models/userProfile.models.js";
import { ApiError } from "../utils/apiError.js"
import { ApiResponse }  from "../utils/apiResponse.js"
import { asyncHandler} from "../utils/asyncHandler.js"


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