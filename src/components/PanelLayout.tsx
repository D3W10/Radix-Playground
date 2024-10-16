import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify/react";

interface PanelLayoutProps {
    className?: string;
    title: string;
    signatureIcon?: string;
}

export default function PanelLayout({ children, className, title, signatureIcon }: PropsWithChildren<PanelLayoutProps>) {
    return (
        <div className={twMerge("flex flex-col", className)}>
            <div className="h-12 p-3 flex justify-between items-center">
                <h3 className="m-1 text-slate-500 text-xs font-medium tracking-wide uppercase">{title}</h3>
                {signatureIcon ?
                    <Icon className="w-6 h-6 text-slate-300" icon={signatureIcon} />
                :
                    <div />
                }
            </div>
            <div className="w-full h-full p-4 pt-0">
                {children}
            </div>
        </div>
    );
}