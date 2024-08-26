import React, { useEffect, useRef, useState } from "react";
import { useClock } from "../../hooks/clockProvider";
import "./Clock.css"; // Make sure to import the CSS file

const Clock: React.FC = () => {
  const { time, setTime } = useClock();
  const [hour, setHour] = useState<number>(12);
  const [minute, setMinute] = useState<number>(0);

  const hourRef = useRef<HTMLInputElement>(null);
  const minuteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the hour input when the component mounts
    if (hourRef.current) {
      hourRef.current.focus();
    }
  }, []);

  const handleConfirmTime = () => {
    setTime({ hour, minute, second: 0 });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // List of allowed keys (ArrowUp, ArrowDown, ArrowRight, Tab, and Shift for tab navigation)
    const allowedKeys = ["ArrowUp", "ArrowDown", "ArrowRight"];

    if (!allowedKeys.includes(e.key)) {
      e.preventDefault(); // Prevent all other keys, including number keys
    }

    switch (e.key) {
      case "ArrowUp":
        e.preventDefault(); // Prevent the default arrow key behavior
        // Move through time values when pressing the up arrow
        if (document.activeElement === hourRef.current) {
          setHour((prev) => (prev < 23 ? prev + 1 : 0));
        } else if (document.activeElement === minuteRef.current) {
          setMinute((prev) => (prev < 59 ? prev + 1 : 0));
        }
        break;

      case "ArrowDown":
        e.preventDefault(); // Prevent the default arrow key behavior
        // Move through time values when pressing the down arrow
        if (document.activeElement === hourRef.current) {
          setHour((prev) => (prev > 0 ? prev - 1 : 23));
        } else if (document.activeElement === minuteRef.current) {
          setMinute((prev) => (prev > 0 ? prev - 1 : 59));
        }
        break;

      case "ArrowRight":
        e.preventDefault(); // Prevent the default arrow key behavior
        // Navigate to the next input field or confirm the time when pressing the right arrow
        if (document.activeElement === hourRef.current) {
          minuteRef.current?.focus();
        } else if (document.activeElement === minuteRef.current) {
          handleConfirmTime();
        }
        break;

      default:
        break;
    }
  };

  if (time) {
    return (
      <div className="clock-container">
        <h2>
          {time.hour < 10 ? `0${time.hour}` : time.hour}:
          {time.minute < 10 ? `0${time.minute}` : time.minute}:
          {time.second < 10 ? `0${time.second}` : time.second}
        </h2>
      </div>
    );
  }

  return (
    <div className="clock-container" onKeyDown={handleKeyDown} tabIndex={0}>
      <form>
        <div className="input-container">
          <label>
            HOUR
            <input
              ref={hourRef}
              type="number"
              min="0"
              max="23"
              value={hour}
              onChange={(e) => setHour(parseInt(e.target.value))}
            />
          </label>
          <label>
            MINUTE
            <input
              ref={minuteRef}
              type="number"
              min="0"
              max="59"
              value={minute}
              onChange={(e) => setMinute(parseInt(e.target.value))}
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default Clock;
