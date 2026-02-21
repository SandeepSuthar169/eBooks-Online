import mongoose from "mongoose";
import db from "./db/index.js";
import app from "./app.js"
import dotenv from "dotenv"
import "dotenv/config" 
dotenv.config({
    path: "./.env"
})

const PORT = process.env.PORT || 3001

db()
    .then(() => {
        app.listen(PORT, () => console.log(`Server listen on Port:, ${PORT}`))
}).catch((error) => {
    console.error(`Server listen error: ${error}`);
    process.exit(1)
    
})