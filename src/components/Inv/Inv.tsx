import { useState } from "react";
import SubMenu from "../SubMenu/SubMenu";
import "./Inv.css";
import Misc from "./Misc/Misc";
import Weapons from "../Weapons/Weapons";

const subMenuItems = {
  WEAPONS: "WEAPONS",
  APPAREL: "APPAREL",
  MISC: "MISC",
} as const;

const Inv = () => {
  const [activeItem, setActiveItem] = useState<string>(subMenuItems.WEAPONS);

  return (
    <div className="grid-container">
      <SubMenu
        menuItems={subMenuItems}
        onChange={(item) => setActiveItem(item)}
      />
      {activeItem === subMenuItems.APPAREL && <div>Apparel</div>}
      {activeItem === subMenuItems.WEAPONS && <Weapons />}
      {activeItem === subMenuItems.MISC && <Misc />}
    </div>
  );
};

export default Inv;
