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
      if (event.key === "ArrowRight" && currentIndex < keys.length - 1) {
        const nextItem = keys[currentIndex + 1];
        setActiveItem(nextItem);
        onChange(nextItem);
      } else if (event.key === "ArrowLeft" && currentIndex > 0) {
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

  const computeOpacity = (index: number) => {
    const currentIndex = Object.keys(menuItems).indexOf(activeItem);
    const distance = Math.abs(currentIndex - index);
    const maxDistance = Math.max(
      currentIndex,
      Object.keys(menuItems).length - currentIndex - 1
    );
    return 1 - distance / (maxDistance + 1);
  };

  return (
    <div className="submenu-container">
      {Object.entries(menuItems).map(([name, label], idx) => {
        return (
          <div
            key={label}
            className={`item ${activeItem === name ? "active-item" : ""}`}
            onClick={() => {
              setActiveItem(name);
              onChange(name);
            }}
            style={{ opacity: computeOpacity(idx) }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

export default SubMenu;
