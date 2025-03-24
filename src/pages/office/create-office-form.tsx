import ModalFormActions from "@/components/elements/modal-form-actions";
import FormInput from "@/components/form/input";
import FormSelect from "@/components/form/select";
import TimeInput from "@/components/form/time-input";
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
        <FormInput
          required
          label="Nomi"
          methods={form}
          name="name"
          size="lg"
          isRequired
        />

        <FormInput
          required
          label="Manzil"
          methods={form}
          name="address"
          size="lg"
          isRequired
        />

        <FormSelect
          required
          label="Hodimlar"
          methods={form}
          name="users"
          multiple
          isRequired
          options={[
            { label: "Doniyor Eshmamatov", key: 1 },
            { label: "Ozodbek Abdisamatov", key: 2 },
          ]}
        />

        <div className="grid grid-cols-2 gap-3 py-2">
          <TimeInput
            methods={form}
            name="work_time"
            label={"Tushlik boshlanish vaqti"}
            isRequired
          />
          <TimeInput
            methods={form}
            name="work_time"
            label={"Tushlik tugash vaqti"}
            isRequired
          />
        </div>

        <OfficeLocationSelect />

        <ModalFormActions />
      </form>
    </div>
  );
}
