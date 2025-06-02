import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  DollarSign,
  Users,
  Wallet,
} from "lucide-react";

type PlanProfileProps = {
  currentBalance: number;
  totalEmployees: number;
  upcomingPayments: {
    amount: number;
    dueDate: string;
    count: number;
  };
  employeesWithoutSubscription: number;
  lastPaymentDate: string;
  activeSubscriptions: number;
};

export default function PlanProfile() {
  const data: PlanProfileProps = {
    currentBalance: 2450000,
    totalEmployees: 45,
    upcomingPayments: {
      amount: 850000,
      dueDate: "2024-06-10",
      count: 3,
    },
    employeesWithoutSubscription: 8,
    lastPaymentDate: "2024-05-28",
    activeSubscriptions: 12,
  };
  const {
    currentBalance,
    totalEmployees,
    upcomingPayments,
    employeesWithoutSubscription,
    lastPaymentDate,
    activeSubscriptions,
  } = data;

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

  const getDaysUntilPayment = (dateString: string) => {
    const today = new Date();
    const paymentDate = new Date(dateString);
    const diffTime = paymentDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilPayment = getDaysUntilPayment(upcomingPayments.dueDate);

  return (
    <div className="w-full rounded-xl mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Dashboard Summary
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="items-start gap-x-8 gap-y-4 p-5 rounded-md grid grid-cols-3">
          {/* Joriy balans */}
          <div className="flex flex-col gap-5 items-start">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full">
                <DollarSign className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Balans
                </p>
                <p className="text-base font-medium text-gray-900 dark:text-white">
                  {formatCurrency(currentBalance)}
                </p>
              </div>
            </div>
            <Button size="sm" color="primary" variant="flat">
              <Wallet size={16} />
              Balansni toldirish
            </Button>
          </div>
          {/* Aktiv hodimlar */}
          <div className="flex items-center justify-center gap-3 border-l border-l-gray-700">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full">
              <Users className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Aktiv hodimlar
              </p>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                {totalEmployees} ta
              </p>
            </div>
          </div>

          {/* Aktiv obunalar soni */}
          <div className="flex items-center justify-center gap-3 border-l border-l-gray-700">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full">
              <CheckCircle className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Obunalar
              </p>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                {activeSubscriptions} ta
              </p>
            </div>
          </div>
        </Card>
        <Card className="items-start gap-x-8 gap-y-4 p-5 rounded-md grid grid-cols-3">
          {/* Yaqinlashayotgan to'lovlar */}
          <div className="flex flex-col gap-5 items-start">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full">
                <Calendar className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Yaqin to'lovlar
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    {formatCurrency(upcomingPayments.amount)}
                  </p>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded ${
                      daysUntilPayment <= 3
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {daysUntilPayment}k
                  </span>
                </div>
              </div>
            </div>
            <Button size="sm" color="primary" variant="flat">
              To'lov qilish
            </Button>
          </div>

          {/* Oxirgi to'lov sanasi */}
          <div className="flex items-center gap-3 justify-center border-l border-l-gray-700">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full">
              <Calendar className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Oxirgi to'lov
              </p>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                {lastPaymentDate.split("-").reverse().join(".")}
              </p>
            </div>
          </div>

          {/* Obuna sotib olinmagan hodimlar */}
          <div className="flex items-center gap-3 justify-center border-l border-l-gray-700">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full">
              <AlertTriangle className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Obunasiz hodimlar
              </p>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                {employeesWithoutSubscription} ta
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
