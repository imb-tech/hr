import DataTable from "@/components/ui/table";
import { usHistoryCols } from "./history-cols";

export interface PymentType {
  id: number;
  amount: number;
  method: string;
  date: string;
  status: string;
}

export default function HistoryPage() {
  return (
    <div>
      <DataTable  indexing columns={usHistoryCols()} data={paymentHistory} />
    </div>
  );
}

const paymentHistory:PymentType[] = [
  {
    id: 1,
    amount: 150000,
    method: "Click",
    date: "2025-05-01T10:15:00",
    status: "success",
  },
  {
    id: 2,
    amount: 200000,
    method: "Payme",
    date: "2025-05-03T14:45:00",
    status: "success",
  },
  {
    id: 3,
    amount: 180000,
    method: "Click",
    date: "2025-05-06T09:10:00",
    status: "success",
  },
  {
    id: 4,
    amount: 120000,
    method: "Payme",
    date: "2025-05-09T12:30:00",
    status: "failed",
  },
  {
    id: 5,
    amount: 250000,
    method: "Click",
    date: "2025-05-11T18:00:00",
    status: "success",
  },
  {
    id: 6,
    amount: 175000,
    method: "Payme",
    date: "2025-05-14T11:22:00",
    status: "success",
  },
  {
    id: 7,
    amount: 300000,
    method: "Click",
    date: "2025-05-17T15:35:00",
    status: "success",
  },
  {
    id: 8,
    amount: 220000,
    method: "Payme",
    date: "2025-05-21T08:55:00",
    status: "success",
  },
  {
    id: 9,
    amount: 160000,
    method: "Click",
    date: "2025-05-25T20:10:00",
    status: "failed",
  },
  {
    id: 10,
    amount: 195000,
    method: "Payme",
    date: "2025-05-29T13:45:00",
    status: "success",
  },
];
