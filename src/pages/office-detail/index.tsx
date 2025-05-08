import { ROLES_STATISTIC } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { useParams } from "@tanstack/react-router";
import OfficeList from "./office-list";
import OfficeProfile from "./office-profile";
import PositionAccordion from "./position-accordion";
import PositonCard from "./positon-card";

export default function OfficeDetail() {
  const { id } = useParams({ from: "/_main/office/$id" });
  const { data: info } = useGet<CompanyStats[]>(`${ROLES_STATISTIC}/${id}`, {
    options: { enabled: Boolean(id) },
  });

  return (
    <div>
      <OfficeList />
      <OfficeProfile />

      <div className="lg:hidden grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 mt-5 max-w-full overflow-x-auto">
        <div className="flex gap-3">
          {info?.map((item, index) => (
            <div key={index} className="min-w-[350px]">
              <PositonCard item={item} />
            </div>
          ))}
        </div>
      </div>
      <PositionAccordion info={info} />
    </div>
  );
}
