import {
  AccordionItem,
  AccordionItemProps,
  AccordionProps,
  Accordion as HAccordion,
} from "@heroui/accordion";
import { cn } from "@heroui/theme";
import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";

type Props = Omit<AccordionProps, "items" | "children"> & {
  items?: { key: string; title: ReactNode; content?: ReactNode }[];
  itemProps?: AccordionItemProps;
};

export default function Accordion({ items, itemProps, ...props }: Props) {
  return (
    <HAccordion {...props}>
      {items?.map((el) => (
        <AccordionItem
          key={el.key}
          aria-label={el.title?.toString()}
          indicator={({ isOpen }) => (
            <ChevronDown
              className={cn(
                "text-zinc-500",
                isOpen ? "rotate-[270deg]" : "rotate-0",
              )}
            />
          )}
          title={el.title}
          {...itemProps}
          classNames={{
            indicator: "!text-primary",
            content: "[&_.p-4]:p-0",
            ...itemProps?.classNames,
          }}
        >
          {el.content}
        </AccordionItem>
      )) ?? null}
    </HAccordion>
  );
}
