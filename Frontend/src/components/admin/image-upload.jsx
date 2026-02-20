import { Input } from '../ui/input'
import { Label } from '../ui/label'
import React from 'react'

function ProductImageUpload({
    imageFile, 
    setImageFile, 
    uploadedImageUrl, 
    setUploadedImageUr
}) {

    const inputRef = useRef(null)

    function handleImageFileChange(event){
        console.log(event.target.files);
        const selectedFile = event.target.files?.[0]
        if(selectedFile) setImageFile(selectedFile)
        
    }

  return (
    <div className='w-full max-w-md mx-auto'>
        <Label className="text-lg font-semibold mb-2 block">Upload Book Image</Label>
        <div>
            <Input 
                id="image-updload" 
                type="file" 
                // className="hidden" 
                ref={inputRef}
                onChange={handleImageFileChange}
            />
            {
                !imageFile ? 
                <Label htmlFor="image-upload" className="flex flex-col jus"></Label> : <div></div>
            }
        </div>
    </div>
  )
}

export default ProductImageUpload