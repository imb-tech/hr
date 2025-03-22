import { Link } from "@heroui/link";

import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-screen">
      <div className="container flex w-full max-w-full mx-auto flex-grow h-full">
        <Sidebar />
        <div className="w-full h-full flex-grow flex flex-col">
          <Navbar />
          <main className="container flex-grow w-full max-w-full mx-auto px-3 py-2 overflow-y-auto">
            {children}
          </main>
          <footer className="w-full flex items-center justify-center py-3">
            <Link
              isExternal
              className="flex items-center gap-1 text-current"
              href="https://heroui.com"
              title="heroui.com homepage"
            >
              <span className="text-default-600">Powered by</span>
              <p className="text-primary">HeroUI</p>
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
}
