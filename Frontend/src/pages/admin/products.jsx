import ProductImageUpload from '@/components/admin/image-upload'
import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import React, { Fragment, useState } from 'react'


const inintalFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: 0,
  salePrice: "",
  totalStock: ""
}



function AdminProducts() {

  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false)
  const [formData, setFormData] = useState(inintalFormData)
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUr] = useState('')

  function onSubmit(){

  }

  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={() => setOpenCreateProductsDialog(true)}>Add New Book</Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4 '></div>
      <Sheet open={openCreateProductsDialog} onOpenChange={() => {
        setOpenCreateProductsDialog(false)}}>
          <SheetContent side='right' className='overflow-auto'>
            <SheetHeader>
              <SheetTitle>Add new Book</SheetTitle>
            </SheetHeader>

            <ProductImageUpload 
              imageFile={imageFile} 
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUr={setUploadedImageUr}
            />

            <div className='py-6'>
              <CommonForm 
                onSubmit={onSubmit} 
                formData={formData} 
                setFormData={setFormData} 
                buttonText="Add" 
                formControls={addProductFormElements}>
              </CommonForm>
            </div>
          </SheetContent>
        </Sheet>
    </Fragment>
  )
}

export default AdminProducts