import {
  AccordionItem,
  AccordionItemProps,
  AccordionProps,
  Accordion as HAccordion,
} from "@heroui/accordion";
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
