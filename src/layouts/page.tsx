import { Navbar } from "@/components/navbar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  breadcrumb?: string[];
  rightComponent?: ReactNode;
  leftComponent?: ReactNode;
};

export default function Page({ children, breadcrumb, rightComponent, leftComponent }: Props) {
  return (
    <>
      <Navbar items={breadcrumb} rightComponent={rightComponent} leftComponent={leftComponent} />
      <main className=" mx-auto p-4 h-full overflow-y-auto  ">
        {children}
      </main>
    </>
  );
}

