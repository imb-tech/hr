import { DeleteIcon, EditIcon, ViewIcon } from "../icons/table-icons";

type Props = {
  onDelete?: () => void;
  onEdit?: () => void;
  onView?: () => void;
};

export default function TableActions({ onDelete, onEdit, onView }: Props) {
  return (
    <div className="flex items-center gap-2 text-default-400">
      {onView && (
        <ViewIcon
          className="hover:text-default-500 cursor-pointer transition-all duration-300"
          onClick={onView}
        />
      )}
      {onEdit && (
        <EditIcon
          className="hover:text-default-500 cursor-pointer transition-all duration-300"
          onClick={onEdit}
        />
      )}
      {onDelete && (
        <DeleteIcon
          className="hover:text-default-500 cursor-pointer transition-all duration-300"
          onClick={onDelete}
        />
      )}
    </div>
  );
}
