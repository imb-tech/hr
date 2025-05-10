import { Input, InputProps } from "@heroui/react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

type ParamInputProps = {
  searchKey?: string;
  searchWithEnterKey?: string;
  pageKey?: string;
} & InputProps;

export function ParamInputSearch({
  searchKey = "search",
  searchWithEnterKey = "q",
  pageKey = "page",
  ...props
}: ParamInputProps) {
  const navigate = useNavigate();

  const params: any = useSearch({ strict: false });
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const searchVal = inputRef.current?.value;
      navigate({
        search: {
          ...params,
          [searchWithEnterKey]: searchVal || undefined,
          [pageKey]: undefined,
        },
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      navigate({
        search: {
          ...params,
          [searchKey]: val || undefined,
          [pageKey]: undefined,
        },
      });
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Input
      defaultValue={params[searchKey]}
      placeholder={"Qidiruv..."}
      type="search"
      ref={inputRef}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
}
