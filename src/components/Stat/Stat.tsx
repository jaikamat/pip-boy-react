import { useState } from "react";
import SubMenu from "../SubMenu";
import "./Stat.css";
import pipBoyWalk from "./pip-boy-walk.gif";

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
      {activeItem === subMenuItems.STATUS && (
        <>
          <div className="status-container">
            <div className="gauge-col-end">
              <div className="health-gauge-low" />
              <div className="health-gauge" />
            </div>
            <div className="gauge-col-center">
              <div className="health-gauge" />
              <img className="image" src={pipBoyWalk} alt="walk" />
              <div className="health-gauge" />
            </div>
            <div className="gauge-col-end">
              <div className="health-gauge" />
              <div className="health-gauge" />
            </div>
          </div>
        </>
      )}
      {activeItem === subMenuItems.SPECIAL && <div>SPECIAL goes here</div>}
      {activeItem === subMenuItems.PERKS && <div>PERKS goes here</div>}
    </div>
  );
};

export default Stat;
