import { ColumnDef } from "@/components/ui/table";
import { formatDateTime } from "@/lib/format-date";
import { useMemo } from "react";


export const useWorkerInfoCols = () => {
  return useMemo<ColumnDef<WorkerAttendance>[]>(
    () => [
      { header: "ID", dataKey: "id" },
      { header: "FIO", dataKey: "full_name" },
      {
        header: "Kelish vaqti",
        dataKey: "id",
        cell(_, item) {
          return formatDateTime(item.attendance?.attendance_time);
        },
      },
      {
        header: "Ketish vaqti",
        dataKey: "id",
        cell(_, item) {
          const tm = item.attendance?.left_time;
          return <span>{tm ? formatDateTime(tm) : "—"}</span>;
        },
      },
      {
        header: "Kechikish vaqti",
        dataKey: "id",
        cell(_, item) {
          return item.attendance && item.attendance.status === 0
            ? calculateTimeDifference(
                item.work_shift_start,
                item.attendance.attendance_time,
              )
            : "—";
        },
      },
      // { header: "Erta ketish vaqti", dataKey: "" },
      {
        header: "Ishxonadagi vaqti",
        dataKey: "id",
        cell(_, item) {
          return <span>{item.attendance?.duration}</span>;
        },
      },
      {
        header: "Status",
        dataKey: "entry_log_status",
        cell(_, item) {
          return (
            <div className="flex items-center gap-4 justify-center">
              <span>
                {item.entry_log_status === 1 ? "Ofisda" : "Ofisdan tashqarida"}
              </span>
            </div>
          );
        },
      },
    ],
    [],
  );
};

 export function calculateTimeDifference(
  workShiftStart: string,
  attendanceTime: string,
): string {
  const today = new Date();
  const [startHours, startMinutes, startSeconds] = workShiftStart
    .split(":")
    .map(Number);
  const shiftStartDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    startHours,
    startMinutes,
    startSeconds || 0,
  );

  const attendanceDate = new Date(attendanceTime);

  const diffMs = attendanceDate.getTime() - shiftStartDate.getTime();

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  const formattedHours = String(Math.abs(diffHours)).padStart(2, "0");
  const formattedMinutes = String(Math.abs(diffMinutes)).padStart(2, "0");
  const formattedSeconds = String(Math.abs(diffSeconds)).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
