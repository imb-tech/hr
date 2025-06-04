import ParamSelect from "@/components/param/param-select";
import { COMPANIES, POSITION, USER_LOCATIONS } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { useSearch } from "@tanstack/react-router";
import { HTMLProps } from "react";

export default function MapFilters(props: HTMLProps<HTMLDivElement>) {
  const { data: oficeData } = useGet<GeoJSON.FeatureCollection>(COMPANIES);
  const { data: positions } = useGet<Position[]>(POSITION);
  const { data: users } = useGet<UserPoint[]>(USER_LOCATIONS);

  const { route_id } = useSearch({ from: "__root__" });

  return (
    <div {...props}>
      <ParamSelect
        clearOther
        optionLabelKey="full_name"
        optionValueKey="id"
        options={users}
        paramName={route_id ? "route_id" : "id"}
        placeholder="Hodim"
      />

      <ParamSelect
        clearOther
        optionLabelKey="name"
        optionValueKey="id"
        options={positions}
        paramName="role_id"
        placeholder="Lavozimlar"
      />

      <ParamSelect
        clearOther
        optionLabelKey="name"
        optionValueKey="id"
        options={oficeData?.features?.map((el) => ({
          id: el.id,
          name: (el.properties as Company).name,
        }))}
        paramName="last_company_id"
        placeholder="Ofis"
      />
    </div>
  );
}
