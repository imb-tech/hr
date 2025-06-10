import Modal from "@/components/ui/modal";
import { useModal } from "@/hooks/use-modal";
import { ChevronRight, Expand } from "lucide-react";
import Tabbar from "./tabbar";

export default function LandingMain() {
  const { openModal } = useModal();

  return (
    <div>
      <Tabbar />
      <div className="rounded-lg flex flex-col gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-600/20 p-3 py-5 rounded-lg">
          <div
            className="relative [&_span]:hover:flex cursor-pointer"
            onClick={openModal}
          >
            <img src="/images/o1.png" className="rounded-md" />
            <span className="absolute bg-background/50 hidden items-center justify-center top-0 left-0 bottom-0 right-0 m-auto">
              <Expand size={42} />
            </span>
          </div>
          <div className="flex justify-center items-center">
            <div className="text-lg font-extralight">
              <div className="flex items-start gap-2">
                <ChevronRight className="text-primary-500 min-w-6" />
                <p className="mb-5">
                  Asosiy sahifaning yuqori qismida barcha ofislar ro'yxatini
                  ko'rishingiz mumkin. Tanlangan ofis alohida rang bilan ajralib
                  turadi.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <ChevronRight className="text-primary-500 min-w-6" />
                <p className="mb-5">
                  Tanlangan ofisga qarab hodimlar statistikasi o‘zgaradi.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <ChevronRight className="text-primary-500 min-w-6" />
                <p className="mb-5">
                  Yangi ofis qo‘shish uchun yuqori o‘ng tarafdagi “Ofis
                  qo‘shish” tugmasi orqali yaratishingiz mumkin.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-600/20 p-3 py-5 rounded-lg">
          <div className="flex justify-center items-center">
            <div className="text-lg font-extralight">
              <div className="flex items-start gap-2">
                <ChevronRight className="text-primary-500 min-w-6" />
                <p className="mb-5">
                  Hodimlar statistik ma'lumotlari asosan quyidagi 3 guruhga
                  ajraladi <br />
                  1. Hodimlar soni
                  <br /> 2. Kelganlar
                  <span className="text-gray-500 ml-3">
                    {"(vaqtida kelganlar, kech qolganlar)"}
                  </span>
                  <br /> 3. Kelmaganlar
                  <span className="text-gray-500 ml-3">
                    {"(sababli, sababsiz)"}
                  </span>
                  <br />
                </p>
              </div>
            </div>
          </div>

          <div
            className="relative [&_span]:hover:flex cursor-pointer"
            onClick={openModal}
          >
            <img src="/images/o2.png" className="rounded-md" />
            <span className="absolute bg-background/50 hidden items-center justify-center top-0 left-0 bottom-0 right-0 m-auto">
              <Expand size={42} />
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-600/20 p-3 py-5 rounded-lg">
          <div
            className="relative [&_span]:hover:flex cursor-pointer"
            onClick={openModal}
          >
            <img src="/images/co1.png" className="rounded-md" />
            <span className="absolute bg-background/50 hidden items-center justify-center top-0 left-0 bottom-0 right-0 m-auto">
              <Expand size={42} />
            </span>
          </div>
          <div className="flex justify-center items-center">
            <div className="text-lg font-extralight">
              <div className="flex items-start gap-2">
                <ChevronRight className="text-primary-500 min-w-6" />
                <p className="mb-5">
                  Yangi ofis yaratish uchun, nomi, manzili, ish vaqtlari va
                  joylashuvlarini kiritishingiz talab etiladi.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <ChevronRight className="text-primary-500 min-w-6" />
                <p className="mb-5">
                  Xaritadan kerakli bino maydoni belgilanadi va "Saqlash"
                  tugmasini bosish orqali yangi ofis yaratiladi.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <ChevronRight className="text-primary-500 min-w-6" />
                <p className="mb-5">
                  Agar binolar soni bir nechta bo'lsa, o'ng tomondagi
                  <span className="px-2">"+"</span>
                  tugmasi orqali qo'shimcha binoni belgilashingiz mumkin.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-600/20 p-3 py-5 rounded-lg">
          <div className="flex justify-center items-center">
            <div className="text-lg font-extralight">
              <div className="flex items-start gap-2">
                <ChevronRight className="text-primary-500 min-w-6" />
                <p className="mb-5 flex gap-2">
                  <span className="flex min-w-6 h-6 border border-gray-300 text-sm mt-0.5 items-center justify-center rounded-full">
                    1
                  </span>
                  <span>
                    "Shablon" tugmasi orqali Excel falyni yuklab olib, hodimlar
                    ma'lumoti to'lidirib chiqiladi.
                  </span>
                </p>
              </div>
              <div className="flex items-start gap-2">
                <ChevronRight className="text-primary-500 min-w-6" />
                <p className="mb-5 flex gap-2">
                  <span className="flex min-w-6 h-6 border border-gray-300 text-sm mt-0.5 items-center justify-center rounded-full">
                    2
                  </span>
                  <span>
                    "Yuklash" tugmasi orqali Excel fayliga to'ldirilgan hodimlar
                    ma'lumotini tizimga yuklab qo'yishingiz mumkin.
                  </span>
                </p>
              </div>
              <div className="flex items-start gap-2">
                <ChevronRight className="text-primary-500 min-w-6" />
                <p className="mb-5 flex gap-2">
                  <span className="flex min-w-6 h-6 border border-gray-300 text-sm mt-0.5 items-center justify-center rounded-full">
                    3
                  </span>
                  <span>
                    "Hodim qo'shish" tugmasi orqali har bir hodimni bittalab
                    kiritishingiz mumkin
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div
            className="relative [&_span]:hover:flex cursor-pointer"
            onClick={openModal}
          >
            <img src="/images/ce1.png" className="rounded-md" />
            <span className="absolute bg-background/50 hidden items-center justify-center top-0 left-0 bottom-0 right-0 m-auto">
              <Expand size={42} />
            </span>
          </div>
        </div>

        <Modal size="full">
          <div className="flex items-center justify-center h-full">
            <img src="/images/o1.png" width={"80%"} />
          </div>
        </Modal>
      </div>
    </div>
  );
}
