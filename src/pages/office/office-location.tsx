import { darkModeStyle } from "@/constants/map";
import { useButton } from "@heroui/button";
import { cn } from "@heroui/theme";
import { useTheme } from "@heroui/use-theme";
import {
  CircleF,
  GoogleMap,
  LoadScriptProps,
  PolygonF,
  useLoadScript,
} from "@react-google-maps/api";
import { useMemo, useState } from "react";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultZoom = 17;

const VITE_GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

type Props = {
  locations?: Pin[];
  setLocations?: (points: Pin[]) => void;
  required?: boolean;
  error?: boolean;
};

type Pin = {
  lat: number;
  lng: number;
};

function OfficeLocationSelect({
  locations,
  setLocations,
  required = false,
  error,
}: Props) {
  const [lat, lng] = [41.200777, 69.236642];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: VITE_GOOGLE_MAP_API_KEY,
  } as LoadScriptProps);

  const { theme } = useTheme();
  const [polygonCoordinates, setPolygonCoordinates] = useState<Pin[]>(
    locations ?? [],
  );
  const [zoomLevel, setZoomLevel] = useState(defaultZoom);

  const btn = useButton({ color: "primary", size: "sm" });

  const handleMapLoad = (map: google.maps.Map) => {
    if (map) {
      map.panTo({ lat: +lat, lng: +lng });
      map.setZoom(defaultZoom);
      map.addListener("zoom_changed", () =>
        setZoomLevel(map.getZoom() || defaultZoom),
      );

      const addOfficeButton = document.createElement("button");
      addOfficeButton.setAttribute(
        "class",
        `${btn.getButtonProps()?.className} ml-2 mt-2 bg-success`,
      );
      addOfficeButton.setAttribute("type", "button");
      addOfficeButton.textContent = "Ofis qo'shish";
      addOfficeButton.disabled = polygonCoordinates.length < 3;

      const clearButton = document.createElement("button");

      clearButton.setAttribute(
        "class",
        `${btn.getButtonProps()?.className} ml-2 mt-2`,
      );
      clearButton.setAttribute("type", "button");
      clearButton.textContent = "Tozalash";

      clearButton.addEventListener("click", () => {
        setPolygonCoordinates([]);
        setPolygonCoordinates([]);
      });

      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(clearButton);
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(addOfficeButton);
    }
  };

  const circleRadius = useMemo(() => {
    const baseRadius = 8;
    const baseZoom = 17;
    const scaleFactor = Math.pow(1.5, baseZoom - zoomLevel);
    const newRadius = baseRadius * scaleFactor;
    return Math.min(Math.max(newRadius, 2), 50);
  }, [zoomLevel]);

  const coords = useMemo(
    () => polygonCoordinates,
    [circleRadius, polygonCoordinates],
  );

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng?.lat && event.latLng?.lng()) {
      setPolygonCoordinates((prev) => {
        const newCoords = [
          ...prev,
          { lat: event.latLng?.lat() || 0, lng: event.latLng?.lng() || 0 },
        ];
        setLocations?.(newCoords);
        return newCoords;
      });
    }
  };

  const handleCircleDrag = (
    index: number,
    event: google.maps.MapMouseEvent,
  ) => {
    if (event.latLng) {
      setPolygonCoordinates((prev) => {
        const newCoords = [...prev];

        if (event.latLng) {
          newCoords[index] = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };
        }

        setLocations?.(newCoords);
        return newCoords;
      });
    }
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
          // mapTypeControl: false,
          fullscreenControl: true,
          styles: theme === "light" ? [] : darkModeStyle,
          mapTypeControl: true,
          mapTypeControlOptions: {
            mapTypeIds: [
              google.maps.MapTypeId.ROADMAP,
              google.maps.MapTypeId.SATELLITE,
              google.maps.MapTypeId.TERRAIN,
            ],
            style: google.maps.MapTypeControlStyle.DEFAULT,
          },
          disableDefaultUI: true,
        }}
        zoom={defaultZoom}
        onClick={handleMapClick}
        onLoad={handleMapLoad}
        onZoomChanged={() => console.log("zoom")}
      >
        {/* Poligon */}
        {polygonCoordinates.length > 2 && (
          <PolygonF
            options={{
              fillColor: "#0000FF",
              fillOpacity: 0.3,
              strokeColor: "#0000FF",
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
            paths={polygonCoordinates}
          />
        )}

        {/* Har bir tanlangan nuqtani doira shaklida ko‘rsatish va drag qilish */}
        {coords.map((coord, index) => (
          <CircleF
            key={index}
            center={coord}
            draggable={true}
            options={{
              fillColor: "red",
              fillOpacity: 1,
              strokeColor: "black",
              strokeOpacity: 0.8,
              strokeWeight: 1,
              zIndex: 999,
            }}
            radius={circleRadius}
            onDrag={(event) => handleCircleDrag(index, event)}
          />
        ))}
      </GoogleMap>
    </div>
  );
}

export default OfficeLocationSelect;
