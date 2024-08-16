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
  Armor: "Black Graphic Tee",
  Glasses: "Glasses",
  Helmet: "Nike Cap",
  LeftArm: "Apple Watch",
  LeftLeg: "Nike Sneaker (R)",
  RightArm: "Gold Ring",
  RightLeg: "Nike Sneaker (L)",
};

const getItemDescription = (item: string) => {
  switch (item) {
    case Apparels.Armor:
      return "Trusty and dependable, offering +10 to style and +5 to comfort, perfect for any quest.";
    case Apparels.Glasses:
      return "Grants +15 to vision clarity and +20 to intellectual charisma. A must-have for any discerning player.";
    case Apparels.Helmet:
      return "Protects from harsh sunlight while adding +10 to your casual look. Also rumored to enhance athletic prowess.";
    case Apparels.LeftArm:
      return "Provides +25 to time management and a passive ability to track health stats. Synchronizes well with all your moves.";
    case Apparels.LeftLeg:
      return "Boosts agility by +20 and provides +10 to stamina for those long treks across the urban landscape.";
    case Apparels.RightArm:
      return "Symbolizing commitment, this item adds +30 to charm and +50 to moral durability.";
    case Apparels.RightLeg:
      return "Completes the set, granting +20 to balance and +10 to speed. Perfect for the everyday adventurer.";
    default:
      return "";
  }
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
            <img src={rightArm} alt="rightArm" />
          )}
          {activeItem === Apparels.LeftLeg && (
            <img src={leftLeg} alt="leftLeg" />
          )}
          {activeItem === Apparels.RightArm && (
            <img src={leftArm} alt="leftArm" />
          )}
          {activeItem === Apparels.RightLeg && (
            <img src={rightLeg} alt="rightLeg" />
          )}
        </ListPage.Image>
        <ListPage.Data>
          {activeItem && <div>{getItemDescription(activeItem)}</div>}
        </ListPage.Data>
      </ListPage>
    </div>
  );
};

export default Apparel;
