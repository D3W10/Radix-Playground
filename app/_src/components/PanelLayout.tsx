import { forwardRef, PropsWithChildren, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface PanelLayoutProps {
    className?: string;
    title: string;
    header?: ReactNode;
}

const PanelLayout = forwardRef<HTMLDivElement, PropsWithChildren<PanelLayoutProps>>(({ children, className, title, header }, ref) => {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="min-h-12 p-2 flex justify-between items-center">
                <h3 className="m-1 text-slate-500 text-xs font-medium tracking-wide uppercase">{title}</h3>
                {header}
            </div>
            <div className={twMerge("w-full h-full p-4 pt-0", className)} ref={ref}>
                {children}
            </div>
        </div>
    );
});

export default PanelLayout;