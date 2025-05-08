import { Button } from "@heroui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { ReactNode } from "react";

type Props = {
  to: string;
  title: string;
  icon: ReactNode;
  enabled?: boolean;
  badge?: number;
};

export default function MenuItem({ to, title, icon, badge }: Props) {
  const { pathname } = useLocation();

  const isActive =
    to === "/" ? pathname === to : pathname.startsWith(to) && to !== "/";

  return (
    <Button
      color="default"
      variant={isActive ? "flat" : "light"}
      className="relative"
    >
      <Link className="w-full h-full flex items-center justify-start" to={to}>
        {icon}
        <span className="ml-2">{title}</span>
      </Link>

      {badge && (
        <span className="absolute text-xs right-2 size-5 flex items-center justify-center bg-gray-500/70 rounded-full text-white">
          {badge > 9 ? "9+" : badge}
        </span>
      )}
    </Button>
  );
}
