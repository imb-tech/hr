import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { MAPBOX_TOKEN } from "@/constants/map";
import { useTheme } from "@heroui/use-theme";
import { useLocation } from "@tanstack/react-router";
import { useFormContext } from "react-hook-form";
import type { MapRef } from "react-map-gl/mapbox";
import { FullscreenControl, Map } from "react-map-gl/mapbox";
import { MapStyleSwitcher } from "./map-swticher";

type Props = {
  defaultCenter?: { latitude: number; longitude: number };
  defaultZoom?: number;
  name: string;
  defaultValues?: Office;
};

const DrawPolygonMap = forwardRef<MapRef, Props>(
  function DrawPolygonMapComponent(
    {
      defaultCenter = { latitude: 41.20066, longitude: 69.236537 },
      defaultZoom = 12,
      name,
      defaultValues,
    },
    ref,
  ) {
    const mapRef = useRef<MapRef | null>(null);
    const drawRef = useRef<MapboxDraw | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const { theme } = useTheme();

    const [mapStyleId, setMapStyleId] = useState(
      theme === "dark" ? "dark-v11" : "light-v11",
    );
    const location = useLocation();

    const form = useFormContext();

    useImperativeHandle(ref, () => mapRef.current as MapRef, [mapRef]);

    const handleGetPolygons = useCallback(() => {
      if (drawRef.current) {
        const data = drawRef.current.getAll();
        const coordinates: any[] = [];

        data?.features?.forEach((element) => {
          coordinates.push((element.geometry as Geometry).coordinates[0]);
        });

        form.setValue(name, {
          type: "Polygon",
          coordinates,
        });
      }
    }, [drawRef.current]);

    useEffect(() => {
      if (!mapRef.current || !isLoaded) return;
      const mapboxMap = mapRef.current.getMap();

      drawRef.current = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
        },
        defaultMode: "draw_polygon",
      });

      const geolocateControl = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      });

      mapRef.current.addControl(geolocateControl);
      geolocateControl.trigger();

      mapboxMap.addControl(drawRef.current);

      mapboxMap.on("draw.create", handleGetPolygons);
      mapboxMap.on("draw.update", handleGetPolygons);
      mapboxMap.on("draw.delete", handleGetPolygons);

      return () => {
        if (drawRef.current) {
          mapboxMap.removeControl(drawRef.current);
          mapRef.current?.removeControl(geolocateControl);
        }
      };
    }, [isLoaded]);

    useEffect(() => {
      if (!drawRef.current || !isLoaded || !defaultValues) return;

      if (location.pathname.startsWith("/office-edit")) {
        console.log("dasasdads");

        drawRef.current?.add({
          ...defaultValues,
          geometry: defaultValues.properties.polygon,
        });
      }
    }, [isLoaded, drawRef.current, defaultValues]);

    return (
      <div>
        <Map
          ref={mapRef}
          initialViewState={{
            latitude: defaultCenter.latitude,
            longitude: defaultCenter.longitude,
            zoom: defaultZoom,
          }}
          mapStyle={`mapbox://styles/mapbox/${mapStyleId}`}
          mapboxAccessToken={MAPBOX_TOKEN}
          style={{ height: 500, borderRadius: 10 }}
          onLoad={() => setIsLoaded(true)}
        >
          <FullscreenControl />
          <MapStyleSwitcher
            initial={theme === "dark" ? "dark-v11" : "light-v11"}
            onChange={(id) => setMapStyleId(id)}
          />
        </Map>
      </div>
    );
  },
);

export default DrawPolygonMap;
