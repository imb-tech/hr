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
          multiple
          required
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
            name="work_time"
          />
          <TimeInput
            isRequired
            label={"Tushlik tugash vaqti"}
            methods={form}
            name="work_time"
          />
        </div>

        <OfficeLocationSelect />

        <ModalFormActions />
      </form>
    </div>
  );
}
