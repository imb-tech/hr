import {
  RadioGroup as HeroRadioGroup,
  RadioGroupProps as HeroRadioGroupProps,
  Radio,
} from "@heroui/radio";
import { useForm } from "react-hook-form";

export type RadioGroupProps = HeroRadioGroupProps & {
  options: string[];
};

export default function RadioGroup({
  options,
  label,
  name,
  ...props
}: RadioGroupProps) {
  const { register, formState } = useForm();

  return (
    <HeroRadioGroup
      errorMessage={(formState?.errors?.[name!]?.message as string) || ""}
      isInvalid={!!formState?.errors?.[name!]}
      label={label}
      {...props}
    >
      {options.map((option) => (
        <Radio key={option} value={option} {...register(name!)}>
          {option}
        </Radio>
      ))}
    </HeroRadioGroup>
  );
}
