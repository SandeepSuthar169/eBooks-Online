import { Router } from "express";

const router = Router()

import { addToBookMark }  from "../controllers/bookMark.controllers.js"

router.post("/addBookMark", addToBookMark)

export default router