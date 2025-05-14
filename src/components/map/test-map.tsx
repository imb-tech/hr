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
// import { Building2 } from "lucide-react";
import { useSearch } from "@tanstack/react-router";
import type { GeoJSONSource, MapMouseEvent } from "mapbox-gl";
import type { MapRef } from "react-map-gl/mapbox";
import { CustomPopup } from "./custom-popup";
import { MapStyleSwitcher } from "./map-swticher";
import { getPolygonCentroid, polygonColors } from "./util";

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
  const [mapStyleId, setMapStyleId] = useState(
    theme === "dark" ? "dark-v11" : "light-v11",
  );

  const search = useSearch({ from: "__root__" });

  const [activePopup, setActivePopup] = useState<{
    lngLat: [number, number];
    properties: any;
  } | null>(null);

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
    if (search.id && points) {
      const usr = (points?.[0] as FeatureCollection)?.features[
        Number(search.id ?? 0)
      ];

      console.log(usr);

      if (usr) {
        setActivePopup({
          lngLat: usr.geometry.coordinates,
          properties: usr.properties,
        });
      }
    } else {
      setActivePopup(null);
    }
  }, [search, points]);

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
      mapStyle={`mapbox://styles/mapbox/${mapStyleId}`}
      mapboxAccessToken={MAPBOX_TOKEN}
      style={{ borderRadius: "10px" }}
      onClick={onClick}
      onLoad={() => setIsLoaded(true)}
    >
      <FullscreenControl />
      <MapStyleSwitcher
        initial={theme === "dark" ? "dark-v11" : "light-v11"}
        onChange={(id) => setMapStyleId(id)}
      />

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
              color: polygonColors[i],
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
              color: polygonColors[i],
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
          <Layer {...polygonFillLayer(i.toString(), polygonColors[i])} />
          <Layer {...polygonLineLayer(i.toString(), polygonColors[i])} />
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
          {/* <Building2 /> */}
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
