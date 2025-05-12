import { Pagination } from "@heroui/pagination";
import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import { useMemo } from "react";

type Props = {
  total?: number;
  paramName?: keyof SearchParams;
};

export default function ParamPagination({ total, paramName = "page" }: Props) {
  const search = useSearch({ from: "__root__" });
  const location = useLocation();
  const activePage = useMemo(
    () => (!!search?.[paramName] ? Number(search?.[paramName]) : 1),
    [search],
  );

  const navigate = useNavigate();

  function handlePaginate(p: number) {
    navigate({ to: location.pathname, search: { ...search, [paramName]: p } });
  }

  return (
    <div className="my-2">
      {total ? (
        <Pagination
          initialPage={activePage}
          total={total ?? 0}
          onChange={handlePaginate}
        />
      ) : (
        ""
      )}
    </div>
  );
}
