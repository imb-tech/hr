import { Link, linkOptions } from "@tanstack/react-router";
import { Building2, SquareUser } from "lucide-react";
import { Logo } from "../icons";
import { UsersIcon } from "../icons/nav-icons";
import MenuItem from "./menu-item";

export default function Sidebar() {
  const links = [
    linkOptions({
      to: "/",
      icon: <Building2 />,
      enabled: true,
      title: "Ofis",
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
  ];

  return (
    <div className="hidden lg:max-w-72 lg:flex justify-start items-start px-2 flex-col border-r-small border-divider">
      <div className="sidebar-header py-3">
        <Link
          className="flex justify-start items-center gap-1"
          color="foreground"
          to="/"
        >
          <Logo />
          <p className="font-bold text-inherit">ACME</p>
        </Link>
      </div>
      <nav className="flex flex-col gap-0.5 pt-2 w-full">
        {links?.map((link, i) => <MenuItem key={i} {...link} />)}
      </nav>
    </div>
  );
}
