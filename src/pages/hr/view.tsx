import DataTable, { ColumnDef } from "@/components/ui/table";
import { HR_API, OFFICE_DETAILS } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { formatMoney } from "@/lib/format-money";
import formatPassportNumber from "@/lib/formatter-pasport";
import formatPhoneNumber from "@/lib/formatter-phone";
import { useParams } from "@tanstack/react-router";
import { useMemo } from "react";
import { educationLevels } from "./create-hr-form";
import { FileUser, GraduationCap, MapPinCheck, MapPinHouse, Phone, PhoneCall } from "lucide-react";

export const useHrListCols = () => {
  return useMemo<ColumnDef<any>[]>(
    () => [
      { header: "Sana", dataKey: "date_start" },
      { header: "Holat", dataKey: "status" },
      { header: "Vaqt", dataKey: "date" },
    ],
    [],
  );
};

function ViewPage() {
  const { id } = useParams({ strict: false });
  const { data } = useGet<Human>(`${HR_API}/${id}`, {
    options: { enabled: Boolean(id) },
  });
  const { data: dataDetails } = useGet<Human>(`${OFFICE_DETAILS}/${id}`, {
    options: { enabled: Boolean(id) },
  });

  const dataColumn = [
    {
      id: 1,
      date_start: "17.03.2025 12:00",
      status: "Kirdi",
      date: "15 daqiqa",
    },
    {
      id: 1,
      date_start: "17.03.2025 12:00",
      status: "Chiqdi",
      date: "150 daqiqa",
    },
    {
      id: 3,
      date_start: "17.03.2025 12:00",
      status: "Kirdi",
      date: "4 soat 15 daqiqa",
    },
    {
      id: 4,
      date_start: "17.03.2025 12:00",
      status: "Chiqdi",
      date: "35 daqiqa",
    },
    {
      id: 5,
      date_start: "17.03.2025 12:00",
      status: "Kirdi",
      date: "15 daqiqa",
    },
    {
      id: 6,
      date_start: "17.03.2025 12:00",
      status: "Kirdi",
      date: "45 daqiqa",
    },
  ];

  console.log(dataDetails);

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
            <li className="font-bold text-2xl">{data?.full_name}</li>
            <li className="flex items-center">
              <div className="flex gap-2 items-center min-w-[240px]"><PhoneCall size={16} /> <span>Telefon raqam:</span></div>
              <span className="text-gray-500">
                {formatPhoneNumber(data?.phone_number)}
              </span>
            </li>
            <li className="flex items-center">
            <div className="flex gap-2 items-center min-w-[240px]"><Phone size={16} /> <span>Qo'shimcha raqam:</span></div>
              <span className="text-gray-500">
                {formatPhoneNumber(data?.phone_number2)}
              </span>
            </li>
            <li className="flex items-center">
            <div className="flex gap-2 items-center min-w-[240px]"><MapPinHouse size={16} /> <span>Doimiy yashash manzili:</span></div>
              <span className="text-gray-500">{data?.address}</span>
            </li>
            <li className="flex items-center">
              <div className="flex gap-2 items-center min-w-[240px]"><MapPinCheck size={16} /> <span>Vaqtinchalik yashash manzili:</span></div>
              <span className="text-gray-500">{data?.residence}</span>
            </li>
            <li className="flex items-center">
            <div className="flex gap-2 items-center min-w-[240px]"><FileUser size={16} /> <span>Pasport ma'lumoti:</span></div>
              <span className="text-gray-500">
                {data?.id_number ? formatPassportNumber(data?.id_number) : 0}
              </span>
            </li>
            <li className="flex items-center">
              <div className="flex gap-2 items-center min-w-[240px]"><GraduationCap size={16} /> <span>O'quv ma'lumoti:</span></div>
              <span className="text-gray-500">
                {data?.education
                  ? educationLevels?.find((item) => item.key == data?.education)
                      ?.label
                  : null}
              </span>
            </li>
          </ul>
        </div>

        <div className=" flex-col border border-divider py-3 whitespace-nowrap px-6 rounded-lg flex items-start justify-center gap-1">
          <div className="flex items-center">
            <strong className="min-w-24 text-xl">Balans:</strong>
            <span className="text-xl">{formatMoney(data?.salary)} so'm</span>
          </div>
          <div className="flex items-center">
            <span className=" min-w-24 font-medium ">Maosh:</span>
            <span className="text-gray-500 font-medium">{formatMoney(data?.salary)} so'm</span>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <DataTable isHeaderSticky columns={useHrListCols()} data={dataColumn} />
      </div>
    </div>
  );
}

export default ViewPage;
