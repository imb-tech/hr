import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { DollarSign, Wallet } from "lucide-react";

export default function PlanProfile() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ", {
      style: "currency",
      currency: "UZS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("UZS", "");
  };

  return (
    <div className="w-full rounded-xl mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Dashboard Summary
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="flex flex-row justify-between items-center gap-5 gap-x-8 gap-y-4 p-5 rounded-md">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
              <DollarSign
                className=" text-gray-700 dark:text-gray-300"
                size={30}
              />
            </div>
            <div>
              <p className="text-lg text-gray-500 dark:text-gray-400">Balans</p>
              <p className="text-xl font-medium text-gray-900 dark:text-white">
                {formatCurrency(2450000) + " so'm"}
              </p>
            </div>
          </div>
          <Button color="primary" variant="flat">
            <Wallet size={16} />
            Balansni toldirish
          </Button>
        </Card>
      </div>
    </div>
  );
}
