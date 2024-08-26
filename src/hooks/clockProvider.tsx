import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface Time {
  hour: number;
  minute: number;
  second: number;
}

interface ClockContextProps {
  time: Time | null;
  setTime: (time: Time) => void;
}

const ClockContext = createContext<ClockContextProps | undefined>(undefined);

export const useClock = () => {
  const context = useContext(ClockContext);
  if (!context) {
    throw new Error("useClock must be used within a ClockProvider");
  }
  return context;
};

interface ClockProviderProps {
  children: ReactNode;
}

export const ClockProvider: React.FC<ClockProviderProps> = ({ children }) => {
  const [time, setTime] = useState<Time | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (time) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (!prevTime) return prevTime;

          let { hour, minute, second } = prevTime;

          second++;
          if (second === 60) {
            second = 0;
            minute++;
          }
          if (minute === 60) {
            minute = 0;
            hour++;
          }
          if (hour === 24) {
            hour = 0; // Reset hour to 0 after 23:59:59
          }

          return { hour, minute, second };
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  return (
    <ClockContext.Provider value={{ time, setTime }}>
      {children}
    </ClockContext.Provider>
  );
};
