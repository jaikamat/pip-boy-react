import "./SubMenu.css";

const SubMenu = ({
  menuItems,
  onChange,
  activeItem,
}: {
  menuItems: Record<string, string>;
  onChange: (item: string) => void;
  activeItem: string;
}) => {
  return (
    <div className="submenu-container">
      {Object.entries(menuItems).map(([name, label]) => {
        return (
          <div
            key={label}
            className={`item ${activeItem === name ? "active-item" : ""}`}
            onClick={() => onChange(name)}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

export default SubMenu;
