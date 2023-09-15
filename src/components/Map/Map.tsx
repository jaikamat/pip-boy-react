import React, { useState, useEffect } from "react";
import { Group } from "@visx/group";
import { Mercator } from "@visx/geo";
import us from "./us-10m.json";
import { feature } from "topojson-client";
import { FeatureCollection, Geometry } from "geojson";

const Map = () => {
  const width: number = 799;
  const height: number = 479;

  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(4);

  const handleKeyDown = (event: KeyboardEvent) => {
    const PAN_AMOUNT = 20;
    const ZOOM_AMOUNT = 0.1;

    switch (event.key) {
      case "ArrowUp":
        if (event.metaKey) {
          setZoom((prevZoom) => prevZoom + ZOOM_AMOUNT);
        }
        setOffsetY((prevState) => prevState - PAN_AMOUNT);
        break;
      case "ArrowDown":
        if (event.metaKey) {
          setZoom((prevZoom) => prevZoom - ZOOM_AMOUNT);
        }
        setOffsetY((prevState) => prevState + PAN_AMOUNT);
        break;
      case "ArrowLeft":
        setOffsetX((prevState) => prevState - PAN_AMOUNT);
        break;
      case "ArrowRight":
        setOffsetX((prevState) => prevState + PAN_AMOUNT);
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // @ts-ignore
  const geoData = feature(
    us as any,
    us.objects.states as any
  ) as FeatureCollection<Geometry>;

  return (
    <svg width={width} height={height}>
      <Group left={offsetX} top={offsetY}>
        <Mercator
          graticuleLines={{ foreground: true }}
          data={geoData.features}
          scale={zoom * 100}
          //   center={[87, 39]}
          //   translate={[width + width / 2, height]}
          translate={[width + width / 2, height]}
        >
          {(mercator) => {
            return (
              <g>
                {mercator.features.map((feature, i) => {
                  const { feature: f } = feature;
                  return (
                    <path
                      key={`map-feature-${i}`}
                      d={mercator.path(f) || ""}
                      stroke="#1adc09"
                      strokeWidth={0.5}
                      fill="none"
                    />
                  );
                })}
              </g>
            );
          }}
        </Mercator>
      </Group>
    </svg>
  );
};

export default Map;
