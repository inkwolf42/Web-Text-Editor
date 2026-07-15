import { useRef } from "react";

export function useFilePicker(onFileSelected, accept = "*") {
  const inputRef = useRef(null);

  const openPicker = () => {
    inputRef.current?.click();
  };

  const FileInput = () => (
    <input
      ref={inputRef}
      type="file"
      accept={accept}
      style={{ display: "none" }}
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) onFileSelected(file);
        e.target.value = ""; // reset, so selecting the same file twice still fires onChange
      }}
    />
  );

  return [ openPicker, FileInput ];
}
