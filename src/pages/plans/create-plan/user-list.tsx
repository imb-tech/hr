import { ROLES_STATISTIC, USER_STATISTIC } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { Accordion, AccordionItem, Checkbox, Skeleton } from "@heroui/react";
import { useMemo, useState } from "react";

export default function UsersList() {
  const [opened, setOpened] = useState<number | null>(null);

  const { data: roles } = useGet<CompanyStats[]>(`${ROLES_STATISTIC}/${1}`, {
    params: { date: "01-06-2026" },
  });

  const { data: users, isFetching } = useGet<WorkerAttendance[]>(
    `${USER_STATISTIC}/${opened}/1`,
    {
      options: { enabled: !!opened, staleTime: 60000 },
    },
  );

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users;
  }, [users]);

  return (
    <Accordion
      variant="splitted"
      className="!p-0"
      onSelectionChange={(keys) =>
        setOpened(Number(Array.from(keys)[0]) || null)
      }
    >
      {roles?.map((pos) => (
        <AccordionItem
          key={pos.id}
          aria-label={pos.role}
          title={
            <div className="flex items-center">
              <Checkbox />
              <span className="ml-2">{pos.role}</span>
            </div>
          }
        >
          {opened === pos.id &&
            (isFetching ? (
              <div className="flex gap-5 transition-all duration-150 pt-2 pb-4 px-4 ">
                <Skeleton className="h-[160px] w-full rounded-md" />
                <Skeleton className="h-[160px] w-full rounded-md" />
                <Skeleton className="h-[160px] w-full rounded-md" />
              </div>
            ) : (
              <ul className="pt-2 pb-4 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {filteredUsers.map((usr, j) => (
                  <li key={usr.id} className="cursor-pointer flex items-center">
                    <span className="w-8">{j + 1}.</span>
                    <label className="flex items-center gap-2">
                      <Checkbox />
                      <span>{usr.full_name}</span>
                    </label>
                  </li>
                ))}
                {!isFetching && !filteredUsers.length && (
                  <div className="text-gray-500 col-span-full">
                    Hodimlar yo‘q
                  </div>
                )}
              </ul>
            ))}
        </AccordionItem>
      )) ?? null}
    </Accordion>
  );
}
