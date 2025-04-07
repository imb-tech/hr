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
  image?: string
  username?: string
  groups?: { id: number, name: string }[]
};
