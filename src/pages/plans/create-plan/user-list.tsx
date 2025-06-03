import { ROLES_STATISTIC, USER_STATISTIC } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { Accordion, AccordionItem, Checkbox, Skeleton } from "@heroui/react";
import { useState } from "react";

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

  const [groups, setGroups] = useState<number[]>([]);
  const [exceptions, setExceptions] = useState<
    { id: number; parent: number }[]
  >([]);

  const isUserChecked = (userId: number, parent: number) => {
    // agar group checked bo‘lsa va user exceptions ichida bo‘lmasa
    if (groups.includes(parent)) {
      return !exceptions.some((e) => e.id === userId && e.parent === parent);
    }
    // aks holda individual values ichida bo‘lishi kerak
    return exceptions.some((e) => e.id === userId && e.parent === parent);
  };

  const checkGroup = (gr: number) => {
    if (exceptions.some((g) => g.parent == gr)) {
      return true;
    } else return false;
  };

  const changeGroup = (v: boolean, groupId: number) => {
    if (v) {
      setGroups((c) => [...c, groupId]);
      // bu group uchun istisnolarni tozalab yuboramiz
      setExceptions((prev) => prev.filter((e) => e.parent !== groupId));
    } else {
      setGroups((c) => c.filter((id) => id !== groupId));
      // bu group uchun ochilgan accordion userlarini exceptions ga qo‘shib qo‘yamiz
      if (opened === groupId && users) {
        const newExceptions = users.map((u) => ({
          id: u.id,
          parent: groupId,
        }));
        setExceptions((prev) => [...prev, ...newExceptions]);
      }
    }
  };

  const changeUser = (v: boolean, id: number, parent: number) => {
    if (groups.includes(parent)) {
      // agar group checked bo‘lsa, faqat exceptions bilan ishlaymiz
      if (!v) {
        // check bo‘lmagan bo‘lsa, exceptions ga qo‘shamiz
        setExceptions((prev) => [...prev, { id, parent }]);
      } else {
        // check bo‘ldi, exceptions dan olib tashlaymiz
        setExceptions((prev) =>
          prev.filter((e) => !(e.id === id && e.parent === parent)),
        );
      }
    } else {
      // agar group unchecked bo‘lsa, faqat exceptions da check qilinganlarni qoldiramiz
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
              <Checkbox
                isSelected={groups.includes(pos.id)}
                color={checkGroup(pos.id) ? "default" : "primary"}
                onValueChange={(v) => changeGroup(v as boolean, pos.id)}
              />
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
                {users?.map((usr, j) => (
                  <li key={usr.id} className="cursor-pointer flex items-center">
                    <span className="w-8">{j + 1}.</span>
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
