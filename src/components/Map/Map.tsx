import { useEffect, useState } from "react";
import dragonCon from "./dragon-con.json";
import {
  MapContainer,
  GeoJSON,
  useMap,
  GeoJSONProps,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import leaflet from "leaflet";
import "./Map.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { LatLngExpression } from "leaflet";
import { DivIcon } from "leaflet";

const Keys = {
  ZoomIn: "j",
  ZoomOut: "k",
};

const createCustomIcon = (text: string) => {
  return leaflet.divIcon({
    className: "custom-marker",
    html: `<div class="custom-marker-text">${text}</div>`,
    iconSize: [8, 8],
    iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -15], // point from which the popup should open relative to the iconAnchor
  });
};

const createClusterCustomIcon = (cluster: { getChildCount: () => number }) => {
  return leaflet.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: [25, 25],
  });
};

const FocusOnLoad = () => {
  const map = useMap();

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case Keys.ZoomIn:
        map.zoomIn();
        break;
      case Keys.ZoomOut:
        map.zoomOut();
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

type MarkerData = {
  position: LatLngExpression;
  icon: DivIcon;
};

const GeoJsonDisplay = ({
  addMarkers,
}: {
  addMarkers: ([markers]: Array<MarkerData>) => void;
}) => {
  return (
    <GeoJSON
      data={dragonCon as GeoJSONProps["data"]}
      pathOptions={{ color: "darkgreen" }}
      pointToLayer={(feature, latlng) => {
        const icon = createCustomIcon(feature.properties.name);

        if (!feature.properties.name) return leaflet.marker([0, 0], { icon });
        return leaflet.marker(latlng, { icon });
      }}
      onEachFeature={(feature, layer) => {
        let markerData: MarkerData | undefined;

        if (feature.geometry.type === "Polygon" && feature.properties.name) {
          // Have to cast this as `getBounds` is not found, for some reason
          const centroid = (
            layer as unknown as {
              getBounds: () => { getCenter: () => LatLngExpression };
            }
          )
            .getBounds()
            .getCenter();
          const icon = createCustomIcon(feature.properties.name);
          markerData = { position: centroid, icon };
        }

        if (markerData) {
          addMarkers([markerData]); // Add the marker data to the state
        }
      }}
    />
  );
};

const Map = () => {
  const [markerDataList, setMarkerDataList] = useState<Array<MarkerData>>([]);

  const addMarkers = (newMarkerData: Array<MarkerData>) => {
    setMarkerDataList((prevMarkerDataList) => [
      ...prevMarkerDataList,
      ...newMarkerData,
    ]);
  };

  return (
    <MapContainer
      preferCanvas
      zoomControl={false}
      attributionControl={false}
      // Center on the Marriott
      center={[33.761585, -84.385612]}
      zoom={17}
      maxZoom={20}
      minZoom={15}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        outline: "none",
        zIndex: 0,
      }}
    >
      <FocusOnLoad />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
        animate={false}
        removeOutsideVisibleBounds
        disableClusteringAtZoom={19}
      >
        {markerDataList.map((markerData, index) => (
          <Marker
            key={index}
            position={markerData.position}
            icon={markerData.icon}
          />
        ))}
        <GeoJsonDisplay addMarkers={addMarkers} />
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;
