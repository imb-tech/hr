type Human = {
  id: number;
  full_name: string;
  phone_number: string | number;
  phone_number2: string;
  address: string;
  residence: string;
  id_number: string;
  role: string | number;
  salary: number | string | undefined;
  education: string | number;
  password?: string
  first_name?: string
  last_name?: string
  image?: string
  username?: string
  company?:string | number
  groups?: { id: number, name: string }[]
};

type HumanYear = {
  year: number;
  late_count: number;
  early_checkout:string
  fine: string;
  late_duraction: string
  month: string
  late_duration:string
  user:number
  salary:number
  left_time:string
  attendance_time:string
  shift_end_time:string
  shift_start_time:string
  status:string
  id:number
}