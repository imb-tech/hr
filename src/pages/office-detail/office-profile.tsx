"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Progress } from "@heroui/progress";
import {
  AlertCircle,
  Clock,
  UserCheck,
  Users,
  UserX,
  XCircle,
} from "lucide-react";

export default function AttendanceDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <Card className="mb-6 p-2">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="bg-[#3B82F6] p-2 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold  dark:text-gray-300">
                Umumiy hodimlar soni
              </h1>
            </div>
            <span className="text-3xl font-bold  dark:text-gray-300">400</span>
          </div>
        </CardHeader>
        <CardBody>
          <Progress value={100} className="h-2 " />
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                <span className="text-2xl font-bold">400</span>
              </div>
            </CardHeader>
            <CardBody>
              <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-success"
                  style={{ width: "65%" }}
                />
                <div
                  className="absolute top-0 left-[65%] h-full bg-warning"
                  style={{ width: "35%" }}
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
                      260
                    </span>
                    <span className="text-xs text-gray-400">(65%)</span>
                  </div>
                </div>
                <Progress value={65} className="h-1.5" color="success" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-warning" />
                    <span className="text-sm dark:text-gray-300">
                      Kech qolganlar
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-warning">
                      40
                    </span>
                    <span className="text-xs text-gray-400">(35%)</span>
                  </div>
                </div>
                <Progress value={35} className="h-1.5 " color="warning" />
              </div>
            </CardBody>
          </Card>
        </div>
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
                <span className="text-2xl font-bold">100</span>
              </div>
            </CardHeader>
            <CardBody>
              <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-amber-400"
                  style={{ width: "70%" }}
                />
                <div
                  className="absolute top-0 left-[70%] h-full bg-rose-400"
                  style={{ width: "30%" }}
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
                      70
                    </span>
                    <span className="text-xs text-gray-400">(70%)</span>
                  </div>
                </div>
                <Progress value={70} className="h-1.5 " color="warning" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-rose-400" />
                    <span className="text-sm dark:text-gray-300">Sababsiz</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-rose-400">
                      30
                    </span>
                    <span className="text-xs text-gray-400">(30%)</span>
                  </div>
                </div>
                <Progress value={30} className="h-1.5 " color="danger" />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
