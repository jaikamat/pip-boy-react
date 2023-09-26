import { useEffect } from "react";
import dragonCon from "./atlanta-dragoncon.json";
import { MapContainer, GeoJSON, useMap, GeoJSONProps } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import leaflet from "leaflet";
import "./Map.css";
import MarkerClusterGroup from "react-leaflet-cluster";

// @ts-ignore
const createCustomIcon = (text) => {
  return leaflet.divIcon({
    className: "custom-icon",
    html: `<div class="custom-icon-text">${text}</div>`,
    iconSize: [15, 15], // size of the icon
    iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -15], // point from which the popup should open relative to the iconAnchor
  });
};

// @ts-ignore
const pointToLayer = (feature, latlng) => {
  if (!feature.properties.name) return;

  const icon = createCustomIcon(feature.properties.name);
  return leaflet.marker(latlng, { icon });
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

// TODO: Gotta see how we can get the hotel names in there, for some reason they are not visible
const Map = () => {
  return (
    <MapContainer
      preferCanvas
      zoomControl={false}
      attributionControl={false}
      center={[33.761585, -84.385612]}
      zoom={17}
      maxZoom={30}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        outline: "none",
      }}
    >
      <FocusOnLoad />
      <MarkerClusterGroup
        animate={false}
        removeOutsideVisibleBounds
        disableClusteringAtZoom={19}
      >
        <GeoJSON
          data={dragonCon as GeoJSONProps["data"]}
          pathOptions={{ color: "darkgreen" }}
          // @ts-ignore
          pointToLayer={pointToLayer}
        />
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;
