import RadioGroup, { RadioGroupProps } from "@/components/ui/radio-group";
import Select, { SelectProps } from "@/components/ui/select";
import { Button } from "@heroui/button";
import { Checkbox, CheckboxProps } from "@heroui/checkbox";
import { Input, InputProps, Textarea, TextAreaProps } from "@heroui/input";
import { cn } from "@heroui/theme";
import { ReactNode } from "react";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";

const gridCols: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
};

type FieldType =
  | "text"
  | "password"
  | "select"
  | "checkbox"
  | "radio"
  | "textarea";

type BaseField<T extends FieldType, P = {}> = P & {
  name: string;
  type: T;
  label: string;
  required?: boolean;
  gridCols?: number;
  rows?: number;
};

type TextField = BaseField<"text" | "password", InputProps>;
type SelectField = BaseField<"select", SelectProps>;
type CheckboxField = BaseField<"checkbox", CheckboxProps>;
type RadioField = BaseField<"radio", RadioGroupProps>;
type TextareaField = BaseField<"textarea", TextAreaProps>;

export type FormField =
  | TextField
  | SelectField
  | CheckboxField
  | RadioField
  | TextareaField;

export function useFormFields<FieldTypes extends FieldValues>(
  fields: Partial<FormField[]>,
  form: UseFormReturn<FieldTypes>,
) {
  const { handleSubmit, control } = form;
  type Field = Path<FieldTypes>;

  const renderField = (field: FormField) => {
    switch (field.type) {
      case "select":
        return (
          <Controller
            name={field.name as Field}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                {...field}
                value={value ?? []}
                onSelectionChange={(v) => onChange(v.currentKey)}
              />
            )}
          />
        );

      case "checkbox":
        return (
          <Controller
            name={field.name as Field}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Checkbox
                {...field}
                value={value ?? ""}
                isSelected={!!value}
                onValueChange={onChange}
                className="w-full"
              >
                {field.label}
              </Checkbox>
            )}
          />
        );

      case "radio":
        return (
          <Controller
            name={field.name as Field}
            control={control}
            render={({ field: { value, onChange } }) => (
              <RadioGroup
                {...field}
                value={value ?? ""}
                onValueChange={onChange}
              />
            )}
          />
        );

      case "textarea":
        return (
          <Controller
            name={field.name as Field}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Textarea
                className="border rounded-lg p-2 w-full"
                {...field}
                value={value ?? ""}
                onChange={onChange}
              />
            )}
          />
        );

      default:
        return (
          <Controller
            name={field.name as Field}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                {...field}
                value={value ?? ""}
                onChange={onChange}
                placeholder={field.placeholder ?? field.label}
                labelPlacement={"outside"}
              />
            )}
          />
        );
    }
  };

  return {
    Form: ({
      onSubmit,
      wrapperClassName,
      className,
      submitText,
      hideSubmit,
      formBottom,
    }: {
      onSubmit: (data: FieldTypes) => void;
      className?: string;
      wrapperClassName?: string;
      submitText?: string;
      hideSubmit?: boolean;
      formBottom?: ReactNode;
    }) => (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("w-full flex flex-col gap-3", wrapperClassName)}
      >
        <div className={cn("grid gap-3", className)}>
          {fields.map((field) => (
            <div
              key={field?.name as Field}
              className={cn(field?.className, gridCols?.[field?.gridCols ?? 1])}
            >
              {renderField(field!)}
            </div>
          ))}
          {!formBottom ||
            (!hideSubmit && (
              <div className="w-full h-full flex flex-col grid-cols-12">
                <label className="opacity-0 h-2">
                  {submitText ?? "Submit"}
                </label>
                <Button type="submit" fullWidth color="primary">
                  {submitText ?? "Submit"}
                </Button>
              </div>
            ))}
        </div>
        {formBottom}
      </form>
    ),
  };
}
