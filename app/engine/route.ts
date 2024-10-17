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
    
        const res = await new Promise<ServerResult<EngineRoute>>((resolve, reject) => {
            console.log(json.code)
            exec(`node -e '${json.code}'`, (error, stdout, stderr) => {
                if (error)
                    reject(error);
                else
                    resolve({ status: 0, data: { log: stdout, err: stderr } });
            });
        });
       
        return Response.json(res);
    }
    catch (err) {
        console.error(err);
        return Response.json({ status: -1 } as ServerResult<EngineRoute>);
    }
}