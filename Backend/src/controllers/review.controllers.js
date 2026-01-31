import { Review } from "../models/review.models.js"
import { Books } from "../models/books.models.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse }  from "../utils/apiResponse.js"
import { asyncHandler} from "../utils/asyncHandler.js"
import { ReviewRatingEnum } from "../utils/constants.js"
import mongoose, { Mongoose } from "mongoose"
import redis from "../utils/redis.js"
// import { log } from "nodemon/lib/utils/index.js"


const addReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const { BookId } = req.params  // Change to BookId with capital B
    
    if (!BookId) {
        throw new ApiError(401, "bookId not found")
    }

    if (!req.user) {
      throw new ApiError(401, "User not authenticated")
    }
    
    const userId = req.user._id
  
    if (rating === undefined || !comment?.trim()) {
      throw new ApiError(400, "Review fields are required")
    }
    
    if (!mongoose.Types.ObjectId.isValid(BookId)) {
      throw new ApiError(400, "Invalid book ID format")
    }
  
    const book = await Books.findById(BookId)
    if (!book) {
      throw new ApiError(404, `Book not found with ID: ${BookId}`)
    }
  
    const existedReview = await Review.findOne({
      book: BookId,
      user: userId
    })
    
    if (existedReview) {
      throw new ApiError(409, "You already reviewed this book")
    }
  
    const review = await Review.create({
      rating,
      comment,
      user: userId,
      book: BookId
    })
  
    return res.status(201).json(
      new ApiResponse(201, review, "Review created successfully")
    )
})




const getBookReview = asyncHandler( async (req, res) => {

    const { BookId } = req.params
    
    if(!BookId) throw new ApiError(401, "book id is required")

    const reviewBookInCach = await redis.get(`bookReview:${BookId}`)

    if(reviewBookInCach) {
        return res.status(200).json(new ApiResponse(
            200,
            JSON.parse(reviewBookInCach),
            "get review Bookcached info successfully"
        ))
    }

    const book = await Books.findById(BookId).select("name autharName averageRating totalReviews")

    if(!book) throw new ApiError(401, "id is required")



    const review = await Review.aggregate([
        {
            $match: {
                book: new mongoose.Types.ObjectId(BookId)
            }
        },
        {
            $lookup:{
                from: "users",      
                localField: "user",        
                foreignField: "_id",      
                as: "userDetails"       
            }
        },
        {
            $unwind: "$userDetails"     
          },
          {
            $project: {             
              _id: 1,
              rating: 1,
              comment: 1,
              createdAt: 1,
              "userDetails.username": 1,
              "userDetails.email": 1,
              "userDetails.fullName": 1
            }
          },
          { 
            $sort: { 
                createdAt: -1 
            }}    // latest reviews first
    ])
    if(!review) throw new ApiError(401, "id is required")

    await redis.set(
        `bookReview:${BookId}`,
        JSON.stringify(BookId), 
        "EX",
        3600
    )
    
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                review
            },
            "book review fatch successfully"
        )
    )
})

const deleteReview = asyncHandler(async (req, res) => {
    const { reviewId } = req.params
    console.log(reviewId);
    
    
    // Validate reviewId exists
    if (!reviewId) {
        throw new ApiError(400, "Review ID is required")
    }
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        throw new ApiError(400, "Invalid review ID format")
    }
    
    // Find and delete the review
    const deletedReview = await Review.findByIdAndDelete(reviewId)
    
    // Check if review existed
    if (!deletedReview) {
        throw new ApiError(404, "Review not found")
    }
    
    // Clear from Redis cache
    await redis.del(`review:${reviewId}`)
    
    return res.status(200).json(
        new ApiResponse(200, deletedReview, "Review deleted successfully")
    )
})
export {
    addReview,
    getBookReview,
    deleteReview
}
