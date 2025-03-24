import { darkModeStyle } from "@/constants/map";
import { useTheme } from "@heroui/use-theme";
import {
  CircleF,
  GoogleMap,
  LoadScriptProps,
  PolygonF,
  useLoadScript,
} from "@react-google-maps/api";
import { useState } from "react";

const MAP_API_KEY = "AIzaSyDE1X4ckZsrfsMRRN2yN0NlXfdrS8kibAE";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultZoom = 17;

function OfficeLocationSelect() {
  const [lat, long] = [41.200777, 69.236642];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: MAP_API_KEY,
  } as LoadScriptProps);

  const { theme } = useTheme();

  const [polygonCoordinates, setPolygonCoordinates] = useState<
    { lat: number; lng: number }[]
  >([]);

  const handleMapLoad = (map: google.maps.Map) => {
    if (map) {
      map.panTo({ lat: +lat, lng: +long });
      map.setZoom(defaultZoom);
    }
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng?.lat && event.latLng?.lng()) {
      setPolygonCoordinates((prev) => [
        ...prev,
        { lat: event.latLng?.lat() || 0, lng: event.latLng?.lng() || 0 },
      ]);
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

        return newCoords;
      });
    }
  };

  if (loadError) return <div>Xatolik yuz berdi</div>;
  if (!isLoaded)
    return (
      <div className="flex items-center justify-center w-full h-full">
        Loading...
      </div>
    );

  return (
    <div className="relative w-full !h-[400px] overflow-hidden rounded-xl">
      <GoogleMap
        center={{ lat: +lat, lng: +long }}
        mapContainerStyle={mapContainerStyle}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
          styles: theme === "light" ? [] : darkModeStyle,
        }}
        zoom={defaultZoom}
        onClick={handleMapClick}
        onLoad={handleMapLoad}
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
        {polygonCoordinates.map((coord, index) => (
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
            radius={10}
            onDrag={(event) => handleCircleDrag(index, event)}
          />
        ))}
      </GoogleMap>
    </div>
  );
}

export default OfficeLocationSelect;
