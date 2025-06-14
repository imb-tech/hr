import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from "@heroui/react";
import { cn } from "@heroui/theme";

export type SearchSelectProps<T extends object> = Omit<
  AutocompleteProps<T>,
  "children"
> & {
  options?: T[];
  optionLabelKey?: keyof T;
  optionValueKey?: keyof T;
  renderOption?: (option: T) => React.ReactNode;
};

export default function SearchableSelect<T extends object>({
  options = [],
  optionLabelKey = "value" as keyof T,
  optionValueKey = "label" as keyof T,
  renderOption,
  className,
  ...props
}: SearchSelectProps<T>) {
  function getValue<T extends object>(item: T, key?: keyof T) {
    return key && item[key] !== undefined ? String(item[key]) : "";
  }

  return (
    <Autocomplete<T>
      aria-label={"Select a user"}
      className={cn("max-w-xl  sm:max-w-xs", className)}
      defaultItems={options}
      placeholder="Select a user"
      size="md"
      variant="flat"
      {...props}
    >
      {(opt) => (
        <AutocompleteItem
          key={getValue(opt, optionValueKey)}
          textValue={getValue(opt, optionLabelKey)}
        >
          {!!renderOption ? (
            renderOption(opt)
          ) : (
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">
                  {getValue(opt, optionLabelKey)}
                </span>
              </div>
            </div>
          )}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
