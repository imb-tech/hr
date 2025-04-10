export default function OneDaysAccordion() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 bg-foreground-100 p-3 text-foreground-500 rounded-t-lg">
        <p className="text-sm">Kelish va Ketish vaqti</p>
        <p className="text-sm">Qayerda</p>
      </div>
      <div className="px-3 bg-zinc-900 rounded-b-lg ">
        <div className="grid grid-cols-2 gap-5 py-3 border-b dark:border-b-zinc-700">
          <p className="text-sm">09:00- 18:00</p>
          <p className="text-sm">Ofisda</p>
        </div>
        <div className="grid grid-cols-2 gap-5 py-3 border-b dark:border-b-zinc-700">
          <p className="text-sm">09:00- 18:00</p>
          <p className="text-sm">Ofisda</p>
        </div>
        <div className="grid grid-cols-2 gap-5 py-3  ">
          <p className="text-sm">09:00- 18:00</p>
          <p className="text-sm">Ofisda</p>
        </div>
      </div>
    </div>
  );
}
