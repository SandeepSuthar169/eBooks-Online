import { Books } from "../models/books.models.js"
import razorpayInstance from "../utils/razorpay.js";
import { User } from "../models/user.model.js"
import { Order } from "../models/order.models.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {
    AvailableOrderState,
    OrderStateEnum
} from "../utils/constants.js"

export const createOrder = asyncHandler(async(req, res) => {
    const { bookId } = req.body
    if(!bookId) throw new ApiError(400, "bookId does not found")

    const book = await Books.findById(bookId)
    if(!book) throw new ApiError(400, "book does not found")

    const options = {
        amount: book.price * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`
    }

    const razorpayOrder = await razorpayInstance.orders.create(options)

    const order = await Order.create({
        owner: req.user._id,
        books: bookId,
        amount: book.price,
        razorpayOrderId: razorpayOrder.id
    })
    
    if(!order) throw new ApiError(400, "order does not found")

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { order, razorpayOrder },
                "Order created successfully"
            )
        )
})

export const cancelOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) throw new ApiError(404, "Order not found");

    // Use 'owner' to match createOrder
    if (order.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized");
    }

    if (order.status === "PAID") {
        throw new ApiError(400, "Paid orders cannot be cancelled. Request a refund instead.");
    }

    if (order.status === "CANCELLED") {
        throw new ApiError(400, "Order already cancelled");
    }

    order.status = "CANCELLED";
    await order.save();

    return res.status(200).json(
        new ApiResponse(200, order, "Order cancelled successfully")
    );
});