import { useState } from "react";
import "./App.css";
import Header, { Tabs } from "./components/Header";
import Stat from "./components/Stat";
import Footer from "./components/Footer/Footer";

function App() {
  const [activeTab, setActiveTab] = useState<string>(Tabs.STAT);

  return (
    <div className="container glow-text crt-effect">
      <div className="container-item">
        <Header onChange={(tab) => setActiveTab(tab)} activeTab={activeTab} />
      </div>
      <div className="container-item">
        {activeTab === Tabs.STAT && <Stat />}
        {activeTab === Tabs.EXP && <div>EXP goes here</div>}
        {activeTab === Tabs.MAP && <div>MAP goes here</div>}
        {activeTab === Tabs.DATA && <div>DATA goes here</div>}
        {activeTab === Tabs.COLOR && <div>COLOR goes here</div>}
      </div>
      <div className="container-item">
        <Footer />
      </div>
    </div>
  );
}

export default App;
