import {
  PAYMENTS_ROLES,
  PAYMENTS_ROLES_USERS,
} from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { Accordion, AccordionItem, Checkbox, Skeleton } from "@heroui/react";
import { cn } from "@heroui/theme";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function UsersList() {
  const [opened, setOpened] = useState<number | null>(null);

  const { data: roles } = useGet<PaymentsRoles[]>(`${PAYMENTS_ROLES}`);

  const { data: users, isFetching } = useGet<WorkerAttendance[]>(
    `${PAYMENTS_ROLES_USERS}/${opened}`,
    {
      options: { enabled: !!opened, staleTime: 60000 },
    },
  );

  const [groups, setGroups] = useState<number[]>([]);
  const [exceptions, setExceptions] = useState<
    { id: number; parent: number }[]
  >([]);

  const isUserChecked = (userId: number, parent: number) => {
    if (groups.includes(parent)) {
      return !exceptions.some((e) => e.id === userId && e.parent === parent);
    }
    return exceptions.some((e) => e.id === userId && e.parent === parent);
  };

  const checkGroup = (gr: number) => {
    if (exceptions.some((g) => g.parent == gr)) {
      return true;
    } else return false;
  };

  const changeGroup = (v: boolean, groupId: number) => {
    setOpened(groupId);

    if (v) {
      setGroups((c) => [...c, groupId]);
      setExceptions((prev) => prev.filter((e) => e.parent !== groupId));
    } else {
      setGroups((c) => c.filter((id) => id !== groupId));
      const newExceptions = users?.map((u) => ({
        id: u.id,
        parent: groupId,
      }));
      setExceptions((prev) => [...prev, ...(newExceptions ?? [])]);
    }
  };

  const changeUser = (v: boolean, id: number, parent: number) => {
    if (groups.includes(parent)) {
      if (!v) {
        setExceptions((prev) => [...prev, { id, parent }]);
      } else {
        setExceptions((prev) =>
          prev.filter((e) => !(e.id === id && e.parent === parent)),
        );
      }
    } else {
      if (v) {
        setExceptions((prev) => [...prev, { id, parent }]);
      } else {
        setExceptions((prev) =>
          prev.filter((e) => !(e.id === id && e.parent === parent)),
        );
      }
    }
  };

  return (
    <Accordion
      variant="splitted"
      className="!p-0"
      selectedKeys={opened ? [String(opened)] : []}
      onSelectionChange={(keys) =>
        setOpened(Number(Array.from(keys)[0]) || null)
      }
    >
      {roles?.map((pos) => (
        <AccordionItem
          indicator={({ isOpen }) => (
            <ChevronDown
              className={cn(
                "text-zinc-500",
                isOpen ? "rotate-[270deg]" : "rotate-0",
              )}
            />
          )}
          key={pos.id}
          aria-label={pos.name}
          title={
            <div className="flex items-center">
              <Checkbox
                isSelected={groups.includes(pos.id)}
                color={checkGroup(pos.id) ? "default" : "primary"}
                onValueChange={(v) => changeGroup(v as boolean, pos.id)}
              />
              <span className="ml-2 block mr-3">{pos.name}</span>
              {/* <span className="opacity-50">
                {pos.paid_count} / {pos.count}
              </span> */}
            </div>
          }
        >
          {opened === pos.id &&
            (isFetching ? (
              <div className="flex gap-5 transition-all duration-150 pt-2 pb-4 px-4 ">
                <Skeleton className="h-[60px] w-full rounded-md" />
              </div>
            ) : (
              <ul className="pt-2 pb-4 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {users?.map((usr) => (
                  <li key={usr.id} className="cursor-pointer flex items-center">
                    <label className="flex items-center gap-2">
                      <Checkbox
                        isSelected={isUserChecked(usr.id, pos.id)}
                        onValueChange={(v) =>
                          changeUser(v as boolean, usr.id, pos.id)
                        }
                      />
                      <span>{usr.full_name}</span>
                    </label>
                  </li>
                ))}
                {!isFetching && !users?.length && (
                  <div className="text-gray-500 col-span-full text-center">
                    Hodimlar yo'q
                  </div>
                )}
              </ul>
            ))}
        </AccordionItem>
      )) ?? null}
    </Accordion>
  );
}
