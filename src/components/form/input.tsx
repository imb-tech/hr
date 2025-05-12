import { REQUIRED_MESSAGE } from "@/constants/components";
import { Input, InputProps } from "@heroui/input";
import { cn } from "@heroui/theme";
import { ReactNode } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface IProps<IForm extends FieldValues> {
  methods: UseFormReturn<IForm>;
  name: Path<IForm>;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  wrapperClassName?: string;
}

export default function FormInput<IForm extends FieldValues>({
  methods,
  name,
  label,
  fullWidth = false,
  wrapperClassName,
  required = false,
  ...props
}: IProps<IForm> & InputProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = methods;

  const reg = register(name, {
    required: {
      value: required,
      message: `${label ?? ""} ${REQUIRED_MESSAGE}`,
    },
  });

  return (
    <fieldset
      className={cn(
        "flex flex-col gap-2 w-xs",
        wrapperClassName,
        fullWidth && "w-full",
      )}
    >
      <Input
        errorMessage={
          typeof errors[name]?.message === "string"
            ? (errors[name]?.message as ReactNode)
            : ""
        }
        isInvalid={!!errors[name]}
        label={label}
        labelPlacement="outside"
        placeholder={props.placeholder ?? label}
        type={props.type || "text"}
        value={watch(name)}
        {...props}
        {...reg}
      />
    </fieldset>
  );
}
