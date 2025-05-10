import ParamSelect from "@/components/param/param-select";
import { HTMLProps } from "react";

export default function MapFilters(props: HTMLProps<HTMLDivElement>) {
  return (
    <div {...props}>
      <ParamSelect
        options={users}
        optionLabelKey="full_name"
        optionValueKey="id"
        paramName="filter"
        className="max-w-full sm:max-w-sm"
      />
    </div>
  );
}
const users = [
  {
    id: 1,
    full_name: "Abdulaziz Qodirov",
    latitude: 41.3111,
    longitude: 69.2797,
  },
  { id: 2, full_name: "Malika Tursunova", latitude: 41.315, longitude: 69.27 },
  {
    id: 3,
    full_name: "Jahongir Ibrohimov",
    latitude: 41.3105,
    longitude: 69.2841,
  },
  {
    id: 4,
    full_name: "Nigora Sheraliyeva",
    latitude: 41.3183,
    longitude: 69.2765,
  },
  { id: 5, full_name: "Bekzod Sodiqov", latitude: 41.3167, longitude: 69.2779 },
  {
    id: 6,
    full_name: "Dildora Asqarova",
    latitude: 41.3122,
    longitude: 69.2811,
  },
  {
    id: 7,
    full_name: "Samandar To‘xtasinov",
    latitude: 41.3175,
    longitude: 69.2735,
  },
  {
    id: 8,
    full_name: "Gulnoza Ulug‘bekova",
    latitude: 41.319,
    longitude: 69.278,
  },
  { id: 9, full_name: "Yusuf Rustamov", latitude: 41.3133, longitude: 69.2712 },
  {
    id: 10,
    full_name: "Dilafruz Shavkatova",
    latitude: 41.3115,
    longitude: 69.2856,
  },
  {
    id: 11,
    full_name: "Ismoil Kenjayev",
    latitude: 41.3142,
    longitude: 69.2801,
  },
  {
    id: 12,
    full_name: "Shahnoza Ma’rufova",
    latitude: 41.317,
    longitude: 69.276,
  },
  {
    id: 13,
    full_name: "Sardor Boburov",
    latitude: 41.3128,
    longitude: 69.2832,
  },
  {
    id: 14,
    full_name: "Zilola Baxtiyorova",
    latitude: 41.316,
    longitude: 69.2749,
  },
  {
    id: 15,
    full_name: "Shoxrux Anvarov",
    latitude: 41.3199,
    longitude: 69.2755,
  },
  {
    id: 16,
    full_name: "Dilnoza Xurshidova",
    latitude: 41.313,
    longitude: 69.282,
  },
  { id: 17, full_name: "Jasur Murodov", latitude: 41.3155, longitude: 69.279 },
  {
    id: 18,
    full_name: "Rayhona Jasurova",
    latitude: 41.3178,
    longitude: 69.277,
  },
  {
    id: 19,
    full_name: "Ulug‘bek Erkinov",
    latitude: 41.312,
    longitude: 69.273,
  },
  {
    id: 20,
    full_name: "Munisa Ilyosova",
    latitude: 41.318,
    longitude: 69.2799,
  },
];
