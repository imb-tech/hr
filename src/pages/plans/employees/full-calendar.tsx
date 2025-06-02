import { Card, CardBody } from "@heroui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Home } from "lucide-react";

const months: any = [
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

const data: any = [
  {
    id: 1,
    first_name: "Abdisamatov Ozodbek",
    phone: "+998931023042",
  },
  {
    id: 2,
    first_name: "Eshmamatov Doniyor",
    phone: "+998931231177",
  },
  {
    id: 3,
    first_name: "Abdurahimov Ahmad",
    phone: "+998912324191",
  },
  {
    id: 4,
    first_name: "Xamidov Shohjahon",
    phone: "+998940701705",
  },
  {
    id: 5,
    first_name: "Kamoliddinov Jalolxon",
    phone: "+998905360635",
  },
  {
    id: 6,
    first_name: "Eshmamatov Dilmurod",
    phone: "+998931230102",
  },
  {
    id: 7,
    first_name: "Abdisamatov Ozodbek",
    phone: "+998931023042",
  },
  {
    id: 8,
    first_name: "Eshmamatov Doniyor",
    phone: "+998931231177",
  },
  {
    id: 9,
    first_name: "Abdurahimov Ahmad",
    phone: "+998912324191",
  },
  {
    id: 10,
    first_name: "Xamidov Shohjahon",
    phone: "+998940701705",
  },
  {
    id: 11,
    first_name: "Kamoliddinov Jalolxon",
    phone: "+998905360635",
  },
  {
    id: 12,
    first_name: "Eshmamatov Dilmurod",
    phone: "+998931230102",
  },
];

export default function FullCalendarEmployees() {
  return (
    <Card>
      <CardBody className="space-y-4 rounded-md">
        <div className="overflow-x-auto w-full">
          <Table>
            <TableHeader>
              <TableColumn>
                <div className="whitespace-nowrap flex items-center gap-2">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <span>Xodimlar / Sana</span>
                </div>
              </TableColumn>

              {months.map((month: any) => (
                <TableColumn
                  key={month.value}
                  className="text-center min-w-[80px] border-l border-l-zinc-700 last:rounded-tr-md"
                >
                  {month.label}
                </TableColumn>
              ))}
            </TableHeader>

            <TableBody>
              {data.map((employee: any) => (
                <TableRow key={employee.id}>
                  <TableCell className="border-b  dark:border-b-zinc-800  ">
                    <div className="flex flex-col h-10 justify-center">
                      <span className="whitespace-nowrap">
                        {employee.first_name}
                      </span>
                    </div>
                  </TableCell>

                  {months.map((month: any) => (
                    <TableCell
                      key={month.value}
                      className="text-center border border-t-0 border-zinc-800"
                    >
                      {" "}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
}
