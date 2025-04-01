import FormInput from "@/components/form/input";
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

  const formFields = [
    {
      label: "F.I.O",
      name: "full_name",
      placeholder: "Abdisamatov Ozodbek Murod o'g'li",
    },
    {
      label: "Telefon raqam",
      name: "phone",
      placeholder: "+998 90 123 45 67",
    },
    {
      label: "Oila a'zolarining raqami",
      name: "family_phone",
      placeholder: "+998 91 123 45 60",
    },
    { label: "Oylik maoshi", name: "salary", placeholder: "3 000 000" },
    { label: "Manzil", name: "location", placeholder: "Toshkent shahar" },
    {
      label: "Hozir turar joyi",
      name: "address",
      placeholder: "Toshkent shahar, Chilonzor tumani",
    },
    {
      label: "Pasport ma'lumotlari",
      name: "id_card",
      placeholder: "AB 1234567",
    },
  ] as const;

  return (
    <div>
      <form
        className="grid grid-cols-1 gap-4 p-4 mt-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {formFields.map(({ label, name, placeholder }) => (
          <FormInput
            key={name}
            required
            label={label}
            methods={form}
            name={name}
            size="lg"
            type="number"
            placeholder={placeholder}
          />
        ))}

        <FormSelect
          required
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
          required
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
