import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface InputProps {
    id: string;
    label: string;
    type: string;
    disabled: boolean;
    required: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
}
