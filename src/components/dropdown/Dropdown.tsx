import React, { createContext, useContext, useState } from "react";
import useDropdown from "../../hooks/useDropdown";
import "../../App.scss";

interface IDropdownProps {
  children: React.ReactNode;
}

interface DropdownContextValue {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  selectOption: (option: string) => void;
  selectedOptions: string[];
  unSelectOption: (option: string) => void;
  removeSelectedOption: (option: string) => void;
  open: () => void;
}
const DropdownContext = createContext<DropdownContextValue | null>(null);

const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Should be used within the Dropdown component");
  }
  return context;
};

const Dropdown = ({ children }: IDropdownProps) => {
  const {
    isOpen,
    toggle,
    close,
    selectOption,
    selectedOptions,
    unSelectOption,
    removeSelectedOption,
    open,
  } = useDropdown();

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        toggle,
        close,
        selectOption,
        selectedOptions,
        unSelectOption,
        removeSelectedOption,
        open,
      }}
    >
      <div className="dropdown">{children}</div>
    </DropdownContext.Provider>
  );
};

Dropdown.Selected = function DropdownToggle() {
  const { selectedOptions, removeSelectedOption, open, selectOption, isOpen } =
    useDropdownContext();

  const [newTerm, setNewTerm] = useState<string>("");

  const handleNewTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTerm(e.target.value);
  };

  return (
    <div onClick={open} className="dropdown-selected-list">
      {selectedOptions.length > 0 &&
        selectedOptions.map((option: any, index: number) => {
          return (
            <div className="dropdown-selected-list-item" key={index}>
              {option}
              <span
                onClick={(e) => {
                  // Prevent the toggle function from being called
                  e.stopPropagation();
                  removeSelectedOption(option);
                }}
              >
                ❌
              </span>
            </div>
          );
        })}
      {(isOpen || selectedOptions.length === 0) && (
        <div>
          <input
            type="text"
            placeholder={
              selectedOptions.length === 0
                ? "Add option or choose from list"
                : ""
            }
            value={newTerm}
            onChange={handleNewTerm}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newTerm.trim() !== "") {
                selectOption(newTerm);
                setNewTerm("");
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

interface IDropdownMenuProps {
  children: React.ReactNode;
  shouldClose: boolean;
}

Dropdown.Menu = function DropdownMenu({
  children,
  shouldClose,
}: IDropdownMenuProps) {
  const { isOpen } = useDropdownContext();

  return isOpen && shouldClose ? (
    <div className="dropdown-menu">{children}</div>
  ) : null;
};

interface IDropdownItemProps {
  children: React.ReactNode;
  value: string;
}

Dropdown.Item = function DropdownItem({ children, value }: IDropdownItemProps) {
  const { selectOption, selectedOptions, unSelectOption } =
    useDropdownContext();
  const isAlreadySelected = selectedOptions.includes(value);

  return (
    <div
      className={`dropdown-item ${isAlreadySelected ? "selected" : ""}`}
      onClick={() => {
        if (isAlreadySelected) {
          unSelectOption(value);
          return;
        }
        selectOption(value);
      }}
    >
      <div>{children}</div>
      <div>{isAlreadySelected && <span>✅</span>}</div>
    </div>
  );
};

export default Dropdown;
