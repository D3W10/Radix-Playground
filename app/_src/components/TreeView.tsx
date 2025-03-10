import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Icon from "./Icon";
import { FileNode } from "../models/FileNode.interface";

const COLAPSED_DEFAULT = true;

interface TreeViewProps {
    className?: string;
    tree: FileNode[];
    completed?: string[];
    colapsedNodes?: Record<string, boolean>;
    onClick?: (id: string) => unknown;
    onNodeColapse?: (id: string, isColapsed: boolean) => unknown;
}

export default function TreeView({ className, tree, completed = [], colapsedNodes = {}, onClick, onNodeColapse }: TreeViewProps) {
    function TreeNode({ className, dirClassName, node, isColapsed }: { className?: string, dirClassName?: string, node: FileNode, isColapsed: boolean }) {
        const [colapsed, setColapsed] = useState(isColapsed);

        return node.type === "directory" ? (
            <div className={twMerge("space-y-0.5", className)}>
                <button className={twMerge("w-full p-2 flex items-center relative text-slate-300 hover:bg-slate-900 rounded text-sm space-x-2", dirClassName)} onClick={() => { setColapsed(!colapsed); if (onNodeColapse) onNodeColapse(node.id, !colapsed); }}>
                    <Icon className="w-5 h-5" icon={colapsed ? "folder" : "folder-open"} />
                    <p>{node.name.substring(node.name.indexOf("-") + 1)}</p>
                </button>
                {!colapsed && (
                    <div className="ml-4 pl-2 border-l border-slate-800">{node.files.map(f => <TreeNode node={f} key={f.id} isColapsed={colapsedNodes[`dr-${f.id}`] ?? COLAPSED_DEFAULT} dirClassName="before:w-2 before:h-px before:block before:absolute before:-left-2 before:bg-slate-800" />)}</div>
                )}
            </div>
        ) : (
            <button className={twMerge(`w-full p-2 flex items-center ${!completed.includes(node.id) ? "text-slate-500 hover:bg-slate-900" : "text-emerald-600 hover:bg-emerald-500/10"} rounded text-sm space-x-2`, className)} onClick={() => onClick!(node.id)}>
                <Icon className="w-5 h-5" icon={!completed.includes(node.id) ? "square" : "square-checked"} />
                <p>{node.name}</p>
            </button>
        );
    }

    const nodeSort = (nodes: FileNode[]): FileNode[] => nodes
        .map(n => n.type === "directory" && n.files.length > 0 ? { ...n, files: nodeSort(n.files) } : n)
        .sort((a, b) => {
            if (a.type !== b.type)
                return a.type === "file" ? -1 : 1;

            return a.id.localeCompare(b.id);
        });

    return (
        <div className={twMerge("space-y-0.5", className)}>
            {nodeSort(tree).map(f => <TreeNode node={f} key={f.id} isColapsed={colapsedNodes[`dr-${f.id}`] ?? COLAPSED_DEFAULT} />)}
        </div>
    );
}