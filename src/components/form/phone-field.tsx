import { cn } from "@heroui/theme";
import { PhoneNumberUtil } from "google-libphonenumber";
import {
  FieldValues,
  Path,
  useController,
  UseFormReturn,
} from "react-hook-form";
import {
  PhoneInput,
  PhoneInputProps,
  PhoneInputRefType,
} from "react-international-phone";
import "react-international-phone/style.css";

interface IProps<IForm extends FieldValues> {
  methods: UseFormReturn<IForm>;
  name: Path<IForm>;
  label?: string;
  required?: boolean;
  wrapperClassName?: string;
  hideError?: boolean;
  labelClass?: string;
}

const phoneUtil = PhoneNumberUtil.getInstance();

export default function PhoneField<IForm extends FieldValues>({
  methods,
  name,
  label = "Telefon raqam",
  required = false,
  wrapperClassName,
  labelClass = "",
  className,
  inputClassName,
  countrySelectorStyleProps,
  hideError = false,
  ...props
}: IProps<IForm> & PhoneInputProps & React.RefAttributes<PhoneInputRefType>) {
  const { control } = methods;
  const isPhoneValid = (phone: string) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch {
      return false;
    }
  };

  const {
    field: { value, ...field },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      validate: (val: string) => {
        const v = val ? (val.startsWith("+") ? val : `+${val}`) : "";
        let err = "";
        let isValid = true;

        if (required) {
          isValid = isPhoneValid(v);
          if (!isValid) {
            err = "To'g'ri va to'liq to'ldiring";
          }
        }

        return isValid || err;
      },
    },
    // @ts-expect-error sdf
    defaultValue: "",
  });

  const val = (value as string)
    ? value.startsWith("+")
      ? value
      : `+${value}`
    : "";

  return (
    <fieldset
      className={cn("flex flex-col itemst gap-1 w-full", wrapperClassName)}
    >
      {label && (
        <label
          className={cn(labelClass, !!error && "text-[#F31260] ")}
          htmlFor={name}
        >
          {label} {required && <span className="text-[#F31260]">*</span>}
        </label>
      )}
      <PhoneInput
        className={cn(
          "w-full h-12 rounded-lg has-[input:focus]:ring-0 has-[input:focus]:ring-ring has-[input:focus]:ring-offset-0 !outline-none",
          className,
        )}
        countrySelectorStyleProps={{
          ...countrySelectorStyleProps,
          buttonClassName: "!hidden",
        }}
        defaultCountry="uz"
        inputClassName={cn(
          "w-full !h-full !text-foreground !rounded-2xl !px-3 !bg-default-100  !border-none !text-sm",
          inputClassName,
        )}
        placeholder={props.placeholder || label}
        value={val}
        {...field}
        {...props}
      />
      {!!error && !hideError && (
        <p className={cn("text-[#F31260]  text-xs font-medium", className)}>
          {error.message || error.root?.message}
        </p>
      )}
    </fieldset>
  );
}
