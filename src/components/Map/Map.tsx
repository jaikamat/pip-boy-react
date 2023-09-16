import { useEffect } from "react";
import * as topojson from "topojson-client";
import topology from "./world-topo.json";
import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface FeatureShape {
  type: "Feature";
  id: string;
  geometry: { coordinates: [number, number][][]; type: "Polygon" };
  properties: { name: string };
}

// @ts-expect-error
const world = topojson.feature(topology, topology.objects.units) as {
  type: "FeatureCollection";
  features: FeatureShape[];
};

const FocusOnLoad = () => {
  const map = useMap();

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        if (event.metaKey) {
          map.zoomIn();
        }
        break;
      case "ArrowDown":
        if (event.metaKey) {
          map.zoomOut();
        }
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    map.whenReady(() => {
      const mapContainer = map.getContainer();
      mapContainer.focus();
    });
  }, [map]);

  return null;
};

const Map = () => {
  return (
    <MapContainer
      preferCanvas
      zoomControl={false}
      attributionControl={false}
      center={[51.505, -0.09]}
      zoom={3}
      style={{
        width: "100%",
        height: "100%",
        // zIndex: 200,
        backgroundColor: "black",
        outline: "none",
      }}
    >
      <FocusOnLoad />
      <GeoJSON data={world} pathOptions={{ color: "#1adc09" }} />
    </MapContainer>
  );
};

export default Map;
