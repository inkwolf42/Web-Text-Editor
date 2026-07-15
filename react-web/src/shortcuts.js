import { useEffect } from "react";

export function useSaveShortcut(onSave) {
  useEffect(() => {
    function handleKeyDown(e) {
      const isSaveCombo = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s";
      if (isSaveCombo) {
        e.preventDefault();
        onSave();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onSave]);
}
