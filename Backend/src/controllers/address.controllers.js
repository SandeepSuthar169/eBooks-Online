import mongoose from "mongoose"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse }  from "../utils/apiResponse.js"
import { asyncHandler} from "../utils/asyncHandler.js"
import { Address } from "../models/address.models.js"
import { 
    AddressTypeEnum, 
    AvaailableAddressType 
} from "../utils/constants.js"


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
    
    return res
        .status(200)
        .json(
            new ApiResponse(
                201,
                address,
            "address create successfully"
            )
        )

    }
)


export const getAllUserAddress = asyncHandler(async(req, res) => {
    const address = await Address.aggregate([
        {
            $match: {
                owner: req.user._id,
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner"
            }
        },
        {
            $unwind: {
                path: "$owner",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                fullName: 1,
                phoneNumber: 1,
                address1: 1,
                address2: 1,
                city: 1,
                state: 1,
                pineCode: 1,
                country: 1,
                addressType: 1
            }
        }
    ])
    if(!address || address.length == 0 ) throw new ApiError(404, "address is required")

    return res
        .status(200)
        .json(
            new ApiResponse(200,
                address,
                "address fetched successfully"
            )
        )
    }
)



export const  getAddressById = asyncHandler(async(req, res) => {
    const { addressId } = req.params
    if(!addressId) throw new ApiError(401, "addressId create to faild")
    
    const address = await Address.findOne({
        _id: addressId,
        owner: req.user._id,
    })
    if(!address) throw new ApiError(401, "address doew not exist")
    
    return res
        .status(200)
        .json(
            new ApiResponse(200,
                address,
                "address fetchech successfully"
            ) 
    )
})


export const addressUpdate = asyncHandler(async(req, res) => {
    const { addressId } = req.params
    if(!addressId) throw new ApiError(401, "addressId create to faild")

    const owner = req.user._id;
    if(!owner) throw new ApiError(401, "owner fetch to faild")

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

    const address = await Address.findOneAndUpdate(
        {
            _id: addressId,
            owner: req.user._id
        },
        {
            $set: {
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
            }
        },
        {
            new: true
        }
    )
    if(!address) throw new ApiError(401, "address does not exist")

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                address,
                "Address updated successfully"
            )
    )

}) 

export const deleteAddress = asyncHandler(async(req, res) => {
    const {addressId} = req.params;
    if(!addressId) throw new ApiError(401, "addressId does not exist")


    const address = await Address.findOneAndDelete({
        _id: addressId,
        owner: req.user._id
    })
    if(!address) throw new ApiError(401, "address does not exist")

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    deleteAddress: address
                },
                "Address deleted successfully"
            )
        )
    }
)