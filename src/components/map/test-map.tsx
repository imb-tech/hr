import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  FullscreenControl,
  Layer,
  Map,
  Marker,
  Source,
} from "react-map-gl/mapbox";
import {
  clusterCountLayer,
  clusterLayer,
  polygonFillLayer,
  polygonLineLayer,
  unclusteredPointLayer,
} from "./layers";

import { MAPBOX_TOKEN } from "@/constants/map";
import { useTheme } from "@heroui/use-theme";
import { Building2 } from "lucide-react";
import type { GeoJSONSource, MapMouseEvent } from "mapbox-gl";
import type { MapRef } from "react-map-gl/mapbox";
import { CustomPopup } from "./custom-popup";

type TPoint = {
  latitude: number;
  longitude: number;
};

type Props = {
  defaultZoom?: number;
  defaultCenter?: TPoint;
  points?: GeoJSON.GeoJSON[];
  polygons?: GeoJSON.FeatureCollection[];
};

// ForwardRef bilan wrapper
const TestMap = forwardRef<MapRef, Props>(function TestMapComponent(
  { defaultZoom = 14, defaultCenter, points, polygons }: Props,
  ref,
) {
  const internalMapRef = useRef<MapRef | null>(null);
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  const [activePopup, setActivePopup] = useState<{
    lngLat: [number, number];
    properties: any;
  } | null>(null);

  // Ref orqali tashqi kirish uchun mapRef ni expose qilish
  useImperativeHandle(ref, () => internalMapRef.current as MapRef, [
    internalMapRef.current,
  ]);

  const onClick = (event: MapMouseEvent) => {
    const feature = event.features?.[0];

    if (!feature) return;

    const { cluster_id } = feature.properties || {};

    const coordinates =
      feature.geometry.type === "Point"
        ? (feature.geometry.coordinates as [number, number])
        : (event.lngLat.toArray() as [number, number]);

    // Agar cluster bo‘lsa – zoom qilish
    if (cluster_id) {
      const mapboxSource = internalMapRef.current?.getSource(
        "earthquakes",
      ) as GeoJSONSource;

      mapboxSource.getClusterExpansionZoom(cluster_id, (err, zoom) => {
        if (err) return;

        internalMapRef.current?.easeTo({
          center: coordinates,
          zoom: zoom ?? defaultZoom,
          duration: 500,
        });
      });
    } else if (feature.geometry.type === "Point" && internalMapRef?.current) {
      const coordinates = feature.geometry.coordinates as [number, number];

      internalMapRef?.current.flyTo({
        center: coordinates,
        duration: 1000,
        curve: 1.42,
        zoom: 18,
      });

      setActivePopup({
        lngLat: coordinates,
        properties: feature.properties,
      });
    }
  };

  useEffect(() => {
    if (isLoaded && internalMapRef.current) {
      const geolocateControl = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      });

      internalMapRef.current.addControl(geolocateControl);
      geolocateControl.trigger();

      return () => {
        internalMapRef.current?.removeControl(geolocateControl);
      };
    }
  }, [isLoaded]);

  const colors = ["#11b4da", "#ff0000", "#008000", "#ff0000", "#ff0000"];

  return (
    <Map
      ref={internalMapRef}
      performanceMetricsCollection
      initialViewState={{
        latitude: defaultCenter?.latitude ?? 41.20066,
        longitude: defaultCenter?.longitude ?? 69.236537,
        zoom: defaultZoom,
      }}
      interactiveLayerIds={[
        ...(points
          ?.map((_, i) => [
            `unclustered-point-${i}`,
            `cluster-${i}`,
            `cluster-count-${i}`,
          ])
          ?.flat() ?? []),
      ]}
      language="uz-UZ"
      mapStyle={`mapbox://styles/mapbox/${theme}-v9`}
      mapboxAccessToken={MAPBOX_TOKEN}
      style={{ borderRadius: "10px" }}
      onClick={onClick}
      onLoad={() => setIsLoaded(true)}
    >
      <FullscreenControl />
      {points?.map((el, i) => (
        <Source
          key={i}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
          data={el}
          id={`earthquakes_${i}`}
          type="geojson"
        >
          <Layer
            {...clusterLayer({
              source: `earthquakes_${i}`,
              id: i.toString(),
              color: colors[i],
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
              color: colors[i],
            })}
          />
        </Source>
      ))}

      {polygons?.map((polygon, i) => (
        <Source
          key={`polygon-${i}`}
          data={polygon}
          id={`polygon-source-${i}`}
          type="geojson"
        >
          <Layer {...polygonFillLayer(i.toString())} />
          <Layer {...polygonLineLayer(i.toString())} />
        </Source>
      ))}

      {polygons?.map((polygon, i) => (
        <Marker
          key={i}
          anchor="bottom"
          latitude={
            getPolygonCentroid(
              (polygon.features[0]?.geometry as any)?.coordinates,
            ).y
          }
          longitude={
            getPolygonCentroid(
              (polygon.features[0]?.geometry as any)?.coordinates,
            ).x
          }
        >
          <Building2 />
        </Marker>
      ))}

      {activePopup && (
        <CustomPopup
          lat={activePopup.lngLat[1]}
          lng={activePopup.lngLat[0]}
          properties={activePopup.properties}
          onClose={() => setActivePopup(null)}
        />
      )}
    </Map>
  );
});

export default TestMap;

function getPolygonCentroid(coordinates: number[][][]): {
  x: number;
  y: number;
} {
  const polygon = coordinates[0]; // faqat tashqi ringni olamiz
  let area = 0;
  let x = 0;
  let y = 0;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [x0, y0] = polygon[i];
    const [x1, y1] = polygon[j];
    const f = x0 * y1 - x1 * y0;

    area += f;
    x += (x0 + x1) * f;
    y += (y0 + y1) * f;
  }

  area *= 0.5;
  if (area === 0) {
    // fallback: o‘rtacha nuqta
    const total = polygon.reduce(
      (acc, coord) => [acc[0] + coord[0], acc[1] + coord[1]],
      [0, 0],
    );

    return { x: total[0] / polygon.length, y: total[1] / polygon.length };
  }

  x /= 6 * area;
  y /= 6 * area;

  return { x, y };
}
