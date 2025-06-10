import ParamSelect from "@/components/param/param-select";
import { COMPANIES, POSITION, USER_LOCATIONS } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { useSearch } from "@tanstack/react-router";
import { HTMLProps } from "react";


export default function MapFilters(props: HTMLProps<HTMLDivElement>) {
  const search = useSearch({ from: "__root__" });
  const { role_id, last_company_id } = search;
  const { data: oficeData } = useGet<GeoJSON.FeatureCollection>(COMPANIES);
  const { data: positions } = useGet<Position[]>(POSITION, {
    params: { last_company_id },
  });
  const { data: users } = useGet<UserPoint[]>(USER_LOCATIONS, {
    params: { role_id, last_company_id },
  });
  const { route_id } = useSearch({ from: "__root__" });

  return (
    <div {...props}>
      <ParamSelect
        optionLabelKey="name"
        optionValueKey="id"
        options={oficeData?.features?.map((el) => ({
          id: el.id,
          name: (el.properties as Company).name,
        }))}
        paramName="last_company_id"
        placeholder="Ofis"
      />
      <ParamSelect
        optionLabelKey="name"
        optionValueKey="id"
        options={positions}
        paramName="role_id"
        placeholder="Lavozimlar"
      />
      <ParamSelect
        optionLabelKey="full_name"
        optionValueKey="id"
        options={users}
        paramName={route_id ? "route_id" : "id"}
        placeholder="Hodim"
      />
    </div>
  );
}
