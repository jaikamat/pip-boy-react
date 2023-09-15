import { useState } from "react";
import "./SubMenu.css";

// TODO: menu selection with arrow keys
const SubMenu = ({
  menuItems,
  onChange,
}: {
  menuItems: Record<string, string>;
  onChange: (item: string) => void;
}) => {
  const [activeItem, setActiveItem] = useState<string>(
    Object.keys(menuItems)[0]
  );

  return (
    <div className="submenu-container">
      {Object.entries(menuItems).map(([name, label]) => {
        return (
          <div
            key={label}
            className={`item ${activeItem === name ? "active-item" : ""}`}
            onClick={() => {
              setActiveItem(name);
              onChange(name);
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

export default SubMenu;
