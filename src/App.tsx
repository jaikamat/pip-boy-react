import { useState } from "react";
import "./App.css";
import Header, { Tabs } from "./components/Header";
import Stat from "./components/Stat";

function App() {
  const [activeTab, setActiveTab] = useState<string>(Tabs.STAT);

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Header onChange={(tab) => setActiveTab(tab)} activeTab={activeTab} />
        {/* TODO: Hacky, don't do this */}
        <br />
        {activeTab === Tabs.STAT && <Stat />}
      </div>
    </div>
  );
}

export default App;
