import { useState, useRef, useEffect } from "react";
import { MoreVertical, Plus, Trash2, Download, Pencil, FolderPlus } from "lucide-react";

/**
 * Generic dropdown menu for row-level actions (file/folder etc).
 *
 * Usage:
 * <ActionDropdown
 *   actions={[
 *     { label: "New folder", icon: FolderPlus, onClick: () => {...} },
 *     { label: "Rename", icon: Pencil, onClick: () => {...} },
 *     { label: "Download", icon: Download, onClick: () => {...} },
 *     { label: "Delete", icon: Trash2, onClick: () => {...}, danger: true },
 *   ]}
 * />
 */
export default function ActionDropdown({ actions = [], align = "right" , light = false}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`p-1 rounded hover:bg-black/5 ${light?"text-gray-100":"text-gray-500"} hover:text-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400`}
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute z-20 mt-1 min-w-[200px] rounded-md border border-gray-200 bg-white shadow-lg py-1
            ${align === "right" ? "right-0" : "left-0"}`}
        >
          {actions.map((action, i) => {
            const Icon = action.icon;
            if (Icon==null){
                return <div className="bg-gray-100 h-0.5 w-full mx-2"/>
            }
            return (
              <button
                key={i}
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  action.onClick?.();
                }}
                disabled={action.disabled}
                className={`w-full flex items-center gap-2 px-3 py-1.5 text-sm text-left transition-colors
                  ${action.danger ? "text-red-600 hover:bg-red-50" : "text-gray-700 hover:bg-gray-100"}
                  ${action.disabled ? "opacity-40 cursor-not-allowed hover:bg-transparent" : ""}`}
              >
                {Icon && <Icon size={15} />}
                {action.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

