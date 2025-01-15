import fs from "fs";
import path from "path";
import readline from "readline";
import matter from "gray-matter";
import { type ServerResult } from "../_src/models/ServerResult.interface";
import { type FileNode } from "../_src/models/FileNode.interface";

export type ExerciseRoute = { files: FileNode[], count: number };

export async function GET() {
    try {
        const tree = await getTree(path.resolve("./public", "exercises"));

        return Response.json({ status: 0, data: tree } as ServerResult<ExerciseRoute>);
    }
    catch (err) {
        console.error(err);
        return Response.json({ status: -1 } as ServerResult<FileNode[]>);
    }
}

async function getTree(path: string): Promise<ExerciseRoute> {
    const files = fs.readdirSync(path, { encoding: "utf-8" });

    const results = await Promise.all(files.map(async (f) => {
        const info = fs.statSync(`${path}/${f}`);

        if (info.isDirectory()) {
            const subTree = await getTree(`${path}/${f}`);
            return {
                node: { id: encodeURI(f), name: f, type: "directory", files: subTree.files } as FileNode,
                count: subTree.count
            };
        } else {
            return {
                node: { id: f.substring(0, f.lastIndexOf(".")), name: await readExercName(`${path}/${f}`), type: "file", files: [] } as FileNode,
                count: 1
            };
        }
    }));

    return {
        files: results.map(r => r.node),
        count: results.reduce((sum, r) => sum + r.count, 0)
    };
}

async function readExercName(path: string) {
    const stream = fs.createReadStream(path);
    const reader = readline.createInterface({ input: stream });

    return new Promise<string>(resolve => {
        let lines = "", start = false, finish = false;

        reader.on("line", line => {
            if (line != "---" || line == "---" && !start) {
                start = true;
                lines += line + "\n";
            }
            else {
                lines += "---";
                finish = true;

                reader.close();
                stream.close();
                reader.removeAllListeners("line");
                resolve(matter(lines).data.name);
            }
        });

        reader.on("close", () => {
            if (!finish)
                resolve("<empty>");
        });
    });
}