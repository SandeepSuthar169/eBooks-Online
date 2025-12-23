import { Router } from "express"
import { 
    createUserProfile,
    getUserProfile,
    updateUserProfile
} from "../controllers/userProfile.controllers.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/crateProfile", verifyJWT, createUserProfile)
router.get("/getProfile", verifyJWT, getUserProfile)
router.patch("/updateProfile", verifyJWT, updateUserProfile)



export default router