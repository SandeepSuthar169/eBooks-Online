import mongoose, {Mongoose} from "mongoose";
import { User } from "../models/user.model.js";
import { Books } from "../models/books.models.js";
import { BookMark } from "../models/bookMark.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addToBookMark = asyncHandler(async(req, res) => {
    if (req.params.bookId) {
        const { bookId } = req.params;
        console.log(bookId);
    } else {
        throw new ApiError(401, "Book id is required!");
    }
    
})

const removeToBookMark = asyncHandler(async(req, res) => {

})

export {
    addToBookMark,
    removeToBookMark
}