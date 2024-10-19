import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { ServerResult } from "@/app/_src/models/ServerResult.interface";
import { Exercise } from "@/app/_src/models/Exercise.interface";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
    try {
        const fileContent = findAndReadFile("./public/exercises/", params.id + ".md");

        if (fileContent == null)
            return Response.json({ status: 1 } as ServerResult<Exercise>);

        return Response.json({ status: 0, data: await exerciseParser(fileContent) } as ServerResult<Exercise>);
    }
    catch (err) {
        console.error(err);
        return Response.json({ status: -1 } as ServerResult<Exercise>);
    }
}

function findAndReadFile(dir: string, filename: string): string | null {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
        const fullPath = dir + file.name;

        if (file.isDirectory()) {
            const result = findAndReadFile(fullPath + "/", filename);
            if (result)
                return result;

        }
        else if (file.isFile() && file.name === filename)
            return fs.readFileSync(fullPath, "utf-8");
    }

    return null;
}

async function exerciseParser(content: string): Promise<Exercise> {
    const matterResult = matter(content);
    const processedContent = await remark().use(html).process(matterResult.content);

    return {
        name: matterResult.data.name,
        description: matterResult.data.description,
        validators: matterResult.data.validators,
        content: processedContent.toString()
    };
}