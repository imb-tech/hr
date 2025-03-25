import DataTable, { ColumnDef } from "@/components/ui/table";
import { useMemo } from "react";


export const useHrListCols = () => {
  return useMemo<ColumnDef<any>[]>(
    () => [
      { header: "Sana", dataKey: "date_start", sortable: true },
      { header: "Holat", dataKey: "status", sortable: true },
      { header: "Vaqt", dataKey: "date", sortable: true },
    ],
    [],
  );
};
function ViewPage() {
  const data = {
    id: 1,
    full_name: "Ozodbek Abdisamatov",
    phone: "+998 93 102 30 42",
    family_phone: ["+998 88 102 30 42"],
    address: "Tashkent, 123 Street",
    location: "Tashkent, Uzbekistan",
    id_card: "1234567890",
    education: "Bachelor of Science",
    salary: 50000,
  };

  const dataColumn = [
    {
      date_start: "17.03.2025 12:00",
      status: "Kirdi",
      date: "15 daqiqa",
    },
    {
      date_start: "17.03.2025 12:00",
      status: "Chiqdi",
      date: "150 daqiqa",
    },
    {
      date_start: "17.03.2025 12:00",
      status: "Kirdi",
      date: "4 soat 15 daqiqa",
    },
    {
      date_start: "17.03.2025 12:00",
      status: "Chiqdi",
      date: "35 daqiqa",
    },
    {
      date_start: "17.03.2025 12:00",
      status: "Kirdi",
      date: "15 daqiqa",
    },
    {
      date_start: "17.03.2025 12:00",
      status: "Kirdi",
      date: "45 daqiqa",
    },
  ];

  return (
    <div className="py-4">
      <div className="border-divider border rounded-lg  p-4 flex lg:flex-row flex-col gap-5 lg:gap-0 lg:justify-between lg:items-start">
        <div className="flex flex-col sm:flex-row items-start gap-6 h-full">
          <div className="border border-divider  h-[200px] sm:h-full sm:w-[215px] rounded-lg">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="Profile picture"
            />
          </div>
          <ul className="h-full flex flex-col items-stretch gap-[3px]">
            <li>F.I.O: {data.full_name}</li>
            <li>Tel: {data.phone}</li>
            <li>Oila a'zolari: {data.family_phone}</li>
            <li>Manzil: {data.address}</li>
            <li>Yashash joyi: {data.location}</li>
            <li>Pasport: {data.id_card}</li>
            <li>Maosh: {data.salary}</li>
            <li>Ta'lim: {data.education}</li>
          </ul>
        </div>

        <div className="border border-divider py-3 whitespace-nowrap px-6 rounded-lg flex items-center justify-center gap-1">
          <strong>Balans:</strong>
          <span>1 000 000 so'm</span>
        </div>
      </div>
      <div className="mt-8">
        <DataTable isHeaderSticky columns={useHrListCols()} data={dataColumn} />
      </div>
    </div>
  );
}

export default ViewPage;
