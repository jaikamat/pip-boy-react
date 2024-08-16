import { useState } from "react";
import ListPage from "../../ListPage/ListPage";
import pistol from "./assets/pistol10mm.png";
import knife from "./assets/knife.png";
import sledgehammer from "./assets/sledgehammer.png";
import bfg9000 from "./assets/bfg-9000.png";
import boxingGlove from "./assets/boxing-glove.png";
import brassKnuckles from "./assets/brass-knuckles.png";
import gaussRifle from "./assets/gauss-rifle.png";
import plasmaRifle from "./assets/plasma-gun.png";
import thirstZapper from "./assets/thirst-zapper.png";
import List from "../../List";

const Items = {
  Pistol: "10mm Pistol",
  Knife: "Knife",
  Sledgehammer: "Super Sledge",
  BFG9000: "BFG 9000",
  BoxingGlove: "Boxing Glove",
  BrassKnuckles: "Brass Knuckles",
  GaussRifle: "Gauss Rifle",
  PlasmaRifle: "Plasma Rifle",
  ThirstZapper: "Thirst Zapper",
};

const Weapons = () => {
  const [activeItem, setActiveItem] = useState<string>("");

  const getImageSrc = (item: string) => {
    switch (item) {
      case Items.Pistol:
        return pistol;
      case Items.Knife:
        return knife;
      case Items.Sledgehammer:
        return sledgehammer;
      case Items.BFG9000:
        return bfg9000;
      case Items.BoxingGlove:
        return boxingGlove;
      case Items.BrassKnuckles:
        return brassKnuckles;
      case Items.GaussRifle:
        return gaussRifle;
      case Items.PlasmaRifle:
        return plasmaRifle;
      case Items.ThirstZapper:
        return thirstZapper;
      default:
        return null;
    }
  };

  const getItemDescription = (item: string) => {
    switch (item) {
      case Items.Pistol:
        return "Small, dependable, reasonably powerful, and widely available, the 10mm Pistol has been a staple of Wasteland combat since the bombs first fell.";
      case Items.Knife:
        return "A large combat knife with a clip-point blade. The knife uses a fast swing stabbing and slashing motion when used. The weapon can be modified with either a serrated blade.";
      case Items.Sledgehammer:
        return "A Super Sledgehammer, manufactured by the Brotherhood of Steel, using the finest weapon technology available. Includes a kinetic energy storage device to increase knockback.";
      case Items.BFG9000:
        return "A massive weapon, the BFG 9000 fires plasma bursts that can devastate anything in its path.";
      case Items.BoxingGlove:
        return "A classic hand-to-hand combat tool, perfect for settling disputes the old-fashioned way.";
      case Items.BrassKnuckles:
        return "A simple yet effective weapon, brass knuckles add punch to any fist fight.";
      case Items.GaussRifle:
        return "A high-powered electromagnetic rifle that can penetrate the toughest armor.";
      case Items.PlasmaRifle:
        return "A versatile energy weapon that fires superheated bolts of plasma.";
      case Items.ThirstZapper:
        return `An "energy" weapon that "fires" a squirt of water, with a handle and a barrel in the shape of a Nuka-Cola bottle.`;
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
