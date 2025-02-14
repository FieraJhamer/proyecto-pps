import { useEffect } from "react";

export function useCloseOnEscape(onClose) {
  useEffect(() => {
    if (!onClose) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);
}
