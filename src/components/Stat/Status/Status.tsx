import pipBoyWalk from "./pip-boy-walk.gif";
import "./Status.css";

const Status = () => {
  return (
    <div className="status-container">
      <div className="gauge-col-end">
        <div className="health-gauge-low" />
        <div className="health-gauge" />
      </div>
      <div className="gauge-col-center">
        <div className="health-gauge" />
        <img className="image" src={pipBoyWalk} alt="walk" />
        <div className="health-gauge" />
      </div>
      <div className="gauge-col-end">
        <div className="health-gauge" />
        <div className="health-gauge" />
      </div>
    </div>
  );
};

export default Status;
