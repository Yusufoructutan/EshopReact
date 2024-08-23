'use client'

import { useState } from "react";
import Input from "../components/inputs/Input";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../components/Buttons/Button";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ErrorModal from '@/app/components/Modal/ErrorModal'; 
import { useErrorStore } from '@/app/Store/errorStore'; 

const RegisterForm = () => {
    const { openErrorModal } = useErrorStore(); 
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: FieldValues) => {

        try {
            const response = await fetch('https://localhost:7125/api/User/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    password: data.password
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Kayıt başarısız');
            }

            router.push('/login');
        } catch (error: any) {
        }
    };

    return (
        <>
            <h1 className="text-4xl font-bold text-center mt-8 mb-6">Elit Shop'a Kaydolun</h1>
            <hr className="bg-slate-300 w-full h-px" />
            <Input
                id="username"
                label="Kullanıcı Adı"
                register={register}
                errors={errors}
                required type="text"
            />

            <Input
                id="email"
                label="Email"
                register={register}
                errors={errors}
                required type="email"
            />

            <Input
                id="password"
                label="Şifre"
                register={register}
                errors={errors}
                required type="password"
            />

            <Button
                label={ 'Sign Up'}
                onClick={handleSubmit(onSubmit)}
            />


            <p className="text-sm">
                Zaten bir hesabınız var mı? <Link href='/login' className="underline">Giriş Yap</Link>
            </p>
            <ErrorModal /> 
        </>
    );
}

export default RegisterForm;
