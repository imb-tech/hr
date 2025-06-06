import DataTable, { ColumnDef } from "@/components/ui/table";
import { useMemo } from "react";

interface Driver {
  name: string;
  status: string;
  location: string;
  vehicle: string;
  break: string;
  drive: string;
  shift: string;
  cycle: string;
  violations?: string;
  eld?: string;
  updated: string;
}

export default function Drivers() {
  return <DataTable isHeaderSticky columns={useCols()} data={data} />;
}

const data: Driver[] = [
  {
    name: "a test driver",
    status: "Off Duty",
    location: "4703.0mi S from Tuktoyaktuk, Northwest Territories",
    vehicle: "130",
    break: "08:00",
    drive: "11:00",
    shift: "14:00",
    cycle: "70:00",
    violations: "",
    eld: "",
    updated: "07/29/2024",
  },
  {
    name: "Abdulrahman Saleh Obad Al Jabali",
    status: "Sleeper",
    location: "2mi N from Dearborn, MI",
    vehicle: "131",
    break: "08:00",
    drive: "00:00",
    shift: "00:36",
    cycle: "36:45",
    violations: "",
    eld: "",
    updated: "03/10/2025",
  },
  {
    name: "Bakhodir Nosirov",
    status: "Driving",
    location: "7mi S from Westville, IN",
    vehicle: "128",
    break: "07:35",
    drive: "10:35",
    shift: "13:19",
    cycle: "41:04",
    violations: "",
    eld: "Connected",
    updated: "12:40 AM EDT",
  },
  {
    name: "Husan Alimullayev Rustamovich",
    status: "Off Duty",
    location: "8mi NE from Baltimore, MD",
    vehicle: "777",
    break: "07:17",
    drive: "03:37",
    shift: "04:35",
    cycle: "26:06",
    violations: "",
    eld: "Connected",
    updated: "03/14/2025",
  },
  {
    name: "Kadirov Nodirjon",
    status: "Sleeper",
    location: "6mi SE from Wappingers falls, NY",
    vehicle: "7777",
    break: "08:00",
    drive: "06:08",
    shift: "06:14",
    cycle: "34:33",
    violations: "",
    eld: "Connected",
    updated: "12:30 AM EDT",
  },
  {
    name: "Khamidov Khasanjon Yusufjon",
    status: "On Duty",
    location: "7mi SW from Heath, OH",
    vehicle: "502",
    break: "08:00",
    drive: "02:12",
    shift: "00:55",
    cycle: "55:33",
    violations: "",
    eld: "",
    updated: "03/14/2025",
  },
  {
    name: "Khokhar Amin Qadar",
    status: "Driving",
    location: "8mi WSW from Amarillo, TX",
    vehicle: "050",
    break: "05:23",
    drive: "08:23",
    shift: "10:24",
    cycle: "19:10",
    violations: "",
    eld: "Connected",
    updated: "12:26 AM EDT",
  },
  {
    name: "Mohamed Yusuf Abdullahi",
    status: "Sleeper",
    location: "4mi SE from Worthington, OH",
    vehicle: "5319",
    break: "08:00",
    drive: "11:00",
    shift: "14:00",
    cycle: "69:10",
    violations: "",
    eld: "",
    updated: "10/12/2024",
  },
  {
    name: "Nabiyev Abdukhhamid A",
    status: "Sleeper",
    location: "2mi ENE from Shippensburg, PA",
    vehicle: "5455",
    break: "06:04",
    drive: "09:34",
    shift: "11:30",
    cycle: "67:30",
    violations: "",
    eld: "Connected",
    updated: "12:31 AM EDT",
  },
  {
    name: "Naji Mohammed Mohammed Ali",
    status: "Off Duty",
    location: "Hamtramck, MI",
    vehicle: "19",
    break: "08:00",
    drive: "00:00",
    shift: "00:33",
    cycle: "33:15",
    violations: "",
    eld: "",
    updated: "03/12/2025",
  },
  {
    name: "Nigmatjonov Akhmadjon Nariman",
    status: "On Duty",
    location: "7.0mi N from Eaton, OH",
    vehicle: "501",
    break: "08:00",
    drive: "07:27",
    shift: "05:22",
    cycle: "22:32",
    violations: "",
    eld: "Connected",
    updated: "12:40 AM EDT",
  },
  {
    name: "Oybek Roziev",
    status: "On Duty",
    location: "3mi ESE from Pooler, GA",
    vehicle: "129",
    break: "08:00",
    drive: "07:27",
    shift: "05:22",
    cycle: "22:32",
    violations: "",
    eld: "",
    updated: "12:40 AM EDT",
  },
  {
    name: "Rustamjon Nasirov",
    status: "Off Duty",
    location: "6mi WSW from Beech grove, IN",
    vehicle: "502",
    break: "08:00",
    drive: "05:31",
    shift: "05:35",
    cycle: "49:38",
    violations: "",
    eld: "Connected",
    updated: "12:38 AM EDT",
  },
  {
    name: "Saad Ahmed Saad Al Jawfi",
    status: "Driving",
    location: "3.0mi ENE from Vienna, VA",
    vehicle: "124",
    break: "03:56",
    drive: "06:56",
    shift: "08:56",
    cycle: "56:54",
    violations: "",
    eld: "",
    updated: "12:39 AM EDT",
  },
  {
    name: "Sayed Mohamed Saleh Ismail",
    status: "Driving",
    location: "2mi NW from Fenton, MI",
    vehicle: "20",
    break: "06:19",
    drive: "11:40",
    shift: "53:24",
    cycle: "",
    violations: "",
    eld: "",
    updated: "12:28 AM EDT",
  },
];

const useCols = () => {
  return useMemo<ColumnDef<Driver>[]>(
    () => [
      { header: "Name", dataKey: "name" },
      { header: "Status", dataKey: "status" },
      { header: "Location", dataKey: "location" },
      { header: "Vehicle", dataKey: "vehicle" },
      { header: "Break", dataKey: "break" },
      { header: "Drive", dataKey: "drive" },
      { header: "Shift", dataKey: "shift" },
      { header: "Cycle", dataKey: "cycle" },
      { header: "Violations", dataKey: "violations" },
      { header: "ELD", dataKey: "eld" },
      { header: "Updated", dataKey: "updated" },
    ],
    [],
  );
};
