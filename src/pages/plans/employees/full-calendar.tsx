import { Card, CardBody } from "@heroui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { cn } from "@heroui/theme";
import { Users } from "lucide-react";
import { Selected } from "../position/position-accordion";

type SubscriptionLevel = "boshlang'ich" | "o'rta" | "premium";

interface Employee {
  id: number;
  first_name: string;
  subscriptions: {
    [month: number]: SubscriptionLevel;
  };
}

export const months: any = [
  { value: 1, label: "Yanvar" },
  { value: 2, label: "Fevral" },
  { value: 3, label: "Mart" },
  { value: 4, label: "Aprel" },
  { value: 5, label: "May" },
  { value: 6, label: "Iyun" },
  { value: 7, label: "Iyul" },
  { value: 8, label: "Avgust" },
  { value: 9, label: "Sentabr" },
  { value: 10, label: "Oktabr" },
  { value: 11, label: "Noyabr" },
  { value: 12, label: "Dekabr" },
];

type Props = {
  toggleMonth: (customerId: number, month: number) => void;
  selected: Selected[];
};

const subscriptionColor = {
  "boshlang'ich": "🚀  ",
  "o'rta": "⚡ ",
  premium: "💎 ",
};

export default function FullCalendarEmployees({
  toggleMonth,
  selected,
}: Props) {
  const currentMonth = new Date().getMonth() + 1;
  const isSelected = (customerId: number, month: number) => {
    return selected.some(
      (item) => item.customer === customerId && item.month.includes(month),
    );
  };

  return (
    <Card>
      <CardBody className="space-y-4 rounded-md">
        <div className="overflow-x-auto w-full">
          <Table>
            <TableHeader>
              <TableColumn>
                <div className="whitespace-nowrap flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Xodimlar / Oy</span>
                </div>
              </TableColumn>

              {months.map((month: any) => (
                <TableColumn
                  key={month.value}
                  className={cn(
                    "text-center min-w-[80px] border-l dark:border-l-zinc-700 last:rounded-tr-md",
                    currentMonth > month.value &&
                      "dark:bg-gray-800 bg-gray-200 opacity-60 dark:border-l-zinc-800",
                    currentMonth === month.value &&
                      "dark:bg-blue-700/50 bg-blue-600/50 text-white dark:border-l-zinc-800",
                  )}
                >
                  {month.label}
                </TableColumn>
              ))}
            </TableHeader>

            <TableBody>
              {data.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium border-b dark:border-b-zinc-800">
                    {employee.first_name}
                  </TableCell>
                  {months.map((month: any) => {
                    const level = employee.subscriptions[month.value];
                    const icon = subscriptionColor[level] || "";
                    const selectedStyle = isSelected(employee.id, month.value)
                      ? "bg-blue-600/25 text-black font-semibold"
                      : "";

                    return (
                      <TableCell
                        key={month.value}
                        className={cn(
                          `text-center cursor-pointer capitalize border border-t-0 dark:border-zinc-950 transition ${selectedStyle}`,
                          currentMonth > month.value &&
                            "dark:bg-gray-800 bg-gray-200 opacity-50 cursor-not-allowed",
                          currentMonth == month.value &&
                            "dark:bg-blue-700/40 bg-blue-600/40 cursor-not-allowed",
                        )}
                        onClick={() => {
                          currentMonth < month.value &&
                            toggleMonth(employee.id, month.value);
                        }}
                      >
                        {icon}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
}

const data: Employee[] = [
  {
    id: 1,
    first_name: "Abdisamatov Ozodbek",
    subscriptions: {
      1: "boshlang'ich",
      2: "o'rta",
      3: "premium",
      4: "boshlang'ich",
      5: "o'rta",
      6: "premium",
      7: "boshlang'ich",
      8: "o'rta",
      9: "premium",
      10: "boshlang'ich",
      11: "o'rta",
      12: "premium",
    },
  },
  {
    id: 2,
    first_name: "Eshmamatov Doniyor",
    subscriptions: {
      1: "premium",
      2: "o'rta",
      3: "boshlang'ich",
      4: "premium",
      5: "o'rta",
      6: "boshlang'ich",
      7: "premium",
      8: "o'rta",
      9: "boshlang'ich",
      10: "premium",
      11: "o'rta",
      12: "boshlang'ich",
    },
  },
  {
    id: 3,
    first_name: "Abdurahimov Ahmad",
    subscriptions: {
      1: "o'rta",
      2: "premium",
      3: "boshlang'ich",
      4: "o'rta",
      5: "premium",
      6: "boshlang'ich",
      7: "o'rta",
      8: "premium",
      9: "boshlang'ich",
      10: "o'rta",
      11: "premium",
      12: "boshlang'ich",
    },
  },
  {
    id: 4,
    first_name: "Xamidov Shohjahon",
    subscriptions: {
      1: "boshlang'ich",
      2: "boshlang'ich",
      3: "boshlang'ich",
      4: "o'rta",
      5: "o'rta",
      6: "o'rta",
      7: "premium",
      8: "premium",
      9: "premium",
      10: "boshlang'ich",
      11: "o'rta",
      12: "premium",
    },
  },
  {
    id: 5,
    first_name: "Kamoliddinov Jalolxon",
    subscriptions: {
      1: "premium",
      2: "boshlang'ich",
      3: "o'rta",
      4: "premium",
      5: "boshlang'ich",
      6: "o'rta",
      7: "premium",
      8: "boshlang'ich",
      9: "o'rta",
      10: "premium",
      11: "boshlang'ich",
      12: "o'rta",
    },
  },
  {
    id: 6,
    first_name: "Eshmamatov Dilmurod",
    subscriptions: {
      1: "o'rta",
      2: "boshlang'ich",
      3: "premium",
      4: "boshlang'ich",
      5: "premium",
      6: "o'rta",
      7: "boshlang'ich",
      8: "premium",
      9: "o'rta",
      10: "boshlang'ich",
      11: "premium",
      12: "o'rta",
    },
  },
  {
    id: 7,
    first_name: "Abdisamatov Ozodbek",
    subscriptions: {
      1: "boshlang'ich",
      2: "o'rta",
      3: "premium",
      4: "boshlang'ich",
      5: "o'rta",
      6: "premium",
      7: "boshlang'ich",
      8: "o'rta",
      9: "premium",
      10: "boshlang'ich",
      11: "o'rta",
      12: "premium",
    },
  },
  {
    id: 8,
    first_name: "Eshmamatov Doniyor",
    subscriptions: {
      1: "premium",
      2: "boshlang'ich",
      3: "o'rta",
      4: "premium",
      5: "boshlang'ich",
      6: "o'rta",
      7: "premium",
      8: "boshlang'ich",
      9: "o'rta",
      10: "premium",
      11: "boshlang'ich",
      12: "o'rta",
    },
  },
  {
    id: 9,
    first_name: "Abdurahimov Ahmad",
    subscriptions: {
      1: "o'rta",
      2: "premium",
      3: "boshlang'ich",
      4: "o'rta",
      5: "premium",
      6: "boshlang'ich",
      7: "o'rta",
      8: "premium",
      9: "boshlang'ich",
      10: "o'rta",
      11: "premium",
      12: "boshlang'ich",
    },
  },
  {
    id: 10,
    first_name: "Xamidov Shohjahon",
    subscriptions: {
      1: "premium",
      2: "o'rta",
      3: "boshlang'ich",
      4: "premium",
      5: "o'rta",
      6: "boshlang'ich",
      7: "premium",
      8: "o'rta",
      9: "boshlang'ich",
      10: "premium",
      11: "o'rta",
      12: "boshlang'ich",
    },
  },
  {
    id: 11,
    first_name: "Kamoliddinov Jalolxon",
    subscriptions: {
      1: "boshlang'ich",
      2: "boshlang'ich",
      3: "o'rta",
      4: "premium",
      5: "premium",
      6: "boshlang'ich",
      7: "o'rta",
      8: "boshlang'ich",
      9: "o'rta",
      10: "premium",
      11: "premium",
      12: "o'rta",
    },
  },
  {
    id: 12,
    first_name: "Eshmamatov Dilmurod",
    subscriptions: {
      1: "premium",
      2: "premium",
      3: "boshlang'ich",
      4: "boshlang'ich",
      5: "o'rta",
      6: "o'rta",
      7: "premium",
      8: "boshlang'ich",
      9: "o'rta",
      10: "premium",
      11: "boshlang'ich",
      12: "premium",
    },
  },
];
