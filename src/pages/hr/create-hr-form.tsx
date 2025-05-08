import FormInput from "@/components/form/input";
import { FormNumberInput } from "@/components/form/number-input";
import PhoneField from "@/components/form/phone-field";
import FormSelect from "@/components/form/select";
import TimeInput from "@/components/form/time-input";
import WeekdaysFields from "@/components/form/weekdays-fields";
import { COMPANIES, HR_API, POSITION } from "@/constants/api-endpoints";
import { useGet } from "@/hooks/useGet";
import { usePatch } from "@/hooks/usePatch";
import { usePost } from "@/hooks/usePost";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

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
  const { data: companies } = useGet<FeatureCollection>(COMPANIES);

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
    const user = {
      profile: {
        phone_number: values?.profile.phone_number,
        phone_number2: values?.profile.phone_number2,
        id_number: values?.profile.id_number,
        address: values?.profile.address,
        residence: values?.profile.residence,
        education: values?.profile.education,
      },
      password: values.password !== "" ? values.password : undefined,
      username: values.username,
      first_name: values.first_name,
      last_name: values.last_name,
      middle_name: values.middle_name,
      salary: values.salary,
      work_shift_start: values.work_shift_start,
      work_shift_end: values.work_shift_end,
      work_days: values.work_days,
      role: values.role,
      companies: values.companies?.split(","),
    };

    if (id) {
      updateMutate(`${HR_API}/${id}`, user);
    } else {
      postMutate(HR_API, user);
    }
  };

  useEffect(() => {
    if (data?.id) {
      form.reset({
        profile: data.profile,
        first_name: data.first_name,
        last_name: data.last_name,
        middle_name: data.middle_name,
        password: data.password ?? undefined,
        salary: data.salary,
        username: data.username,
        role: data.role.toString(),
        work_shift_start: data.work_shift_start,
        work_shift_end: data.work_shift_end,
        work_days: data.work_days,
        companies: data.companies?.join(","),
      });
    }
  }, [isSuccess, data]);

  return (
    <FormProvider {...form}>
      <form className="my-6 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 px-4 py-6 border dark:border-zinc-700 rounded-2xl">
          <h1 className="font-bold text-xl md:col-span-2 col-span-1">
            Shaxsiy ma'lumotlar
          </h1>
          <div className="md:col-span-2 grid lg:grid-cols-3 gap-4 grid-cols-1">
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
              name={"middle_name"}
              size="lg"
              type="text"
              placeholder={"Otasining ismi"}
            />
          </div>
          <PhoneField required methods={form} name={"profile.phone_number"} />
          <PhoneField
            label="Qo'shimcha raqam"
            methods={form}
            name={"profile.phone_number2"}
          />
          <FormInput
            isRequired
            label={"Doimiy turar joyi"}
            methods={form}
            name={"profile.address"}
            size="lg"
            type="text"
            placeholder={"Toshkent shahar, Chilonzor tumani"}
          />
          <FormInput
            isRequired
            label={"Vaqtinchalik turar joyi"}
            methods={form}
            name={"profile.residence"}
            size="lg"
            type="text"
            placeholder={"Toshkent shahar, Chilonzor tumani"}
          />
          <FormInput
            isRequired
            label={"Pasport ma'lumoti"}
            methods={form}
            name={"profile.id_number"}
            size="lg"
            type="text"
            placeholder={"AB 000 00 00 "}
            maxLength={9}
          />
          <FormSelect
            isRequired
            label="O'quv ma'lumoti"
            methods={form}
            name="profile.education"
            options={educationLevels}
            size="lg"
            placeholder="O'rta maxsus"
          />
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 px-4 py-6 border dark:border-zinc-700 rounded-2xl">
          <h1 className="font-bold text-xl md:col-span-2">
            Ishga oid ma'lumotlar
          </h1>
          <FormSelect
            isRequired
            label="Ofis"
            methods={form}
            name="companies"
            multiple
            options={
              companies?.features?.map((item) => ({
                label: item.properties.name,
                key: +item.id,
              })) ?? []
            }
            size="lg"
            placeholder="Tanlang"
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
            onSelectionChange={(v) => {
              const id = Number(v.anchorKey);
              const selectedRole = dataPosition?.find((el) => el.id === id);
              form.setValue("role", id);
              if (selectedRole) {
                form.setValue("salary", selectedRole?.salary);
                form.setValue(
                  "work_shift_start",
                  selectedRole?.work_shift_start,
                );
                form.setValue("work_shift_end", selectedRole?.work_shift_end);
                form.setValue("work_days", selectedRole?.work_days);
              }
            }}
          />
          <FormNumberInput
            required
            label="Oylik maosh"
            control={form.control}
            thousandSeparator=","
            size={"lg" as any}
            name="salary"
            placeholder="Ex: 123000"
          />

          <WeekdaysFields<Human>
            name="work_days"
            label="Ish kunlari"
            itemClassName="text-lg py-[9px] w-16 rounded-xl"
            wrapperClassName="gap-1"
            required
          />

          <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
            <TimeInput
              isRequired
              label={"Ish boshlanish vaqti"}
              methods={form}
              name="work_shift_start"
              size="lg"
            />
            <TimeInput
              isRequired
              label={"Ish tugash vaqti"}
              methods={form}
              name="work_shift_end"
              size="lg"
            />
          </div>

          <FormInput
            isRequired
            label={"Login"}
            methods={form}
            name={"username"}
            size="lg"
            placeholder={"Login"}
            wrapperClassName="pt-1"
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
    </FormProvider>
  );
}
