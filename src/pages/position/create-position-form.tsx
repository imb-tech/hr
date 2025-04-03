import ModalFormActions from "@/components/elements/modal-form-actions";
import FormInput from "@/components/form/input";
import TimeInput from "@/components/form/time-input";
import { POSITION } from "@/constants/api-endpoints";
import { useModal } from "@/hooks/use-modal";
import { usePatch } from "@/hooks/usePatch";
import { usePost } from "@/hooks/usePost";
import { addToast } from "@heroui/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface CreatePositionsFormProps {
  dataItem?: Position;
}

export default function CreatePositionsForm({
  dataItem,
}: CreatePositionsFormProps) {
  const form = useForm<Position>();
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  

  const { mutate: postMutate, isPending: isPendingCreate } = usePost({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [POSITION] });
      addToast({
        description: "Muaffaqiyatli qo'shildi",
        color: "success",
      });
      closeModal();
      form.reset();
    },
  });

  const { mutate: updateMutate, isPending: isPendingUpdate } = usePatch({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [POSITION] });
      addToast({
        description: "Muaffaqiyatli yangilandi",
        color: "success",
      });
      closeModal();
      form.reset();
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
          name="name"
          size="lg"
        />

        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 py-2">
          <TimeInput
            isRequired
            label={"Ish boshlanish vaqti"}
            methods={form}
            name="work_shift_start"
          />
          <TimeInput
            isRequired
            label={"Ish tugash vaqti"}
            methods={form}
            name="work_shift_end"
          />
        </div>

        <ModalFormActions isLoading={isPendingCreate || isPendingUpdate} />
      </form>
    </div>
  );
}
