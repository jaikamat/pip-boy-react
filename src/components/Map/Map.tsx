import React, { useEffect, useState } from "react";
import { Graticule, Mercator } from "@visx/geo";
import * as topojson from "topojson-client";
import topology from "./world-topo.json";

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

const Map: React.FC = () => {
  const width: number = 799;
  const height: number = 479;
  const centerX = width / 2;
  const centerY = height / 2;
  const initialScale = (width / 630) * 100;

  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [scale, setScale] = useState<number>(initialScale);

  const adjustOffsetsForZoom = (zoomFactor: number) => {
    // Calculate zoom focal point. This is the center of the current SVG content's visible part.
    const focalX = offsetX;
    const focalY = offsetY - 50;

    // Adjust the offsets based on the zoom factor and the focal point
    setOffsetX(
      (prevOffset) => prevOffset + (focalX - prevOffset) * (1 - zoomFactor)
    );
    setOffsetY(
      (prevOffset) => prevOffset + (focalY - prevOffset) * (1 - zoomFactor)
    );
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const PAN_AMOUNT = 30;
    const ZOOM_AMOUNT = 1.5; // This can be adjusted. Greater than 1 for zooming in, less than 1 for zooming out

    switch (event.key) {
      case "ArrowUp":
        if (event.metaKey) {
          setScale((prevScale) => prevScale * ZOOM_AMOUNT);
          adjustOffsetsForZoom(ZOOM_AMOUNT);
        } else {
          setOffsetY((prevState) => prevState + PAN_AMOUNT);
        }
        break;
      case "ArrowDown":
        if (event.metaKey) {
          setScale((prevScale) => prevScale / ZOOM_AMOUNT);
          adjustOffsetsForZoom(1 / ZOOM_AMOUNT);
        } else {
          setOffsetY((prevState) => prevState - PAN_AMOUNT);
        }
        break;
      case "ArrowLeft":
        setOffsetX((prevState) => prevState + PAN_AMOUNT);
        break;
      case "ArrowRight":
        setOffsetX((prevState) => prevState - PAN_AMOUNT);
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <svg width={width} height={height}>
      <Mercator
        data={world.features}
        scale={scale}
        translate={[centerX + offsetX, centerY + 50 + offsetY]}
      >
        {(mercator) => (
          <g>
            {mercator.features.map(({ feature, path }, i) => (
              <path
                key={`map-feature-${i}`}
                d={path || ""}
                stroke="#1adc09"
                strokeWidth={2}
                // fill="url(#transparentToGreen)"
              />
            ))}
            <Graticule
              graticule={(g) => mercator.path(g) || ""}
              stroke="rgba(26, 220, 9, 0.2)"
              strokeWidth={2}
            />
          </g>
        )}
      </Mercator>
    </svg>
  );
};

export default Map;
