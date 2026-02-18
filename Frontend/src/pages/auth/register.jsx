import CommonForm from '@/components/common/form'
import { registerFormControls } from '@/config'
import { User } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const initialState = {
  username: "",
  email: "",
  password: "",
};


function AuthRegister() {

  const [formData, setFormData] = useState(true)

  function onSummit(){

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