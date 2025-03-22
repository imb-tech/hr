import { Avatar, AvatarGroup } from "@heroui/avatar";
import { MessageCircleQuestion } from "lucide-react";

export default function RegisterSupport() {
  return (
    <div className="align-center my-2 flex shrink-0 items-center justify-center gap-3 self-stretch rounded-large bg-content1 px-3 py-3 shadow-small w-full backdrop-blur-lg lg:bg-white/40 lg:shadow-none dark:lg:bg-white/20">
      <AvatarGroup isBordered size="sm">
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      </AvatarGroup>

      <p className="line-clamp-2 text-left text-tiny font-medium text-default-700">
        We’re here to answer your questions.
      </p>

      <div className="z-0 group relative items-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-tiny px-0 gap-0 transition-transform-colors-opacity motion-reduce:transition-none text-default-700 min-w-8 data-[hover=true]:opacity-hover align-center flex h-[32px] w-[31px] justify-center rounded-[12px] bg-default-100 dark:bg-[#27272A]/[.4]">
        <MessageCircleQuestion size={22} />
      </div>
    </div>
  );
}
