import { MouseEventHandler, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
    className?: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ children, className, onClick }: PropsWithChildren<ButtonProps>) {
    return (
        <button className={twMerge("px-4 py-2 flex justify-center items-center font-bold text-slate-950 bg-emerald-500 rounded", className)} onClick={onClick}>{children}</button>
    );
}