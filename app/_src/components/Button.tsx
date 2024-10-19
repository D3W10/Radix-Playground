import { MouseEventHandler, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
    className?: string;
    secondary?: boolean;
    disabled?: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ children, className, secondary, disabled, onClick }: PropsWithChildren<ButtonProps>) {
    return (
        <button className={twMerge(`px-4 py-1.5 flex justify-center items-center font-bold ${!secondary ? "text-slate-950 bg-emerald-500" : "text-slate-300 bg-emerald-900"} border-1.5 ${!secondary ? "border-emerald-300" : "border-emerald-500"} disabled:opacity-50 rounded-lg shadow-md ${!secondary ? "shadow-emerald-700" : "shadow-emerald-900"} transition-opacity duration-200 focus-visible:outline-offset-2`, className)} disabled={disabled} onClick={onClick}>{children}</button>
    );
}