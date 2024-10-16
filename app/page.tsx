"use client";

import { useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import PanelLayout from "@/src/components/PanelLayout";
import TreeView from "@/src/components/TreeView";
import Button from "@/src/components/Button";
import type { ExecResult } from "@/src/models/ExecResult.interface";

export default function Home() {
    const [logs, setLogs] = useState<string[]>([]);
    const monaco = useMonaco();

    async function executeCode() {
        try {
            const execResult = await (await fetch("/engine", {
                method: "POST",
                body: JSON.stringify({ code: monaco!.editor.getModels()[0].getValue() })
            })).json() as ExecResult;

            if (execResult.status === 0)
                setLogs(execResult.log.split("\n"));
        }
        catch (err) {
            console.error(err);
        }
    }

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
                    <Panel className="min-w-48 min-h-12">
                        <PanelLayout className="w-full h-full" title="Editor" signatureIcon="fluent:save-24-regular">
                            <Editor
                                defaultValue={"console.log(\"Hello world\");"}
                                defaultLanguage="typescript"
                                theme="galaxy"
                                options={{ "bracketPairColorization.enabled": false, minimap: { enabled: false } } as any}
                                loading={<p className="font-semibold animate-pulse">Loading...</p>}
                            />
                        </PanelLayout>
                    </Panel>
                    <PanelResizeHandle className="h-px bg-slate-700" />
                    <Panel className="min-w-48 min-h-12" defaultSize={25}>
                        <PanelLayout title="Console" signatureIcon="fluent:minimize-24-filled">{logs}</PanelLayout>
                    </Panel>
                </PanelGroup>
            </Panel>
            <PanelResizeHandle className="w-px bg-slate-700" />
            <Panel className="min-w-48 min-h-12">
            <PanelGroup autoSaveId="explorerLayout" direction="vertical">
                    <Panel className="min-w-48 min-h-12">
                        <PanelLayout title="Explorer">
                            <TreeView></TreeView>
                        </PanelLayout>
                    </Panel>
                    <PanelResizeHandle className="h-px bg-slate-700" />
                    <Panel className="min-w-48 min-h-12" defaultSize={20}>
                        <PanelLayout title="Run & Deploy">
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