import { useState, useEffect } from "react";

function useNextTab(initialTab: string, tabs: Record<string, string>) {
  const tabsArray = Object.keys(tabs);
  const [currentTab, setCurrentTab] = useState<string>(initialTab);

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      const currentIndex = tabsArray.indexOf(currentTab);

      if (event.key === "w" || event.key === "W") {
        const nextIndex = (currentIndex + 1) % tabsArray.length;
        setCurrentTab(tabsArray[nextIndex]);
      } else if (event.key === "q" || event.key === "Q") {
        const prevIndex =
          currentIndex - 1 < 0 ? tabsArray.length - 1 : currentIndex - 1;
        setCurrentTab(tabsArray[prevIndex]);
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
