import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import {
  Navbar as HeroUINavbar,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";

import { Logo, SearchIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";
import { GET_ME } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, User } from "lucide-react";
import { ReactNode } from "react";
import HeaderBreadvrumb from "./header-breadcrumb";

export const Navbar = ({
  items,
  rightComponent,
  leftComponent,
}: {
  items?: string[];
  rightComponent?: ReactNode;
  leftComponent?: ReactNode;
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
  const { data } = useGet<{
    phone_number: string;
    username: string;
    first_name: string;
    last_name?: string;
  }>(GET_ME);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate({ to: "/login" });
  };

  return (
    <HeroUINavbar
      className="border-b-small border-divider  "
      maxWidth="full"
      position="sticky"
    >
      <div className="hidden">
        <ThemeSwitch className="min-w-full min-h-full" />
      </div>
      <div className="flex gap-3 items-center">
        <Link
          className="flex justify-start lg:hidden items-center gap-1"
          color="foreground"
          to="/"
        >
          <Logo />
          <p className="font-bold text-inherit">ACME</p>
        </Link>
        {!!leftComponent && <div className="flex gap-2">{leftComponent}</div>}
        <HeaderBreadvrumb items={items ?? []} />
      </div>

      <div className="flex gap-3">
        {!!rightComponent && <div className="flex gap-2">{rightComponent}</div>}
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <Avatar
              size={"md"}
              as="button"
              className="transition-transform"
              src={undefined}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="profile" className="h-9">
              <div className="flex items-center gap-2">
                <User size={18} />{" "}
                {data?.first_name && data?.last_name ? (
                  <p className="font-medium ">
                    {data?.first_name} {data?.last_name}
                  </p>
                ) : (
                  <p className="font-medium ">{data?.username}</p>
                )}
              </div>
            </DropdownItem>
            <DropdownSection showDivider>
              <DropdownItem
                key={"theme"}
                className="flex items-start justify-center h-9"
              >
                <ThemeSwitch className="min-w-full min-h-full" />
              </DropdownItem>
            </DropdownSection>

            <DropdownItem key="logout" color="danger">
              <div
                onClick={logOut}
                className="flex items-center w-full gap-[6px]"
              >
                <LogOut size={16} /> <span>Chiqish</span>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
