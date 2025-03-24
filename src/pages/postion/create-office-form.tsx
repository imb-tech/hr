import ModalFormActions from "@/components/elements/modal-form-actions";
import FormInput from "@/components/form/input";
import FormSelect from "@/components/form/select";
import { useForm } from "react-hook-form";

export default function CreatePostionsForm() {
  const form = useForm<Positon>();

  const onSubmit = (data: any) => {
    console.log("Login Data:", data);
  };

  return (
    <div>
      <form
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput required label="Nomi" methods={form} name="positon" size="lg" />
        <FormInput
          required
          label="Lavozimlar"
          methods={form}
          name="positon"
          size="lg"
        />

        <FormSelect
          required
          label="Hodimlar"
          methods={form}
          name="work_time"
          options={[
            { label: "Doniyor Eshmamatov", key: 1 },
            { label: "Ozodbek Abdisamatov", key: 2 },
          ]}
        />


        <ModalFormActions />
      </form>
    </div>
  );
}
