import ReservationForm from "../components/ReservationForm";
import ReservationList from "../components/ReservationList";
import { useState } from "react";

export default function Home() {
  const [reload, setReload] = useState(false);

  return (
    <div>
      <h1>Sistema de Reservas</h1>
      <ReservationForm onSuccess={() => setReload(!reload)} />
      <ReservationList key={reload.toString()} />
    </div>
  );
}
