import { exec } from "child_process";
import { ExecResult } from "@/src/models/ExecResult.interface";

interface Body {
    code?: string;
}

export async function POST(req: Request) {
    try {
        const json = await req.json() as Body;
    
        if (!json.code)
            return Response.json({ status: 1 } as ExecResult);
    
        const res = await new Promise<ExecResult>((resolve, reject) => {
            console.log(json.code)
            exec(`node -e '${json.code}'`, (error, stdout, stderr) => {
                if (error)
                    reject(error);
                else
                    resolve({ status: 0, log: stdout, err: stderr });
            });
        });
       
        return Response.json(res);
    }
    catch (err) {
        console.error(err);
        return Response.json({ status: -1 } as ExecResult);
    }
}