type TOffice = {
  id: number;
  name: string;
  address: string;
  lunch_start: string;
  lunch_end: string;
};

type Office = TOffice & { users: number };
type OfficeFields = TOffice & { users: string };
