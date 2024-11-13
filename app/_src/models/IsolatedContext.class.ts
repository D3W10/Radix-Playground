import ivm from "isolated-vm";

export class IsolatedContext {
    private memoryLimit: number;
    private timeout: number;
    private logs: string;

    constructor(memoryLimit = 128, timeout = 5000) {
        this.memoryLimit = memoryLimit;
        this.timeout = timeout;
        this.logs = "";
    }

    async runCode(code: string) {
        const isolate = new ivm.Isolate({ memoryLimit: this.memoryLimit });
        const context = await isolate.createContext();
        const jail = context.global;

        const logCallback = new ivm.Reference((...logs: string[]) => this.logs += logs.join(""));
        this.logs = "";

        await jail.set("_log", logCallback);
        await context.eval(`
            const flatToString = arg => {
                if (typeof arg !== "object") {
                    const surround = typeof arg === "string" ? '"' : '';
                    return surround + arg.toString() + surround;
                }
                else if (typeof arg === "undefined")
                    return "undefined";
                else if (Array.isArray(arg))
                    return "[" + arg.map(a => flatToString(a)).join(", ") + "]";
                else
                    return JSON.stringify(arg, null, 4);
            };

            const console = {
                log: function(...args) {
                    _log.apply(null, args.map(arg => flatToString(arg) + "\\n"));
                }
            };
        `);

        try {
            await context.eval("\"use strict\";" + code, { timeout: this.timeout });

            return {
                success: true,
                result: this.logs.trim()
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