import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import "./List.css";

const List = ({
  items,
  onChange,
}: {
  items: Array<string>;
  onChange: (item: string) => void;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef(null);

  useEffect(() => {
    // Focus the active item whenever it changes
    const activeItem = document.getElementById(`item-${activeIndex}`);
    activeItem && activeItem.focus();
    onChange(items[activeIndex]);
  }, [activeIndex]);

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        setActiveIndex((prev) => (prev + 1) % items.length);
        e.preventDefault();
        onChange(items[activeIndex]);
        break;
      case "ArrowUp":
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
        e.preventDefault();
        onChange(items[activeIndex]);
        break;
      default:
        break;
    }
  };

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <ul
      role="listbox"
      onKeyDown={
        handleKeyDown as unknown as KeyboardEventHandler<HTMLUListElement>
      }
      ref={listRef}
    >
      {items.map((item, index) => (
        <li
          key={index}
          className={index === activeIndex ? "list-active" : ""}
          id={`item-${index}`}
          role="option"
          aria-selected={index === activeIndex}
          tabIndex={index === activeIndex ? 0 : -1} // Only the active item should be focusable
          onClick={() => handleItemClick(index)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default List;
