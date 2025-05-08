import { Tabs as HeroTabs, Tab, TabsProps } from "@heroui/tabs";
import { ReactNode } from "react";

type Props = {
  tabs: { key: string; label: string | ReactNode; content?: ReactNode }[];
  contentClassName?: string;
};

export default function Tabs({
  tabs,
  contentClassName,
  ...props
}: Props & TabsProps) {
  return (
    <HeroTabs aria-label="Options" {...props}>
      {tabs?.map((tb) => (
        <Tab key={tb.key} title={tb.label} className="py-2">
          <div className={contentClassName}>{tb.content}</div>
        </Tab>
      ))}
    </HeroTabs>
  );
}
