import { MouseEventHandler, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify/react";

interface PanelLayoutProps {
    className?: string;
    title: string;
    signatureIcon?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function PanelLayout({ children, className, title, signatureIcon, onClick }: PropsWithChildren<PanelLayoutProps>) {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="h-12 p-3 flex justify-between items-center">
                <h3 className="m-1 text-slate-500 text-xs font-medium tracking-wide uppercase">{title}</h3>
                {signatureIcon ?
                    <button onClick={onClick}>
                        <Icon className="w-6 h-6 text-slate-300" icon={signatureIcon} />
                    </button>
                :
                    <div />
                }
            </div>
            <div className={twMerge("w-full h-full p-4 pt-0", className)}>
                {children}
            </div>
        </div>
    );
}