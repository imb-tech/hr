import { POSITION_PAYMENT } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import PlanProfile from "./plan-profile";
import PlanSelector from "./plan-selector";
import PositionAccordionTraffic from "./position/position-accordion";

export default function PlansPage() {
  const { data } = useGet<{ id: number; name: string }[]>(POSITION_PAYMENT);
  return (
    <div>
      <PlanProfile />
      <PlanSelector />
      <PositionAccordionTraffic info={data} />
    </div>
  );
}
