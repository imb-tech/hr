import { Input } from "@heroui/input";
import { cn } from "@heroui/theme";
import { ComponentType } from "react";
import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useController,
} from "react-hook-form";
import {
  InputAttributes,
  NumericFormat,
  NumericFormatProps,
} from "react-number-format";

interface IProps<IForm extends FieldValues> {
  control: Control<IForm>;
  name: Path<IForm>;
  label?: string;
  required?: boolean;
  registerOptions?: RegisterOptions<IForm>;
  formatOptions?: Intl.NumberFormatOptions;
  wrapperClassName?: string;
  decimalSeparator?: string;
  hideError?: boolean;
}

export function FormNumberInput<IForm extends FieldValues>({
  control,
  name,
  label,
  required = false,
  wrapperClassName,
  className,
  thousandSeparator,
  decimalSeparator,
  ...props
}: IProps<IForm> & NumericFormatProps) {
  const {
    field: { onChange, ref, ...field },
  } = useController({
    name,
    control,
    rules: {
      required,
    },
  });

  return (
    <fieldset className={cn("flex flex-col w-full", wrapperClassName)}>
      {label && (
        <label className="mb-1" htmlFor={name}>
          {label}
        </label>
      )}

      {/* <label className="relative flex items-center"> */}
      <NumericFormat
        className={cn(className, "border-none focus:border-none")}
        customInput={Input as ComponentType<InputAttributes> | undefined}
        decimalSeparator={decimalSeparator}
        getInputRef={ref}
        id={name}
        inputMode="decimal"
        thousandSeparator={thousandSeparator}
        {...props}
        {...field}
        autoComplete="off"
        disabled={field.disabled || props.disabled}
        placeholder={props.placeholder || label}
        onValueChange={(val) => {
          onChange(val.value);
        }}
      />
      {/* </label> */}
    </fieldset>
  );
}
