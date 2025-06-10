import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import SearchableSelect, { SearchSelectProps } from "./searchable-select";

type Props = {
  paramName?: string;
  clearKeys?: string[];
};

export default function ParamSelect<T extends object>({
  paramName = "filter",
  clearKeys = [],
  ...props
}: SearchSelectProps<T> & Props) {
  const nvg = useNavigate();
  const search = useSearch({ from: "__root__" });
  const location = useLocation();

  const value = (search as Record<string, any>)[paramName];

  function handleChange(evnt: string | undefined) {
    const newValue = evnt ? evnt.toString() : undefined;

    const updatedSearch = { ...search } as Record<string, string | undefined>;
    updatedSearch[paramName] = newValue;

    clearKeys.forEach((key) => {
      delete updatedSearch[key];
    });

    nvg({
      to: location.pathname,
      search: updatedSearch,
    });
  }

  return (
    <SearchableSelect
      selectedKey={String(value)}
      onSelectionChange={(evnt) => handleChange(evnt?.toString())}
      {...props}
    />
  );
}
