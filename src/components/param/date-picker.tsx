import { DatePicker } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { useNavigate, useSearch } from "@tanstack/react-router";

type Props = {
  paramName?: string;
};


export function DatePickerWithURL({ paramName = "date" }: Props) {
  const search: any = useSearch({ strict: false });
  const navigate = useNavigate();

  const handleChange = (date: any) => {
    if (!date) return;

    const isoDate = date.toString();

    navigate({
      search: {
        ...search,
        [paramName]: isoDate,
      },
    });
  };

  const defaultDate: any = search[paramName]
    ? parseDate(search[paramName])
    : null;

  return (
    <DatePicker
      className="max-w-[284px]"
      defaultValue={defaultDate}
      onChange={handleChange}
      
    />
  );
}
