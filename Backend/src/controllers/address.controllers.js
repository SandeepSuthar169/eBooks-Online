import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse }  from "../utils/apiResponse.js"
import { asyncHandler} from "../utils/asyncHandler.js"
import { Address } from "../models/address.models.js"
import { 
    AddressTypeEnum, 
    AvaailableAddressType 
} from "../utils/constants.js"
import mongoose from "mongoose"


export const createUserAddress = asyncHandler(async(req, res) => {
    const owner = req.user._id;
    
    const {
        fullName, 
        phoneNumber,
        address1,
        address2,
        city,
        state,
        pineCode,
        country,
        addressType,
        isDefault
    } = req.body


    if(
        !fullName ||
        !phoneNumber ||
        !address1 ||
        !address2 ||
        !city ||
        !state ||
        !pineCode || 
        !country || 
        !addressType || 
        !isDefault  == undefined
    ) throw new ApiError(400, "user address is required details")

    // const existedAddress = Address.findOne({
    //     $or: [
    //         {
    //             address1
    //         },
    //         {
    //             address2
    //         }
    //     ]
        
    // })
    // if(existedAddress) throw new ApiError(401, "address already exist")

    const address = await Address.create({
        fullName,
        phoneNumber,
        address1,
        address2,
        city,
        owner,
        state,
        pineCode,
        state,
        country,
        addressType,
        isDefault
    })
    if(!address) throw new ApiError(401, "address creat to faild")
    
    return res.status(200).json(new ApiResponse(
        201,
        address,
        "address create successfully"
    ))

})