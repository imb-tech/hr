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
      postMutate(HR_API, values);
    }
  };

  useEffect(() => {
    if (data?.id) {
      form.reset({
        first_name: data.first_name,
        last_name: data.last_name,
        full_name: data.full_name,
        phone_number: data.phone_number,
        phone_number2: data.phone_number2,
        address: data.address,
        residence: data.residence,
        id_number: data.id_number,
        education: data.education,
        password: data.password,
        salary: data.salary,
        username: data.username,
        role:
          data?.groups && data.groups.length > 0
            ? String(data.groups[0].id)
            : "",
      });
    }
  }, [isSuccess, data]);

  return (
    <div>
      <form className="my-6 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 px-4 py-6 border dark:border-zinc-700 rounded-2xl">
          <h1 className="font-bold text-xl col-span-2">Shaxsiy ma'lumotlar</h1>
          <div className="col-span-2 grid lg:grid-cols-3 gap-4 grid-cols-1">
            <FormInput
              isRequired
              label={"Familiya"}
              methods={form}
              name={"first_name"}
              size="lg"
              type="text"
              placeholder={"Familiya"}
            />
            <FormInput
              isRequired
              label={"Ism"}
              methods={form}
              name={"last_name"}
              size="lg"
              type="text"
              placeholder={"Ism"}
            />
            <FormInput
              label={"Otasining ismi"}
              methods={form}
              name={"full_name"}
              size="lg"
              type="text"
              placeholder={"Otasining ismi"}
            />
          </div>
          <PhoneField required methods={form} name={"phone_number"} />
          <PhoneField
            label="Qo'shimcha raqam"
            methods={form}
            name={"phone_number2"}
          />
          <FormInput
            isRequired
            label={"Doimiy turar joyi"}
            methods={form}
            name={"address"}
            size="lg"
            type="text"
            placeholder={"Toshkent shahar, Chilonzor tumani"}
          />
          <FormInput
            isRequired
            label={"Vaqtinchalik turar joyi"}
            methods={form}
            name={"residence"}
            size="lg"
            type="text"
            placeholder={"Toshkent shahar, Chilonzor tumani"}
          />
          <FormInput
            isRequired
            label={"Pasport ma'lumoti"}
            methods={form}
            name={"id_number"}
            size="lg"
            type="text"
            placeholder={"AB 000 00 00 "}
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
        </div>
        <div className="grid grid-cols-2 gap-4 px-4 py-6 border dark:border-zinc-700 rounded-2xl">
          <h1 className="font-bold text-xl col-span-2">
            Ishga oid ma'lumotlar
          </h1>
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
            label={"Login"}
            methods={form}
            name={"username"}
            size="lg"
            placeholder={"Login"}
          />
          <FormInput
            isRequired={data?.id ? false : true}
            label={"Parol"}
            methods={form}
            name={"password"}
            size="lg"
            placeholder={"*******"}
          />
        </div>

        <div className="w-full flex justify-end items-center gap-3">
          <Button
            disabled={createPending || updatePending}
            color="danger"
            size="lg"
            type="button"
            variant="flat"
            onPress={() => navigate({ to: "/hr" })}
          >
            Bekor qilish
          </Button>
          <Button
            isLoading={createPending || updatePending}
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
