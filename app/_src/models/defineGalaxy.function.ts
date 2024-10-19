export function defineGalaxy(monaco: typeof import("/Users/danielnunes/Documents/Projetos/VSCode/Radix Playground Next/node_modules/monaco-editor/esm/vs/editor/editor.api")) {
    return monaco.editor.defineTheme("galaxy", {
        base: "vs-dark",
        inherit: true,
        rules: [
            { token: "comment", foreground: "5C7884" },
            { token: "keyword", foreground: "CC80FF" },
            { token: "string", foreground: "C8FF75" },
            { token: "string.escape", foreground: "8ADEFF" },
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
}