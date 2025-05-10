import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { Layer, Map, Source } from "react-map-gl/mapbox";

import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./layers";

import { MAPBOX_TOKEN } from "@/constants/map";
import { useTheme } from "@heroui/use-theme";
import type { GeoJSONSource, MapMouseEvent } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { MapRef } from "react-map-gl/mapbox";

type TPoint = {
  latitude: number;
  longitude: number;
};

type Props = {
  defaultZoom?: number;
  defaultCenter?: TPoint;
  data?: GeoJSON.GeoJSON[];
};

export default function TestMap({
  defaultZoom = 14,
  defaultCenter,
  data,
}: Props) {
  const mapRef = useRef<MapRef | null>(null);
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  const onClick = (event: MapMouseEvent) => {
    const feature = event.features?.[0];
    if (!feature) return;

    const clusterId = feature.properties?.cluster_id;
    if (!clusterId) return;

    const mapboxSource = mapRef.current?.getSource(
      "earthquakes",
    ) as GeoJSONSource;

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) return;

      const coordinates = (feature.geometry as GeoJSON.Point).coordinates;

      mapRef.current?.easeTo({
        center: coordinates as [number, number],
        zoom: zoom ?? defaultZoom,
        duration: 500,
      });
    });
  };

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      const geolocateControl = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      });

      mapRef.current.addControl(geolocateControl);

      geolocateControl.trigger();

      return () => {
        if (mapRef.current) {
          mapRef.current.removeControl(geolocateControl);
        }
      };
    }
  }, [isLoaded]);

  const colors = ["#11b4da", "#ff0000"];

  return (
    <>
      <Map
        initialViewState={{
          latitude: defaultCenter?.latitude ?? 41.20066,
          longitude: defaultCenter?.longitude ?? 69.236537,
          zoom: defaultZoom,
        }}
        mapStyle={`mapbox://styles/mapbox/${theme}-v9`}
        mapboxAccessToken={MAPBOX_TOKEN}
        // interactiveLayerIds={[clusterLayer({source: }).id!]}
        onClick={onClick}
        ref={mapRef}
        performanceMetricsCollection
        onLoad={() => setIsLoaded(true)}
      >
        {data?.map((el, i) => (
          <Source
            key={i}
            id={`earthquakes_${i}`}
            type="geojson"
            data={el}
            cluster={true}
            clusterMaxZoom={14}
            clusterRadius={50}
          >
            <Layer
              {...clusterLayer({
                source: `earthquakes_${i}`,
                id: i.toString(),
              })}
            />
            <Layer
              {...clusterCountLayer({
                source: `earthquakes_${i}`,
                id: i.toString(),
              })}
            />
            <Layer
              {...unclusteredPointLayer({
                source: `earthquakes_${i}`,
                id: i.toString(),
                color: colors[i]
              })}
            />
          </Source>
        ))}
      </Map>
    </>
  );
}
