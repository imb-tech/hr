import { GET_ME } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { useSidebarState } from "@/store/sidebar";
import { cn } from "@heroui/theme";
import { linkOptions } from "@tanstack/react-router";
import {
  Building2,
  MapPinned,
  NotebookText,
  ScrollText,
  SquareUser,
  WalletMinimal,
} from "lucide-react";
import { UsersIcon } from "../icons/nav-icons";
import MenuItem from "./menu-item";

export const links = [
  linkOptions({
    to: "/",
    icon: <Building2 />,
    enabled: true,
    title: "Ofis",
  }),
  linkOptions({
    to: "/map",
    icon: <MapPinned />,
    enabled: true,
    title: "Xarita",
  }),
  linkOptions({
    to: "/position",
    icon: <SquareUser />,
    enabled: true,
    title: "Lavozimlar",
  }),
  linkOptions({
    to: "/hr",
    icon: <UsersIcon />,
    enabled: true,
    title: "Hodimlar",
  }),
  linkOptions({
    to: "/landing",
    icon: <NotebookText />,
    enabled: true,
    title: "Qo'llanma",
  }),
  linkOptions({
    to: "/settings",
    icon: <ScrollText />,
    enabled: true,
    title: "So'rov",
  }),
  linkOptions({
    to: "/plans",
    icon: <WalletMinimal />,
    enabled: true,
    title: "Balans",
  }),
];

export default function Sidebar() {
  const { data } = useGet<Profile>(GET_ME);
  const { open } = useSidebarState();

  return (
    <div
      className={cn(
        "hidden  transition-width duration-300 fixed top-4 h-full lg:flex justify-start items-start px-2 flex-col border-r-small border-divider",
        open ? "w-[75px]" : "w-44",
      )}
    >
      <nav className="flex flex-col gap-0.5 pt-16 w-full">
        {links?.map((link, i) => (
          <MenuItem
            key={i}
            {...link}
            badge={link.to === "/settings" ? Number(data?.excuses) : undefined}
          />
        ))}
      </nav>
    </div>
  );
}
