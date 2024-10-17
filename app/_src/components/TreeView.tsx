import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FileNode } from "../models/FileNode.interface";

interface TreeViewProps {
    className?: string;
    tree: FileNode[];
}

export default function TreeView({ className, tree }: TreeViewProps) {
    function TreeNode({ className, dirClassName, node }: { className?: string, dirClassName?: string, node: FileNode }) {
        return node.files.length > 0 ? (
            <div className={className}>
                <div className={twMerge("p-1 flex items-center relative text-slate-300 space-x-2", dirClassName)}>
                    <Icon className="w-5 h-5" icon="fluent:folder-open-24-regular" />
                    <p>{node.name}</p>
                </div>
                {node.files.map(f => <TreeNode node={f} className="ml-3 pl-4 border-l border-slate-800" dirClassName="before:w-4 before:h-px before:block before:absolute before:-left-4 before:bg-slate-800" />)}
            </div>
        ) : (
            <div className={twMerge("p-1 flex items-center text-slate-500 space-x-2", className)}>
                <Icon className="w-5 h-5" icon="fluent:square-24-regular" />
                <p>{node.name}</p>
            </div>
        );
    }

    return (
        <div className={className}>
            {tree.map(f => <TreeNode node={f} />)}
        </div>
    );
}