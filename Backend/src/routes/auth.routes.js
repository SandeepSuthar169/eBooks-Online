import { Router } from "express"
import { 
    registerUser, 
    loginUser, 
    logoutUser, 
    sendOtp, 
    verifyOtpAndResetPassword 
} from "../controllers/auth.controllers.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()


router.post("/register",  registerUser)
router.post("/login", loginUser)
router.post("/forgot-password", sendOtp)
router.post("/reset-password", verifyOtpAndResetPassword)
router.post("/logout",verifyJWT,  logoutUser )

export default router
