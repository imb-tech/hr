export default function OfficeInfoRow({ data }: { data: OfficeInfo }) {
  return (
    <div className="grid grid-cols-6 py-2">
      <p className="font-light">{data.position}</p>
      <p className="font-light">{data.workers}</p>
      <p className="font-light">{data.in_office}</p>
      <p className="font-light">{data.lated}</p>
      <p className="font-light">{data.dont_came}</p>
      <p className="font-light">{data.early_came}</p>
    </div>
  );
}
