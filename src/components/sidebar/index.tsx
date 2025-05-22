import { GET_ME } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { Link, linkOptions } from "@tanstack/react-router";
import { Building2, MapPinned, ScrollText, SquareUser } from "lucide-react";
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
    to: "/settings",
    icon: <ScrollText />,
    enabled: true,
    title: "So'rov",
  }),
];

export default function Sidebar() {
  const { data } = useGet<Profile>(GET_ME);

  return (
    <div className="hidden lg:max-w-72 min-w-52 fixed top-0 h-full lg:flex justify-start items-start px-2 flex-col border-r-small border-divider">
      <div className="sidebar-header py-3 w-full">
        <Link
          className="flex justify-start pl-4 items-center gap-1"
          color="foreground"
          to="/"
        >
          <img alt="" src="/images/logo.png" width={30} />
          <p className="font-bold text-inherit">IMB HR</p>
        </Link>
      </div>
      <nav className="flex flex-col gap-0.5 pt-2 w-full">
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
