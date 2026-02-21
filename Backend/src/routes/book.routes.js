import { Router } from "express"
import { 
    addBook, 
    getBookInfo, 
    updateBook, 
    deleteBook,
    imageUploadUtils
} from "../controllers/books.controllers.js"
import { upload } from "../utils/cloudinary.js"

const router = Router()

router.post("/uploadImage", upload.single("my_file"), imageUploadUtils)
router.post("/", addBook)

router.get("/:id", getBookInfo)
router.post("/:id/status", updateBook)
router.delete("/:id/delete", deleteBook)

export default router