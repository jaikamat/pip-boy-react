import { useState } from "react";
import ListPage from "../../ListPage/ListPage";
import armor from "./assets/armor.gif";
import glasses from "./assets/glasses.gif";
import helmet from "./assets/helmet.gif";
import leftArm from "./assets/left-arm.gif";
import leftLeg from "./assets/left-leg.gif";
import rightArm from "./assets/right-arm.gif";
import rightLeg from "./assets/right-leg.gif";
import List from "../../List/List";

const Apparels = {
  Armor: "Armor",
  Glasses: "Glasses",
  Helmet: "Helmet",
  LeftArm: "LeftArm",
  LeftLeg: "LeftLeg",
  RightArm: "RightArm",
  RightLeg: "RightLeg",
};

const Apparel = () => {
  const [activeItem, setActiveItem] = useState<string>("");

  return (
    <div>
      <ListPage>
        <ListPage.List>
          <List
            items={Object.values(Apparels)}
            onChange={(item) => setActiveItem(item)}
          />
        </ListPage.List>
        <ListPage.Image>
          {activeItem === Apparels.Armor && <img src={armor} alt="armor" />}
          {activeItem === Apparels.Glasses && (
            <img src={glasses} alt="glasses" />
          )}
          {activeItem === Apparels.Helmet && <img src={helmet} alt="helmet" />}
          {activeItem === Apparels.LeftArm && (
            <img src={leftArm} alt="leftArm" />
          )}
          {activeItem === Apparels.LeftLeg && (
            <img src={leftLeg} alt="leftLeg" />
          )}
          {activeItem === Apparels.RightArm && (
            <img src={rightArm} alt="rightArm" />
          )}
          {activeItem === Apparels.RightLeg && (
            <img src={rightLeg} alt="rightLeg" />
          )}
        </ListPage.Image>
      </ListPage>
    </div>
  );
};

export default Apparel;
