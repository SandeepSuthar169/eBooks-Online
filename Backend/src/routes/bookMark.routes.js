import { Router } from "express";

const router = Router()

import { 
    addToBookMark,
    removeToBookMark
}  from "../controllers/bookMark.controllers.js"

router.post("/addBookMark", addToBookMark)
router.delete("/removeToBookMark/:bookMarkId", removeToBookMark)

export default router