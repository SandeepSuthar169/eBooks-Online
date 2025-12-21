import { Router } from "express"
import { 
    createUserAddress,
    getAllUserAddress,
    getAddressById
} from "../controllers/address.controllers.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/createAddress/:userId", verifyJWT, createUserAddress)
router.get("/getAllUserAddress", verifyJWT, getAllUserAddress)
router.get("/getAddressById/:addressId", verifyJWT, getAddressById)

export default router