import { ThemeSwitch } from "@/components/theme-switch";
import { Outlet } from "@tanstack/react-router";

export default function AuthLayout() {
  return (
    <div className="flex flex-col overflow-hidden h-screen">
      <main className="w-full max-w-full mx-auto flex-grow flex">
        <img
          src="https://media.istockphoto.com/id/482818710/photo/truck-on-highway-at-sunset.jpg?s=1024x1024&w=is&k=20&c=nKxEdKE0HBvyv-18NmR_h6mEZJXgedyX-QbZC08BeuE="
          className="h-screen"
          loading="lazy"
          alt="Login page cover"
        />
        <section className="p-5 w-full">
          <section className="h-full">
            <div className="flex items-center justify-between w-full">
              <p>Logo</p>
              <ThemeSwitch />
            </div>
            <Outlet />
          </section>
        </section>
      </main>
    </div>
  );
}
