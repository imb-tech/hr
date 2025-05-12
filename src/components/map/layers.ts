import type { LayerProps } from "react-map-gl/mapbox";

export const clusterLayer = ({
  source,
  id,
  color,
}: {
  source: string;
  id: string;
  color?: string;
}): LayerProps => {
  return {
    id: "clusters-" + id,
    type: "circle",
    source,
    filter: ["has", "point_count"],
    paint: {
      "circle-color": [
        "step",
        ["get", "point_count"],
        color,
        100,
        color,
        750,
        color,
      ],
      "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
    },
  };
};

export const clusterCountLayer = ({
  source,
  id,
}: {
  source: string;
  id: string;
}): LayerProps => {
  return {
    id: "cluster-count-" + id,
    type: "symbol",
    source,
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 16,
    },
    paint: {
      "text-color": "#fff",
    },
  };
};

export const unclusteredPointLayer = ({
  source,
  id,
  color,
}: {
  source: string;
  id: string;
  color?: string;
}): LayerProps => {
  return {
    id: "unclustered-point-" + id,
    type: "circle",
    source,
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": color ?? "#11b4da",
      "circle-radius": 5,
      "circle-stroke-width": 0.5,
      "circle-stroke-color": "#fff",
    },
  };
};

export const polygonFillLayer = (id: string): LayerProps => ({
  id: `polygon-fill-${id}`,
  type: "fill",
  source: `polygon-source-${id}`,
  paint: {
    "fill-color": "#11b4da",
    "fill-opacity": 0.1,
  },
});

export const polygonLineLayer = (id: string): LayerProps => ({
  id: `polygon-line-${id}`,
  type: "line",
  source: `polygon-source-${id}`,
  paint: {
    "line-color": "#11b4da",
    "line-width": 1,
  },
});
