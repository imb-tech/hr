import ModalFormActions from "@/components/elements/modal-form-actions";
import FormInput from "@/components/form/input";
import TimeInput from "@/components/form/time-input";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface CreatePositionsFormProps {
  dataItem?: Positon;
}

export default function CreatePostionsForm({
  dataItem,
}: CreatePositionsFormProps) {
  const form = useForm<Positon>();

  const onSubmit = (data: any) => {
    console.log("Login Data:", data);
  };

  useEffect(() => {
    if (dataItem) {
      form.reset(dataItem);
    }
  }, [dataItem, form]);

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

        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 py-2">
          <TimeInput
            isRequired
            label={"Tushlik boshlanish vaqti"}
            methods={form}
            name="start_date"
          />
          <TimeInput
            isRequired
            label={"Tushlik tugash vaqti"}
            methods={form}
            name="end_date"
          />
        </div>

        <ModalFormActions />
      </form>
    </div>
  );
}
