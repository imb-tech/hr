import { TimeInput as HeroTimeInput, TimeInputProps } from "@heroui/date-input";
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

export default function TimeInput<IForm extends FieldValues>({
  methods,
  name,
  label,
  fullWidth = false,
  wrapperClassName,
  required = false,
  ...props
}: IProps<IForm> & TimeInputProps) {
  const {
    register,
    formState: { errors },
  } = methods;

  const reg = register(name, {
    required: {
      value: required,
      message: `${label ?? ""} field is required`,
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
      <HeroTimeInput
        errorMessage={
          typeof errors[name]?.message === "string"
            ? (errors[name]?.message as ReactNode)
            : ""
        }
        granularity="minute"
        hourCycle={24}
        isInvalid={!!errors[name]}
        label={label}
        labelPlacement="outside"
        {...props}
        {...reg}
        onChange={(time) =>
          reg.onChange({
            target: {
              value: time,
            },
          })
        }
      />
    </fieldset>
  );
}
