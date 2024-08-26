import { useState, lazy, Suspense } from "react";
import "./App.css";
import Header, { Tabs } from "./components/Header";
import Stat from "./components/Stat";
import Footer from "./components/Footer/Footer";
import Inv from "./components/Inv/Inv";
import ScanlineOverlay from "./components/ScanlineOverlay/ScanlineOverlay";
import Loader from "./components/Loader/Loader";
import { ClockProvider } from "./hooks/clockProvider";
import Clock from "./components/Clock";
import Fun from "./components/Fun";

// const LazyLoadedMap = lazy(() => import("./components/Map/Map"));

// TODO: Trying a default wait time?
const LazyLoadedMap = lazy(() => {
  return Promise.all([
    import("./components/Map/Map"),
    new Promise((resolve) => setTimeout(resolve, 300)),
  ]).then(([moduleExports]) => moduleExports);
});

function App() {
  const [activeTab, setActiveTab] = useState<string>(Tabs.STAT);

  return (
    <ClockProvider>
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
            <Suspense fallback={<Loader>Loading map, please wait...</Loader>}>
              <LazyLoadedMap />
            </Suspense>
          )}
          {activeTab === Tabs.FUN && <Fun />}
          {activeTab === Tabs.CLOCK && <Clock />}
        </div>
        <div className="container-item">
          <Footer />
        </div>
      </div>
    </ClockProvider>
  );
}

export default App;
