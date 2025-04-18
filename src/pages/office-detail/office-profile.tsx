"use client";

import { OFFICE_DETAILS } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { formatMoney } from "@/lib/format-money";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Progress } from "@heroui/progress";
import { useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  Clock,
  UserCheck,
  Users,
  UserX,
  XCircle,
} from "lucide-react";

export default function AttendanceDashboard() {
  const { id } = useParams({ from: "/_main/office/$id" });
  const { data: dataDetails } = useGet<Company>(`${OFFICE_DETAILS}/${id}`, {
    options: { enabled: Boolean(id) },
  });

  const total = dataDetails?.total_users_count ?? 0;
  const usersInCompany = dataDetails?.users_in_company ?? 0;
  const arrivedOnTime = dataDetails?.in_time_users ?? 0;
  const lateUsers = dataDetails?.late_users_count ?? 0;
  const absentUsers = dataDetails?.absent_users ?? 0;
  const absentWithReason = dataDetails?.absent_users_with_reason_count ?? 0;
  const absentWithoutReason =
    dataDetails?.absent_users_with_no_reason_count ?? 0;

  // const total = 400;
  // const usersInCompany = 300;
  // const arrivedOnTime = 260;
  // const lateUsers = 40;
  // const absentUsers = 100;
  // const absentWithReason = 70;
  // const absentWithoutReason = 30;

  const getPercent = (value: number, total: number): string =>
    total === 0 ? "0%" : `${((value / total) * 100).toFixed(1)}%`;

  return (
    <div className="container mx-auto">
      <Card className="my-4 p-2">
        <CardHeader className="p-3">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold dark:text-gray-300">
                Umumiy hodimlar soni
              </h1>
            </div>
            <span className="text-3xl font-bold dark:text-gray-300">
              {formatMoney(total)}
            </span>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Hodimlar ishxonada */}
        <div className="space-y-4">
          <Card className="p-2">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="bg-[#10B981] p-2 rounded-lg">
                    <UserCheck className="h-5 w-5 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold dark:text-gray-300">
                    Ishxonadagi hodimlar
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">
                    {formatMoney(usersInCompany)}
                  </span>
                  <span className="text-lg text-gray-400">
                    ({getPercent(usersInCompany, total)})
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <Progress
                value={(usersInCompany / total) * 100}
                className="h-2"
                classNames={{
                  indicator: "bg-[#10B981]",
                }}
              />

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#34D399]" />
                    <span className="text-sm dark:text-gray-300">
                      Vaqtida kelganlar
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-[#34D399]">
                      {formatMoney(arrivedOnTime)}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({getPercent(arrivedOnTime, total)})
                    </span>
                  </div>
                </div>
                <Progress
                  value={(arrivedOnTime / total) * 100}
                  className="h-1.5"
                  classNames={{
                    indicator: "bg-[#34D399]",
                  }}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#FDBA74]" />
                    <span className="text-sm dark:text-gray-300">
                      Kech qolganlar
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-[#FDBA74]">
                      {formatMoney(lateUsers)}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({getPercent(lateUsers, total)})
                    </span>
                  </div>
                </div>
                <Progress
                  value={(lateUsers / total) * 100}
                  className="h-1.5"
                  classNames={{
                    indicator: "bg-[#FDBA74]",
                  }}
                />
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Kelmagan hodimlar */}
        <div className="space-y-4">
          <Card className="p-2">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="bg-[#F87171] p-2 rounded-lg">
                    <UserX className="h-5 w-5 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold dark:text-gray-300">
                    Kelmagan hodimlar
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">
                    {formatMoney(absentUsers)}
                  </span>
                  <span className="text-lg text-gray-400">
                    ({getPercent(absentUsers, total)})
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <Progress
                value={(absentUsers / total) * 100}
                className="h-2"
                classNames={{
                  indicator: "bg-[#F87171]",
                }}
              />

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-[#FBBF24]" />
                    <span className="text-sm dark:text-gray-300">Sababli</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-[#FBBF24]">
                      {formatMoney(absentWithReason)}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({getPercent(absentWithReason, total)})
                    </span>
                  </div>
                </div>
                <Progress
                  value={(absentWithReason / total) * 100}
                  className="h-1.5"
                  classNames={{
                    indicator: "bg-[#FBBF24]",
                  }}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-[#F87171]" />
                    <span className="text-sm dark:text-gray-300">Sababsiz</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-[#F87171]">
                      {formatMoney(absentWithoutReason)}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({getPercent(absentWithoutReason, total)})
                    </span>
                  </div>
                </div>
                <Progress
                  value={(absentWithoutReason / total) * 100}
                  className="h-1.5"
                  classNames={{
                    indicator: "bg-[#F87171]",
                  }}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
