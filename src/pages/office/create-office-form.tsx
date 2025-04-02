import ModalFormActions from "@/components/elements/modal-form-actions";
import FormInput from "@/components/form/input";
import TimeInput from "@/components/form/time-input";
import { COMPANIES } from "@/constants/api-endpoints";
import { useModal } from "@/hooks/use-modal";
import { useStore } from "@/hooks/use-store";
import { usePost } from "@/hooks/usePost";
import { addToast } from "@heroui/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import OfficeLocationSelect from "./office-location";

export default function CreateOfficeForm() {
  const { store } = useStore<Office>("office-data");
  const { closeModal } = useModal();
  const queryClient = useQueryClient();

  const { mutate } = usePost({
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [COMPANIES],
      }),
        addToast({
          description: "Muvaffaqiyatli yaratildi",
        });
      form.reset();
      closeModal();
    },
  });

  const form = useForm<Properties>({
    defaultValues: store
      ? {
          ...store.properties,
          users: "1",
          locations: [],
        }
      : undefined,
  });

  const onSubmit = (data: Properties) => {
    if (!data?.polygon && data.polygon?.coordinates?.length < 1) {
      form.setError("polygon", { type: "required" });
      return;
    }

    const values = {
      ...data,
      location: {
        type: "Point",
        coordinates: [-122.0838, 37.3861],
      },
    };

    mutate(COMPANIES, values);
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
        initialValue={store?.properties.polygon.coordinates || []}
        handleMapChange={(pnts) => {
          form.clearErrors("polygon");
          form.setValue("polygon", pnts);
        }}
        error={!!form.formState.errors["polygon"]}
        required
      />

      <ModalFormActions />
    </form>
  );
}
