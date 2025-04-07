import DataTable, { ColumnDef } from "@/components/ui/table";
import { HR_API, HR_DETAILS } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import formatPassportNumber from "@/lib/formatter-pasport";
import formatPhoneNumber from "@/lib/formatter-phone";
import { useParams } from "@tanstack/react-router";
import { useMemo } from "react";
import { educationLevels } from "./create-hr-form";

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
  const { data: dataDetails } = useGet<Human>(`${HR_DETAILS}/${id}`, {
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
            <li className="flex items-center">
              <span className="block min-w-32">F.I.O:</span>
              <span>{data?.full_name}</span>
            </li>
            <li className="flex items-center">
              <span className="block min-w-32">Tel:</span>
              <span>{formatPhoneNumber(data?.phone_number)}</span>
            </li>
            <li className="flex items-center">
              <span className="block min-w-32">Qo'shimcha raqam:</span>
              <span>{formatPhoneNumber(data?.phone_number2)}</span>
            </li>
            <li className="flex items-center">
              <span className="block min-w-32">Manzil:</span>
              <span>{data?.address}</span>
            </li>
            <li className="flex items-center">
              <span className="block min-w-32">Yashash joyi:</span>
              <span>{data?.residence}</span>
            </li>
            <li className="flex items-center">
              <span className="block min-w-32">Pasport:</span>
              <span>
                {data?.id_number ? formatPassportNumber(data?.id_number) : 0}
              </span>
            </li>
            <li className="flex items-center">
              <span className="block min-w-32">Maosh:</span>
              <span>{data?.salary?.toLocaleString()}</span>
            </li>
            <li className="flex items-center">
              <span className="block min-w-32">O'quv ma'lumoti:</span>
              <span>
                {data?.education
                  ? educationLevels?.find((item) => item.key == data?.education)
                      ?.label
                  : null}
              </span>
            </li>
          </ul>
        </div>

        <div className="border border-divider py-3 whitespace-nowrap px-6 rounded-lg flex items-center justify-center gap-1">
          <strong>Balans:</strong>
          <span>{data?.salary?.toLocaleString()} so'm</span>
        </div>
      </div>
      <div className="mt-8">
        <DataTable isHeaderSticky columns={useHrListCols()} data={dataColumn} />
      </div>
    </div>
  );
}

export default ViewPage;
