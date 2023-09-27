import { useState, lazy, Suspense } from "react";
import "./App.css";
import Header, { Tabs } from "./components/Header";
import Stat from "./components/Stat";
import Footer from "./components/Footer/Footer";
import Inv from "./components/Inv/Inv";
import ScanlineOverlay from "./components/ScanlineOverlay/ScanlineOverlay";

const LazyLoadedMap = lazy(() => import("./components/Map/Map"));

function App() {
  const [activeTab, setActiveTab] = useState<string>(Tabs.STAT);

  return (
    <>
      <ScanlineOverlay />
      <div className="container">
        <div className="container-item">
          <Header
            onChange={(tab) => setActiveTab(tab)}
            initialTab={activeTab}
          />
        </div>
        <div className="container-item">
          {activeTab === Tabs.STAT && <Stat />}
          {activeTab === Tabs.INV && <Inv />}
          {activeTab === Tabs.MAP && (
            // TODO: make this loader sexier
            <Suspense fallback={<div>Loading map...</div>}>
              <LazyLoadedMap />
            </Suspense>
          )}
          {activeTab === Tabs.DATA && <div>DATA goes here</div>}
          {activeTab === Tabs.RADIO && <div>RADIO goes here</div>}
        </div>
        <div className="container-item">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
