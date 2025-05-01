import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";

export default function HeaderBreadvrumb({ items }: { items: string[] }) {
  return (
    <Breadcrumbs className="lg:block hidden" size="lg">
      {items?.map((itm) => <BreadcrumbItem key={itm}>{itm}</BreadcrumbItem>)}
    </Breadcrumbs>
  );
}
