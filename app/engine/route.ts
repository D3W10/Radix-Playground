import { exec } from "child_process";
import { ServerResult } from "../_src/models/ServerResult.interface";

interface Body {
    code?: string;
}

export interface EngineRoute {
    log: string;
    err: string;
}

export async function POST(req: Request) {
    try {
        const json = await req.json() as Body;
    
        if (!json.code)
            return Response.json({ status: 1 } as ServerResult<EngineRoute>);
    
        const res = await new Promise<ServerResult<EngineRoute>>(resolve => {
            exec(`node -e '${json.code}'`, (error, stdout) => {
                let err = "";
                if (error)
                    err = /^[A-Za-z]*Error: [\s\S]+$/gm.exec(error.message.trim())![0].replace(/(?<= {4}at \[eval\]:\d:\d)[\s\S]+(?=\n^$)/gm, "").replace(/\[eval\]/g, "root");

                resolve({ status: 0, data: { log: stdout.trim(), err } });
            });
        });
       
        return Response.json(res);
    }
    catch (err) {
        console.error(err);
        return Response.json({ status: -1 } as ServerResult<EngineRoute>);
    }
}