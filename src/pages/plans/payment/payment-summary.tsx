import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/react";
import { cn } from "@heroui/theme";
import { Crown } from "lucide-react";
import { useState } from "react";

export default function PaymentSummary() {
  const current = new Date().getMonth();
  const [vals, setVals] = useState<string[]>([]);

  function handleChange(v: string) {
    if (current > Number(v)) {
      return;
    } else if (vals.includes(v)) {
      setVals((c) => c.filter((t) => t !== v));
    } else setVals((c) => [...c, v]);
  }

  return (
    <Card className="p-2 shadow-sm light:border-small">
      <CardBody>
        <h1 className="mb-3">Obuna muddati</h1>
        <ul className="grid grid-cols-3 gap-2 mb-5">
          {months?.map((m) => (
            <li
              key={m.key}
              className={cn(
                "p-3 bg-gray-400/10 rounded-md cursor-pointer text-center select-none transition-all duration-150",
                vals.includes(m.key) ? "bg-primary" : "",
                current > Number(m.key) ? "bg-transparent" : "",
              )}
              onClick={() => handleChange(m.key)}
            >
              {m.name}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between p-3 bg-gray-400/10 rounded-md">
          <h1 className="text-2xl">
            {(vals.length * 100000).toLocaleString()} so'm
          </h1>

          <Chip
            color="secondary"
            startContent={<Crown size={15} />}
            variant="flat"
            className="px-2"
          >
            Premium x20
          </Chip>
        </div>
      </CardBody>
    </Card>
  );
}

export const months = [
  { key: "01", name: "Yanvar" },
  { key: "02", name: "Fevral" },
  { key: "03", name: "Mart" },
  { key: "04", name: "Aprel" },
  { key: "05", name: "May" },
  { key: "06", name: "Iyun" },
  { key: "07", name: "Iyul" },
  { key: "08", name: "Avgust" },
  { key: "09", name: "Sentabr" },
  { key: "10", name: "Oktabr" },
  { key: "11", name: "Noyabr" },
  { key: "12", name: "Dekabr" },
];
