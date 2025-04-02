"use client";

import { darkModeStyle } from "@/constants/map";
import { useButton } from "@heroui/button";
import { cn } from "@heroui/theme";
import { useTheme } from "@heroui/use-theme";
import {
  CircleF,
  GoogleMap,
  type LoadScriptProps,
  Polygon,
  useLoadScript,
} from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";

declare global {
  interface Window {
    google: any;
  }
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultZoom = 17;

const VITE_GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

type Props = {
  handleMapChange?: (geoJSON: any) => void;
  required?: boolean;
  error?: boolean;
  initialValue?: any;
};

type Pin = {
  lat: number;
  lng: number;
};

function OfficeLocationSelect({
  handleMapChange,
  required = false,
  error,
  initialValue,
}: Props) {
  const [lat, lng] = [41.200777, 69.236642];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: VITE_GOOGLE_MAP_API_KEY,
  } as LoadScriptProps);

  const { theme } = useTheme();
  const [polygonCoordinatesList, setPolygonCoordinatesList] = useState<Pin[][]>(
    [[]],
  );
  const [activePolygonIndex, setActivePolygonIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(defaultZoom);

  const btn = useButton({ color: "primary", size: "sm" });

  useEffect(() => {
    if (initialValue && initialValue?.length > 0) {
      const values = initialValue.map((itemE: any) =>
        itemE?.map((item: any) => {
          return { lat: item[1], lng: item[0] };
        }),
      );
      setPolygonCoordinatesList(values);
    }
  }, [initialValue]);

  useEffect(() => {
    if (polygonCoordinatesList[0].length > 2) {
      updateLocations(polygonCoordinatesList);
    }
  }, [polygonCoordinatesList]);

  const handleMapLoad = (map: google.maps.Map) => {
    if (map) {
      map.panTo({ lat: +lat, lng: +lng });
      map.setZoom(defaultZoom);
      map.addListener("zoom_changed", () =>
        setZoomLevel(map.getZoom() || defaultZoom),
      );

      const newPolygonButton = document.createElement("button");
      newPolygonButton.setAttribute(
        "class",
        `${btn.getButtonProps()?.className} ml-2 mt-2 bg-success`,
      );
      newPolygonButton.setAttribute("type", "button");
      newPolygonButton.textContent = "Ofis qo'shish";

      newPolygonButton.addEventListener("click", () => {
        setPolygonCoordinatesList((prev) => [...prev, []]);
        setActivePolygonIndex((prev) => prev + 1);
      });

      const clearAllButton = document.createElement("button");
      clearAllButton.setAttribute(
        "class",
        `${btn.getButtonProps()?.className} ml-2 mt-2`,
      );
      clearAllButton.setAttribute("type", "button");
      clearAllButton.textContent = "Hammasini tozalash";

      clearAllButton.addEventListener("click", () => {
        setPolygonCoordinatesList([[]]);
        setActivePolygonIndex(0);
        handleMapChange?.(null);
      });

      map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(
        clearAllButton,
      );
      map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(
        newPolygonButton,
      );
    }
  };

  const circleRadius = useMemo(() => {
    const baseRadius = 8;
    const baseZoom = 17;
    const scaleFactor = Math.pow(1.5, baseZoom - zoomLevel);
    const newRadius = baseRadius * scaleFactor;
    return Math.min(Math.max(newRadius, 2), 50);
  }, [zoomLevel]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng?.lat && event.latLng?.lng()) {
      setPolygonCoordinatesList((prev) => {
        const newList = [...prev];
        newList[activePolygonIndex] = [
          ...newList[activePolygonIndex],
          { lat: event.latLng?.lat() || 0, lng: event.latLng?.lng() || 0 },
        ];
        return newList;
      });
    }
  };

  const handleCircleDrag = (
    polygonIndex: number,
    pointIndex: number,
    event: google.maps.MapMouseEvent,
  ) => {
    if (event.latLng) {
      const newLat = event.latLng.lat();
      const newLng = event.latLng.lng();

      setPolygonCoordinatesList((prev) => {
        const newList = JSON.parse(JSON.stringify(prev));
        if (newList[polygonIndex] && newList[polygonIndex][pointIndex]) {
          newList[polygonIndex][pointIndex] = {
            lat: newLat,
            lng: newLng,
          };
        }
        return newList;
      });
    }
  };

  const handleCircleDragEnd = (
    polygonIndex: number,
    pointIndex: number,
    event: google.maps.MapMouseEvent,
  ) => {
    if (event.latLng) {
      const newLat = event.latLng.lat();
      const newLng = event.latLng.lng();

      setPolygonCoordinatesList((prev) => {
        const newList = JSON.parse(JSON.stringify(prev));
        if (newList[polygonIndex] && newList[polygonIndex][pointIndex]) {
          newList[polygonIndex][pointIndex] = {
            lat: newLat,
            lng: newLng,
          };
        }
        return newList;
      });

      setTimeout(() => {
        updateLocations(polygonCoordinatesList);
      }, 0);
    }
  };

  const updateLocations = (polygons: Pin[][]) => {
    const geoJSON = {
      type: "Polygon",
      coordinates: polygons
        .map((polygon) => polygon.map((point) => [point.lng, point.lat]))
        .filter((polygon) => polygon.length > 2),
    };

    geoJSON.coordinates.forEach((polygon, index) => {
      if (polygon.length > 2) {
        const firstPoint = polygon[0];
        const lastPoint = polygon[polygon.length - 1];

        if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) {
          geoJSON.coordinates[index].push(firstPoint);
        }
      }
    });

    if (geoJSON.coordinates.length > 0) {
      handleMapChange?.(geoJSON);
    }
  };

  const handlePolygonClick = (polygonIndex: number) => {
    setActivePolygonIndex(polygonIndex);
  };

  if (loadError) return <div>Xatolik yuz berdi</div>;
  if (!isLoaded)
    return (
      <div className="flex items-center justify-center w-full h-full">
        Yuklanmoqda...
      </div>
    );

  return (
    <div className="relative w-full !h-[300px] overflow-hidden">
      <p className={cn("mb-1", error ? "text-danger-500" : "")}>
        Ofis maydonini belgilang
        {required ? <span className="text-danger-500">*</span> : ""}
      </p>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        options={{
          zoomControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          styles: theme === "light" ? [] : darkModeStyle,
          mapTypeControl: true,
          mapTypeControlOptions: {
            mapTypeIds: [
              window.google.maps.MapTypeId.ROADMAP,
              window.google.maps.MapTypeId.SATELLITE,
              window.google.maps.MapTypeId.TERRAIN,
            ],
            style: window.google.maps.MapTypeControlStyle.DEFAULT,
          },
          disableDefaultUI: true,
        }}
        zoom={defaultZoom}
        onClick={handleMapClick}
        onLoad={handleMapLoad}
      >
        {polygonCoordinatesList.map((polygonCoordinates, polygonIndex) => (
          <div key={`polygon-${polygonIndex}`}>
            {/* Polygon */}
            {polygonCoordinates.length > 2 && (
              <Polygon
                options={{
                  fillColor:
                    activePolygonIndex === polygonIndex ? "#FF0000" : "#0000FF",
                  fillOpacity: 0.3,
                  strokeColor:
                    activePolygonIndex === polygonIndex ? "#FF0000" : "#0000FF",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  clickable: true,
                }}
                paths={polygonCoordinates}
                onClick={() => handlePolygonClick(polygonIndex)}
              />
            )}

            {/* Points for each polygon */}
            {polygonCoordinates.map((coord, pointIndex) => (
              <CircleF
                key={`polygon-${polygonIndex}-point-${pointIndex}`}
                center={coord}
                draggable={true}
                options={{
                  fillColor:
                    activePolygonIndex === polygonIndex ? "red" : "blue",
                  fillOpacity: 1,
                  strokeColor: "black",
                  strokeOpacity: 0.8,
                  strokeWeight: 1,
                  zIndex: 1000,
                }}
                radius={circleRadius}
                onDrag={(event) =>
                  handleCircleDrag(polygonIndex, pointIndex, event)
                }
                onDragEnd={(event) =>
                  handleCircleDragEnd(polygonIndex, pointIndex, event)
                }
              />
            ))}
          </div>
        ))}
      </GoogleMap>
    </div>
  );
}

export default OfficeLocationSelect;
