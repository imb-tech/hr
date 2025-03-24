import { ThemeSwitch } from "@/components/theme-switch";
import { Outlet } from "@tanstack/react-router";

export default function AuthLayout() {
  return (
    <section className="h-screen w-full flex flex-col items-center pt-10">
      <ThemeSwitch />
      <div className="flex flex-1 justify-center w-full max-w-2xl">
        <Outlet />
      </div>
    </section>
  );
}
