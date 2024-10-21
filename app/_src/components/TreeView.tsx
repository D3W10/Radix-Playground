import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Icon from "./Icon";
import { FileNode } from "../models/FileNode.interface";

interface TreeViewProps {
    className?: string;
    tree: FileNode[];
    completed?: string[];
    onClick?: (id: string) => unknown;
}

export default function TreeView({ className, tree, completed = [], onClick }: TreeViewProps) {
    function TreeNode({ className, dirClassName, node }: { className?: string, dirClassName?: string, node: FileNode }) {
        const [colapsed, setColapsed] = useState(true);

        return node.files.length > 0 ? (
            <div className={twMerge("space-y-0.5", className)}>
                <button className={twMerge("w-full p-2 flex items-center relative text-slate-300 hover:bg-slate-900 rounded text-sm space-x-2", dirClassName)} onClick={() => setColapsed(!colapsed)}>
                    <Icon className="w-5 h-5" icon={colapsed ? "folder" : "folder-open"} />
                    <p>{node.name.substring(node.name.indexOf("-") + 1)}</p>
                </button>
                {!colapsed && (
                    <div className="ml-4 pl-2 border-l border-slate-800">{node.files.map(f => <TreeNode node={f} key={f.id || f.name} dirClassName="before:w-2 before:h-px before:block before:absolute before:-left-2 before:bg-slate-800" />)}</div>
                )}
            </div>
        ) : (
            <button className={twMerge(`w-full p-2 flex items-center ${!completed.includes(node.id) ? "text-slate-500 hover:bg-slate-900" : "text-emerald-600 hover:bg-emerald-500/10"} rounded text-sm space-x-2`, className)} onClick={() => onClick!(node.id)}>
                <Icon className="w-5 h-5" icon={!completed.includes(node.id) ? "square" : "square-checked"} />
                <p>{node.name}</p>
            </button>
        );
    }

    return (
        <div className={twMerge("space-y-0.5", className)}>
            {tree.map(f => <TreeNode node={f} key={f.id || f.name} />)}
        </div>
    );
}