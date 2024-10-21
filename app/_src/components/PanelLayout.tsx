import { forwardRef, MouseEventHandler, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import Icon, { IconNames } from "./Icon";

interface PanelLayoutProps {
    className?: string;
    title: string;
    signatureIcon?: IconNames;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const PanelLayout = forwardRef<HTMLDivElement, PropsWithChildren<PanelLayoutProps>>(({ children, className, title, signatureIcon, onClick }, ref) => {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="min-h-12 p-2 flex justify-between items-center">
                <h3 className="m-1 text-slate-500 text-xs font-medium tracking-wide uppercase">{title}</h3>
                {signatureIcon ?
                    <button className="p-1 hover:bg-slate-900 rounded" onClick={onClick}>
                        <Icon className="w-6 h-6 text-slate-300" icon={signatureIcon} />
                    </button>
                :
                    <div />
                }
            </div>
            <div className={twMerge("w-full h-full p-4 pt-0", className)} ref={ref}>
                {children}
            </div>
        </div>
    );
});

export default PanelLayout;