import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";

import {
  Selection,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableProps,
  TableRow,
} from "@heroui/table";

import { Skeleton } from "@heroui/skeleton";

import {
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

import { capitalize } from "../icons/table-icons";

import { cn } from "@heroui/theme";
import { useSearch } from "@tanstack/react-router";
import { SlidersVertical } from "lucide-react";
import TableActions from "../elements/table-actions";

type DataKey<T> = keyof T | "actions";
type Cell<T, K extends keyof T> = (value: T[K], item: T) => ReactNode;

export type ColumnDef<TData extends object> = {
  dataKey: DataKey<TData>;
  header: string;
  sortable?: boolean;
  cell?: keyof TData extends DataKey<TData>
    ? Cell<TData, keyof TData>
    : (value: undefined, item: TData) => ReactNode;
};

type Props<TData extends object> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  initialVisibleColumns?: DataKey<TData>[];
  showColumnFilter?: boolean;
  onEdit?: (item: TData) => void;
  onDelete?: (item: TData) => void;
  onView?: (item: TData) => void;
  onRowClick?: (item: TData) => void;
  isLoading?: boolean;
  onSelectionChange?: (keys: Selection) => void;
  selectedKeys?: Selection;
  indexing?: boolean;
  pageKey?: keyof SearchParams;
  pageSize?: number;
};

export default function DataTable<TData extends object>({
  data,
  columns = [],
  initialVisibleColumns,
  showColumnFilter,
  onDelete,
  onEdit,
  onView,
  onRowClick,
  onSelectionChange,
  isLoading,
  selectedKeys,
  indexing = false,
  pageKey = "page",
  pageSize = 48,
  ...props
}: Props<TData> & TableProps) {
  type ColumnKey = DataKey<TData>;

  const [visibleColumns, setVisibleColumns] = useState<ColumnKey[]>(
    initialVisibleColumns ?? columns.map((col) => col.dataKey),
  );
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    direction: "ascending",
    column: "id",
  });

  const search = useSearch({ from: "__root__" });

  const headerColumns = useMemo(() => {
    const cls = columns.filter((column) =>
      visibleColumns.includes(column.dataKey),
    );

    if (indexing) {
      cls.unshift({
        header: "#",
        dataKey: "index" as DataKey<TData>,
      });
    }

    return cls;
  }, [visibleColumns, columns, indexing]);

  const sortedItems = useMemo(() => {
    const d = [...data].sort((a: TData, b: TData) => {
      const first = a[sortDescriptor.column as keyof TData] as number;
      const second = b[sortDescriptor.column as keyof TData] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });

    if (indexing) {
      const page = search[pageKey];
      const offset = Number(page) > 1 ? (Number(page) - 1) * pageSize + 1 : 1;

      return d.map((el, i) => ({ ...el, index: offset + i }));
    }

    return d;
  }, [sortDescriptor, data, indexing]);

  const isSelectable = useMemo(
    () =>
      props.selectionMode === "multiple" || props.selectionMode === "single",
    [props],
  );

  const renderCell = useCallback(
    (item: TData, dataKey: ColumnKey, cell?: Cell<TData, keyof TData>) => {
      if (dataKey === "actions") {
        return (
          <button
            className="relative flex justify-end items-center gap-2 w-full py-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <TableActions
              onDelete={onDelete ? () => onDelete?.(item) : undefined}
              onEdit={onEdit ? () => onEdit?.(item) : undefined}
              onView={onView ? () => onView?.(item) : undefined}
            />
          </button>
        );
      }

      return (
        <div>{cell ? cell(item[dataKey], item) : (item as any)[dataKey]}</div>
      );
    },
    [columns],
  );

  const bottomContent = useMemo(() => {
    if (!isSelectable) {
      return null;
    }

    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys && selectedKeys === "all"
            ? "Barcha elementlar tanlangan"
            : `${data.length} dan ${selectedKeys?.size} tanlangan`}
        </span>
      </div>
    );
  }, [selectedKeys, data.length]);

  return (
    <Table
      {...props}
      aria-label="Users list"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      selectedKeys={selectedKeys}
      sortDescriptor={sortDescriptor}
      topContentPlacement="outside"
      onSelectionChange={(item) => {
        onSelectionChange?.(item);
      }}
      onSortChange={setSortDescriptor}
    >
      <TableHeader>
        {headerColumns.map((column, index) => (
          <TableColumn
            key={index}
            align={column.dataKey === "actions" ? "end" : "start"}
            allowsSorting={column.sortable}
            className="last:text-center"
          >
            {column.dataKey === "actions" ? (
              <div className="flex items-center justify-end py-1 gap-2">
                {column.header}
                {showColumnFilter && (
                  <Dropdown>
                    <DropdownTrigger className="hidden sm:flex">
                      <Button isIconOnly variant="flat">
                        <SlidersVertical />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      disallowEmptySelection
                      aria-label="Table Columns"
                      closeOnSelect={false}
                      selectedKeys={new Set(visibleColumns) as Selection}
                      selectionMode="multiple"
                      onSelectionChange={(keys) =>
                        setVisibleColumns(
                          Array.from(keys) as SetStateAction<ColumnKey[]>,
                        )
                      }
                    >
                      {columns.map((column) =>
                        column.dataKey === "actions" ? null : (
                          <DropdownItem
                            key={column.dataKey as string}
                            className="capitalize"
                          >
                            {capitalize(column.header)}
                          </DropdownItem>
                        ),
                      )}
                    </DropdownMenu>
                  </Dropdown>
                )}
              </div>
            ) : (
              column.header
            )}
          </TableColumn>
        ))}
      </TableHeader>
      {isLoading ? (
        <TableBody
          emptyContent={"Empty"}
          items={[
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
            { id: 5 },
            { id: 6 },
            { id: 7 },
            { id: 8 },
            { id: 9 },
            { id: 10 },
          ]}
        >
          {(item) => (
            <TableRow key={(item as any).id}>
              {headerColumns.map((column) => (
                <TableCell key={column.dataKey as string}>
                  <Skeleton className="h-10 rounded-md" />
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      ) : (
        <TableBody emptyContent={"Empty"} items={sortedItems}>
          {(item) => (
            <TableRow
              key={(item as any).id}
              className={cn(
                !!onRowClick ? "cursor-pointer" : "",
                "hover:bg-default-100 rounded-md border-b dark:border-b-zinc-700",
              )}
              onClick={() => onRowClick?.(item)}
            >
              {headerColumns.map((column) => (
                <TableCell key={column.dataKey as string}>
                  {renderCell(
                    item,
                    column.dataKey,
                    column?.cell as Cell<TData, keyof TData>,
                  )}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  );
}
