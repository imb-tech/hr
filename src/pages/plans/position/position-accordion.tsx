import Accordion from "@/components/ui/accordion";
import { Skeleton } from "@heroui/skeleton";
import FullCalendarEmployees from "../employees/full-calendar";
type Props = {
  info: Position[] | undefined;
};

function PositionAccordionTraffic({ info }: Props) {
  return (
    <div>
      {!!info ? (
        <div className="overflow-x-auto hidden lg:block">
          <div className="min-w-[1024px]">
            <Accordion
              itemProps={{
                classNames: {
                  content: "hidden",
                  indicator: "opacity-0",
                  trigger: "!pb-0",
                },
              }}
              items={[
                {
                  key: "1",
                  title: (
                    <h1 className="text-xl">Lavozimlar bo'yicha obunalar</h1>
                  ),
                  content: null,
                },
              ]}
              selectionMode="single"
              variant="light"
            />
            <Accordion
              itemProps={{ classNames: { trigger: "!px-0 py-3" } }}
              items={info?.map((c, i) => ({
                key: i.toString(),
                title: c.name,
                content: <FullCalendarEmployees />,
              }))}
              selectionMode="single"
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center flex-col gap-3 w-full justify-center bg-gray-500/20 rounded-md my-2">
          <Skeleton className="h-8 w-full rounded-md" />
          <Skeleton className="h-8 w-full rounded-md" />
          <Skeleton className="h-8 w-full rounded-md" />
          <Skeleton className="h-8 w-full rounded-md" />
        </div>
      )}
    </div>
  );
}

export default PositionAccordionTraffic;
