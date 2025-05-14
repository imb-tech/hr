import TestMap from "@/components/map/test-map";
import { getPolygonCentroid } from "@/components/map/util";
import { COMPANIES } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { useSearch } from "@tanstack/react-router";
import { useEffect, useMemo, useRef } from "react";
import { MapRef } from "react-map-gl/mapbox";
import MapFilters from "./map-filters";
import { findPolygonWithOutliers } from "./map-utils";

export default function MapPage() {
  const search = useSearch({ from: "__root__" });

  const { data: companies } = useGet<FeatureCollection>(COMPANIES);
  const data: GeoJSON.FeatureCollection[] = useMemo(
    () =>
      companies?.features?.map((company) => {
        const polygonCoords = company.properties.polygon.coordinates[0];
        const points = findPolygonWithOutliers(polygonCoords as any); // 32 ta nuqta

        return {
          type: "FeatureCollection",
          features: points.map((coords, idx) => ({
            type: "Feature",
            properties: {
              id: idx + 1,
              name: `Point ${idx + 1}`,
            },
            geometry: {
              type: "Point",
              coordinates: coords,
            },
          })),
        };
      }) ?? [],
    [companies],
  );

  const ref = useRef<MapRef | null>(null);

  useEffect(() => {
    if (ref.current && search.office) {
      const officeLoc = companies?.features?.find(
        (comp) => comp.id == search.office,
      );

      ref?.current.flyTo({
        center: [
          getPolygonCentroid(officeLoc?.properties.polygon.coordinates ?? []).x,
          getPolygonCentroid(officeLoc?.properties.polygon.coordinates ?? []).y,
        ],
        duration: 500,
        curve: 1.42,
        zoom: 17,
      });
    } else if (ref.current && search.id) {
      const officeLoc = data[0].features[Number(search.id ?? 0)];

      ref?.current.flyTo({
        center: (officeLoc.geometry as Geometry).coordinates,
        duration: 500,
        curve: 1.42,
        zoom: 17,
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
