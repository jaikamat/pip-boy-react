import "./Header.css";

export const Tabs = {
  STAT: "STAT",
  EXP: "EXP",
  DATA: "DATA",
  MAP: "MAP",
  COLOR: "COLOR",
} as const;

const Header = ({
  onChange,
  activeTab,
}: {
  onChange: (tab: string) => void;
  activeTab: string;
}) => {
  return (
    <header className="tabs-container">
      {Object.entries(Tabs).map(([name, label]) => {
        return (
          <div
            key={name}
            className={`tab ${activeTab === name ? "active" : ""}`}
            onClick={() => onChange(name)}
          >
            {label}
          </div>
        );
      })}
    </header>
  );
};

export default Header;
