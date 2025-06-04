import { DatePicker, DatePickerProps } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";

type Props = {
  paramName?: keyof SearchParams;
  inputClassName?: DatePickerProps["classNames"];
};

export function ParamDatePicker({
  paramName = "date",
  inputClassName,
  ...props
}: Props & DatePickerProps) {
  const search = useSearch({ from: "__root__" });
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleChange = (date: any) => {
    if (!date) return;

    const isoDate = date.toString();

    navigate({
      to: pathname,
      search: {
        ...search,
        [paramName]: isoDate,
      },
    });
  };

  const defaultDate =
    typeof search[paramName] === "string" ? parseDate(search[paramName]) : null;

  return (
    <DatePicker
      className="max-w-[284px]"
      classNames={{
        input: "w-0 overflow-hidden",
        inputWrapper: "pl-1",
        ...inputClassName,
      }}
      {...props}
      defaultValue={defaultDate as DatePickerProps["defaultValue"]}
      onChange={handleChange}
    />
  );
}
