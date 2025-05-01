import { COMPANIES } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { Card, CardBody } from "@heroui/card";
import { cn } from "@heroui/theme";
import { Link, useParams } from "@tanstack/react-router";
import { Building2, ChevronRight, MapPin } from "lucide-react";

type Props = {};

function OfficeList({}: Props) {
  const { id } = useParams({ from: "/_main/office/$id" });
  const { data: companies } = useGet<FeatureCollection>(COMPANIES);
  return (
    <div className="flex gap-3  w-full  overflow-x-auto my-3">
      {companies?.features?.map((item) => (
        <Card
          key={item.id}
          className={cn(
            "min-w-[300px] max-w-[300px] cursor-pointer  h-[178px]",
            item.id == id
              ? "border border-blue-400 "
              : "border border-transparent",
          )}
        >
          <CardBody
            className={cn(
              "font-semibold py-4",
              item.id == id && " text-blue-400 ",
            )}
          >
            <div className="flex items-center mb-4">
              <Building2 className="h-10 w-10 text-blue-400 mr-3" />
              <h2
                className="text-lg font-bold line-clamp-1 uppercase"
                title={item.properties.name}
              >
                {item.properties.name}
              </h2>
            </div>
            <div className="flex items-start mt-4">
              <MapPin className={cn("h-5 w-5 mr-2 mt-0.5 flex-shrink-0",
                item.id==id ? "text-blue-400" :"text-gray-400"
              )} />
              <div>
                <p
                  className="text-sm text-gray-300 line-clamp-2"
                  title={item.properties.address}
                >
                  {item.properties.address}
                </p>
                <Link
                  to="/office/$id"
                  params={{ id: String(item.id) }}
                  className="text-blue-400 p-0 flex items-center mt-3 text-sm"
                >
                  Ko'proq <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

export default OfficeList;
