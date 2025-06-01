import Sidebar, { links } from "@/components/sidebar";
import MenuItemMobile from "@/components/sidebar/menu-mobile";
import { useSidebarState } from "@/store/sidebar";
import { cn } from "@heroui/theme";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open } = useSidebarState();
  return (
    <div className="relative h-screen">
      <div className="flex h-full">
        <Sidebar />
        <div className={cn("w-full transition-all  pb-32 md:pb-36 lg:pb-0",
          !open ? "lg:pl-[182px]" : "lg:pl-20"
        )}>
          {children}
          <nav className="flex lg:hidden h-16 justify-between items-center border-t border-t-default w-full fixed bottom-0 bg-background z-50">
            {links?.map((link, i) => <MenuItemMobile key={i} {...link} />)}
          </nav>
        </div>
      </div>
    </div>
  );
}
