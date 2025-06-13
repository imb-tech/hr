import Sidebar, { links } from "@/components/sidebar";
import MenuItemMobile from "@/components/sidebar/menu-mobile";
import { GET_ME } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { useSidebarState } from "@/store/sidebar";
import { cn } from "@heroui/theme";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open } = useSidebarState();
    const { data } = useGet<Profile>(GET_ME);

  return (
    <div className="relative h-screen">
      <div className="flex h-full">
        <Sidebar />
        <div className={cn("w-full transition-all  pb-32 md:pb-36 lg:pb-0",
          !open ? "lg:pl-[182px]" : "lg:pl-20"
        )}>
          {children}
          {/* <nav className="flex lg:hidden h-16 justify-between items-center border-t border-t-default w-full fixed bottom-0 bg-background z-50"> */}
          <nav className="grid grid-cols-6 lg:hidden h-16 items-center border-t border-t-default w-full fixed bottom-0 bg-background z-40">
            {links?.map((link, i) => <MenuItemMobile badge={link.to === "/settings" ? Number(data?.excuses) : undefined} key={i} {...link} />)}
          </nav>
        </div>
      </div>
    </div>
  );
}
