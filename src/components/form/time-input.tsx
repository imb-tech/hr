import { REQUIRED_MESSAGE } from "@/constants/components";
import { TimeInput as HeroTimeInput, TimeInputProps } from "@heroui/date-input";
import { cn } from "@heroui/theme";
import { Time } from "@internationalized/date";
import { ReactNode } from "react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

interface IProps<IForm extends FieldValues> {
  methods: UseFormReturn<IForm>;
  name: Path<IForm>;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  wrapperClassName?: string;
  value?: string;
}

export default function TimeInput<IForm extends FieldValues>({
  methods,
  name,
  label,
  fullWidth = false,
  wrapperClassName,
  required = false,
  value,
  ...props
}: TimeInputProps & IProps<IForm>) {
  const {
    register,
    formState: { errors },
  } = methods;

  const reg = register(name, {
    required: {
      value: required,
      message: `${label ?? ""} f${REQUIRED_MESSAGE}`,
    },
  });

  function handleChange(time: string) {
    methods.setValue(
      name,
      time as PathValue<IForm, Path<IForm> & (string | undefined)>,
    );
  }
  const times = methods.watch(name)?.split(":");

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
        value={
          times?.[0] && times?.[1]
            ? new Time(Number(times?.[0]), Number(times?.[1]))
            : undefined
        }
        onChange={(time) => {
          if (time) {
            handleChange(
              `${time?.hour?.toString()}:${time?.minute?.toString()}`,
            );
          } else methods.resetField(name);
        }}
      />
    </fieldset>
  );
}
