import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import SearchableSelect, { SearchSelectProps } from "./searchable-select";

type Props = {
  paramName?: keyof SearchParams;
  clearOther?: boolean;
};

export default function ParamSelect<T extends object>({
  paramName = "filter",
  clearOther = false,
  ...props
}: SearchSelectProps<T> & Props) {
  const nvg = useNavigate();
  const search: SearchParams = useSearch({ from: "__root__" });
  const location = useLocation();

  const value = search[paramName];

  function handleChange(evnt: string | undefined) {
    nvg({
      to: location.pathname,
      search: !clearOther
        ? {
            ...search,
            [paramName]: evnt ? evnt?.toString() : undefined,
          }
        : { [paramName]: evnt ? evnt?.toString() : undefined },
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
