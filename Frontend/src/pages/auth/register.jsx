import CommonForm from '@/components/common/form'
import { registerFormControls } from '@/config'
import { registerUser } from '@/store/auth-slice';
import { User } from 'lucide-react';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "sonner"


const initialState = {
  username: "",
  email: "",
  password: "",
};


function AuthRegister() {

  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function onSummit(event){
    event.preventDefault()

    dispatch(registerUser(formData)).then((data) => {
      if(data?.payload?.success) {
        toast.success("User Register successfully")
        navigate('/auth/login')
      } else {
        toast.error("You do something wrong")
      }
      
        

    } )
  }
  

  return (
    <div className='mx-auto w-full max-w-md space-y-6' >
      <div className='text-center'>
        <h1 className='text-3xl font-black tracking-tight text-foreground'>Create new Account</h1>
        <p className="mt-2">Already new account
          <Link className='font-medium ml-2 text-primary hover:underline' to="/auth/login">Login</Link>
        </p>
      </div>

      <CommonForm
        formControls={registerFormControls}
        buttonText={'Sign Up'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSummit}

      />
    </div>
  )
}

export default AuthRegister