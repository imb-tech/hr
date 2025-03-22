import { ThemeSwitch } from "@/components/theme-switch";
import RegisterForm from "./register-form";
import RegisterStepper from "./register-stepper";
import RegisterSupport from "./register-support";

export default function RegisterPage() {
  return (
    <section className="h-screen pt-4 w-full flex items-center justify-center">
      <div className="container mx-auto max-w-6xl">
        <div className="flex">
          <aside className="hidden h-full max-w-[350px] w-full flex-shrink-0 flex-col items-start gap-y-8 rounded-3xl bg-gradient-to-b from-default-100 via-danger-100 to-secondary-100 px-8 py-6 shadow-small lg:flex">
            <ThemeSwitch />
            <div className="stepper">
              <h1 className="text-2xl">Acme Mailroom</h1>
              <p className="text-default-500 mt-2">
                Get a unique, physical U.S address and virtual mailbox.
              </p>

              <RegisterStepper />
            </div>

            <RegisterSupport />
          </aside>
          <div className="flex-1">
            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
