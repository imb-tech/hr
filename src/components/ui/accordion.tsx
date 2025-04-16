import {
  AccordionItem,
  AccordionItemProps,
  AccordionProps,
  Accordion as HAccordion,
} from "@heroui/accordion";
import { ChevronDown,  ChevronRight } from "lucide-react";
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
          indicator={({ isOpen }) => (isOpen ? <ChevronRight className="text-zinc-500" /> : <ChevronDown className="text-zinc-500" />)}
          key={el.key}
          aria-label={el.title?.toString()}
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
