import { DeleteIcon, EditIcon, ViewIcon } from "../icons/table-icons";

type Props = {
  onDelete?: () => void;
  onEdit?: () => void;
  onView?: () => void;
};

export default function TableActions({ onDelete, onEdit, onView }: Props) {
  return (
    <div className="flex items-center gap-3">
      {onView && (
        <ViewIcon
          className="text-default-500 hover:text-default-600 cursor-pointer transition-all duration-300"
          onClick={onView}
        />
      )}
      {onEdit && (
        <EditIcon
          className="text-primary-400 hover:text-default-600 cursor-pointer transition-all duration-300"
          onClick={onEdit}
        />
      )}
      {onDelete && (
        <DeleteIcon
          className="text-danger-500 cursor-pointer transition-all duration-300"
          onClick={onDelete}
        />
      )}
    </div>
  );
}
