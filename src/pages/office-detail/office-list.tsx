import { COMPANIES } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { Card, CardBody } from "@heroui/card";
import { cn } from "@heroui/theme";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { Building2, CirclePlus, MapPin, Pencil } from "lucide-react";
import { useEffect, useRef } from "react";

function OfficeList() {
  const { id } = useParams({ from: "/_main/office/$id" });
  const { data: companies } = useGet<FeatureCollection>(COMPANIES);
  const navigate = useNavigate();

  const scrollbarRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Map<string | number, HTMLDivElement>>(new Map());

  const setCardRef = (id: string | number, element: HTMLDivElement | null) => {
    if (element) {
      cardRefs.current.set(id, element);
    } else {
      cardRefs.current.delete(id);
    }
  };

  useEffect(() => {
    if (window.innerWidth > 768) return
    if (!id || !companies?.features || !scrollbarRef.current) return;

    // ID string sifatida keladi, shuning uchun to'g'ri taqqoslash uchun String() ishlatamiz
    const targetId = String(id);
    const targetCard = cardRefs.current.get(targetId);

    if (targetCard && scrollbarRef.current) {
      // Scrollni chapga taqash uchun offsetLeft ishlatamiz
      scrollbarRef.current.scrollTo({
        left: targetCard.offsetLeft - 50, // 10px margin uchun qo'shimcha
        behavior: "smooth",
      });
    }
  }, [id, companies]); // companies o'zgarsa ham qayta ishlaydi

  function handleNavigate(id: number | string) {
    navigate({
      to: "/office/$id",
      params: { id: String(id) },
    });
  }

  return (
    <div className="w-full">
      <div
        className="flex flex-nowrap gap-3 overflow-x-auto py-1 my-3 scrollbar-hide"
        ref={scrollbarRef}
      >
        {companies?.features?.map((item) => (
          <Link key={item.id} to="/office/$id" params={{ id: String(item.id) }}>
            <Card
              ref={(el) => setCardRef(String(item.id), el)} // ID ni string ga aylantiramiz
              className={cn(
                "min-w-[300px] relative max-w-[300px] transition-all cursor-pointer h-[148px] shadow-none",
                String(item.id) === id
                  ? "border border-blue-400"
                  : "border dark:border-zinc-800",
              )}
            >
              <CardBody
                className={cn(
                  "font-semibold py-4",
                  String(item.id) === id && "text-blue-400",
                )}
              >
                <Link
                  key={item.id}
                  to="/office-edit/$id"
                  params={{ id: String(item.id) }}
                  className="dark:bg-zinc-800 bg-zinc-100 p-[10px] hover:text-primary rounded-full absolute top-2 right-2"
                >
                  <Pencil size={14} />
                </Link>
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
                  <MapPin
                    className={cn(
                      "h-5 w-5 mr-2 mt-0.5 flex-shrink-0",
                      String(item.id) === id
                        ? "text-blue-400"
                        : "dark:text-gray-400",
                    )}
                  />
                  <div>
                    <p
                      className="text-sm dark:text-gray-300 line-clamp-2"
                      title={item.properties.address}
                    >
                      {item.properties.address}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
        <Link to="/office/create">
          <Card
            className={cn(
              "min-w-[300px] max-w-[300px] cursor-pointer dark:border-zinc-800 h-[148px] border",
            )}
          >
            <CardBody className={cn("font-semibold py-4")}>
              <div className="flex items-center justify-center gap-2 h-full">
                <p className="dark:text-gray-300 line-clamp-2 text-lg">
                  Ofis qo'shish
                </p>
                <CirclePlus />
              </div>
            </CardBody>
          </Card>
        </Link>
      </div>
      <div
        className={`grid gap-1`}
        style={{
          gridTemplateColumns: `repeat(${(companies?.features?.length || 0) + 1}, minmax(0, 1fr))`,
        }}
      >
        {companies?.features?.map((item, index) => (
          <div
            key={index}
            className="w-full py-1"
            onClick={() => handleNavigate(item.id)}
          >
            <div
              className={cn(
                "h-1 w-full transition-all duration-300 rounded-full cursor-pointer",
                String(item.id) === id ? "bg-blue-400" : "bg-default",
              )}
            ></div>
          </div>
        ))}
        <Link to="/office/create" className="w-full py-1">
          <div
            className={cn(
              "h-1 w-full transition-all duration-300 rounded-full bg-default",
            )}
          ></div>
        </Link>
      </div>
    </div>
  );
}

export default OfficeList;
