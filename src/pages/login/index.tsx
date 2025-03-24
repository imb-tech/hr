import { FormField, useFormFields } from "@/hooks/use-fields";
import { Link } from "@tanstack/react-router";
import { Path, useForm } from "react-hook-form";

type LoginFields = {
  company: string;
  address: string;
  stir: number;
  aacept: boolean;
};

export default function LoginForm() {
  const form = useForm<LoginFields>();
  const { Form } = useFormFields<LoginFields>(registerFields, form);

  const onSubmit = (data: any) => {
    console.log("Login Data:", data);
  };

  return (
    <section className="flex pl-16 justify-center h-full flex-col w-full">
      <h1 className="text-3xl mb-1 text-ce">Welcome to Acme 👋</h1>
      <div className="max-w-[400px] w-full flex items-center gap-2 mb-3">
        <span className="text-default-400 text-sm text-right">
          Already have an account?
        </span>
        <Link className="text-primary text-sm text-right" to="/login">
          Sign In
        </Link>
      </div>
      <Form
        formBottom
        className="grid-cols-2"
        submitText="Create a Company"
        wrapperClassName="max-w-xl"
        onSubmit={onSubmit}
      />
      <div className="max-w-[400px] w-full flex mt-2">
        <Link className="text-primary text-sm text-right" to="/forgot-password">
          I don't remember my password
        </Link>
      </div>
    </section>
  );
}

const registerFields: (FormField & { name: Path<LoginFields> })[] = [
  {
    name: "company",
    type: "text",
    label: "Company name",
    required: true,
    placeholder: "Enter a Your Company name",
    gridCols: 2,
  },
  {
    name: "address",
    type: "text",
    label: "Address",
    required: true,
    placeholder: "Enter a Company address",
    gridCols: 1,
  },
  {
    name: "stir",
    type: "text",
    label: "STIR",
    required: true,
    placeholder: "STIR",
    gridCols: 1,
  },
  {
    name: "aacept",
    type: "checkbox",
    label: "I consent to the processing of this data.",
    gridCols: 2,
    className: "pt-2",
  },
];
