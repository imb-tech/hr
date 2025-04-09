import { UsersIcon } from "@/components/icons/nav-icons";
import { OFFICE_DETAILS } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { Card } from "@heroui/card";
import { cn } from "@heroui/theme";
import { useParams } from "@tanstack/react-router";
import { ClockFading, UserMinus, UserRoundPen, UserX } from "lucide-react";

export default function OfficeProfile() {
  const { id } = useParams({ from: "/_main/office/$id" });
  const { data: dataDetails } = useGet<Company>(`${OFFICE_DETAILS}/${id}`, {
    options: { enabled: Boolean(id) },
  });

  const data = [
    {
      title: "Umumiy hodimlar soni",
      value: dataDetails?.total_users_count || 0,
      changeType: "positive",
    },
    {
      title: "Ishxonadagi hodimalar",
      value: dataDetails?.users_in_company || 0,
      changeType: "neutral",
    },
    {
      title: "Kech qolganlar",
      value: dataDetails?.late_users_count || 0,
      changeType: "latecomers",
    },
    {
      title: "Kelmagan hodimlar",
      value: dataDetails?.absent_users || 0,
      changeType: "negative",
    },
    {
      title: "Sababli kelmagan",
      value: dataDetails?.absent_users_with_reason_count || 0,
      changeType: "reason",
    },
    {
      title: "Sababsiz kelmagan",
      value: dataDetails?.absent_users_with_no_reason_count || 0,
      changeType: "because_of",
    },
  ];

  const iconType: { [key: string]: any } = {
    positive: <UsersIcon className="text-success" />,
    neutral: <UsersIcon className="text-warning" />,
    negative: <UserX className="text-danger" />,
    latecomers: <ClockFading className="text-warning" />,
    because_of: <UserMinus className="text-danger" />,
    reason: <UserRoundPen className="text-warning" />,
  };

  return (
    <dl className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 my-4">
      {data.map(({ title, value, changeType }, index) => (
        <Card
          key={index}
          className="border border-transparent dark:border-default-100 shadow-sm border-default-200"
        >
          <div className="flex p-4 items-center justify-between gap-3">
            <div className="flex flex-col ">
              <dd className="px-4 text-2xl font-semibold text-default-700">
                {value}
              </dd>
              <dt className="mx-4 text-md font-medium text-default-500">
                {title}
              </dt>
            </div>
            <div
              className={cn(
                "mt-1 flex h-[52px] w-[52px] items-center justify-center rounded-lg",
                {
                  "bg-success-50": changeType === "positive",
                  "bg-warning-50":
                    changeType === "neutral" ||
                    changeType === "latecomers" ||
                    changeType === "reason",
                  "bg-danger-50":
                    changeType === "negative" || changeType === "because_of",
                },
              )}
            >
              {iconType[changeType]}
            </div>
          </div>
        </Card>
      ))}
    </dl>
  );
}
