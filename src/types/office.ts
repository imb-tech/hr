type Geometry = {
  type: "Point";
  coordinates: [number, number];
};

type Polygon = {
  type: "Polygon";
  coordinates: number[][][];
};


type Properties ={
  address: string;
  lunch_start_time: string;
  lunch_end_time: string;
  name: string;
  polygon: Polygon;
  users:string;
  locations: string[];
}


type Office = {
  type: "Feature";
  id: number;
  geometry: Geometry;
  properties:Properties;
};

type FeatureCollection = {
  type: "FeatureCollection";
  features: Office[];
};


type OfficeInfo = {
  position: string
  workers: number
  in_office: number
  lated: number
  dont_came: number
  early_left: number
}


type WorkerInfo = {
  id: number
  full_name: string
  coming_time: string
  work_duration: string
  lating_time: string
  early_left: string
  live_location: string
  left_time: string
}