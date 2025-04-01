import ModalFormActions from "@/components/elements/modal-form-actions";
import FormInput from "@/components/form/input";
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
          locations: [],
        }
      : undefined,
  });

  const onSubmit = (data: OfficeFields) => {
    if (!data.locations || data.locations?.length < 3) {
      form.setError("locations", { type: "required" });
      return;
    }
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

      <div className="grid grid-cols-2 gap-3 py-2">
        <TimeInput
          isRequired
          label={"Tushlik boshlanish vaqti"}
          methods={form}
          name="lunch_start_time"
        />
        <TimeInput
          isRequired
          label={"Tushlik tugash vaqti"}
          methods={form}
          name="lunch_end_time"
        />
      </div>

      <OfficeLocationSelect
        setLocations={(pnts) => {
          form.clearErrors("locations");
          form.setValue("locations", pnts);
        }}
        error={!!form.formState.errors["locations"]}
        required
      />

      <ModalFormActions />
    </form>
  );
}
