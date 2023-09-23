import { useState } from "react";
import SubMenu from "../SubMenu";
import "./Stat.css";
import Status from "./Status/Status";
import Special from "./Special/Special";
import Perks from "./Perks/Perks";

const subMenuItems = {
  STATUS: "STATUS",
  SPECIAL: "SPECIAL",
  PERKS: "PERKS",
} as const;

const Stat = () => {
  const [activeItem, setActiveItem] = useState<string>(subMenuItems.STATUS);

  return (
    <div className="grid-container">
      <SubMenu
        menuItems={subMenuItems}
        onChange={(item) => setActiveItem(item)}
      />
      {activeItem === subMenuItems.STATUS && <Status />}
      {activeItem === subMenuItems.SPECIAL && <Special />}
      {activeItem === subMenuItems.PERKS && <Perks />}
    </div>
  );
};

export default Stat;
