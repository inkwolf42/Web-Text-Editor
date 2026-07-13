import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { useState } from "react";

const scrollTheme = EditorView.theme({
  "&": { height: "100%" },
  ".cm-scroller": { overflow: "auto" },
});

export default function CodeEditor({
    text,
    setText
}) {

  return (
    <CodeMirror
      value={text}
      height="100%"
      className="flex-1 min-h-0 w-full"
      extensions={[javascript({ jsx: true }),scrollTheme]}
      onChange={(val) => setText(val)}
    />
  );
}
