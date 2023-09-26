import { useState } from "react";
import ListPage from "../../ListPage/ListPage";
import agility from "./assets/agility.gif";
import charisma from "./assets/charisma.gif";
import endurance from "./assets/endurance.gif";
import intelligence from "./assets/intelligence.gif";
import luck from "./assets/luck.gif";
import perception from "./assets/perception.gif";
import strength from "./assets/strength.gif";
import List from "../../List/List";

const Specials = {
  Agility: "Agility",
  Charisma: "Charisma",
  Endurance: "Endurance",
  Intelligence: "Intelligence",
  Luck: "Luck",
  Perception: "Perception",
  Strength: "Strength",
};

const Special = () => {
  const [activeItem, setActiveItem] = useState<string>("");

  return (
    <div>
      <ListPage>
        <ListPage.List>
          <List
            items={Object.values(Specials)}
            onChange={(item) => setActiveItem(item)}
          />
        </ListPage.List>
        <ListPage.Image>
          {activeItem === Specials.Agility && (
            <img src={agility} alt="agility" />
          )}
          {activeItem === Specials.Charisma && (
            <img src={charisma} alt="charisma" />
          )}
          {activeItem === Specials.Endurance && (
            <img src={endurance} alt="endurance" />
          )}
          {activeItem === Specials.Intelligence && (
            <img src={intelligence} alt="intelligence" />
          )}
          {activeItem === Specials.Luck && <img src={luck} alt="luck" />}
          {activeItem === Specials.Perception && (
            <img src={perception} alt="perception" />
          )}
          {activeItem === Specials.Strength && (
            <img src={strength} alt="strength" />
          )}
        </ListPage.Image>
        <ListPage.Data>
          {activeItem === Specials.Agility && (
            <div>
              Agility is a measure of your overall finesse and reflexes. It
              affects the number of Action Points in V.A.T.S. and your ability
              to sneak.
            </div>
          )}
          {activeItem === Specials.Charisma && (
            <div>
              Charisma is your ability to charm and convince others. It affects
              your success to persuade in dialogue and prices when you barter.
            </div>
          )}
          {activeItem === Specials.Endurance && (
            <div>
              Endurance is a measure of your overall physical fitness. It
              affects your total Health and the Action Point drain from
              sprinting.
            </div>
          )}
          {activeItem === Specials.Intelligence && (
            <div>
              Intelligence is a measure of your overall mental acuity, and
              affects the number of Experience Points earned.
            </div>
          )}
          {activeItem === Specials.Luck && (
            <div>
              Luck is a measure of your general good fortune, and affects the
              recharge rate of Critical Hits.
            </div>
          )}
          {activeItem === Specials.Perception && (
            <div>
              Perception is your environmental awareness and "sixth sense," and
              affects weapon accuracy in V.A.T.S.
            </div>
          )}
          {activeItem === Specials.Strength && (
            <div>
              Strength is a measure of your raw physical power. It affects how
              much you can carry, and the damage of all melee attacks.
            </div>
          )}
        </ListPage.Data>
      </ListPage>
    </div>
  );
};

export default Special;
