import { useEffect } from "react";
import useNextTab from "../../hooks/useNextTab/useNextTab";
import "./Header.css";

export const Tabs = {
  STAT: "STAT",
  INV: "INV",
  DATA: "DATA",
  MAP: "MAP",
  RADIO: "RADIO",
} as const;

const Header = ({
  onChange,
  initialTab,
}: {
  onChange: (tab: string) => void;
  initialTab?: string;
}) => {
  const [activeTab, setActiveTab] = useNextTab(
    initialTab || Object.keys(Tabs)[0],
    Tabs
  );

  useEffect(() => {
    onChange(activeTab as string);
  }, [activeTab, onChange]);

  return (
    <header className="tabs-container">
      {Object.entries(Tabs).map(([name, label]) => {
        return (
          <div
            key={name}
            className={`tab ${activeTab === name ? "active" : ""}`}
            onClick={() => {
              // Set internal state
              (setActiveTab as React.Dispatch<React.SetStateAction<string>>)(
                name
              );
              // Broadcast change
              onChange(name);
            }}
          >
            {label}
          </div>
        );
      })}
    </header>
  );
};

export default Header;
