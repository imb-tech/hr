import { Button } from "@heroui/button";
import { useNavigate, useParams } from "@tanstack/react-router";
import UsersList from "./user-list";

export default function CreatePlan() {
  const navigate = useNavigate();
  const { id: plan_id } = useParams({ from: "/_main/plans/$id" });

  return (
    <div>
      <div className="flex justify-between items-center pb-2">
        <h1 className="text-2xl">Hodimlarni tanlang</h1>
        <Button
          color="primary"
          variant="flat"
          onPress={() => {
            navigate({
              to: "/plans/payment",
              search: {
                plan_id,
              },
            });
          }}
        >
          To'lov qilish
        </Button>
      </div>
      <UsersList />
    </div>
  );
}
