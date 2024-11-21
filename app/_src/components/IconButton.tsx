import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";
import Icon, { IconNames } from "./Icon";

interface IconButtonProps {
    className?: string;
    name: IconNames
    disabled?: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function IconButton({ className, name, disabled, onClick }: IconButtonProps) {
    return (
        <button className={twMerge(`p-1 hover:bg-slate-900 rounded disabled:opacity-50`, className)} disabled={disabled} onClick={onClick}>
            <Icon className="w-6 h-6 text-slate-300" icon={name} />
        </button>
    );
}