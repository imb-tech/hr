import { UsersIcon } from "@/components/icons/nav-icons";
import { Card } from "@heroui/card";
import { cn } from "@heroui/theme";

const data = [
  {
    title: "Ofisdagi xodimalar",
    value: "32",
    changeType: "positive",
  },
  {
    title: "Ofis tashqarisidagi xodimalar",
    value: "6",
    changeType: "neutral",
  },
  {
    title: "Kelmagan xodimalar",
    value: "4",
    changeType: "negative",
  },
];

export default function OfficeProfile() {
  return (
    <dl className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
      {data.map(
        ({ title, value, changeType }, index) => (
          <Card
            key={index}
            className="border border-transparent dark:border-default-100 shadow-sm border-default-200"
          >
            <div className="flex p-4">
              <div
                className={cn(
                  "mt-1 flex h-12 w-12 items-center justify-center rounded-lg",
                  {
                    "bg-success-50": changeType === "positive",
                    "bg-warning-50": changeType === "neutral",
                    "bg-danger-50": changeType === "negative",
                  },
                )}
              >
                {changeType === "positive" ? (
                  <UsersIcon className="text-success" />
                ) : changeType === "neutral" ? (
                  <UsersIcon className="text-warning" />
                ) : (
                  <UsersIcon className="text-danger" />
                )}
              </div>

              <div className="flex flex-col gap-y-2">
                <dt className="mx-4 text-small font-medium text-default-500">
                  {title}
                </dt>
                <dd className="px-4 text-2xl font-semibold text-default-700">
                  {value}
                </dd>
              </div>
            </div>
          </Card>
        ),
      )}
    </dl>
  );
}
