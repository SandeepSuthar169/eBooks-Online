import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import  handleVerifyOtpAndResetPassword from "../utils/otpPasswordVerify.js"
import crypto from "crypto"
import  sendVerificationEmail   from "../utils/mail.js"
import sendOtpEmail from "../utils/sendOtpEmail.js"

const registerUser = asyncHandler(async (req, res) => {
        //1. get user details from fronted

        const {username, email, password}  = req.body
        if(
            [email, username, password].some((field) => 
                field?.trim() === "")
        ){
            throw new ApiError(404, "All filed are required")
        }

        //3. check if user already exists: username, email
        const existedUser = await User.findOne({
            $or: [{ username }, { email }]
            
        })

        if(existedUser){
            throw new ApiError(409, "User already exists")
        }

        
        // create user object - create entry in db
       const user = await User.create({
            email,
            password,
            username: username
        })
        console.log(email, password, username);
        
        if(!user){
            throw new ApiError(404, "User is required!")
        }

        // remove password and refresh token field form response
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )
        
        // check for user creation
        if(!createdUser){
            throw new ApiError(404, "createdUser is required")
        }

        // console.log(createdUser);
        
        // return res
        return res.status(201).json(
            new ApiResponse(201, 
                createdUser,
                "User registered successfully!"
            )
        )

})



const loginUser = asyncHandler(async (req, res) => {
    //1. req.body -> data
    const {email, username, password} = req.body 

    
    
    //2. username or email
    if(!email && !username){
        throw new ApiError(404, "username and email is required")
    }

    if(!password){
        throw new ApiError(404, "password is not here...")
    }
    //3. find the user
    const user = await User.findOne({
        $or: [{email}, {username}]
    })

    if(!user){
        throw new ApiError(404, "user is not exist")
    }
    // //4. passowd check

    // console.log("=================");
    
    const isPasswordValid =  await user.isPasswordCorrect(password)

    // console.log("password", password);
    // console.log("isPasswordCorrect", user.isPasswordCorrect(password));
    // console.log("user", user);
    
    // console.log("=================");

    if(!isPasswordValid){
        throw new ApiError(404, "password is not valid here")
    }
    
    
    //5. access and refresh token generate


    const accessToken = await  user.generateAccessToken()
    const refreshToken =  await user.generateRefreshToken()


        

    if(!accessToken || !refreshToken) {
        throw new ApiError(500, "access and refresh token is not found!")
    }
        
    user.refreshToken = refreshToken


        
    await user.save({ validateBeforeSave: false })
        
        
 
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")


    if(!loggedInUser){
        throw new ApiError(404, "loggedInUser is not found")
    }


    const cookieOptions = {
        httpOnly: true,
        secure: false, // must be false for localhost testing
        sameSite: "lax", // allows sending cookie on same site
      };
      

      

    //6. send to cookie
    res
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .status(200)
    .json(
      new ApiResponse(
        200,{
             user: loggedInUser, accessToken, refreshToken 
            },
        "User logged in successfully"
      )
    );
})



const logoutUser = asyncHandler(async (req, res) => {

    // console.log("req <====> ",req);
    // console.log("req.user <+++++>",req.user);
    // console.log("req.user._id  <=======>",req.user._id);
    
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: 1,
                // accessToken: undefined
            }
        },
        {
            new: true
        }
    )

    const cookieoption = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200)
        .clearCookie("accessToken", cookieoption)
        .clearCookie("refreshToken", cookieoption)
        .json(
        new ApiResponse(
            200,
            {},
            "User logout successfully!"
        )
    )


})

const sendOtp = asyncHandler(async (req, res) => { 
    const {email} = req.body

    // FIXED: Validate email
    if(!email) {
        throw new ApiError(400, "Email is required")
    }

    // FIXED: Generate 5-digit OTP correctly
    const otp = String(crypto.randomInt(10000, 100000)) 
    
    const user = await User.findOne({email})

    if(!user) {
        throw new ApiError(404, "User not found") 
    }

    // Set OTP and expiry
    user.resetOtp = otp
    user.otpExpiry = Date.now() + 5 * 60 * 1000  // 5 minutes expiry
    await user.save({ validateBeforeSave: false })

    const emailSent = await sendOtpEmail(email, otp)

    if(!emailSent) {
        throw new ApiError(500, "Failed to send OTP email")
    }

    return res.status(200).json( 
        new ApiResponse(
            200,
            { email },
            "OTP sent to your email successfully"
        )
    )
})


const verifyOtpAndResetPassword = asyncHandler(async (req, res) => {
    const { email, otp, newPassword, confirmNewPassword } = req.body

    // Validate inputs
    if(!email || !otp || !newPassword || !confirmNewPassword) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    if(!user.resetOtp || !user.otpExpiry) {
        throw new ApiError(400, "No OTP request found. Please request a new OTP")
    }

    if (Date.now() > user.otpExpiry) {
        user.resetOtp = undefined
        user.otpExpiry = undefined
        await user.save({ validateBeforeSave: false })
        
        throw new ApiError(400, "OTP has expired. Please request a new one")
    }

    // Check if OTP is correct
    if (user.resetOtp !== otp) {
        throw new ApiError(400, "Incorrect OTP")
    }
    
    // Check if passwords match
    if (newPassword !== confirmNewPassword) {
        throw new ApiError(400, "Passwords do not match")
    }

    // Validate password strength (optional but recommended)
    if(newPassword.length < 6) {
        throw new ApiError(400, "Password must be at least 6 characters long")
    }

    // Update password and clear OTP
    user.password = newPassword
    user.resetOtp = undefined
    user.otpExpiry = undefined
    await user.save() 
    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Password reset successfully. You can now login with your new password"
        )
    )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    sendOtp,
    verifyOtpAndResetPassword
}