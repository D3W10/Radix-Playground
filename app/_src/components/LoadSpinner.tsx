import { twMerge } from "tailwind-merge";
import Icon from "./Icon";

interface LoadSpinnerProps {
    className?: string;
}

export default function LoadSpinner({ className }: LoadSpinnerProps) {
    return (
        <div className="h-full flex justify-center items-center">
            <Icon className={twMerge("w-14 h-auto text-emerald-500", className)} icon="spinner" />
        </div>
    );
}