type Geometry = {
  type: "Point";
  coordinates: [number, number];
};

type Polygon = {
  type: "Polygon";
  coordinates: number[][][];
};


type Properties = {
  address: string;
  lunch_start_time: string;
  lunch_end_time: string;
  name: string;
  polygon: Polygon;
  users: string;
  locations: string[];
}


type Office = {
  type: "Feature";
  id: number;
  geometry: Geometry;
  properties: Properties;
};

type FeatureCollection = {
  type: "FeatureCollection";
  features: Office[];
};


type OfficeInfo = {
  id: number
  name: string
  total_workers_count: number
  checked_in_workers: number
  absent_users: number
  early_users: number
  late_users_count: number
}


type WorkerInfo = {
  id: number
  full_name: string
  entrance_time: string
  latency: string
  check_out_time: string
  last_company: string
}


type Company = {
  id: number;
  name: string;
  users_in_company: number;
  absent_users: number;
  total_users_count: number;
  absent_users_with_reason_count: number;
  absent_users_with_no_reason_count: number;
  late_users_count: number;
  arrived_on_time:number;
}
