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

        const logCallback = new ivm.Reference((...args: any[]) => this.logs += args.toString() + "\n");
        this.logs = "";

        await jail.set("_log", logCallback);
        await context.eval(`
            const console = {
                log: function(...args) {
                    _log.apply(null, args);
                }
            };
        `);

        try {
            await context.eval(code, { timeout: this.timeout });

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