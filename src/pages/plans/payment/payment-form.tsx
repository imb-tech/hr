import { Button, Card, CardBody, Tab, Tabs } from "@heroui/react";
import { useTheme } from "@heroui/use-theme";
import { ReactNode } from "react";
import Cardform from "./card-form";

function TabContent({ children }: { children: ReactNode }) {
  return (
    <Card className="shadow-none">
      <CardBody>{children}</CardBody>
    </Card>
  );
}

export default function PaymentForm() {
  const { theme } = useTheme();
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="payment types" className="grid p-0">
        <Tab
          key="card"
          className="h-20  px-0"
          title={
            <div className="flex items-center justify-center w-[100px]">
              <p>Karta orqali</p>
            </div>
          }
        >
          <TabContent>
            <Cardform />
          </TabContent>
        </Tab>
        <Tab
          key="click"
          title={
            <div className="w-24 flex justify-center">
              <img
                src={`/images/click${theme === "dark" ? "-dark.svg" : ".png"}`}
                width={theme === "dark" ? 60 : 100}
              />
            </div>
          }
          className="h-20  px-0"
        >
          <TabContent>
            <div className="p-5 flex flex-col gap-4">
              <p >
                Click rasmiy sayti yoki mobil ilovasi orqali to'lov qilishingiz
                mumkin
              </p>
              <Button color="primary">To'lov qilish</Button>
            </div>
          </TabContent>
        </Tab>
        <Tab
          key="payme"
          className="h-20  px-0"
          title={
            <div className="w-24 flex justify-center">
              <img
                src={`/images/payme${theme === "dark" ? "-dark.svg" : ".png"}`}
                width={theme === "dark" ? 60 : 100}
              />
            </div>
          }
        >
          <TabContent>
            <div className="p-5 flex flex-col gap-4">
              <p >
                Payme rasmiy sayti yoki mobil ilovasi orqali to'lov qilishingiz
                mumkin
              </p>
              <Button color="primary">To'lov qilish</Button>
            </div>
          </TabContent>
        </Tab>
      </Tabs>
    </div>
  );
}
