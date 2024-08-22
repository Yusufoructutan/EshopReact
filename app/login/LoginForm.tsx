'use client'

import { useState } from 'react';
import Input from '../components/inputs/Input';
import { FieldValues, useForm } from 'react-hook-form';
import Button from '../components/Buttons/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useErrorStore } from '@/app/Store/errorStore'; // Import Zustand store hook

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { login } = useAuth(); // Get login function from context
    const { openErrorModal } = useErrorStore(); // Use Zustand store action for error modal

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
        setIsLoading(true);

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

            // Use login function from context
            login(token);

            // Redirect based on role or default to home
            router.push('/'); 
        } catch (error: any) {
            openErrorModal(error.message || 'An error occurred'); // Use Zustand store to open error modal
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <h1 className="text-4xl font-bold text-center mt-8 mb-6">Sign in to E-shop</h1>
            <hr className="bg-slate-300 w-full h-px" />
            <Input
                id="username"
                label="Username"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="text"
            />

            <Input
                id="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="password"
            />

            <Button
                label={isLoading ? 'Loading' : 'Login'}
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
            />

            <p className="text-sm">
                Do not have an account? <Link href='/register' className="underline">Sign Up</Link>
            </p>
        </>
    );
}

export default LoginForm;
