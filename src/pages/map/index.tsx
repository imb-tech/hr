import TestMap from "@/components/map/test-map";
import { COMPANIES } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { useSearch } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { MapRef } from "react-map-gl/mapbox";
import MapFilters from "./map-filters";

// FAKE DATA
const locations = Array.from({ length: 15 }, () => [
  +(69.15 + Math.random() * (69.4 - 69.15)).toFixed(6),
  +(41.2 + Math.random() * (41.4 - 41.2)).toFixed(6),
]);

// FAKE DATA
const locations2 = Array.from({ length: 15 }, () => [
  +(69.15 + Math.random() * (69.4 - 69.15)).toFixed(6),
  +(41.2 + Math.random() * (41.4 - 41.2)).toFixed(6),
]);

// FAKE DATA
const center = { lat: 41.20066, lon: 69.236537 };
const offset = 0.0009;

// FAKE DATA
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

  const { data: companies } = useGet<FeatureCollection>(COMPANIES);
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

  const convertedPolygons: GeoJSON.FeatureCollection[] =
    companies?.features.map((feature, i) => ({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: feature.properties.polygon,
          properties: {
            id: feature.id,
            name: feature.properties.name,
            colorIndex: i,
            lat: feature.geometry.coordinates[0],
            lon: feature.geometry.coordinates[1],
          },
        },
      ],
    })) ?? [];

  return (
    <div className="h-[90%] w-full bottom-0">
      <MapFilters className="mb-3 flex items-center gap-3" />
      <TestMap
        ref={ref}
        defaultZoom={17}
        points={data}
        polygons={companies ? convertedPolygons : []}
      />
    </div>
  );
}
