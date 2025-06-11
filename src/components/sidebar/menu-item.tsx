import { useSidebarState } from "@/store/sidebar";
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
  const { open } = useSidebarState();

  const isActive =
    to === "/" ? pathname === to : pathname.startsWith(to) && to !== "/";

  return (
    <Button
      className="relative min-w-4"
      color="default"
      variant={isActive ? "flat" : "light"}
    >
      <Link className="w-full h-full flex items-center justify-start" to={to}>
        {icon}
          <div className="relative h-5">
          <span
            className={`absolute left-0 top-0 transition-all duration-300 ease-in-out
            ${!open ? "opacity-100 translate-x-4" : "opacity-0 -translate-x-2"}
          `}
          >
            {title}
          </span>
        </div>
      </Link>

      {badge && !open ? (
        <span className="absolute text-xs right-2 size-5 flex items-center justify-center bg-gray-500/70 rounded-full text-white">
          {badge}
        </span>
      ) : (
        ""
      )}
    </Button>
  );
}
