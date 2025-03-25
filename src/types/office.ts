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
  early_came: number
}