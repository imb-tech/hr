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
    { label: "F.I.O", name: "full_name" },
    { label: "Telefon raqam", name: "phone" },
    { label: "Oila a'zolarining raqami", name: "family_phone" },
    { label: "Manzil", name: "location" },
    { label: "Hozir turar joyi", name: "address" },
    { label: "Pasport ma'lumotlari", name: "id_card" },
    { label: "O'quv ma'lumoti", name: "education" },
    { label: "Oylik maoshi", name: "salary" },
  ] as const;

  const selectOptions = [
    { label: "Toshkent", key: 1 },
    { label: "Bishkek", key: 2 },
    { label: "Jizzax", key: 3 },
  ];

  return (
    <div>
      <form
        className="grid md:grid-cols-2 grid-cols-1 gap-4 p-4 mt-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {formFields.map(({ label, name }) => (
          <FormInput
            key={name}
            required
            label={label}
            methods={form}
            name={name}
            size="lg"
          />
        ))}

        <FormSelect
          required
          label="Lavozimi"
          methods={form}
          name="education"
          options={selectOptions}
          size="lg"
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
