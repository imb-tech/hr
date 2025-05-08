export default function OfficeDetailTableHeader() {
  return (
    <div className="grid grid-cols-6">
      <p className="font-semibold text-primary-600 text-sm">Lavozim</p>
      <p className="font-semibold text-primary-600 text-sm">Vaqtida kelganlar</p>
      <p className="font-semibold text-primary-600 text-sm">Kelmaganlar {"(sababli)"}</p>
      <p className="font-semibold text-primary-600 text-sm">Kelmaganlar {"(sababsiz)"}</p>
      <p className="font-semibold text-primary-600 text-sm">Jami ishchilar</p>
      <p className="font-semibold text-primary-600 text-sm">Kech qolganlar</p>
    </div>
  );
}
