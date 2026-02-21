import { v2 as cloudinary } from 'cloudinary'
import multer from  "multer"

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

console.log("CLOUDs_NAME →", process.env.CLOUD_NAME)
console.log("API_KEYs →", process.env.CLOUD_API_KEY)

const storage = new multer.memoryStorage()

async function imageUpload(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto"
    })
    return result
}

const upload = multer({storage})

export { 
    upload, 
    imageUpload
}