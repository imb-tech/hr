import { REQUIRED_MESSAGE } from "@/constants/components";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";

import {
  Select as HeroSelect,
  SelectProps as HeroSelectProps,
  SelectItem,
} from "@heroui/select";
import { ReactNode } from "react";

type SelectItemProps = { key: number; label: string };

interface IProps<IForm extends FieldValues> {
  methods: UseFormReturn<IForm>;
  name: Path<IForm>;
  required?: boolean;
  options?: Array<SelectItemProps>;
}

export type SelectProps = Omit<HeroSelectProps, "items" | "children"> & {
  items: Array<SelectItemProps>;
  children?: ReactNode;
};

export default function FormSelect<IForm extends FieldValues>({
  methods,
  name,
  required = false,
  options,
  multiple,
  ...props
}: IProps<IForm> & Omit<SelectProps, "onChange" | "value" | "items">) {
  return (
    <Controller
      control={methods.control}
      name={name}
      render={({ field, fieldState }) => (
        <HeroSelect
          {...field}
          errorMessage={fieldState?.error?.message}
          isInvalid={!!fieldState.error}
          label={props.label}
          labelPlacement="outside"
          multiple={multiple}
          name={name}
          placeholder={`Select ${props.label}`}
          selectedKeys={field.value as string}
          size="lg"
          value={field.value}
          onSelectionChange={field.onChange}
          {...props}
        >
          {options?.length
            ? options.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))
            : null}
        </HeroSelect>
      )}
      rules={{
        required: {
          value: required,
          message: REQUIRED_MESSAGE,
        },
      }}
    />
  );
}
