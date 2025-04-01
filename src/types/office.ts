type TOffice = {
  id: number;
  name: string;
  address: string;
  lunch_start_time: string;
  lunch_end_time: string;
  location: {
    coordinates: Array<number>
  },
  polygon: {
    coordinates: [
      // [
      //   [
      //     -73.935242,
      //     40.73061
      //   ],
      //   [
      //     -73.936,
      //     40.731
      //   ],
      //   [
      //     -73.937,
      //     40.7305
      //   ],
      //   [
      //     -73.935242,
      //     40.73061
      //   ]
      // ]
    ]
  }
};

type Pin = { lat: number; lng: number };

type Office = TOffice & { users: number };
type OfficeFields = TOffice & { users: string, locations: Pin[] };


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