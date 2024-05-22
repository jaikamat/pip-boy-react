import { ReactNode } from "react";
import "./Loader.css";

const Loader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="loader">
      <div className="loader-animation">{children}</div>
    </div>
  );
};

export default Loader;
