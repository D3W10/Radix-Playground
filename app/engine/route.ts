import ts from "typescript";
import { ServerResult } from "../_src/models/ServerResult.interface";
import { IsolatedContext, LogEntry } from "../_src/models/IsolatedContext.class";

interface Body {
    code?: string;
    typescript?: boolean;
}

export type EngineRoute = LogEntry[][];

export async function POST(req: Request) {
    try {
        const json = await req.json() as Body;
    
        if (!json.code)
            return Response.json({ status: 1 } as ServerResult<EngineRoute>);

        json.typescript = json.typescript ?? false;

        const playground = new IsolatedContext();
        const vmRes = await playground.runCode(!json.typescript ? json.code : tsCompile(json.code));

        const res = { status: vmRes.success ? 0 : 1, data: vmRes.result };
       
        return Response.json(res);
    }
    catch (err) {
        console.error(err);
        return Response.json({ status: -1 } as ServerResult<EngineRoute>);
    }
}

function tsCompile(source: string, options?: ts.TranspileOptions): string {
    options = options ?? {
        compilerOptions: {
            target: ts.ScriptTarget.ESNext,
            module: ts.ModuleKind.ESNext,
            strict: true,
            esModuleInterop: true,
            resolveJsonModule: true,
            isolatedModules: true
        }
    };

    return ts.transpileModule(source, options).outputText;
}