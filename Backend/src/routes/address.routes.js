import { Router } from "express"
import { createUserAddress } from "../controllers/address.controllers.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/createAddress/:userId", verifyJWT, createUserAddress)

export default router