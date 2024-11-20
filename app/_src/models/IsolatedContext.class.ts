import ivm from "isolated-vm";

export type LogEntry = [string, "string" | "number" | "boolean" | "undefined" | "object"];

export class IsolatedContext {
    private memoryLimit: number;
    private timeout: number;
    private logs: LogEntry[][];

    constructor(memoryLimit = 128, timeout = 5000) {
        this.memoryLimit = memoryLimit;
        this.timeout = timeout;
        this.logs = [];
    }

    async runCode(code: string) {
        const isolate = new ivm.Isolate({ memoryLimit: this.memoryLimit });
        const context = await isolate.createContext();
        const jail = context.global;

        const logCallback = new ivm.Reference((serializedLogs: string) => this.logs.push(JSON.parse(serializedLogs).logs as LogEntry[]));
        this.logs = [];

        await jail.set("_log", logCallback);
        await context.eval(`
            const flatToTuple = (arg, rec = false) => {
                if (typeof arg === "string" || typeof arg === "number" || typeof arg === "boolean")
                    return !rec ? [arg.toString(), typeof arg] : typeof arg === "string" ? '"' + arg + '"' : arg.toString();
                else if (typeof arg === "undefined")
                    return !rec ? ["undefined", "undefined"] : "undefined";
                else if (Array.isArray(arg))
                    return !rec ? ["[" + arg.map(a => flatToTuple(a, true)).join(", ") + "]", "object"] : "[" + arg.map(a => flatToTuple(a, true)).join(", ") + "]";
                else
                    return !rec ? [JSON.stringify(arg), "object"] : JSON.stringify(arg);
            };

            const console = {
                log: function(...args) {
                    _log.apply(null, [JSON.stringify({ logs: args.map(arg => flatToTuple(arg)) })]);
                }
            };
        `);

        try {
            await context.eval("\"use strict\";" + code, { timeout: this.timeout });

            return {
                success: true,
                result: this.logs
            };
        }
        catch (error) {
            const msg = (error instanceof Error ? error.stack ? error.stack : error.message : "Unknown error").replace(/(?<=\s{4}at \(<isolated-vm boundary>\))[\s\S]+/g, "").replace(/isolated-vm/g, "root");

            return {
                success: false,
                result: msg
            };
        }
        finally {
            logCallback.release();
            context.release();
            isolate.dispose();
        }
    }
}