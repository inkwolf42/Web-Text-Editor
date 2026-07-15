// languageMap.js
// Maps a file extension (no leading dot) to the correct CodeMirror 6 language extension.
// Install only the packages for languages you actually plan to support:
//
// npm install @codemirror/lang-javascript @codemirror/lang-python @codemirror/lang-html \
//   @codemirror/lang-css @codemirror/lang-json @codemirror/lang-markdown @codemirror/lang-sql \
//   @codemirror/lang-xml @codemirror/lang-rust @codemirror/lang-cpp @codemirror/lang-java \
//   @codemirror/lang-php @codemirror/lang-yaml

import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import { sql } from "@codemirror/lang-sql";
import { xml } from "@codemirror/lang-xml";
import { rust } from "@codemirror/lang-rust";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { php } from "@codemirror/lang-php";
import { yaml } from "@codemirror/lang-yaml";

// Each entry is a FACTORY (fn returning an extension), not a called extension —
// this avoids instantiating every language on module load, and lets you pass
// options (e.g. { jsx: true }) per extension type.
const LANGUAGE_MAP = {
  // JavaScript family
  js:   () => javascript(),
  mjs:  () => javascript(),
  cjs:  () => javascript(),
  jsx:  () => javascript({ jsx: true }),
  ts:   () => javascript({ typescript: true }),
  tsx:  () => javascript({ jsx: true, typescript: true }),

  // Python
  py:   () => python(),
  pyw:  () => python(),

  // Web
  html: () => html(),
  htm:  () => html(),
  css:  () => css(),
  json: () => json(),
  xml:  () => xml(),

  // Markdown
  md:       () => markdown(),
  markdown: () => markdown(),

  // SQL
  sql: () => sql(),

  // Systems languages
  rs:   () => rust(),
  c:    () => cpp(),
  h:    () => cpp(),
  cpp:  () => cpp(),
  cc:   () => cpp(),
  hpp:  () => cpp(),

  // JVM
  java: () => java(),

  // PHP
  php: () => php(),

  // Config
  yml:  () => yaml(),
  yaml: () => yaml(),
};

/**
 * Returns an array of CodeMirror extensions for a given file extension.
 * Returns an empty array if no language match is found — CM6 falls back
 * to plain-text editing gracefully with no highlighting, no crash.
 *
 * @param {string} extension - file extension, with or without a leading dot
 * @returns {import("@codemirror/state").Extension[]}
 */
export function getLanguageExtension(extension) {
  if (!extension) return [];

  const key = extension.replace(/^\./, "").toLowerCase();
  const factory = LANGUAGE_MAP[key];

  return factory ? [factory()] : [];
}

export default LANGUAGE_MAP;


// fileIcons.js
// Maps a file extension (no leading dot) to a lucide-react icon component.
// lucide-react only has generic/shape-based icons (no per-language logos like
// the JS or Python "brand" marks) — see the note at the bottom if you want
// actual colored language logos instead.

import {
  FileCode,
  FileJson,
  FileText,
  FileType,
  FileTerminal,
  FileCog,
  Database,
  Image,
  File as FileIcon,
} from "lucide-react";

const ICON_MAP = {
  // JavaScript / TypeScript family
  js:   FileCode,
  mjs:  FileCode,
  cjs:  FileCode,
  jsx:  FileCode,
  ts:   FileCode,
  tsx:  FileCode,

  // Python
  py:  FileCode,
  pyw: FileCode,

  // Web
  html: FileCode,
  htm:  FileCode,
  css:  FileCode,
  json: FileJson,
  xml:  FileCode,

  // Markdown / text
  md:       FileText,
  markdown: FileText,
  txt:      FileText,

  // SQL
  sql: Database,

  // Systems languages
  rs:  FileCode,
  c:   FileCode,
  h:   FileCode,
  cpp: FileCode,
  cc:  FileCode,
  hpp: FileCode,

  // JVM
  java: FileCode,

  // PHP
  php: FileCode,

  // Config / data
  yml:  FileCog,
  yaml: FileCog,
  env:  FileCog,
  toml: FileCog,
  ini:  FileCog,

  // Shell
  sh:   FileTerminal,
  bash: FileTerminal,

  // Fonts / type-ish (rarely used, just as an example of FileType)
  d:    FileType,

  // Images (in case your file tree ever shows non-text files)
  png:  Image,
  jpg:  Image,
  jpeg: Image,
  svg:  Image,
  gif:  Image,
  webp: Image,
};

/**
 * Returns the icon component for a given file extension.
 * Falls back to a generic file icon if no match is found.
 *
 * @param {string} extension - with or without a leading dot
 * @returns {React.ComponentType} icon component (not yet rendered)
 */
export function getFileIcon(extension) {
  if (!extension) return FileIcon;

  const key = extension.replace(/^\./, "").toLowerCase();
  return ICON_MAP[key] || FileIcon;
}

