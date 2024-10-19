"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { getPanelElement, ImperativePanelHandle, Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Editor, { useMonaco } from "@monaco-editor/react";
import PanelLayout from "@/app/_src/components/PanelLayout";
import Icon from "./_src/components/Icon";
import TreeView from "@/app/_src/components/TreeView";
import Button from "@/app/_src/components/Button";
import LoadSpinner from "./_src/components/LoadSpinner";
import { defineGalaxy } from "./_src/models/defineGalaxy.function";
import type { ServerResult } from "./_src/models/ServerResult.interface";
import type { EngineRoute } from "./engine/route";
import type { FileNode } from "./_src/models/FileNode.interface";
import type { Exercise } from "./_src/models/Exercise.interface";

const defaultCode = `console.log("Hello world");`;

export default function Home() {
    const [logs, setLogs] = useState<string[]>([]);
    const [tree, setTree] = useState<FileNode[]>([]);
    const [showExercise, setShowExercise] = useState(false);
    const [exercise, setExercise] = useState<Exercise>();
    const [consoleColapsed, setConsoleColapsed] = useState(false);
    const [isRunning, setIsRunning] = useState(false);

    const consoleIsResizing = useRef(false);
    const consolePanel = useRef<ImperativePanelHandle>(null);
    const consolePanelHtml = useRef<HTMLElement | null>(null);
    const monaco = useMonaco();

    async function executeCode() {
        setIsRunning(true);

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

        setIsRunning(false);
    }

    async function openExercise(id: string) {
        if (monaco!.editor.getModels()[0].getValue() != defaultCode) {
            console.log("Will return")
        }

        setShowExercise(true);

        const exec = await (await fetch("/exercise/" + id)).json() as ServerResult<Exercise>;

        if (exec.status === 0) {
            setExercise(exec.data);
        }
    }

    function onConsoleResize() {
        if (consoleIsResizing.current) {
            if (consolePanelHtml.current!.clientHeight <= 48)
                setConsoleColapsed(true);
            else
                setConsoleColapsed(false);
        }
    }

    useEffect(() => {
        consolePanelHtml.current = getPanelElement("consolePanel");

        (async () => {
            const exTree = await (await fetch("/exercise")).json() as ServerResult<FileNode[]>;

            if (exTree.status === 0)
                setTree(exTree.data!);
        })();
    }, []);

    useEffect(() => {
        if (consoleColapsed)
            consolePanel.current?.resize(0);
        else
            consolePanel.current?.resize(25);
    }, [consoleColapsed]);

    useEffect(() => {
        if (monaco) {
            defineGalaxy(monaco);
            monaco.editor.setTheme("galaxy");
        }
    }, [monaco]);

    return (
        <Suspense fallback={<LoadSpinner />}>
            <PanelGroup autoSaveId="rootLayout" direction="horizontal">
                <Panel className="min-w-48 min-h-12" defaultSize={70}>
                    <PanelGroup autoSaveId="editorLayout" direction="vertical">
                        <Panel className="min-w-48 min-h-12" defaultSize={75}>
                            <PanelLayout title="Editor" signatureIcon="save">
                                <Editor
                                    defaultValue={defaultCode}
                                    defaultLanguage="typescript"
                                    theme="galaxy"
                                    options={{ "bracketPairColorization.enabled": false, minimap: { enabled: false } } as any}
                                    loading={<LoadSpinner />}
                                />
                            </PanelLayout>
                        </Panel>
                        <PanelResizeHandle className="h-px bg-slate-700" onDragging={state => consoleIsResizing.current = state} />
                        <Panel id="consolePanel" className="min-w-48 min-h-12" defaultSize={25} ref={consolePanel} onResize={onConsoleResize}>
                            <PanelLayout title="Console" signatureIcon={!consoleColapsed ? "chevron-down" : "chevron-up"} onClick={() => setConsoleColapsed(!consoleColapsed)}>
                                {logs.map(l => <p className="text-sm font-mono">{l}</p>)}
                            </PanelLayout>
                        </Panel>
                    </PanelGroup>
                </Panel>
                <PanelResizeHandle className="w-px bg-slate-700" />
                <Panel className="min-w-48 min-h-12" defaultSize={30}>
                    <PanelGroup autoSaveId="explorerLayout" direction="vertical">
                        <Panel className="min-w-48 min-h-12" defaultSize={85}>
                            {!showExercise ? (
                                <PanelLayout title="Explorer">
                                    {tree.length == 0 ? (
                                        <LoadSpinner />
                                    ) : (
                                        <div className="h-full mb-10 overflow-y-scroll">
                                            <TreeView className="px-2" tree={tree} onClick={openExercise} />
                                        </div>
                                    )}
                                </PanelLayout>
                            ) : (
                                <PanelLayout title="Exercise" signatureIcon="home" onClick={() => setShowExercise(false)}>
                                    {exercise == null ? (
                                        <LoadSpinner />
                                    ) : (
                                        <div className="h-full p-2 space-y-6">
                                            <h1 className="text-xl font-semibold">{exercise.name}</h1>
                                            <div className="markdown" dangerouslySetInnerHTML={{ __html: exercise.content }} />
                                        </div>
                                    )}
                                </PanelLayout>
                            )}
                        </Panel>
                        <PanelResizeHandle className="h-px bg-slate-700" />
                        <Panel className="min-w-48 min-h-12" defaultSize={15}>
                            <PanelLayout title="Run & Deploy" className="flex flex-col justify-center items-center">
                                <Button className="w-full py-3 text-lg space-x-2" disabled={isRunning} onClick={executeCode}>
                                    {!isRunning ? (
                                        <>
                                            <Icon className="w-6 h-6" icon="rocket" />
                                            <span>Run code</span>
                                        </>
                                    ) : (
                                        <LoadSpinner className="h-7 text-slate-950" />
                                    )}
                                </Button>
                            </PanelLayout>
                        </Panel>
                    </PanelGroup>
                </Panel>
            </PanelGroup>
        </Suspense>
    );
}