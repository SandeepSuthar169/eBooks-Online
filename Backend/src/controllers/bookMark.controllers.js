import mongoose, {Mongoose} from "mongoose";
import { User } from "../models/user.model.js";
import { Books } from "../models/books.models.js";
import { BookMark } from "../models/bookMark.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addToBookMark = asyncHandler(async(req, res) => {
    try {
        const {bookId} = await req.body
        console.log("bookId  -> ", bookId);

        if(!bookId) throw new ApiError(401, "Book id is  required!")
    
        const book = await Books.findById(bookId)
        console.log("book  -> ", book);
        
        if(!book) throw new ApiError(401, "book not available in there")
            //-------------

   
        const exsitingBook = await Books.findById(bookId)
        if(!exsitingBook) throw new ApiError(409, "Book already exist in Book mark list")
                
        const bookMark = await BookMark.create({
            book: book._id
        })

        if(!bookMark) throw new ApiError(409, "bookMark not exist")
            //-------------
        return res.status(200).json(new ApiResponse(
            200,
            bookMark,
            "bookmark in book added successfully"
        ))
    } catch (error) {
        console.error("User data and Book data is fetch to failed", error);
        res.status(500).json(
            error, "Failed to add to book mark list"
        )
    }
    
})

const removeToBookMark = asyncHandler(async (req, res) => {
    const { bookMarkId } = req.params;

    if (!bookMarkId) {
        throw new ApiError(400, "Bookmark ID is required");
    }

    const removedBookmark = await BookMark.findByIdAndDelete(bookMarkId);

    if (!removedBookmark) {
        throw new ApiError(404, "Bookmark not found");
    }

    res.status(200).json({
        success: true,
        message: "Bookmark removed successfully",
        data: removedBookmark
    });
});

export {
    addToBookMark,
    removeToBookMark
}