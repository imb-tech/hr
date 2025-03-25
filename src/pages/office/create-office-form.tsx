import ModalFormActions from "@/components/elements/modal-form-actions";
import FormInput from "@/components/form/input";
import FormSelect from "@/components/form/select";
import TimeInput from "@/components/form/time-input";
import { useStore } from "@/hooks/use-store";
import { useForm } from "react-hook-form";
import OfficeLocationSelect from "./office-location";

export default function CreateOfficeForm() {
  const { store } = useStore<Office>("office-data");

  const form = useForm<OfficeFields>({
    defaultValues: store
      ? {
          ...store,
          users: "1",
        }
      : undefined,
  });

  console.log(form.formState.defaultValues);

  const onSubmit = (data: any) => {
    console.log("Login Data:", data);
  };

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FormInput
        isRequired
        required
        label="Nomi"
        methods={form}
        name="name"
        size="lg"
      />

      <FormInput
        isRequired
        required
        label="Manzil"
        methods={form}
        name="address"
        size="lg"
      />

      <FormSelect
        isRequired
        // multiple
        label="Hodimlar"
        methods={form}
        name="users"
        options={[
          { label: "Doniyor Eshmamatov", key: 1 },
          { label: "Ozodbek Abdisamatov", key: 2 },
        ]}
      />

      <div className="grid grid-cols-2 gap-3 py-2">
        <TimeInput
          isRequired
          label={"Tushlik boshlanish vaqti"}
          methods={form}
          name="lunch_start"
        />
        <TimeInput
          isRequired
          label={"Tushlik tugash vaqti"}
          methods={form}
          name="lunch_end"
        />
      </div>

      <OfficeLocationSelect />

      <ModalFormActions />
    </form>
  );
}
