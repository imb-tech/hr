import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import {
  Navbar as HeroUINavbar,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";

import { SearchIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";
import { Link } from "@tanstack/react-router";
import { ReactNode } from "react";
import HeaderBreadvrumb from "./header-breadcrumb";

export const Navbar = ({
  items,
  rightComponent,
}: {
  items?: string[];
  rightComponent?: ReactNode;
}) => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar
      className="border-b-small border-divider  "
      maxWidth="full"
      position="sticky"
    >
      <HeaderBreadvrumb items={items ?? []} />

      <div className="flex gap-3">
        {!!rightComponent && <div className="flex gap-2">{rightComponent}</div>}
        <ThemeSwitch />
      </div>

      <NavbarMenu className="static sm:hidden">
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                to="."
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
