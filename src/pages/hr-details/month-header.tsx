export default function MonthTableHeader() {
    return (
      <div className="grid grid-cols-5 gap-3 bg-foreground-100 p-3 text-foreground-500 rounded-lg">
        <p className="text-sm">Oy</p>
        <p className="text-sm">Ishxondagi vaqti</p>
        <p className="text-sm">Kechikishlar soni</p>
        <p className="text-sm">Ko'chadagi vaqti</p>
        <p className="text-sm">Jarimalar</p>
      </div>
    );
  }
  