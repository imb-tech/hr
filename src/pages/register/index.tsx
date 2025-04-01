import FormInput from "@/components/form/input";
import { REGISTER } from "@/constants/api-endpoints";
import { setAccessToken, setRefreshToken } from "@/lib/set-token";
import { usePost } from "@/services/default-requests";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

type RegisterFields = {
  full_name: number;
  username: string;
  password: boolean;
};

export default function RegisterForm() {
  const { mutate, isPending } = usePost({
    onSuccess: (data) => {
      const access = data?.access;
      const refresh = data?.refresh;

      if (access) {
        setAccessToken(access);
        addToast({
          color: "success",
          title: "Ro'yxatdan o'tish",
          description: "Tizimdan muvvaqiyatli ro'yxatdan o'tdingiz",
        });
      }
      if (refresh) {
        setRefreshToken(refresh);
      }
      window.location.replace("/");
    },
  });

  const form = useForm<RegisterFields>();

  const onSubmit = (data: RegisterFields) => {
    console.log("Register Data:", data);
    mutate(REGISTER, data);
  };

  return (
    <section className="flex pl-16 justify-center h-full flex-col w-full">
      <h1 className="text-3xl mb-1">Ro'yxatdan o'tish</h1>
      <div className="max-w-[400px] w-full flex items-center gap-2 mb-3">
        <span className="text-default-400 text-sm text-right">
          Hisobingiz bormi?
        </span>
        <Link className="text-primary text-sm text-right" to="/login">
          Kirish
        </Link>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FormInput isRequired methods={form} name="full_name" label={"Ism"} />
        <FormInput isRequired methods={form} name="username" label={"Login"} />
        <FormInput
          isRequired
          methods={form}
          name="password"
          label={"Parol"}
          type="password"
        />
        <Button isLoading={isPending} color="primary">
          Davom etish
        </Button>
      </form>
    </section>
  );
}
