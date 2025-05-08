type Human = {
  profile: {
    phone_number: string | number;
    phone_number2: string;
    id_number: string;
    address: string;
    residence: string;
    education: string | number;
  }
  phone_number: string | number;
  phone_number2: string;
  id_number: string;
  address: string;
  residence: string;
  education: string | number;
  id: number;
  middle_name: string;
  role: string | number;
  salary: number | string | undefined;
  password?: string
  first_name?: string
  last_name?: string
  image?: string
  username?: string
  companies?: any
  role_name?: string
  work_shift_start: string,
  work_shift_end: string,
  work_days: number[],
};

type HumanYear = {
  year: number;
  late_count: number;
  early_checkout: string
  fine: string;
  late_duraction: string
  month: string
  late_duration: string
  user: number
  salary: number
  left_time: string
  attendance_time: string
  shift_end_time: string
  shift_start_time: string
  status: string
  id: number
}