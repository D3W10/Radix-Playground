export interface FileNode {
    id: string;
    name: string;
    type: "file" | "directory"
    files: this[];
}