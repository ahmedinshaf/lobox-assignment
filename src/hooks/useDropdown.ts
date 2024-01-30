import { useState, useCallback } from "react";

function useDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const selectOption = useCallback((option: string) => {
    setSelectedOptions((prev) => {
      if (!prev.includes(option)) {
        return [...prev, option];
      }
      return prev;
    });
  }, []);

  const unSelectOption = useCallback((option: string) => {
    setSelectedOptions((prev) => {
      return prev.filter((item) => item !== option);
    });
  }, []);

  const removeSelectedOption = useCallback((option: string) => {
    setSelectedOptions((prev) => {
      return prev.filter((item) => item !== option);
    });
  }, []);

  return {
    isOpen,
    toggle,
    open,
    close,
    selectOption,
    selectedOptions,
    unSelectOption,
    removeSelectedOption,
  };
}

export default useDropdown;
