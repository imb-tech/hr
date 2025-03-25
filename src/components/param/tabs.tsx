import { TabsProps } from "@heroui/tabs";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Key } from "react";
import Tabs from "../ui/tabs";

type Props = {
  tabs: { key: string; label: string }[];
  paramName?: string;
  clearOther?: boolean;
};

export default function ParamTabs({
  tabs,
  paramName = "tab",
  clearOther = true,
  ...props
}: Props & TabsProps) {
  const search: any = useSearch({ strict: false });
  const navigate = useNavigate();

  function handleChange(val: Key) {
    const newParams = clearOther
      ? { [paramName]: val }
      : {
          ...search,
          [paramName]: val,
        };

    navigate({ search: newParams });
  }

  return (
    <Tabs
      aria-label="Options"
      tabs={tabs}
      onSelectionChange={handleChange}
      {...props}
    />
  );
}
