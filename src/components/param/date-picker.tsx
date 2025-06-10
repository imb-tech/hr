import { DatePicker, DatePickerProps } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";

type Props = {
  paramName?: keyof SearchParams;
  inputClassName?: DatePickerProps["classNames"];
};

function getCurrentDateFormatted(): string {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

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
    typeof search[paramName] === "string"
      ? parseDate(search[paramName])
      : parseDate(getCurrentDateFormatted());

  return (
    <DatePicker
      className="max-w-[284px]  date-picker "
      classNames={{
        input: "w-0 overflow-hidden",
        inputWrapper: "pl-1",
        
        ...inputClassName,
      }}
      {...props}
      defaultValue={defaultDate as any}
      onChange={handleChange}
    />
  );
}
