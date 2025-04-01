import FormInput from "@/components/form/input";
import PhoneField from "@/components/form/phone-field";
import FormSelect from "@/components/form/select";
import { HR_API } from "@/lib/api-endpoints";
import { useGet, usePatch, usePost } from "@/services/default-requests";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function CreateHrForm() {
  const form = useForm<Human>();
  const { "hr-edit": id } = useParams({ strict: false });
  const { data, isSuccess } = useGet(HR_API, {
    options: { enabled: Boolean(id) },
  });

  const { mutate: postMutate } = usePost({
    onSuccess: () => {
      addToast({
        description: "Muaffaqiyatli qo'shildi",
        color: "success",
      });
    },
  });

  const { mutate: updateMutate } = usePatch({
    onSuccess: () => {
      addToast({
        description: "Muaffaqiyatli yangilandi",
        color: "success",
      });
    },
  });

  const onSubmit = (values: Human) => {
    if (id) {
      updateMutate(`${HR_API}/${id}`, values);
    } else {
      postMutate(HR_API, values);
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
          name={"phone"}
        />
        <PhoneField
          label="Qo'shimcha raqam"
          required
          methods={form}
          name={"family_phone"}
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
          name={"location"}
          size="lg"
          type="text"
          placeholder={"Toshkent shahar"}
        />
        <FormInput
          isRequired
          label={"Hozir turar joyi"}
          methods={form}
          name={"address"}
          size="lg"
          type="text"
          placeholder={"Toshkent shahar, Chilonzor tumani"}
        />
        <FormInput
          isRequired
          label={"Pasport ma'lumotlari"}
          methods={form}
          name={"id_card"}
          size="lg"
          type="text"
          placeholder={"AB 1234567"}
        />

        <FormSelect
          isRequired
          label="O'quv ma'lumoti"
          methods={form}
          name="education"
          options={[
            { label: "Oliy ta'lim", key: 1 },
            { label: "O'rta maxsus", key: 2 },
            { label: "Tugallanmagan oliy", key: 3 },
          ]}
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
          <Button className="w-full" color="primary" size="lg" type="submit">
            Saqlash
          </Button>
        </div>
      </form>
    </div>
  );
}
