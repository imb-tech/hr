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

import {
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

import { capitalize } from "../icons/table-icons";

import { SlidersVertical } from "lucide-react";
import TableActions from "../elements/table-actions";

export type ColumnDef<TData> = {
  dataKey: keyof TData | "actions";
  header: string;
  sortable?: boolean;
  call?: (item: TData) => ReactNode;
};

type Props<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  initialVisibleColumns?: (keyof TData | "actions")[];
  showColumnFilter?: boolean;
  onEdit?: (item: TData) => void;
  onDelete?: (item: TData) => void;
  onView?: (item: TData) => void;
};

export default function DataTable<TData extends object>({
  data,
  columns = [],
  initialVisibleColumns,
  showColumnFilter,
  onDelete,
  onEdit,
  onView,
  ...props
}: Props<TData> & TableProps) {
  type ColumnKey = keyof TData | "actions";

  const [visibleColumns, setVisibleColumns] = useState<ColumnKey[]>(
    initialVisibleColumns ?? columns.map((col) => col.dataKey),
  );
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    direction: "ascending",
    column: "id",
  });

  const headerColumns = useMemo(() => {
    return columns.filter((column) => visibleColumns.includes(column.dataKey));
  }, [visibleColumns, columns]);

  const sortedItems = useMemo(() => {
    return [...data].sort((a: TData, b: TData) => {
      const first = a[sortDescriptor.column as keyof TData] as number;
      const second = b[sortDescriptor.column as keyof TData] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, data]);

  const isSelectable = useMemo(
    () =>
      props.selectionMode === "multiple" || props.selectionMode === "single",
    [props],
  );

  const renderCell = useCallback(
    (item: TData, dataKey: ColumnKey) => {
      if (dataKey === "actions") {
        return (
          <div className="relative flex justify-end items-center gap-2">
            <TableActions
              onDelete={onDelete ? () => onDelete?.(item) : undefined}
              onEdit={onEdit ? () => onEdit?.(item) : undefined}
              onView={onView ? () => onView?.(item) : undefined}
            />
          </div>
        );
      }
      const column = columns.find((c) => c.dataKey === dataKey);

      return (
        <div>{column?.call ? column.call(item) : (item as any)[dataKey]}</div>
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
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${data.length} selected`}
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
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader>
        {headerColumns.map((column) => (
          <TableColumn
            key={column.dataKey as string}
            align={column.dataKey === "actions" ? "end" : "start"}
            allowsSorting={column.sortable}
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
      <TableBody emptyContent={"Empty"} items={sortedItems}>
        {(item) => (
          <TableRow key={JSON.stringify(item)}>
            {headerColumns.map((column) => (
              <TableCell key={column.dataKey as string}>
                {renderCell(item, column.dataKey)}
              </TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
