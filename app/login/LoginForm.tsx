'use client'

import { useState } from 'react';
import Input from '../components/inputs/Input';
import { FieldValues, useForm } from 'react-hook-form';
import Button from '../components/Buttons/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useErrorStore } from '@/app/Store/errorStore'; 

const LoginForm = () => {
    const router = useRouter();
    const { login } = useAuth(); 
    const { openErrorModal } = useErrorStore(); 

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const onSubmit = async (data: FieldValues) => {

        try {
            const response = await fetch('https://localhost:7125/api/User/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const result = await response.json();
            const token = result.token;

            login(token);

            router.push('/'); 
        } catch (error: any) {
         
        }
    };

    return (
        <>
            <h1 className="text-4xl font-bold text-center mt-8 mb-6">Elit Shop'a Giriş Yap</h1>
            <hr className="bg-slate-300 w-full h-px" />
            <Input
                id="username"
                label="Kullanıcı Adı"
                register={register}
                errors={errors}
                required
                type="text"
            />

            <Input
                id="password"
                label="Şifre"
                register={register}
                errors={errors}
                required
                type="password"
            />

            <Button
                label={ 'Login'}
                onClick={handleSubmit(onSubmit)}
            />

            <p className="text-sm">
                Do not have an account? <Link href='/register' className="underline">Sign Up</Link>
            </p>
        </>
    );
}

export default LoginForm;
