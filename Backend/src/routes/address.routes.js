import { Router } from "express"
import { 
    createUserAddress,
    getAllUserAddress,
    getAddressById,
    addressUpdate,
    deleteAddress
} from "../controllers/address.controllers.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/createAddress/:userId", verifyJWT, createUserAddress)
router.get("/getAllUserAddress", verifyJWT, getAllUserAddress)
router.get("/getAddressById/:addressId", verifyJWT, getAddressById)
router.patch("/addressUpdate/:addressId", verifyJWT, addressUpdate)
router.delete("/deleteAddress/:addressId", verifyJWT, deleteAddress)

export default router