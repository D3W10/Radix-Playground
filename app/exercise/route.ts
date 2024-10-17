import fs from "fs";
import readline from "readline";
import { ServerResult } from "../_src/models/ServerResult.interface";
import { FileNode } from "../_src/models/FileNode.interface";
import { Exercise } from "../_src/models/Exercise.interface";

export async function GET(req: Request) {
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
            return { name: f, files: await getTree(`${path}/${f}`) } as FileNode;
        else {
            const data = await readExMetadata(`${path}/${f}`);

            return { name: data.name, files: [] } as FileNode;
        }
    }));
}

async function readExMetadata(path: string) {
    const stream = fs.createReadStream(path);
    const reader = readline.createInterface({ input: stream });

    return new Promise<Exercise>(resolve => {
        reader.once("line", line => {
            reader.close();
            stream.close();
            resolve(JSON.parse(line));
        });
    });
}