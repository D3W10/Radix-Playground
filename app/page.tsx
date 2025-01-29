"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { getPanelElement, ImperativePanelHandle, Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Editor, { DiffEditor, useMonaco } from "@monaco-editor/react";
import { minify_sync } from "terser";
import hljs from "highlight.js";
import PanelLayout from "@/app/_src/components/PanelLayout";
import Icon from "./_src/components/Icon";
import TreeView from "@/app/_src/components/TreeView";
import Button from "@/app/_src/components/Button";
import LoadSpinner from "./_src/components/LoadSpinner";
import IconButton from "./_src/components/IconButton";
import Dialog, { DialogMethods } from "./_src/components/Dialog";
import { defineGalaxy } from "./_src/models/defineGalaxy.function";
import { cleanInvalidStorageEntries, ExStore, indentObject } from "./_src/utils";
import type { ServerResult } from "./_src/models/ServerResult.interface";
import type { ExerciseRoute } from "./exercise/route";
import type { EngineRoute } from "./engine/route";
import type { FileNode } from "./_src/models/FileNode.interface";
import type { Exercise } from "./_src/models/Exercise.interface";
import type { LogEntry } from "./_src/models/IsolatedContext.class";

const defaultCode = `// ${(new Date()).toUTCString()}\n\nconsole.log("Hello world");`;

export default function Home() {
    const [lStorage, setLStorage] = useState<[Record<string, ExStore>, Record<string, boolean>]>([{}, {}]);
    const [treeView, setTreeView] = useState<[FileNode[], string[], Record<string, boolean>, number]>();
    const [showExercise, setShowExercise] = useState(false);
    const [exercise, setExercise] = useState<Exercise>();
    const [saveEnabled, setSaveEnabled] = useState(false);
    const [consoleColapsed, setConsoleColapsed] = useState(false);
    const [useTypeScript, setUseTypeScript] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [logs, setLogs] = useState<[boolean, LogEntry[][]]>([false, []]);
    const [runResult, setRunResult] = useState<0 | 1 | 2 | 3>();
    const [editorPage, setEditorPage] = useState<"editor" | "solution" | "diff">("editor");

    const consoleIsResizing = useRef(false);
    const consolePanel = useRef<ImperativePanelHandle>(null);
    const consolePanelHtml = useRef<HTMLElement | null>(null);
    const consolePanelLayoutHtml = useRef<HTMLDivElement | null>(null);
    const dialogRef = useRef<DialogMethods>(null);
    const monaco = useMonaco();

    const getCodeMinified = () => minify_sync(monaco!.editor.getModels()[0].getValue(), {
        compress: false,
        mangle: false
    }).code;

    async function executeCode() {
        setIsRunning(true);
        setConsoleColapsed(false);
        setRunResult(undefined);
        setSaveEnabled(false);

        try {
            if (exercise && exercise.run) {
                const execResult = await (await fetch("/engine", {
                    method: "POST",
                    body: JSON.stringify({ code: monaco!.editor.getModels()[0].getValue(), typescript: useTypeScript })
                })).json() as ServerResult<EngineRoute>;

                if (execResult.status === 0 && execResult.data !== undefined) {
                    const logObj = execResult.data.map(l => l.map(p => [indentObject(p[0]), p[1]])) as LogEntry[][];
                    setLogs([false, logObj]);

                    if (exercise)
                        saveExercise(validateResult(execResult.data) == 0);
                }
                else if (execResult.status === 1 && execResult.data !== undefined) {
                    setLogs([true, execResult.data]);

                    if (exercise)
                        saveExercise(false);
                }
            }
            else if (exercise)
                saveExercise(validateResult([]) == 0);
        }
        catch (err) {
            console.error(err);
        }

        setIsRunning(false);
    }

    function validateResult(data: EngineRoute) {
        let level: 0 | 1 | 2 | 3 = 0, i = 1, vars: Record<string, string | number | boolean> = {}, code: string | undefined, rawCode: string | undefined;
        const output = (() => data.map(l => l.map(([p, t]) => t === "string" ? `"${p}"` : p)).join("\n"))();

        try {
            code = getCodeMinified()!;
            rawCode = monaco!.editor.getModels()[0].getValue().trim();
        }
        catch {
            console.warn("Validation failed due to syntax error");
            setRunResult(2);
            return 2;
        }

        console.debug({ output, code });

        if (exercise && exercise.varParse) {
            const rawVars = [...code.matchAll(/\b(?:let|const|var)\s+(\w+)\s*=\s*(\d+|".*?"|true|false|\[.*?\]|\{.*?\})/g)];
            rawVars.forEach(([_, variable, value]) => {
                if (value === "true")
                    vars[variable] = true;
                else if (value === "false")
                    vars[variable] = false;
                else if (value.startsWith('"'))
                    vars[variable] = value.slice(1, -1);
                else if (value.startsWith("["))
                    vars[variable] = JSON.parse(value);
                else if (value.startsWith("{"))
                    vars[variable] = JSON.parse(value.replace(/(\w+):/g, '"$1":'));
                else
                    vars[variable] = +value;
            });
        }

        const options = {
            line: rawCode.split(/\r\n|\r|\n/).length,
            var: code.match(/let|const|var/g) ?? [],
            if: code.match(/if(?=\()/g) ?? [],
            loop: (code.match(/while(?=\(.*?\))|do\{.*?\}while\(.*?\)|for\(.*?\)|\.forEach\(.*?\)/g) ?? []).map(l => {
                if (l.startsWith("do"))
                    return "do while";
                else if (l.startsWith("for") && l.includes(";"))
                    return "for";
                else if (l.startsWith("for") && l.includes("of"))
                    return "for of";
                else if (l.startsWith("for") && l.includes("in"))
                    return "for in";
                else if (l.startsWith(".forEach"))
                    return "for each";
                else
                    return l;
            }),
            func: code.match(/function(\s\w+)?(?=\()|(?<=\([\w,]+\))=>|(?<=\w)=>/g) ?? []
        }

        try {
            for (const validator of exercise!.validators) {
                const valFybc = new Function("s", "c", "v", "o", `return ${validator.condition}`);
                const validation = valFybc(output, code, vars, options);
    
                if (!validation) {
                    console.warn("Validation failed on condition " + i);
                    level = (exercise && !exercise.run) || validator.check === "output" ? 2 : 1;
                }
    
                i++;
                if (level == 2)
                    break;
            }
        }
        catch (err) {
            if (err instanceof ReferenceError)
                console.warn("Validation failed on condition " + i);
            else
                console.error(err);

            level = 3;
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

        monaco!.editor.getModels()[0].setValue(lStorage[0][`ex-${id}`] && lStorage[0][`ex-${id}`].content || defaultCode);
        setShowExercise(true);
        setSaveEnabled(false);

        const exec = await (await fetch("/exercise/" + id)).json() as ServerResult<Exercise>;
        if (exec.status === 0)
            setExercise(exec.data);
        else
            closeExercise();
    }

    function saveExercise(completed = false) {
        if (exercise) {
            const newData: ExStore = { completed: completed, content: monaco!.editor.getModels()[0].getValue() };

            setSaveEnabled(false);

            lStorage[0][`ex-${exercise.id}`] = newData;
            setLStorage([...lStorage]);
            localStorage.setItem(`ex-${exercise.id}`, JSON.stringify(newData));
        }
    }

    function closeExercise() {
        setShowExercise(false);
        setExercise(undefined);

        monaco!.editor.getModels()[0].setValue(defaultCode);
        setSaveEnabled(false);
    }

    async function saveCloseExercise() {
        if (exercise) {
            if (lStorage[0][`ex-${exercise.id}`] && monaco!.editor.getModels()[0].getValue() !== lStorage[0][`ex-${exercise.id}`].content) {
                const dialogResult = await dialogRef.current?.openModal({
                    title: "Unsaved changes",
                    message: "There are unsaved changes on your current exercise that will be lost upon closing. Are you sure you want to continue?",
                    canCancel: true
                });
    
                if (!dialogResult)
                    return;
            }

            closeExercise();
        }
    }

    function onTreeViewNodeCollapse(id: string, colapsed: boolean) {
        lStorage[1][`dr-${id}`] = colapsed;
        setLStorage(lStorage);
        localStorage.setItem(`dr-${id}`, colapsed.toString());
    }

    useEffect(() => {
        consolePanelHtml.current = getPanelElement("consolePanel");

        (async () => {
            const exTree = await (await fetch("/exercise")).json() as ServerResult<ExerciseRoute>;

            if (exTree.status === 0 && exTree.data !== undefined) {
                setTreeView([exTree.data.files, [], {}, exTree.data.count]);

                const cleanStorage = cleanInvalidStorageEntries(localStorage, exTree.data.files);
                setLStorage(cleanStorage);
            }
        })();

        setUseTypeScript(localStorage.getItem("useTypeScript") == "true");
    }, []);

    const handleUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
    }

    useEffect(() => {
        const handleShortcut = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "s") {
                event.preventDefault();
                saveExercise();
            }
            else if (event.key === "F5") {
                event.preventDefault();
                executeCode();
            }
        };

        window.addEventListener("keydown", handleShortcut);

        if (exercise && saveEnabled)
            window.addEventListener("beforeunload", handleUnload);

        return () => {
            window.removeEventListener("beforeunload", handleUnload);
            window.removeEventListener("keydown", handleShortcut);
        };
    }, [exercise, saveEnabled]);

    useEffect(() => {
        if (treeView !== undefined)
            setTreeView([
                treeView[0],
                Object.keys(lStorage[0]).filter(k => lStorage[0][k].completed).map(k => k.replace("ex-", "")),
                lStorage[1],
                treeView[3]
            ]);
    }, [lStorage]);

    useEffect(() => {
        if (consolePanelLayoutHtml.current !== null)
            consolePanelLayoutHtml.current.scrollTop = consolePanelLayoutHtml.current.scrollHeight;
    }, [logs]);

    useEffect(() => {
        if (consoleColapsed)
            consolePanel.current?.resize(0);
        else if (!consoleIsResizing.current)
            consolePanel.current?.resize(25);
    }, [consoleColapsed]);

    useEffect(() => {
        localStorage.setItem("useTypeScript", useTypeScript.toString());

        if (monaco)
            monaco.editor.setModelLanguage(monaco.editor.getModels()[0], !useTypeScript ? "javascript" : "typescript");
    }, [useTypeScript])

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
                            <div className={`w-full h-full ${editorPage === "editor" ? "block" : "hidden"}`}>
                                <PanelLayout title="Editor" header={exercise != undefined && (
                                    <>
                                        <IconButton name="lightbulb" onClick={() => setEditorPage("solution")} />
                                        <IconButton name="save" disabled={!saveEnabled} onClick={() => saveExercise()} />
                                    </>
                                )}>
                                    <Editor
                                        defaultValue={defaultCode}
                                        defaultLanguage="javascript"
                                        theme="galaxy"
                                        options={{ "bracketPairColorization.enabled": false, minimap: { enabled: false } } as any}
                                        loading={<LoadSpinner />}
                                        onChange={() => setSaveEnabled(true)}
                                    />
                                </PanelLayout>
                            </div>
                            <div className={`w-full h-full ${editorPage === "solution" ? "block" : "hidden"}`}>
                                <PanelLayout title="Solution" header={<IconButton name="return" onClick={() => setEditorPage("editor")} />}>
                                    <Editor
                                        value={exercise?.solution}
                                        defaultLanguage="typescript"
                                        theme="galaxy"
                                        options={{ readOnly: true, "bracketPairColorization.enabled": false, minimap: { enabled: false } } as any}
                                        loading={<LoadSpinner />}
                                    />
                                </PanelLayout>
                            </div>
                            <div className={`w-full h-full ${editorPage === "diff" ? "block" : "hidden"}`}>
                                <PanelLayout title="Diff" header={<IconButton name="return" onClick={() => setEditorPage("editor")} />}>
                                    <DiffEditor
                                        original={exercise?.output}
                                        modified={!logs[0] ? logs[1].map(l => l.map(p => p[0]).join(" ")).join("\n") : ""}
                                        theme="galaxy"
                                        options={{ "bracketPairColorization.enabled": false, minimap: { enabled: false }, readOnly: true } as any}
                                        loading={<LoadSpinner />}
                                    />
                                </PanelLayout>
                            </div>
                        </Panel>
                        <PanelResizeHandle className="h-px bg-slate-700" onDragging={state => consoleIsResizing.current = state} />
                        <Panel id="consolePanel" className="min-w-48 min-h-12" defaultSize={25} ref={consolePanel} onResize={onConsoleResize}>
                            <PanelLayout
                                title="Console"
                                className={`w-auto mr-2 pr-2 flex ${isRunning || logs[1].length == 0 ? "justify-center items-center" : ""} overflow-y-auto`}
                                ref={consolePanelLayoutHtml}
                                header={<IconButton name={!consoleColapsed ? "chevron-down" : "chevron-up"} onClick={() => setConsoleColapsed(!consoleColapsed)} />}
                            >
                                {!isRunning ?
                                    logs[1].length === 0 && runResult === undefined ? (
                                        <p className="text-sm text-slate-500">Nothing to see here</p>
                                    ) : ( 
                                        <div className={`w-full h-fit min-h-full px-4`}>
                                            {logs[1].length !== 0 ?
                                                !logs[0] ? (
                                                    <pre className="flex flex-col text-sm font-mono">
                                                        {logs[1].map((log, i) => (
                                                            <pre key={i} className="*:after:content-['_'] last:*:after:content-['']">
                                                                {log.map(([value, type], i) => (
                                                                    <code key={i} className={`log-${type}`} dangerouslySetInnerHTML={{ __html: type !== "object" ? value : hljs.highlight(value, { language: "javascript" }).value.replace(/\n/g, "<br />") }} />
                                                                ))}
                                                            </pre>
                                                        ))}
                                                    </pre>
                                                ) : (
                                                    <pre className="text-sm text-red-400 font-mono">{logs[1]}</pre>
                                                )
                                            : exercise && exercise.run && (
                                                <p className="text-sm text-slate-500 font-mono">Output log is empty</p>
                                            )}
                                            {runResult != undefined && (
                                                <div className={`my-6 ${runResult == 0 ? "text-emerald-500" : runResult == 1 ? "text-yellow-500" : "text-red-500"} space-y-2`}>
                                                    <div className="flex items-center space-x-2">
                                                        <Icon className="w-5 h-5" icon={runResult == 0 ? "correct" : runResult == 1 ? "circle" : "wrong"} />
                                                        <p>{runResult == 0 ?
                                                                exercise && exercise.run ? "Output and requirements were met" : "The requirements were met"
                                                            : runResult == 1 ?
                                                                "Correct output but some requirements were not met"
                                                            : runResult == 2 ?
                                                                exercise && exercise.run ? "Wrong output" : "The requirements were not met"
                                                            :
                                                                "Some required variables were not defined"
                                                        }</p>
                                                    </div>
                                                    {runResult == 2 && exercise && exercise.run && (
                                                        <button onClick={() => setEditorPage("diff")}>
                                                            <p className="text-sm text-slate-500">Click here to compare with a possible result</p>
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
                                <PanelLayout
                                    title="Explorer"
                                    className="h-[calc(100%_-_3rem)]"
                                    header={<span className="mr-2 text-sm text-slate-600 font-semibold">{treeView ? treeView[3] : ""}</span>}
                                >
                                    {treeView == undefined ? (
                                        <LoadSpinner />
                                    ) : (
                                        <div className={`h-full ${treeView[0].length == 0 ? "flex justify-center items-center" : ""} overflow-y-auto`}>
                                            {treeView[0].length == 0 ? (
                                                <p className="text-sm text-slate-500">Nothing to see here</p>
                                            ) : (
                                                <TreeView className="px-2" tree={treeView[0]} completed={treeView[1]} colapsedNodes={treeView[2]} onClick={openExercise} onNodeColapse={onTreeViewNodeCollapse} />
                                            )}
                                        </div>
                                    )}
                                </PanelLayout>
                            ) : (
                                <PanelLayout
                                    title="Exercise"
                                    className={`w-auto ${exercise == undefined ? "h-full" : "h-auto"} mr-2 pr-2 overflow-y-auto`}
                                    header={<IconButton name="home" onClick={saveCloseExercise} />}
                                >
                                    {exercise == undefined ? (
                                        <LoadSpinner />
                                    ) : (
                                        <div className="p-2 space-y-6 markdown">
                                            <h1>{exercise.name}</h1>
                                            <div dangerouslySetInnerHTML={{ __html: exercise.content }} />
                                        </div>
                                    )}
                                </PanelLayout>
                            )}
                        </Panel>
                        <PanelResizeHandle className="h-px bg-slate-700" />
                        <Panel className="min-w-48 min-h-12" defaultSize={15}>
                            <PanelLayout
                                title="Run & Compile"
                                className="flex flex-col justify-center items-center"
                                header={
                                    <button className="w-8 p-1 flex justify-center items-center hover:bg-slate-900 rounded disabled:opacity-50 aspect-square" onClick={() => setUseTypeScript(!useTypeScript)}>
                                        {!useTypeScript ? (
                                            <p className="text-sm text-yellow-500 font-semibold">JS</p>
                                        ) : (
                                            <p className="text-sm text-blue-500 font-semibold">TS</p>
                                        )}
                                    </button>
                                }
                            >
                                <Button className="w-full py-3 text-lg space-x-2" disabled={isRunning} onClick={executeCode}>
                                    {!isRunning ? (
                                        <>
                                            <Icon className="w-6 h-6" icon="rocket" />
                                            <span>{exercise && !exercise.run ? "Verify code" : "Run code"}</span>
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