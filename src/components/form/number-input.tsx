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
  registerOptions,
  wrapperClassName,
  className,
  formatOptions,
  thousandSeparator,
  decimalSeparator,
  hideError = true,
  ...props
}: IProps<IForm> & NumericFormatProps) {
  const {
    field: { onChange, ref, ...field },
  } = useController({
    name,
    control,
  });

  return (
    <fieldset className={cn("flex flex-col w-full", wrapperClassName)}>
      {label && (
        <label htmlFor={name} className="mb-1">
          {label}
        </label>
      )}

      <label className="relative flex items-center">
        <NumericFormat
          id={name}
          customInput={Input as ComponentType<InputAttributes> | undefined}
          inputMode="decimal"
          className={cn(className, "border-none focus:border-none")}
          thousandSeparator={thousandSeparator}
          decimalSeparator={decimalSeparator}
          getInputRef={ref}
          {...props}
          {...field}
          autoComplete="off"
          onValueChange={(val) => {
            onChange(val.value);
          }}
          placeholder={props.placeholder || label}
          disabled={field.disabled || props.disabled}
        />
      </label>
    </fieldset>
  );
}
