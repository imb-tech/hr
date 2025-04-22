import {
  Select as HeroSelect,
  SelectProps as HeroSelectProps,
  SelectItem,
} from "@heroui/select";
import { ReactNode } from "react";

type SelectItemProps = { key: number; label: string };

export type SelectProps = Omit<HeroSelectProps, "items" | "children"> & {
  items: Array<SelectItemProps>;
  children?: ReactNode;
};

export default function Select({
  items,
  label,
  name,
  className,
  value,
  onSelectionChange,
  placeholder="",
  labelPlacement,
  size="lg",
}: SelectProps) {
  const filteredProps: Partial<HeroSelectProps> = {
    label,
    name,
    value,
    onSelectionChange,
    className,
    size,
    labelPlacement,
    placeholder,
  };

  return (
    <HeroSelect
      {...filteredProps}
      className={className}
      label={label}
      labelPlacement="outside"
      name={name}
      placeholder={`${placeholder || label}`}
      selectedKeys={value as string}
      size={size}
      value={value}
      onSelectionChange={onSelectionChange}
    >
      {items?.length
        ? items.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))
        : null}
    </HeroSelect>
  );
}
