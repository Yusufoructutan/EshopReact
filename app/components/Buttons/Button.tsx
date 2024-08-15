'use Client'

import { IconType } from "react-icons";
import { ButtonProps } from "./ButtonProps";



const Button : React.FC<ButtonProps> =({
    label,
    disabled,
    outline,
    small,
    custom,
    icon,
    onClick,
}) =>{

    return ( 
        <button
        onClick={onClick}
        disabled={disabled}
        className={`
            disabled:opacity-70
            disabled:cursor-not-allowed
            rounded-md
            hover:opacity-80
            transition
            w-full
            border-slate-700
            flex
            items-center
            justify-center
            gap-2
            ${outline ? "bg-white text-slate-700" : "bg-slate-700 text-white"}
            ${small ? "py-1 px-2 border-[1px]" : "py-3 px-4 border-2"}
            ${custom ? custom : ''}
        `}
    >


        {/* { Icon && <Icon size={24} /> } */}
        {label}
    </button> 
);
};
 
export default Button;