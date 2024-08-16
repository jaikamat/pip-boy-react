import { useState } from "react";
import ListPage from "../../ListPage/ListPage";
import modifiedSeeds from "./assets/modified-seeds.png";
import gold from "./assets/gold.png";
import rfid from "./assets/rfid.png";
import blackLotus from "./assets/black-lotus.png";
import gameBoy from "./assets/game-boy.png";
import List from "../../List";

const Items = {
  Gold: "Gold",
  BlackLotus: "Black Lotus",
  ModifiedSeeds: "Modified Seeds",
  GameBoy: "Game Boy",
  RFID: "Mass Fusion Executive ID",
};

const Weapons = () => {
  const [activeItem, setActiveItem] = useState<string>("");

  const getImageSrc = (item: string) => {
    switch (item) {
      case Items.ModifiedSeeds:
        return modifiedSeeds;
      case Items.Gold:
        return gold;
      case Items.RFID:
        return rfid;
      case Items.BlackLotus:
        return blackLotus;
      case Items.GameBoy:
        return gameBoy;
      default:
        return null;
    }
  };

  const getItemDescription = (item: string) => {
    switch (item) {
      case Items.ModifiedSeeds:
        return "Experimental Cucurbitaceae (gourd) seeds developed by the Institute.";
      case Items.Gold:
        return "Found in Cambridge Polymer Labs, initially found as unidentified sample 611.";
      case Items.RFID:
        return "A beige and grey card that opens a DIA cache";
      case Items.BlackLotus:
        return `"A bloom from beyond, holding the power to create or destroy. In its fleeting beauty lies the strength to change everything - if you dare to pay the price."`;
      case Items.GameBoy:
        return "An elegant console of a more civilized age.";
      default:
        return "";
    }
  };

  return (
    <ListPage>
      <ListPage.List>
        <List
          items={Object.values(Items)}
          onChange={(item) => setActiveItem(item)}
        />
      </ListPage.List>
      <ListPage.Image>
        {activeItem && (
          <img
            style={{
              filter:
                "grayscale(100%) sepia(100%) hue-rotate(55deg) saturate(3)",
              imageRendering: "pixelated",
            }}
            src={getImageSrc(activeItem)}
            alt={activeItem.toLowerCase().replace(" ", "-")}
          />
        )}
      </ListPage.Image>
      <ListPage.Data>
        {activeItem && <div>{getItemDescription(activeItem)}</div>}
      </ListPage.Data>
    </ListPage>
  );
};

export default Weapons;
