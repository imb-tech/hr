import {
  Button,
  Card,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { cn } from "@heroui/theme";
import { Check, User } from "lucide-react";
import { useState } from "react";

export default function PlanSelector() {
  const [value, setValue] = useState<HrTariff | null>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleChange(v: HrTariff) {
    console.log(v);

    setValue(v);
    setIsOpen(false);
  }

  return (
    <Popover
      placement="bottom-start"
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <PopoverTrigger>
        <Button>{value?.name ?? "Tarif tanlang"}</Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 bg-transparent">
        <div className="grid grid-cols-3 gap-2">
          {plans?.map((pln) => (
            <Card
              className={cn(
                "w-[300px] p-0 hover:shadow-md cursor-pointer border-[1px]",
                pln.id === value?.id ? "border-primary" : "border-transparent",
              )}
              key={pln.id}
            >
              <div
                className="flex flex-col gap-3 py-4 px-4"
                onClick={() => handleChange(pln)}
              >
                <h2 className="text-xl">{pln.name}</h2>
                <div className="flex items-center gap-2 text-primary">
                  <p className="text-xl">{pln.price.toLocaleString()} uzs</p>
                  <span>/</span>
                  <User />
                </div>

                <ul className="flex flex-col gap-3">
                  {pln.features?.map((ft) => (
                    <li key={ft} className="flex gap-1">
                      <span className="text-primary mt-1">
                        <Check size={16} />
                      </span>
                      <span>{ft}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export const plans: HrTariff[] = [
  {
    id: "starter",
    name: "Boshlang‘ich (Starter)",
    level: "starter",
    price: 20000, // misol uchun
    features: [
      "Turniket va FaceID orqali kirish-chiqishni nazorat qilish",
      "Xodimlarning ishga kelish va ketish hisobotlarini admin panel orqali nazorat qilish",
    ],
  },
  {
    id: "standard",
    name: "O‘rta (Standard)",
    level: "standard",
    price: 40000, // misol uchun
    features: [
      "Turniket va FaceID orqali kirish-chiqishni nazorat qilish",
      "Xodimlarning ishga kelish va ketish hisobotlarini admin panel orqali nazorat qilish",
      "Xodim ishdan ruxsat olish uchun so‘rov yuborish",
      "Barcha xodimlarning joylashuvini real-timeda ko‘rish",
      "Jamoaviy vazifalarni yaratish va boshqarish",
    ],
  },
  {
    id: "advanced",
    name: "Premium (Advanced)",
    level: "advanced",
    price: 60000, // misol uchun
    features: [
      "Turniket va FaceID orqali kirish-chiqishni nazorat qilish",
      "Xodimlarning ishga kelish va ketish hisobotlarini admin panel orqali nazorat qilish",
      "Xodim ishdan ruxsat olish uchun so‘rov yuborish",
      "Barcha xodimlarning joylashuvini real-timeda ko‘rish",
      "Jamoaviy vazifalarni yaratish va boshqarish",
      "Xodimlarning vazifalarni qay tarzda bajarayotganini tahlil qilish",
      "Xodimlarning joylashuv tarixini batafsil ko‘rish",
    ],
  },
];
