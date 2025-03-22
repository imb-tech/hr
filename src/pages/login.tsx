import { FormField, useFormFields } from "@/hooks/use-fields";
import { Link } from "@tanstack/react-router";
import { Path, useForm } from "react-hook-form";

type RegisterFields = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const registerFields: (FormField & { name: Path<RegisterFields> })[] = [
    {
      name: "username",
      type: "text",
      label: "Username",
      required: true,
      placeholder: "Enter a username",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      required: true,
      placeholder: "Enter a username",
    },
  ];
  const form = useForm<RegisterFields>()
  const { Form } = useFormFields<RegisterFields>(registerFields, form);

  const onSubmit = (data: any) => {
    console.log("Register Data:", data);
  };

  return (
    <section className="flex items-center justify-center h-full flex-col">
      <h1 className="text-3xl text- mb-3">Login</h1>
      <Form
        onSubmit={onSubmit}
        className="flex flex-col"
        wrapperClassName="max-w-[400px]"
      />
      <div className="max-w-[400px] w-full flex justify-end mt-1">
        <Link className="text-primary text-sm text-right" to="/forgot-password">
          I don't remember my password
        </Link>
      </div>
    </section>
  );
}
