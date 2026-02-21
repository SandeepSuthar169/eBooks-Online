
import reviewRoute from "./routes/review.routes.js"
// import orderRoute from "./routes/order.routes.js"
import bookMarkRoute from "./routes/bookMark.routes.js"
import addressUserRoute from "./routes/address.routes.js"
import { User } from "./models/user.model.js"
import userProfileRoute from "./routes/userProfile.routes.js"
import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
import authRoute from "./routes/auth.routes.js"
import adminBooksRoute  from "./routes/book.routes.js"

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: [
        'Content-Type', 
        "Authorization",
        "Cache-Control",
        "Exprires",
        "Pragma"
    ],
})),
app.use(express.json())
app.use((cookieparser()))
app.use(express.urlencoded(
    {
        extended: true
    }
))

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/admin/Books", adminBooksRoute)
app.use("/api/v1/review", reviewRoute)
// app.use("/api/v1/order", orderRoute)
app.use("/api/v1/bookMark", bookMarkRoute)
app.use("/api/v1/address", addressUserRoute)
app.use("/api/v1/profile", userProfileRoute)

export default app
