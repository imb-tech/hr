import UserPopup from "@/pages/map/user-popup";
import { Marker } from "react-map-gl/mapbox";

export const CustomPopup = ({
  lng,
  lat,
  onClose,
}: {
  lng: number;
  lat: number;
  properties: any;
  onClose: () => void;
}) => (
  <Marker anchor="top-left" latitude={lat} longitude={lng}>
    <div className="pr-2">
      <UserPopup
        color=""
        handleClose={onClose}
        item={
          {
            id: 3,
            full_name: "Alisherov Alisher Alisher o'g'li",
            phone: "998901231232",
            id_number: "dasdasdas",
            address: "dasd",
            role_name: "Menejer",
            work_shift_start: "09:00:00",
            work_shift_end: "18:00:00",
            salary: 12000000,
            attendance_json: {
              attendance_time: "2025-05-10T02:14:42+00:00",
              left_time: "2025-05-10T09:00:42+00:00",
            },
            attendance_status: 1,
            excuses_status: 1,
            has_attendance: true,
          } as Human
        }
        status="1"
      />
    </div>
  </Marker>
);
