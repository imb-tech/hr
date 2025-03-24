import ModalFormActions from "@/components/elements/modal-form-actions";
import FormInput from "@/components/form/input";
import TimeInput from "@/components/form/time-input";
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
        <FormInput
          required
          label="Lavozim"
          methods={form}
          name="positon"
          size="lg"
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

        <ModalFormActions />
      </form>
    </div>
  );
}
