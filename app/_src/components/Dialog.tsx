import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "./Button";

interface DialogProps {
    className?: string;
}

export interface DialogMethods {
    openModal: (data?: DialogData) => Promise<boolean>;
}

interface DialogData {
    title?: string;
    message?: string;
    children?: React.ReactNode;
    button?: string;
    canCancel?: boolean;
    secondaryButton?: string;
}

const Dialog = forwardRef<DialogMethods, DialogProps>(({ className }, ref) => {
    const [isOpen, setOpen] = useState(false);
    const [data, setData] = useState<DialogData>();
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const closeRef = useRef<(value: boolean) => unknown>();

    useImperativeHandle(ref, () => ({
        openModal: (data?: DialogData) => {
            return new Promise<boolean>(resolve => {
                modalRef.current?.showModal();
                setData(data);
                setOpen(true);
                closeRef.current = resolve;
            });
        }
    }));

    function closeModal(value: boolean) {
        closeRef.current!(value);
        setOpen(false);

        setTimeout(() => {
            modalRef.current?.close();
            setData(undefined);
        }, 300);
    }

    return (
        <dialog className={twMerge(`w-128 p-8 text-inherit bg-slate-900 border-1.5 border-slate-700 rounded-xl shadow-md ${!isOpen ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0"} transition duration-300 ${isOpen ? "ease-out" : "ease-in"} backdrop:bg-slate-950/50 ${!isOpen ? "backdrop:opacity-0" : "backdrop:opacity-100"} backdrop:transition-opacity backdrop:duration-300 ${isOpen ? "backdrop:ease-out" : "backdrop:ease-in"}`, className)} ref={modalRef}>
            {data?.title && <h1 className="mb-2 text-2xl font-bold">{data?.title}</h1>}
            {data?.message && <p>{data.message}</p>}
            {data?.children}
            <div className="mt-8 flex justify-end space-x-4">
                {data?.canCancel && <Button className="w-20" secondary onClick={() => closeModal(false)}>{data.secondaryButton || "No"}</Button>}
                <Button className="w-20" onClick={() => closeModal(true)}>{data?.button || "Yes"}</Button>
            </div>
        </dialog>
    );
});

export default Dialog;