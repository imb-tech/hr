import { Link, linkOptions } from "@tanstack/react-router";
import { Logo } from "../icons";
import { HomeIcon, ProfileIcon, UsersIcon } from "../icons/nav-icons";
import MenuItem from "./menu-item";

export default function Sidebar() {
  const links = [
    linkOptions({
      to: "/",
      icon: <ProfileIcon />,
      enabled: true,
      title: "Profile",
    }),
    linkOptions({
      to: "/dashboard",
      icon: <HomeIcon />,
      enabled: true,
      title: "Dashboard",
    }),
    linkOptions({
      to: "/drivers",
      icon: <UsersIcon />,
      enabled: true,
      title: "Drivers",
    }),
  ];

  return (
    <div className="hidden lg:w-72 lg:flex justify-start items-start px-2 flex-col border-r-small border-divider">
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
      <nav className="flex flex-col gap-0.5 py-14 w-full">
        {links?.map((link, i) => <MenuItem key={i} {...link} />)}
      </nav>
    </div>
  );
}
