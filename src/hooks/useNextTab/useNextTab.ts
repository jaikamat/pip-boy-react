import { useState, useEffect } from "react";

function useNextTab(initialTab: string, tabs: Record<string, string>) {
  const tabsArray = Object.keys(tabs);
  const [currentTab, setCurrentTab] = useState<string>(initialTab);

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === "1") {
        setCurrentTab(tabsArray[0]);
      } else if (event.key === "2") {
        setCurrentTab(tabsArray[1]);
      } else if (event.key === "3") {
        setCurrentTab(tabsArray[2]);
      } else if (event.key === "4") {
        setCurrentTab(tabsArray[3]);
      }
    }

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentTab, tabsArray]);

  return [currentTab, setCurrentTab];
}

export default useNextTab;
