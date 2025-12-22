import { Books } from "../models/books.models.js"
import { razorpayInstance } from "../utils/razorpay.js"
import { User } from "../models/user.model.js"
import { Order } from "../models/order.models.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {
    AvailableOrderState,
    OrderStateEnum
} from "../utils/constants.js"


export const craeteOrder = asyncHandler(async(req, res) => {
    const { bookId } = req.body
    if(!bookId) throw new ApiError(400, "bookId does not found")

    const book = await Book.findById(bookId)
    if(!book) throw new ApiError(400, "book does not found")

    const options = {
        amount: book.price * 100,
        currency: "INR",
        receipt: `receipt_${Data.now()}`
    }

    const razorpayOrder = await razorpayInstance.order.create(options)

    const order = await Order.create(
        {
            owner: req.user._id,
            books: bookId,
            amount: book.price,
            razorpayOrderId: razorpayOrder.id
        }
    )
    if(!order) throw new ApiError(400, "order does not found")

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                order,
                razorpayOrder
            )
        )

})

export const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        if (order.status === "PAID") {
            return res.status(400).json({
                message: "Paid orders cannot be cancelled. Request a refund instead."
            });
        }

        if (order.status === "CANCELLED") {
            return res.status(400).json({ message: "Order already cancelled" });
        }

        order.status = "CANCELLED";
        await order.save();

        res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};