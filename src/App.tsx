import { useState } from "react";
import "./App.css";
import Header, { Tabs } from "./components/Header";

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
        <pre>{activeTab}</pre>
      </div>
    </div>
  );
}

export default App;
