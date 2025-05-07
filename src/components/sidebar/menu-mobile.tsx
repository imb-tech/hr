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

  return (
    <Button color="default" variant="light">
      <Link
        className={`w-full h-full flex flex-col items-center justify-start opacity-50 ${pathname.startsWith("/office/") && to === "/" ? "!opacity-100" : ""}`}
        to={to}
        activeProps={{ className: "!opacity-100" }}
        // activeOptions={{}}
      >
        <span>{icon}</span>
        <span className="">{title}</span>
      </Link>
    </Button>
  );
}
