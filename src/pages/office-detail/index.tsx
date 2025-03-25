import Accordion from "@/components/ui/accordion";
import DataTable from "@/components/ui/table";
import { useHrListCols } from "../hr/cols";
import OfficeInfoRow from "./office-info-row";
import OfficeDetailTableHeader from "./table-header";

const info: OfficeInfo[] = [
  {
    position: "Menejer",
    workers: 11,
    in_office: 6,
    lated: 2,
    dont_came: 1,
    early_came: 0,
  },
  {
    position: "Dispetcher",
    workers: 10,
    in_office: 6,
    lated: 2,
    dont_came: 1,
    early_came: 1,
  },
];

export default function OfficeDetail() {
  const data: Human[] = [
    {
      id: 1,
      full_name: "Ozodbek",
      phone: "+998 93 102 30 42",
      family_phone: ["+998 88 102 30 42"],
      address: "Tashkent, 123 Street",
      location: "Tashkent, Uzbekistan",
      id_card: "1234567890",
      education: "Bachelor of Science",
      salary: 50000,
    },
    {
      id: 2,
      full_name: "ozodbek 1",
      phone: "+998 93 102 30 42",
      family_phone: ["+998 88 102 30 42"],
      address: "Tashkent, 123 Street",
      location: "Tashkent, Uzbekistan",
      id_card: "1234567890",
      education: "Bachelor of Science",
      salary: 32000,
    },
    {
      id: 3,
      full_name: "ozodbe",
      phone: "+998 93 102 30 42",
      family_phone: ["+998 88 102 30 42"],
      address: "Tashkent, 123 Street",
      location: "Tashkent, Uzbekistan",
      id_card: "1234567890",
      education: "Bachelor of Science",
      salary: 42,
    },
    {
      id: 4,
      full_name: "ozodb",
      phone: "+998 93 102 30 42",
      family_phone: ["+998 88 102 30 42"],
      address: "Tashkent, 123 Street",
      location: "Tashkent, Uzbekistan",
      id_card: "1234567890",
      education: "Bachelor of Science",
      salary: 500,
    },
  ];

  const columns = useHrListCols().filter((el) => el.dataKey !== "actions");

  return (
    <div>
      <Accordion
        selectionMode="multiple"
        variant="light"
        items={[
          {
            title: <OfficeDetailTableHeader />,
            content: null,
          },
        ]}
        itemProps={{
          classNames: {
            content: "hidden",
            indicator: "opacity-0",
            trigger: "!pb-0",
          },
        }}
      />
      <Accordion
        selectionMode="multiple"
        variant="light"
        items={info?.map((c) => ({
          title: <OfficeInfoRow data={c} />,
          content: (
            <DataTable
              shadow="none"
              isHeaderSticky
              columns={columns}
              data={data}
              onEdit={(item) => console.log(item)}
              onRowClick={(item) => console.log(item)}
            />
          ),
        }))}
        itemProps={{ classNames: { trigger: "!px-0 py-1" } }}
      />
    </div>
  );
}
