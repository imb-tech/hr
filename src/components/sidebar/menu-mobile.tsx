import { Button } from "@heroui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { ReactNode } from "react";

type Props = {
  to: string;
  title: string;
  icon: ReactNode;
  enabled?: boolean;
};

export default function MenuItemMobile({ to, title, icon }: Props) {
  const { pathname } = useLocation();

  const isActive =
    to === "/" ? pathname === to : pathname.startsWith(to) && to !== "/";

  return (
    <Button color="default"  variant={isActive ? "flat" : "light"}>
      <Link className="w-full h-full flex flex-col items-center justify-start" to={to}>
        {icon}
        <span className="ml-2">{title}</span>
      </Link>
    </Button>
  );
}
