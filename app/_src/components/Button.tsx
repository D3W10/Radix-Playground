import { MouseEventHandler, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
    className?: string;
    disabled?: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ children, className, disabled, onClick }: PropsWithChildren<ButtonProps>) {
    return (
        <button className={twMerge("px-4 py-2 flex justify-center items-center font-bold text-slate-950 bg-emerald-500 disabled:opacity-50 rounded transition-opacity duration-200 focus-visible:outline-offset-2", className)} disabled={disabled} onClick={onClick}>{children}</button>
    );
}