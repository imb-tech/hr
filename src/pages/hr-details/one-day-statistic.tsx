import { useModal } from "@/hooks/use-modal";
import { MessageCircle } from "lucide-react";
export default function OneDaysAccordion() {
  const { openModal } = useModal();
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 bg-foreground-100 p-3 text-foreground-500 rounded-t-lg">
        <p className="text-sm">Kelish va Ketish vaqti</p>
        <p className="text-sm">Qayerda</p>
      </div>
      <div className="px-3 dark:bg-zinc-900 bg-zinc-50 rounded-b-lg ">
        <div className="grid grid-cols-2 gap-5 py-3 border-b dark:border-b-zinc-700">
          <p className="text-sm">09:00- 18:00</p>
          <div className="text-sm flex items-center gap-3">
            <p>Ofisda</p>
            <span
              onClick={openModal}
              className="cursor-pointer hover:text-primary"
            >
              <MessageCircle width={18} />
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 py-3 border-b dark:border-b-zinc-700">
          <p className="text-sm">09:00- 18:00</p>
          <div className="text-sm flex items-center gap-3">
            <p>Ofisda</p>
            <span
              onClick={openModal}
              className="cursor-pointer hover:text-primary"
            >
              <MessageCircle width={18} />
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 py-3  ">
          <p className="text-sm">09:00- 18:00</p>
          <div className="text-sm flex items-center gap-3">
            <p>Ofisda</p>
            <span
              onClick={openModal}
              className="cursor-pointer hover:text-primary"
            >
              <MessageCircle width={18} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
