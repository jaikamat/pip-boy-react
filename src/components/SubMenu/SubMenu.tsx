import { useEffect, useState } from "react";
import "./SubMenu.css";

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keys = Object.keys(menuItems);
      const currentIndex = keys.indexOf(activeItem);
      if (event.key === "w" && currentIndex < keys.length - 1) {
        const nextItem = keys[currentIndex + 1];
        setActiveItem(nextItem);
        onChange(nextItem);
      } else if (event.key === "q" && currentIndex > 0) {
        const prevItem = keys[currentIndex - 1];
        setActiveItem(prevItem);
        onChange(prevItem);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItem, menuItems, onChange]);

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
