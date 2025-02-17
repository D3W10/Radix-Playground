import { FileNode } from "./models/FileNode.interface";

export interface ExStore {
    completed: boolean;
    content: string;
}

export function cleanInvalidStorageEntries(storage: Storage, tree: FileNode[]) {
    const exEntries: Record<string, ExStore> = {};
    const drEntries: Record<string, boolean> = {};

    const allFiles = getAllFiles(tree);
    const allFolders = getAllFolders(tree);

    Object.keys(storage).forEach(k => {
        if (k.startsWith("ex-")) {
            if (allFiles.findIndex(f => f.id === k.substring(3)) != -1)
                exEntries[k] = JSON.parse(storage[k as keyof Storage]);
            else
                storage.removeItem(k);
        }
        else if (k.startsWith("dr-")) {
            if (allFolders.findIndex(f => f.id === k.substring(3)) != -1)
                drEntries[k] = storage[k] === "true";
            else
                storage.removeItem(k);
        }
    });

    return [exEntries, drEntries] as [typeof exEntries, typeof drEntries];
}

function getAllFiles(data: FileNode[]) {
    const allFiles: FileNode[] = [];

    function traverse(item: FileNode) {
        if (item.type == "directory")
            item.files.forEach(traverse);
        else
            allFiles.push(item);
    }

    data.forEach(traverse);

    return allFiles;
}

function getAllFolders(data: FileNode[]) {
    const allFolders: FileNode[] = [];

    function traverse(item: FileNode) {
        if (item.type == "directory") {
            allFolders.push(item);

            item.files.forEach(traverse);
        }
    }

    data.forEach(traverse);

    return allFolders;
}

export function indentObject(objStr: string, level = 0): string {
    const indent = "    ".repeat(level);
    const trimmed = objStr.trim();

    if (trimmed === "null" || trimmed === "undefined" || trimmed === "{}" || trimmed === "[]" ||!trimmed.match(/^[{\[]/))
        return trimmed;

    if (trimmed.startsWith("[")) {
        let depth = 0, complex = false, current = "", inQuotes = false;
        const inner = trimmed.slice(1, -1).trim();
        const items: string[] = [];

        for (let char of inner) {
            current += char;

            if (char === "[" || char === "{") {
                depth++;
                complex = true;
            }
            else if (char === "]" || char === "}") {
                depth--;
                complex = true;
            }
            else if (char === '"' && depth === 0)
                inQuotes = !inQuotes;
            else if (char === "," && depth === 0 && !inQuotes) {
                current = current.slice(0, -1);
                items.push(current.trim());
                current = "";
            }
        }
        if (current.trim())
            items.push(current.trim());

        if (!complex)
            return `[${items.join(", ")}]`;

        const formattedItems = items
            .map(item => `${indent}    ${indentObject(item, level + 1)}`)
            .join(",\n");

        return `[\n${formattedItems}\n${indent}]`;
    }
    else if (trimmed.startsWith("{")) {
        let depth = 0, current = ["", ""], inQuotes = false, valueTime = false;
        const inner = trimmed.slice(1, -1).trim();
        const properties: [string, string][] = [];

        for (let char of inner) {
            current[!valueTime ? 0 : 1] += char;

            if (char === "{" || char === "[")
                depth++;
            else if (char === "}" || char === "]")
                depth--;
            else if (char === '"' && depth === 0)
                inQuotes = !inQuotes;
            else if (char === ":" && depth === 0 && !inQuotes) {
                current[0] = current[0].trim().slice(1, -2);
                valueTime = true;
            }
            else if (char === "," && depth === 0 && !inQuotes && valueTime) {
                properties.push([current[0].trim(), current[1].trim().slice(0, -1)]);
                current = ["", ""];
                valueTime = false;
            }
        }
        if (current[0].trim())
            properties.push([current[0].trim(), current[1].trim()]);

        const formattedProps = properties
            .map(prop => {
                const noQuotes = /^[a-zA-Z$_][a-zA-Z0-9$_]*$/.test(prop[0]);

                return `${indent}    ${noQuotes ? prop[0] : '"' + prop[0] + '"'}: ${indentObject(prop[1], level + 1)}`;
            })
            .join(",\n");

        return `{\n${formattedProps}\n${indent}}`;
    }

    return objStr;
}