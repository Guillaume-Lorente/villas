import { Suspense } from "react";
import ReservationPage from "./ReservationClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ReservationPage />
    </Suspense>
  );
}
