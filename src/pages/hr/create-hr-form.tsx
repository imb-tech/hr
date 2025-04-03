import FormInput from "@/components/form/input";
import PhoneField from "@/components/form/phone-field";
import FormSelect from "@/components/form/select";
import { HR_API, POSITION } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { usePatch } from "@/hooks/usePatch";
import { usePost } from "@/hooks/usePost";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function CreateHrForm() {
  const form = useForm<Human>();
  const { "hr-edit": id } = useParams({ strict: false });
  const queryClient = useQueryClient();
  const { data: dataPosition, isSuccess: successPosition } =
    useGet<Position[]>(POSITION);
  const { data, isSuccess } = useGet(HR_API, {
    options: { enabled: Boolean(id) },
  });

  const { mutate: postMutate, isPending: createPending } = usePost({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [HR_API] });
      addToast({
        description: "Muaffaqiyatli qo'shildi",
        color: "success",
      });
      form.reset();
    },
  });

  const { mutate: updateMutate, isPending: updatePending } = usePatch({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [HR_API] });
      addToast({
        description: "Muaffaqiyatli yangilandi",
        color: "success",
      });
      form.reset();
    },
  });

  const onSubmit = (values: Human) => {
    if (id) {
      updateMutate(`${HR_API}/${id}`, values);
    } else {
      postMutate(HR_API, { ...values, username: values.phone_number });
    }
  };

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [isSuccess, form, data]);

  return (
    <div>
      <form
        className="grid grid-cols-1 gap-4 p-4 mt-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput
          isRequired
          label={"F.I.O"}
          methods={form}
          name={"full_name"}
          size="lg"
          type="text"
          placeholder={"Abdisamatov Ozodbek Murod o'g'li"}
        />
        <PhoneField
          placeholder="+998931203042"
          required
          methods={form}
          name={"phone_number"}
        />
        <PhoneField
          label="Qo'shimcha raqam"
          required
          methods={form}
          name={"phone_number2"}
        />
        <FormInput
          isRequired
          label={"Oylik maoshi"}
          methods={form}
          name={"salary"}
          size="lg"
          type="text"
          placeholder={"3 000 000"}
        />
        <FormInput
          isRequired
          label={"Manzil"}
          methods={form}
          name={"address"}
          size="lg"
          type="text"
          placeholder={"Toshkent shahar"}
        />
        <FormInput
          isRequired
          label={"Hozir turar joyi"}
          methods={form}
          name={"residence"}
          size="lg"
          type="text"
          placeholder={"Toshkent shahar, Chilonzor tumani"}
        />
        <FormInput
          isRequired
          label={"Pasport ma'lumotlari"}
          methods={form}
          name={"id_number"}
          size="lg"
          type="text"
          placeholder={"AB 1234567"}
          maxLength={9}
        />

        <FormSelect
          isRequired
          label="O'quv ma'lumoti"
          methods={form}
          name="education"
          options={
            (successPosition &&
              dataPosition?.map((item) => {
                return {
                  label: item.name,
                  key: item.id,
                };
              })) ||
            []
          }
          size="lg"
          placeholder="O'rta maxsus"
        />

        <FormSelect
          isRequired
          label="Lavozimi"
          methods={form}
          name="positon"
          options={[
            { label: "Menejer", key: 1 },
            { label: "Ish boshqaruvchi", key: 2 },
            { label: "O'qituvchi", key: 3 },
          ]}
          size="lg"
          placeholder="Menejer"
        />
        <FormInput
          isRequired
          label={"Parol"}
          methods={form}
          name={"password"}
          size="lg"
          type="password"
          placeholder={"*******"}
        />

        <div className="w-full">
          <span className="opacity-0">button</span>
          <Button
            isLoading={createPending || updatePending}
            className="w-full"
            color="primary"
            size="lg"
            type="submit"
          >
            Saqlash
          </Button>
        </div>
      </form>
    </div>
  );
}
