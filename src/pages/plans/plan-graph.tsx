import { Card } from "@heroui/card";
import { cn } from "@heroui/theme";
import { CircleCheckBig, Clock } from "lucide-react";
import { months } from "./payment/payment-summary";

export default function PlanGraph() {
  const curr = new Date().getMonth();
  return (
    <div className="gap-3">
      <Card className="p-2 rounded-md">
        <div className="grid grid-cols-12 gap-2">
          {months.map((month) => (
            <div
              key={month.key}
              className={cn(
                "bg-red-500/15 text-red-500 p-2 rounded-md flex flex-col gap-2 items-center",
                Number(month.key) < curr ? "bg-gray-400/15 text-green-500" : "",
                Number(month.key) > curr
                  ? "bg-orange-400/10 text-orange-500"
                  : "",
              )}
            >
              <p className="text-sm text-gray-300">{month.name}</p>
              <span className="opacity-80">
                {Number(month.key) > curr ? (
                  <Clock size={20} />
                ) : (
                  <CircleCheckBig size={20} />
                )}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
