import ParamSelect from "@/components/param/param-select";
import { COMPANIES, POSITION, USER_LOCATIONS } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { HTMLProps } from "react";

export default function MapFilters(props: HTMLProps<HTMLDivElement>) {
  const { data: oficeData } = useGet<GeoJSON.FeatureCollection>(COMPANIES);
  const { data: positions } = useGet<Position[]>(POSITION);
  const { data: users } = useGet<UserPoint[]>(USER_LOCATIONS);

  return (
    <div {...props}>
      <ParamSelect
        clearOther
        optionLabelKey="id"
        optionValueKey="id"
        options={users}
        paramName="id"
        placeholder="Hodim"
      />

      <ParamSelect
        clearOther
        optionLabelKey="name"
        optionValueKey="id"
        options={positions}
        paramName="employee"
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
        paramName="office"
        placeholder="Ofis"
      />
    </div>
  );
}
