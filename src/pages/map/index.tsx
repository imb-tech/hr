import TestMap from "@/components/map/test-map";
import { useSearch } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { MapRef } from "react-map-gl/mapbox";
import MapFilters from "./map-filters";

const locations = Array.from({ length: 15 }, () => [
  +(69.15 + Math.random() * (69.4 - 69.15)).toFixed(6), // longitude
  +(41.2 + Math.random() * (41.4 - 41.2)).toFixed(6), // latitude
]);

const locations2 = Array.from({ length: 15 }, () => [
  +(69.15 + Math.random() * (69.4 - 69.15)).toFixed(6), // longitude
  +(41.2 + Math.random() * (41.4 - 41.2)).toFixed(6), // latitude
]);

const center = { lat: 41.20066, lon: 69.236537 };
const offset = 0.0009; // taxminan 100 metr

const locations3 = Array.from({ length: 10 }, () => [
  +(center.lon + (Math.random() * 2 - 1) * offset).toFixed(6),
  +(center.lat + (Math.random() * 2 - 1) * offset).toFixed(6),
]);

export default function MapPage() {
  const data: GeoJSON.FeatureCollection[] = [
    {
      type: "FeatureCollection",
      features: locations.map((crd, idx) => ({
        type: "Feature",
        properties: {
          id: idx + 1,
          name: `Point ${idx + 1}`,
        },
        geometry: {
          type: "Point",
          coordinates: crd,
        },
      })),
    },
    {
      type: "FeatureCollection",
      features: locations2.map((crd, idx) => ({
        type: "Feature",
        properties: {
          id: idx + 1,
          name: `Point ${idx + 1}`,
        },
        geometry: {
          type: "Point",
          coordinates: crd,
        },
      })),
    },
    {
      type: "FeatureCollection",
      features: locations3.map((crd, idx) => ({
        type: "Feature",
        properties: {
          id: idx + 1,
          name: `Point ${idx + 1}`,
        },
        geometry: {
          type: "Point",
          coordinates: crd,
        },
      })),
    },
  ];
  const search = useSearch({ from: "__root__" });

  const ref = useRef<MapRef | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref?.current.flyTo({
        center: [locations?.[0][0], locations?.[0][1]],
        duration: 1000,
        curve: 1.42,
        zoom: 16,
      });
    }
  }, [search]);

  return (
    <div className="h-[90%] w-full bottom-0">
      <MapFilters className="mb-3" />
      <TestMap data={data} ref={ref} />
    </div>
  );
}
