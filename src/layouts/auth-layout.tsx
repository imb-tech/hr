import { ThemeSwitch } from "@/components/theme-switch";
import { Outlet } from "@tanstack/react-router";

export default function AuthLayout() {
  return (
    <section className="h-screen w-full flex flex-col items-center lg:p-8 p-4 ">
      <div className="w-full flex justify-end">
      <ThemeSwitch />
      </div>
      <div className="flex flex-1 justify-center w-full max-w-xl">
        <Outlet />
      </div>
    </section>
  );
}
