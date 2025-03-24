import { FormField, useFormFields } from "@/hooks/use-fields";
import { Path, useForm } from "react-hook-form";

export default function Profilepage() {
  type Profile = {
    full_name: string;
    company_name: string;
    email: string;
    phone: string;
    new_password: string;
    confirm_password: string;
  };

  const profileFields: (FormField & { name: Path<Profile> })[] = [
    {
      name: "full_name",
      type: "text",
      label: "Full name",
      required: true,
    },
    {
      name: "company_name",
      type: "text",
      label: "Company",
      required: true,
    },
    {
      name: "email",
      type: "text",
      label: "Email",
      required: true,
    },
    {
      name: "new_password",
      type: "password",
      label: "New password",
    },
    {
      name: "confirm_password",
      type: "password",
      label: "Confirm password",
      required: true,
    },
  ];
  const form = useForm<Profile>();
  const { Form } = useFormFields<Profile>(profileFields, form);

  const onSubmit = (data: any) => {
    console.log("Register Data:", data);
  };

  return (
    <section className="">
      <h1 className="text-3xl text- mb-3">Profile</h1>
      <Form className="grid-cols-3" submitText="Save" onSubmit={onSubmit} />
    </section>
  );
}
