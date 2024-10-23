import fs from "fs";
import readline from "readline";
import matter from "gray-matter";
import { ServerResult } from "../_src/models/ServerResult.interface";
import { FileNode } from "../_src/models/FileNode.interface";

export async function GET() {
    try {
        const tree = await getTree("./public/exercises");

        return Response.json({ status: 0, data: tree } as ServerResult<FileNode[]>);
    }
    catch (err) {
        console.error(err);
        return Response.json({ status: -1 } as ServerResult<FileNode[]>);
    }
}

function getTree(path: string): Promise<FileNode[]> {
    const files = fs.readdirSync(path, { encoding: "utf-8" });

    return Promise.all(files.map(async f => {
        const info = fs.statSync(`${path}/${f}`);

        if (info.isDirectory())
            return { id: "", name: f, type: "directory", files: await getTree(`${path}/${f}`) } as FileNode;
        else
            return { id: f.substring(0, f.lastIndexOf(".")), name: await readExercName(`${path}/${f}`), type: "file", files: [] } as FileNode;
    }));
}

async function readExercName(path: string) {
    const stream = fs.createReadStream(path);
    const reader = readline.createInterface({ input: stream });

    return new Promise<string>(resolve => {
        let lines = "", start = false;

        reader.on("line", line => {
            if (line != "---" || line == "---" && !start) {
                start = true;
                lines += line + "\n";
            }
            else {
                lines += "---";

                reader.close();
                stream.close();
                reader.removeAllListeners("line");
                resolve(matter(lines).data.name);
            }
        });
    });
}