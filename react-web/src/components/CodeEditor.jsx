import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { useEffect, useState } from "react";
import { keymap } from "@codemirror/view";
import { getLanguageExtension } from "../LanguageMap";

const scrollTheme = EditorView.theme({
  "&": { height: "100%" },
  ".cm-scroller": { overflow: "auto" },
});



export default function CodeEditor({
    text,
    setText,
    extension
}) {


    return (
        <CodeMirror
        value={text}
        height="100%"
        className="flex-1 min-h-0 w-full h-full"
        extensions={[...getLanguageExtension(extension),scrollTheme]}
        onChange={(val) => setText(val)}
        />
    );
}
