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
  const arrivedOnTime = dataDetails?.arrived_on_time ?? 0;
  const lateUsers = dataDetails?.late_users_count ?? 0;
  const absentUsers = dataDetails?.absent_users ?? 0;
  const absentWithReason = dataDetails?.absent_users_with_reason_count ?? 0;
  const absentWithoutReason =
    dataDetails?.absent_users_with_no_reason_count ?? 0;

  const getPercent = (value: number, total: number): string => {
    if (total === 0) return "0%";
    return `${((value / total) * 100).toFixed(1)}%`;
  };

  const arrivedPercent = (arrivedOnTime / usersInCompany) * 100 || 0;
  const latePercent = (lateUsers / usersInCompany) * 100 || 0;
  const withReasonPercent = (absentWithReason / absentUsers) * 100 || 0;
  const withoutReasonPercent = (absentWithoutReason / absentUsers) * 100 || 0;

  return (
    <div className="max-w-7xl mx-auto">
      <Card className="mb-4 p-2">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="bg-[#3B82F6] p-2 rounded-lg">
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
        <CardBody>
          <Progress value={total} className="h-2" />
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Hodimlar ishxonada */}
        <div className="space-y-4">
          <Card className="p-2">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="bg-success p-2 rounded-lg">
                    <UserCheck className="h-5 w-5 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold dark:text-gray-300">
                    Ishxonadagi hodimlar
                  </h1>
                </div>
                <span className="text-2xl font-bold">
                  {formatMoney(usersInCompany)}
                </span>
              </div>
            </CardHeader>
            <CardBody>
              <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-success"
                  style={{ width: `${arrivedPercent}%` }}
                />
                <div
                  className="absolute top-0 h-full bg-warning"
                  style={{ width: `${latePercent}%`, left: `${arrivedPercent}%` }}
                />
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-success" />
                    <span className="text-sm dark:text-gray-300">
                      Vaqtida kelganlar
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-success">
                      {formatMoney(arrivedOnTime)}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({getPercent(arrivedOnTime, usersInCompany)})
                    </span>
                  </div>
                </div>
                <Progress
                  value={arrivedOnTime}
                  className="h-1.5"
                  color="success"
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-warning" />
                    <span className="text-sm dark:text-gray-300">
                      Kech qolganlar
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-warning">
                      {formatMoney(lateUsers)}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({getPercent(lateUsers, usersInCompany)})
                    </span>
                  </div>
                </div>
                <Progress
                  value={lateUsers}
                  className="h-1.5"
                  color="warning"
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
                  <div className="bg-danger p-2 rounded-lg">
                    <UserX className="h-5 w-5 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold dark:text-gray-300">
                    Kelmagan hodimlar
                  </h1>
                </div>
                <span className="text-2xl font-bold">
                  {formatMoney(absentUsers)}
                </span>
              </div>
            </CardHeader>
            <CardBody>
              <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-amber-400"
                  style={{ width: `${withReasonPercent}%` }}
                />
                <div
                  className="absolute top-0 h-full bg-rose-400"
                  style={{ width: `${withoutReasonPercent}%`, left: `${withReasonPercent}%` }}
                />
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-sm dark:text-gray-300">Sababli</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-amber-400">
                      {formatMoney(absentWithReason)}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({getPercent(absentWithReason, absentUsers)})
                    </span>
                  </div>
                </div>
                <Progress
                  value={absentWithReason}
                  className="h-1.5"
                  color="warning"
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-rose-400" />
                    <span className="text-sm dark:text-gray-300">Sababsiz</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-rose-400">
                      {formatMoney(absentWithoutReason)}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({getPercent(absentWithoutReason, absentUsers)})
                    </span>
                  </div>
                </div>
                <Progress
                  value={absentWithoutReason}
                  className="h-1.5"
                  color="danger"
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
