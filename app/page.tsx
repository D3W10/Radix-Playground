"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { getPanelElement, ImperativePanelHandle, Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Editor, { DiffEditor, useMonaco } from "@monaco-editor/react";
import PanelLayout from "@/app/_src/components/PanelLayout";
import Icon from "./_src/components/Icon";
import TreeView from "@/app/_src/components/TreeView";
import Button from "@/app/_src/components/Button";
import LoadSpinner from "./_src/components/LoadSpinner";
import Dialog, { DialogMethods } from "./_src/components/Dialog";
import { defineGalaxy } from "./_src/models/defineGalaxy.function";
import { cleanInvalidStorageEntries, ExStore } from "./_src/utils";
import type { ServerResult } from "./_src/models/ServerResult.interface";
import type { EngineRoute } from "./engine/route";
import type { FileNode } from "./_src/models/FileNode.interface";
import type { Exercise } from "./_src/models/Exercise.interface";

const defaultCode = `console.log("Hello world");`;

export default function Home() {
    const [lStorage, setLStorage] = useState<Record<string, ExStore>>({});
    const [treeView, setTreeView] = useState<[FileNode[], string[]]>();
    const [showExercise, setShowExercise] = useState(false);
    const [exercise, setExercise] = useState<Exercise>();
    const [saveEnabled, setSaveEnabled] = useState(false);
    const [consoleColapsed, setConsoleColapsed] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [logs, setLogs] = useState<[boolean, string]>([false, ""]);
    const [runResult, setRunResult] = useState<0 | 1 | 2>();
    const [showDiff, setShowDiff] = useState(false);

    const consoleIsResizing = useRef(false);
    const consolePanel = useRef<ImperativePanelHandle>(null);
    const consolePanelHtml = useRef<HTMLElement | null>(null);
    const dialogRef = useRef<DialogMethods>(null);
    const monaco = useMonaco();

    async function executeCode() {
        setIsRunning(true);
        setConsoleColapsed(false);
        setRunResult(undefined);
        setSaveEnabled(false);

        try {
            const execResult = await (await fetch("/engine", {
                method: "POST",
                body: JSON.stringify({ code: monaco!.editor.getModels()[0].getValue() })
            })).json() as ServerResult<EngineRoute>;

            if (execResult.status === 0 && execResult.data) {
                let success = false;

                if (execResult.data.err.length == 0) {
                    setLogs([false, execResult.data.log]);

                    if (exercise)
                        success = validateResult(execResult.data) == 0;
                }
                else
                    setLogs([true, execResult.data.err]);

                if (exercise)
                    saveExercise(success);
            }
        }
        catch (err) {
            console.error(err);
        }

        setIsRunning(false);
    }

    function validateResult(data: EngineRoute) {
        let level: 0 | 1 | 2 = 0;
        const code = monaco!.editor.getModels()[0].getValue().replace(/\/\/.*|\/\*[\s\S]*?\*\//g, "");

        for (const validator of exercise!.validators) {
            if (validator.check === "output" && data.log.trim() !== validator.value)
                level = 2;
            else if (validator.check === "code" && validator.count && code.matchAll(new RegExp(validator.value, "g")).toArray().length < validator.count)
                level = level == 0 ? 1 : level;
        }

        setRunResult(level);
        return level;
    }

    function onConsoleResize() {
        if (consoleIsResizing.current) {
            if (consolePanelHtml.current!.clientHeight <= 48)
                setConsoleColapsed(true);
            else
                setConsoleColapsed(false);
        }
    }

    async function openExercise(id: string) {
        if (monaco!.editor.getModels()[0].getValue() != defaultCode) {
            const dialogResult = await dialogRef.current?.openModal({
                title: "Unsaved changes",
                message: "Your current unsaved code will be lost if you open this exercise. Are you sure you want to continue?",
                canCancel: true
            });

            if (!dialogResult)
                return;
        }

        monaco!.editor.getModels()[0].setValue(lStorage[`ex-` + id] && lStorage[`ex-` + id].content || defaultCode);
        setShowExercise(true);
        setSaveEnabled(false);

        const exec = await (await fetch("/exercise/" + id)).json() as ServerResult<Exercise>;
        if (exec.status === 0) {
            setExercise(exec.data);
        }
    }

    function saveExercise(completed = false) {
        if (exercise) {
            const newData: ExStore = { completed: completed, content: monaco!.editor.getModels()[0].getValue() };

            setSaveEnabled(false);

            setLStorage({ ...lStorage, [`ex-` + exercise.id]: newData });
            localStorage.setItem(`ex-` + exercise.id, JSON.stringify(newData));
        }
    }

    async function closeExercise() {
        if (exercise) {
            if (monaco!.editor.getModels()[0].getValue() !== lStorage[`ex-` + exercise.id].content) {
                const dialogResult = await dialogRef.current?.openModal({
                    title: "Unsaved changes",
                    message: "There are unsaved changes on your current exercise that will be lost upon closing. Are you sure you want to continue?",
                    canCancel: true
                });
    
                if (!dialogResult)
                    return;
            }

            setShowExercise(false);
            setExercise(undefined);
    
            monaco!.editor.getModels()[0].setValue(defaultCode);
        }
    }

    useEffect(() => {
        consolePanelHtml.current = getPanelElement("consolePanel");

        (async () => {
            const exTree = await (await fetch("/exercise")).json() as ServerResult<FileNode[]>;

            if (exTree.status === 0 && exTree.data !== undefined) {
                setTreeView([exTree.data, []]);

                const cleanStorage = cleanInvalidStorageEntries(localStorage, exTree.data);
                setLStorage(cleanStorage);
            }
        })();
    }, []);

    useEffect(() => {
        console.log(lStorage, treeView !== undefined);
        if (treeView !== undefined) {
            setTreeView([treeView[0], Object.keys(lStorage).filter(k => lStorage[k].completed).map(k => k.replace("ex-", ""))]);
        }
    }, [lStorage]);

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
                            <div className={`w-full h-full ${!showDiff ? "block" : "hidden"}`}>
                                <PanelLayout title="Editor" signatureIcon={exercise != undefined && saveEnabled ? "save" : undefined} onClick={() => saveExercise()}>
                                    <Editor
                                        defaultValue={defaultCode}
                                        defaultLanguage="typescript"
                                        theme="galaxy"
                                        options={{ "bracketPairColorization.enabled": false, minimap: { enabled: false } } as any}
                                        loading={<LoadSpinner />}
                                        onChange={() => setSaveEnabled(true)}
                                    />
                                </PanelLayout>
                            </div>
                            <div className={`w-full h-full ${showDiff ? "block" : "hidden"}`}>
                                <PanelLayout title="Diff" signatureIcon="return" onClick={() => setShowDiff(false)}>
                                    <DiffEditor
                                        original={exercise?.validators.find(v => v.check == "output")?.value}
                                        modified={logs[1]}
                                        theme="galaxy"
                                        options={{ "bracketPairColorization.enabled": false, minimap: { enabled: false }, readOnly: true } as any}
                                        loading={<LoadSpinner />}
                                    />
                                </PanelLayout>
                            </div>
                        </Panel>
                        <PanelResizeHandle className="h-px bg-slate-700" onDragging={state => consoleIsResizing.current = state} />
                        <Panel id="consolePanel" className="min-w-48 min-h-12" defaultSize={25} ref={consolePanel} onResize={onConsoleResize}>
                            <PanelLayout title="Console" className="w-auto mr-2 pr-2 flex justify-center items-center overflow-y-auto" signatureIcon={!consoleColapsed ? "chevron-down" : "chevron-up"} onClick={() => setConsoleColapsed(!consoleColapsed)}>
                                {!isRunning ?
                                    logs[1].length == 0 ? (
                                        <p className="text-sm text-slate-500">Nothing to see here</p>
                                    ) : ( 
                                        <div className={`w-full min-h-full px-4 ${logs[0] ? "text-red-400" : ""}`}>
                                            <pre className="text-sm font-mono">{logs[1]}</pre>
                                            {runResult != undefined && (
                                                <div className={`mt-12 mb-8 ${runResult == 0 ? "text-emerald-500" : runResult == 1 ? "text-yellow-500" : "text-red-500"} space-y-2`}>
                                                    <div className="flex items-center space-x-2">
                                                        <Icon className="w-5 h-5" icon={runResult == 0 ? "correct" : runResult == 1 ? "circle" : "wrong"} />
                                                        <p>{runResult == 0 ? "Output and requirements were met" : runResult == 1 ? "Correct output but some requirements were not met" : "Incorrect output"}</p>
                                                    </div>
                                                    {runResult == 2 && (
                                                        <button onClick={() => setShowDiff(true)}>
                                                            <p className="text-sm text-slate-500">Click here to compare the result</p>
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )
                                : (
                                    <LoadSpinner />
                                )}
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
                                    {treeView == undefined ? (
                                        <LoadSpinner />
                                    ) : (
                                        <div className={`h-full ${treeView[0].length == 0 ? "flex justify-center items-center" : ""} overflow-y-auto`}>
                                            {treeView[0].length == 0 ? (
                                                <p className="text-sm text-slate-500">Nothing to see here</p>
                                            ) : (
                                                <TreeView className="px-2" tree={treeView[0]} completed={treeView[1]} onClick={openExercise} />
                                            )}
                                        </div>
                                    )}
                                </PanelLayout>
                            ) : (
                                <PanelLayout title="Exercise" signatureIcon="home" onClick={closeExercise}>
                                    {exercise == undefined ? (
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
            <Dialog ref={dialogRef} />
        </Suspense>
    );
}