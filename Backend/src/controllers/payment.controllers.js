import crypto from "crypto";
import { Payment } from "../models/payment.model.js";
import { Order } from "../models/order.model.js";

export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Invalid payment signature" });
        }

        const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = "PAID";
        await order.save();

        await Payment.create({
            books: order.books,
            user: order.user,
            amount: order.amount,
            paymentMethod: "ONLINE",
            paymentDate: new Date()
        });

        res.status(200).json({
            success: true,
            message: "Payment verified successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};