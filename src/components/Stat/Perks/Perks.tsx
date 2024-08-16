import { useState } from "react";
import ListPage from "../../ListPage/ListPage";
import killshot from "./assets/killshot.gif";
import adrenaline from "./assets/adrenaline.gif";
import closeToMetal from "./assets/close-to-metal.gif";
import quietReflection from "./assets/quiet-reflection.gif";
import List from "../../List";

const Items = {
  Adrenaline: "Adrenaline",
  Killshot: "Killshot",
  CloseToMetal: "Close To Metal",
  QuietReflection: "Quiet Reflection",
};

const Weapons = () => {
  const [activeItem, setActiveItem] = useState<string>("");

  const getImageSrc = (item: string) => {
    switch (item) {
      case Items.Killshot:
        return killshot;
      case Items.Adrenaline:
        return adrenaline;
      case Items.CloseToMetal:
        return closeToMetal;
      case Items.QuietReflection:
        return quietReflection;
      default:
        return null;
    }
  };

  const getItemDescription = (item: string) => {
    switch (item) {
      case Items.Killshot:
        return "Thanks to your relationship with MacCready, headshot accuracy in V.A.T.S. is increased by 20 percent.";
      case Items.Adrenaline:
        return "Each rank of the Adrenaline perk provides a +5% bonus to one's damage output, for a maximum of +50%, balancing out the fact that Survival difficulty makes combat significantly more lethal.";
      case Items.CloseToMetal:
        return "Thanks to your relationship with Nick Valentine, you get one extra guess and 50 percent faster terminal cooldown when hacking.";
      case Items.QuietReflection:
        return "After spending some quiet time reflecting on life's experiences the Survivor feels more ready to continue their personal journey. This translates to a +5% experience gained for 8 hours.";
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
                "grayscale(100%) brightness(80%) sepia(100%) hue-rotate(50deg) saturate(1.75)",
              mixBlendMode: "hard-light",
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
