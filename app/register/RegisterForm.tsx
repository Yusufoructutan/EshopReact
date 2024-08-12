'use client'

import { useState } from "react";
import Input from "../components/inputs/Input";
import { FieldValues, useForm } from "react-hook-form";

const RegisterForm = () => {
    const [isLoading,setIsLoading] =useState(false)
    const{
        register,
        handleSubmit,
        formState:{errors},
    }=useForm<FieldValues>({
        defaultValues:{
            name:"",
            email:"",
            password:""
        }
    });
  
    return (
        <>
            <h1>Sign up For E-shop</h1>
            <hr className="bg-slate-300 w-full h-px" />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required type={""}            />
        </>
    );
}

export default RegisterForm;
