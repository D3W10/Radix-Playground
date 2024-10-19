import { Icon } from "@iconify/react/dist/iconify.js";

export default function LoadSpinner() {
    return (
        <div className="h-full flex justify-center items-center">
            <Icon className="w-14 h-auto text-emerald-500" icon="svg-spinners:3-dots-move" />
        </div>
    );
}