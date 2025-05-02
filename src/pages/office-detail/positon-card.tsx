import { Card, CardBody, CardHeader } from "@heroui/card";
import { Link, useParams } from "@tanstack/react-router";

type Props = {
  item: OfficeInfo;
};

function PositonCard({ item }: Props) {
  const { id } = useParams({ from: "/_main/office/$id" });
  return (
    <Link
      to="/position-hr-view/$id"
      params={{ id: String(id) }}
      search={{ position: item.group_id }}
    >
      <Card className="min-w-[300px] relative  transition-all cursor-pointer  shadow-none">
        <CardHeader className="pb-0">
          <h3 className="text-lg font-bold  text-center">
            {item?.name || "Ma'lumot topilmadi"}
          </h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-100 dark:bg-zinc-800 p-3 rounded">
              <p className="text-sm text-gray-400">Kelganlar</p>
              <p className="font-medium">{item.checked_in_workers || 0}</p>
            </div>
            <div className="bg-gray-100 dark:bg-zinc-800 p-3 rounded">
              <p className="text-sm text-gray-400">Kelmaganlar</p>
              <p className="font-medium">{item.absent_users || 0}</p>
            </div>

            <div className="bg-gray-100 dark:bg-zinc-800 p-3 rounded">
              <p className="text-sm text-gray-400">Jami ishchilar</p>
              <p className="font-medium">{item.total_workers_count || 0}</p>
            </div>

            <div className="bg-gray-100 dark:bg-zinc-800 p-3 rounded">
              <p className="text-sm text-gray-400">Kech qolganlar</p>
              <p className="font-medium">{item.late_users_count || 0}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}

export default PositonCard;
