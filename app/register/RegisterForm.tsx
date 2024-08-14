'use client'

import { useState } from "react";
import Input from "../components/inputs/Input";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../components/Buttons/Button";
import { useRouter } from 'next/navigation'; // Kullanıcıyı yönlendirmek için
import Link from 'next/link';

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter(); // Yönlendirme için

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: FieldValues) => {
        setIsLoading(true);
        setError(null);

        try {
            // Backend API URL'sini kendi sunucunuzun URL'si ile değiştirin
            const response = await fetch('https://localhost:7125/api/User/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Kayıt başarısız');
            }

            // Kayıt başarılı olduğunda
            router.push('/login'); // Login sayfasına yönlendir
        } catch (error: any) {
            setError(error.message || 'Bir hata oluştu');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <h1 className="text-4xl font-bold text-center mt-8 mb-6">Sign up For E-shop</h1>
            <hr className="bg-slate-300 w-full h-px" />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required type="text"
            />

            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required type="email"
            />

            <Input
                id="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required type="password"
            />

            <Button
                label={isLoading ? "Loading" : 'Sign Up'}
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
            />

            {error && <p className="text-red-500">{error}</p>}

            <p className="text-sm">
                Already have an account? <Link href='/login' className="underline">Log in</Link>
            </p>
        </>
    );
}

export default RegisterForm;
