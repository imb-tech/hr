import { Avatar } from "@heroui/avatar";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Clock, MapPin, Phone, User } from "lucide-react";

const EmployeeCard = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar
          showFallback
          src="https://images.unsplash.com/broken"
          className="h-14 w-14"
        />
        <div>
          <h3 className="font-semibold">{"Abdisamatov Ozodbek"}</h3>
          <p className="text-sm text-muted-foreground">
            {"Frontend Developer"}
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="text-sm rounded-full px-3 py-[2px] bg-red-200 text-red-600 dark:bg-zinc-800 border dark:border-zinc-700">
            {"Sababsiz"}
          </div>
          <div className="text-sm rounded-full px-3 py-[2px] dark:bg-zinc-800 border dark:border-zinc-700">
            {"5 000 000 so'm"}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="dark:bg-zinc-800 bg-zinc-100 p-2 rounded-full">
              <Phone className="h-4 w-4 text-gray-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Tel</p>
              <p>{"+998 88 102 30 42"}</p>
            </div>
          </div>
          {/* <div className="flex items-center gap-3">
            <div className="dark:bg-zinc-800 bg-zinc-100 p-2 rounded-full">
              <Phone className="h-4 w-4 text-gray-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Qo'shimcha tel</p>
              <p>{"+998 88 102 30 42"}</p>
            </div>
          </div> */}
          <div className="flex items-start gap-3">
            <div className="dark:bg-zinc-800 bg-zinc-100 p-2 rounded-full mt-1">
              <MapPin className="h-4 w-4 text-gray-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Doimiy manzil</p>
              <p className="text-sm">
                {
                  "Farg'ona viloyati, Farg'ona shahar, A.Navoiy ko'chasi, 78/17-xonadon."
                }
              </p>
            </div>
          </div>
          {/* <div className="flex items-start gap-3">
            <div className="dark:bg-zinc-800 bg-zinc-100 p-2 rounded-full mt-1">
              <MapPin className="h-4 w-4 text-gray-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Vaqtinchalik manzil</p>
              <p className="text-sm">
                {
                  "Farg'ona viloyati, Farg'ona shahar, A.Navoiy ko'chasi, 78/17-xonadon."
                }
              </p>
            </div>
          </div> */}
          <div className="flex items-center gap-3">
            <div className="dark:bg-zinc-800 bg-zinc-100 p-2 rounded-full">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Pasport</p>
              <p>{"AD 6834278"}</p>
            </div>
          </div>
          {/* <div className="flex items-center gap-3">
            <div className="dark:bg-zinc-800 bg-zinc-100 p-2 rounded-full">
              <Briefcase className="h-4 w-4 text-gray-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Ma'lumoti</p>
              <p>{"Oliy ta'lim"}</p>
            </div>
          </div> */}
          <div className="flex items-center gap-3">
            <div className="dark:bg-zinc-800 bg-zinc-100 p-2 rounded-full">
              <Clock className="h-4 w-4 text-gray-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Ish vaqti</p>
              <p>{"09:00 - 18:00"}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 dark:bg-zinc-800 bg-zinc-100 rounded-lg p-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400 mb-1">Kelish</p>
            <p className="font-medium text-green-400">{"08:55"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Ketish</p>
            <p className="font-medium text-red-400">{"18:10"}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default EmployeeCard;
