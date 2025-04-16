import { ColumnDef } from "@/components/ui/table";
import { HR_API } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { formatMoney } from "@/lib/format-money";
import formatPassportNumber from "@/lib/formatter-pasport";
import formatPhoneNumber from "@/lib/formatter-phone";
import { useParams } from "@tanstack/react-router";
import {
  FileUser,
  GraduationCap,
  MapPinCheck,
  MapPinHouse,
  Phone,
  PhoneCall,
} from "lucide-react";
import { useMemo } from "react";
import { educationLevels } from "../hr/create-hr-form";
import YearsAccordion from "./years-accordion";

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
              <div className="flex gap-2 items-center min-w-52 text-foreground-500">
                <PhoneCall size={16} /> <span>Tel:</span>
              </div>
              <span>{data?.phone_number ?  formatPhoneNumber(data?.phone_number) : "-"}</span>
            </li>
            <li className="flex items-center">
              <div className="flex gap-2 items-center min-w-52 text-foreground-500">
                <Phone size={16} /> <span>Qo'shimcha tel:</span>
              </div>
              <span>{ data?.phone_number2 ? formatPhoneNumber(data?.phone_number2) : "-"}</span>
            </li>
            <li className="flex items-center">
              <div className="flex gap-2 items-center min-w-52 text-foreground-500">
                <MapPinHouse size={16} /> <span>Doimiy manzil:</span>
              </div>
              <span>{data?.address ? data?.address : "-"}</span>
            </li>
            <li className="flex items-center">
              <div className="flex gap-2 items-center min-w-52 text-foreground-500">
                <MapPinCheck size={16} /> <span>Vaqtinchalik manzil:</span>
              </div>
              <span>{data?.residence ? data?.residence : "-"}</span>
            </li>
            <li className="flex items-center">
              <div className="flex gap-2 items-center min-w-52 text-foreground-500">
                <FileUser size={16} /> <span>Pasport:</span>
              </div>
              <span>
                {data?.id_number ? formatPassportNumber(data?.id_number) : "-"}
              </span>
            </li>
            <li className="flex items-center">
              <div className="flex gap-2 items-center min-w-52 text-foreground-500">
                <GraduationCap size={16} /> <span>Ma'lumoti:</span>
              </div>
              <span>
                {data?.education
                  ? educationLevels?.find((item) => item.key == data?.education)
                      ?.label
                  : "-"}
              </span>
            </li>
          </ul>
        </div>

        <div className=" flex-col border border-divider py-3 whitespace-nowrap px-6 rounded-lg flex items-start justify-center gap-1">
          <div className="flex items-center">
            <strong className="min-w-24 text-xl">Balans:</strong>
            <span className="text-xl">{formatMoney(data?.salary) || 0} so'm</span>
          </div>
          <div className="flex items-center">
            <span className=" min-w-24 font-medium ">Maosh:</span>
            <span className="text-foreground-50-500 font-medium">
              {formatMoney(data?.salary) || 0} so'm
            </span>
          </div>
        </div>
      </div>
      <div className="mt-8 ">
        <YearsAccordion />
      </div>
    </div>
  );
}

export default ViewPage;
