import ModalFormActions from "@/components/elements/modal-form-actions";
import FormInput from "@/components/form/input";
import FormSelect from "@/components/form/select";
import { useForm } from "react-hook-form";
import OfficeLocationSelect from "./office-location";

export default function CreateOfficeForm() {
  const form = useForm<Office>();

  const onSubmit = (data: any) => {
    console.log("Login Data:", data);
  };

  return (
    <div>
      <form
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput required label="Nomi" methods={form} name="name" size="lg" />
        <FormInput
          required
          label="Manzil"
          methods={form}
          name="address"
          size="lg"
        />

        <FormSelect
          required
          label="Hodimlar"
          methods={form}
          name="users"
          options={[
            { label: "Doniyor Eshmamatov", key: 1 },
            { label: "Ozodbek Abdisamatov", key: 2 },
          ]}
        />

        <OfficeLocationSelect />

        <ModalFormActions />
      </form>
    </div>
  );
}
