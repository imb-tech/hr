import {
  Avatar,
  Card,
  CardBody,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";

type Props = {
  image: string | undefined;
};

export const UserImageCard = ({ image }: Props) => {
  return (
    <Card className=" border-none bg-transparent" shadow="none">
      <CardBody className="p-1 h-[200px] w-[200px]">
        <Avatar className="w-full h-full" radius="md" size="md" src={image} />
      </CardBody>
    </Card>
  );
};

export default function PopoverImage({ image }: Props) {
  return (
    <Popover showArrow placement="top">
      <PopoverTrigger>
        <Avatar radius="full" size="md" src={image} />
      </PopoverTrigger>
      <PopoverContent className="p-1">
        <UserImageCard image={image} />
      </PopoverContent>
    </Popover>
  );
}
