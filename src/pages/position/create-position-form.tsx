import ModalFormActions from "@/components/elements/modal-form-actions";
import FormInput from "@/components/form/input";
import TimeInput from "@/components/form/time-input";
import { usePatch } from "@/hooks/usePatch";
import { usePost } from "@/hooks/usePost";
import { POSITION } from "@/lib/api-endpoints";
import { addToast } from "@heroui/toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface CreatePositionsFormProps {
  dataItem?: Position;
}

export default function CreatePositionsForm({
  dataItem,
}: CreatePositionsFormProps) {
  const form = useForm<Position>();

  const { mutate: postMutate } = usePost(POSITION, {
    onSuccess: () => {
      addToast({
        description: "Muaffaqiyatli qo'shildi",
        color: "success",
      });
    },
  });

  const { mutate: updateMutate } = usePatch(POSITION, {
    onSuccess: () => {
      addToast({
        description: "Muaffaqiyatli yangilandi",
        color: "success",
      });
    },
  });

  const onSubmit = (values: Position) => {
    if (dataItem?.id) {
      updateMutate(`${POSITION}/${dataItem.id}`, values);
    } else {
      postMutate(POSITION, values);
    }
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
          name="poisiton"
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
