'use client'

import { InputProps } from './InputProps';  // İlgili TypeScript dosyasını import et
import React from 'react';

const Input: React.FC<InputProps> = ({
    id,
    label,
    type,
    disabled,
    required,
    register,
    errors
}) => {
    return (
        <div className="relative w-full">
            <input
                autoComplete="off"
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder=""
                type={type}
                className={`
                    peer
                    w-full
                    p-4
                    pt-6
                    outline-none
                    bg-white
                    font-light
                    border-2
                    rounded-md
                    transition
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    ${errors[id] ? 'border-rose-400' : 'border-slate-300'}
                    ${errors[id] ? 'focus:border-rose-400' : 'focus:border-slate-300'}
                `}
            />
            <label
                htmlFor={id}
                className={`
                    absolute
                    left-4
                    top-4
                    text-md
                    font-light
                    transition-all
                    duration-300
                    transform
                    scale-75
                    -translate-y-4
                    origin-top-left
                    peer-placeholder-shown:scale-100
                    peer-placeholder-shown:translate-y-2
                    peer-placeholder-shown:top-6
                    peer-focus:-translate-y-4
                    peer-focus:scale-75
                    ${errors[id] ? 'text-rose-500' : 'text-slate-500'}
                `}
            >
                {label}
            </label>
        </div>
    );
}

export default Input;
