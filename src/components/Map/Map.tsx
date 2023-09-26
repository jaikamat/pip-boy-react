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

// @ts-ignore
const createCustomIcon = (text) => {
  return leaflet.divIcon({
    className: "custom-marker",
    html: `<div class="custom-marker-text">${text}</div>`,
    iconSize: [8, 8],
    iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -15], // point from which the popup should open relative to the iconAnchor
  });
};

// @ts-ignore
const createCustomStreetMarker = (text) => {
  return leaflet.divIcon({
    className: "custom-street-marker",
    html: `<div class="custom-street-marker-text">${text}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -15], // point from which the popup should open relative to the iconAnchor
  });
};

// @ts-ignore
const createClusterCustomIcon = function (cluster) {
  return leaflet.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: [25, 25],
  });
};

function getCenterOfLineString(lineString: any): [number, number] {
  const latlngs = lineString.coordinates.map((coord: any) => [
    coord[1],
    coord[0],
  ]);
  const middleIndex = Math.floor(latlngs.length / 2);
  return latlngs[middleIndex];
}

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
      // TODO: this doesn't like "undefined" as a return value
      // @ts-ignore
      pointToLayer={(feature, latlng) => {
        if (!feature.properties.name) return;

        const icon = createCustomIcon(feature.properties.name);
        return leaflet.marker(latlng, { icon });
      }}
      onEachFeature={(feature, layer) => {
        let markerData: MarkerData | undefined;

        // TODO: how to orient the strings along their paths?
        // if (feature.geometry.type === "LineString" && feature.properties.name) {
        //   const center = getCenterOfLineString(feature.geometry);
        //   const icon = createCustomStreetMarker(feature.properties.name);
        //   markerData = { position: center, icon };
        // }

        if (feature.geometry.type === "Polygon" && feature.properties.name) {
          // @ts-ignore
          const centroid = layer.getBounds().getCenter();
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
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        outline: "none",
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
