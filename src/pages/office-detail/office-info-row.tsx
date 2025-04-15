export default function OfficeInfoRow({ data }: { data: OfficeInfo }) {
  return (
    <div className="grid grid-cols-5 py-2">
      <p className="font-light">{data.name || 0}</p>
      <p className="font-light">{data.checked_in_workers || 0}</p>
      <p className="font-light">{data.absent_users || 0}</p>
      <p className="font-light">{data.total_workers_count || 0}</p>
      <p className="font-light">{data.late_users_count || 0}</p>
      {/* <p className="font-light">{data.early_users || 0}</p> */}
    </div>
  );
}
