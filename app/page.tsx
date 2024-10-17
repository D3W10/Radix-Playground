"use client";

import { useEffect, useRef, useState } from "react";
import { getPanelElement, ImperativePanelHandle, Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import PanelLayout from "@/app/_src/components/PanelLayout";
import TreeView from "@/app/_src/components/TreeView";
import Button from "@/app/_src/components/Button";
import type { ServerResult } from "./_src/models/ServerResult.interface";
import type { EngineRoute } from "./engine/route";
import type { FileNode } from "./_src/models/FileNode.interface";

export default function Home() {
    const [logs, setLogs] = useState<string[]>([]);
    const [tree, setTree] = useState<FileNode[]>([]);
    const [consoleColapsed, setConsoleColapsed] = useState(false);
    const consolePanel = useRef<ImperativePanelHandle>(null);
    const consolePanelHtml = useRef<HTMLElement | null>(null);
    const monaco = useMonaco();

    async function executeCode() {
        try {
            const execResult = await (await fetch("/engine", {
                method: "POST",
                body: JSON.stringify({ code: monaco!.editor.getModels()[0].getValue() })
            })).json() as ServerResult<EngineRoute>;

            if (execResult.status === 0)
                setLogs(execResult.data!.log.split("\n"));
        }
        catch (err) {
            console.error(err);
        }
    }

    function onConsoleResize() {
        setConsoleColapsed(consolePanelHtml.current?.clientHeight == 48);
    }

    function onConsoleColapse() {
        if (!consoleColapsed)
            consolePanel.current?.resize(0);
        else
            consolePanel.current?.resize(25);

        setConsoleColapsed(!consoleColapsed);
    }

    useEffect(() => {
        consolePanelHtml.current = getPanelElement("consolePanel");

        (async () => {
            const exTree = await (await fetch("/exercise")).json() as ServerResult<FileNode[]>;

            if (exTree.status === 0)
                setTree(exTree.data!);
        })()
    }, []);

    useEffect(() => {
        if (monaco) {
            monaco.editor.defineTheme("galaxy", {
                base: "vs-dark",
                inherit: true,
                rules: [
                    { token: "comment", foreground: "5C7884" },
                    { token: "keyword", foreground: "CC80FF" },
                    { token: "string", foreground: "C8FF75" },
                    { token: "number", foreground: "FF8A66" },
                    { token: "operator", foreground: "8ADEFF" },
                    { token: "delimiter", foreground: "8ADEFF" },
                    { token: "identifier", foreground: "FF6169" },
                    { token: "function", foreground: "80A8FF" },
                    { token: "javascript", foreground: "FF6169" },
                    { token: "type", foreground: "FFBF47" }
                ],
                colors: {
                    "editor.background": "#020617",
                    "editor.foreground": "#f8fafc",
                    "editorCursor.foreground": "#ffffff",
                    "editor.lineHighlightBackground": "#0f172a",
                    "editorLineNumber.foreground": "#475569",
                    "editor.selectionBackground": "#334155",
                    "editor.inactiveSelectionBackground": "#1e293b"
                }
            });
            monaco.editor.setTheme("galaxy");
        }
    }, [monaco]);

    return (
        <PanelGroup autoSaveId="rootLayout" direction="horizontal">
            <Panel className="min-w-48 min-h-12" defaultSize={70}>
                <PanelGroup autoSaveId="editorLayout" direction="vertical">
                    <Panel className="min-w-48 min-h-12" defaultSize={75}>
                        <PanelLayout title="Editor" signatureIcon="fluent:save-24-regular">
                            <Editor
                                defaultValue={"console.log(\"Hello world\");"}
                                defaultLanguage="typescript"
                                theme="galaxy"
                                options={{ "bracketPairColorization.enabled": false, minimap: { enabled: false } } as any}
                                loading={<Icon className="w-14 h-auto text-emerald-500" icon="svg-spinners:3-dots-move" />}
                            />
                        </PanelLayout>
                    </Panel>
                    <PanelResizeHandle className="h-px bg-slate-700" />
                    <Panel id="consolePanel" className="min-w-48 min-h-12" defaultSize={25} ref={consolePanel} onResize={onConsoleResize}>
                        <PanelLayout title="Console" signatureIcon={!consoleColapsed ? "fluent:chevron-down-24-filled" : "fluent:chevron-up-24-filled"} onClick={onConsoleColapse}>
                            {logs.map(l => <p className="text-sm font-mono">{l}</p>)}
                        </PanelLayout>
                    </Panel>
                </PanelGroup>
            </Panel>
            <PanelResizeHandle className="w-px bg-slate-700" />
            <Panel className="min-w-48 min-h-12" defaultSize={30}>
                <PanelGroup autoSaveId="explorerLayout" direction="vertical">
                    <Panel className="min-w-48 min-h-12" defaultSize={85}>
                        <PanelLayout title="Explorer" signatureIcon="fluent:home-24-regular">
                            <TreeView className="px-2" tree={tree} />
                        </PanelLayout>
                    </Panel>
                    <PanelResizeHandle className="h-px bg-slate-700" />
                    <Panel className="min-w-48 min-h-12" defaultSize={15}>
                        <PanelLayout title="Run & Deploy" className="flex flex-col justify-center items-center">
                            <Button className="w-full py-3 text-lg space-x-2" onClick={executeCode}>
                                <Icon className="w-6 h-6" icon="fluent:rocket-24-regular" />
                                <span>Run code</span>
                            </Button>
                        </PanelLayout>
                    </Panel>
                </PanelGroup>
            </Panel>
        </PanelGroup>
    );
}