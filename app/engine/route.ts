import { ServerResult } from "../_src/models/ServerResult.interface";
import { IsolatedContext } from "../_src/models/IsolatedContext.class";

interface Body {
    code?: string;
}

export type EngineRoute = string;

export async function POST(req: Request) {
    try {
        const json = await req.json() as Body;
    
        if (!json.code)
            return Response.json({ status: 1 } as ServerResult<EngineRoute>);

        const playground = new IsolatedContext();
        const vmRes = await playground.runCode(json.code);

        const res = { status: vmRes.success ? 0 : 1, data: vmRes.result };
       
        return Response.json(res);
    }
    catch (err) {
        console.error(err);
        return Response.json({ status: -1 } as ServerResult<EngineRoute>);
    }
}