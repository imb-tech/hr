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
import { useNavigate, useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const educationLevels = [
  { label: "O'rta ta'lim", key: 1 },
  { label: "O'rta maxsus ta'lim", key: 2 },
  { label: "Kasb-hunar ta'limi", key: 3 },
  { label: "Tugallanmagan oliy ta'lim", key: 4 },
  { label: "Oliy ta'lim", key: 5 },
  { label: "Magistratura", key: 6 },
];

export default function CreateHrForm() {
  const form = useForm<Human>();
  const { "hr-edit": id } = useParams({ strict: false });
  const queryClient = useQueryClient();
  const { data: dataPosition, isSuccess: successPosition } =
    useGet<Position[]>(POSITION);
  const { data, isSuccess } = useGet<Human>(`${HR_API}/${id}`, {
    options: { enabled: Boolean(id) },
  });
  const navigate = useNavigate();

  const { mutate: postMutate, isPending: createPending } = usePost({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [HR_API] });
      addToast({
        description: "Muaffaqiyatli qo'shildi",
        color: "success",
      });
      form.reset();
      navigate({ to: "/hr" });
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
      navigate({ to: "/hr" });
    },
  });

  const onSubmit = (values: Human) => {
    if (id) {
      updateMutate(`${HR_API}/${id}`, values);
    } else {
      postMutate(HR_API, {
        ...values,
        username: values.phone_number,
      });
    }
  };

  useEffect(() => {
    if (data?.id) {
      form.reset({
        full_name: data.full_name,
        phone_number: data.phone_number,
        phone_number2: data.phone_number2,
        address: data.address,
        residence: data.residence,
        id_number: data.id_number,
        education: data.education,
        password: data.password,
        salary: data.salary,
        role:
          data?.groups && data.groups.length > 0
            ? String(data.groups[0].id)
            : "",
      });
    }
  }, [isSuccess, data]);

  return (
    <div>
      <form
        className="grid grid-cols-1 gap-4 p-4 mt-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* <FormInput
          label={"Xodim rasmi"}
          methods={form}
          name={"image"}
          size="lg"
          type="file"
          accept="image/*"
          placeholder={"Xodim"}
        /> */}
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
          options={educationLevels}
          size="lg"
          placeholder="O'rta maxsus"
        />

        <FormSelect
          isRequired
          label="Lavozimi"
          methods={form}
          name="role"
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
          placeholder="Menejer"
        />
        <FormInput
          isRequired={data?.id ? false : true}
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
