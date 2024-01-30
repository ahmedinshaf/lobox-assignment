import { useEffect, useRef, useState } from "react";
import Dropdown from "./components/dropdown/Dropdown";
import "./App.scss";
import Option from "./types/DropdownOption";

// dropdown options ( only config needed )
const options: Option[] = [
  { label: "Technology 💻", value: "technology" },
  { label: "Health 🏥", value: "health" },
  { label: "Sports 🏈", value: "sports" },
  { label: "Music 🎵", value: "music" },
  { label: "Travel 🌍", value: "travel" },
  { label: "Food 🍔", value: "food" },
  { label: "Art 🎨", value: "art" },
  { label: "Finance 💰", value: "finance" },
  { label: "Nature 🌳", value: "nature" },
  { label: "Fashion 👗", value: "fashion" },
  { label: "Science 🔬", value: "science" },
];

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
      return;
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="app">
      <div ref={dropdownRef} className="dropdown-wrapper">
        <Dropdown>
          <Dropdown.Selected />
          <Dropdown.Menu shouldClose={isOpen}>
            {options.map((option: Option) => {
              return (
                <Dropdown.Item value={option.value}>
                  {option.label}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default App;
