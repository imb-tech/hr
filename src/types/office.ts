type TOffice = {
  id: number;
  name: string;
  address: string;
  lunch_start: string;
  lunch_end: string;
};

type Office = TOffice & { users: number };
type OfficeFields = TOffice & { users: string };


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