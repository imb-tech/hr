import { Building2, MapPinned, SquareUser, UsersIcon } from "lucide-react";

export default function Tabbar() {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-4">
        {links?.map((link, i) => (
          <a key={i} href={link.to}>
            <div className="bg-gray-400/15 text-gray-300 font-extralight flex items-center gap-2 py-2 px-3 rounded-md">
              <span>{link.icon}</span>
              <span>{link.title}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export const links = [
  {
    to: "#office",
    icon: <Building2 size={16} />,
    title: "Ofis",
  },
  {
    to: "#map",
    icon: <MapPinned size={16} />,
    title: "Xarita",
  },
  {
    to: "#position",
    icon: <SquareUser size={16} />,
    title: "Lavozimlar",
  },
  {
    to: "#hr",
    icon: <UsersIcon size={16} />,
    title: "Hodimlar",
  },
];
