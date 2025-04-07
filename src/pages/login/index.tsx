import FormInput from "@/components/form/input";
import { LOGIN } from "@/constants/api-endpoints";
import { usePost } from "@/hooks/usePost";
import { setAccessToken, setRefreshToken } from "@/lib/set-token";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

type LoginFields = {
  username: string;
  password: boolean;
};

export default function LoginForm() {
  const navigate = useNavigate();
  const { mutate, isPending } = usePost({
    onSuccess: (data) => {
      const access = data?.access;
      const refresh = data?.refresh;

      if (access) {
        setAccessToken(access);
        addToast({
          color: "success",
          title: "Kirish",
          description: "Tizimga muvvaqiyatli kirdingiz",
        });
      }
      if (refresh) {
        setRefreshToken(refresh);
      }
      navigate({ to: "/" });
    },
  });

  const form = useForm<LoginFields>();

  const onSubmit = (data: LoginFields) => {
    mutate(LOGIN, data);
  };

  return (
    <section className="flex justify-center h-full flex-col w-full">
      <h1 className="text-3xl text-center mb-5">Tizimga kirish</h1>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 "
      >
        <FormInput isRequired methods={form} name="username" label={"Login"} />
        <FormInput
          isRequired
          methods={form}
          name="password"
          label={"Parol"}
          type="password"
        />
        <Button isLoading={isPending} className="mt-3" color="primary" type="submit">
          Davom etish
        </Button>
      </form>
    </section>
  );
}
