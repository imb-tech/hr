import Sidebar, { links } from "@/components/sidebar";
import MenuItemMobile from "@/components/sidebar/menu-mobile";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-screen">
      <div className="flex h-full">
        <Sidebar />
        <div className="w-full lg:pl-52 pb-32 md:pb-36 lg:pb-0">
          {children}
          <nav className="flex lg:hidden h-16 justify-between items-center px-2 border-t border-t-default w-full fixed bottom-0 bg-background z-50">
            {links?.map((link, i) => <MenuItemMobile key={i} {...link} />)}
          </nav>
        </div>
      </div>
    </div>
  );
}
