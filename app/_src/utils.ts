import { FileNode } from "./models/FileNode.interface";

export interface ExStore {
    completed: boolean;
    content: string;
}

export function cleanInvalidStorageEntries(storage: Storage, tree: FileNode[]) {
    const allFiles = getAllFiles(tree);

    return Object.keys(localStorage).filter(k => k.startsWith("ex-")).reduce((p, k) => {
        if (allFiles.findIndex(f => f.id == k.substring(3)) != -1) {
            p[k] = JSON.parse(localStorage[k as keyof typeof localStorage]);
            return p;
        }
        else {
            localStorage.removeItem(k);
            return p;
        }
    }, {} as Record<string, ExStore>);
}

function getAllFiles(data: FileNode[]) {
    let allFiles: FileNode[] = [];

    function traverse(item: FileNode) {
        if (item.files.length > 0) {
            item.files.forEach(file => {
                if (file.files.length == 0)
                    allFiles.push(file);
                traverse(file);
            });
        }
    }

    data.forEach(item => traverse(item));

    return allFiles;
}