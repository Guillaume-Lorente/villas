"use client";

import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  format,
  isSameDay,
  isWithinInterval,
  startOfDay,
  endOfDay,
} from "date-fns";
import { useEffect, useState } from "react";

export default function AdminCalendar({ villaId }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [reservations, setReservations] = useState([]);

  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [selectedReservation, setSelectedReservation] = useState(null);
  const [editGuestName, setEditGuestName] = useState("");
  const [editStartDate, setEditStartDate] = useState(null);
  const [editEndDate, setEditEndDate] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reservations/villa/${villaId}`
        );
        const data = await res.json();
        setReservations(data);
      } catch (err) {
        console.error("Erreur chargement réservations:", err);
      }
    };

    fetchReservations();
  }, [villaId]);

  const days = [];
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDateOfGrid = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDateOfGrid = endOfWeek(monthEnd, { weekStartsOn: 1 });

  let day = startDateOfGrid;
  while (day <= endDateOfGrid) {
    days.push(day);
    day = addDays(day, 1);
  }

  const getReservation = (date) =>
    reservations.find((r) =>
      isWithinInterval(date, {
        start: startOfDay(new Date(r.start_date)),
        end: endOfDay(new Date(r.end_date)),
      })
    );

  return (
    <div className="text-sm text-white select-none">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="hover:text-[#eeb868]"
        >
          ◀
        </button>
        <h3 className="font-semibold text-[#eeb868]">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="hover:text-[#eeb868]"
        >
          ▶
        </button>
      </div>

      <div className="grid grid-cols-7 text-center mb-2 text-xs font-bold uppercase text-[#eeb868]">
        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((dayItem, i) => {
          const isToday = isSameDay(dayItem, today);
          const reservation = getReservation(dayItem);
          const bg =
            reservation?.source === "ical"
              ? "bg-gray-400"
              : reservation
              ? "bg-green-500"
              : "";

          return (
            <div
              key={i}
              onClick={() => {
                if (reservation) {
                  setSelectedReservation(reservation);
                  setEditGuestName(reservation.guest_name);
                  setEditStartDate(new Date(reservation.start_date));
                  setEditEndDate(new Date(reservation.end_date));
                } else {
                  setSelectedStart(dayItem);
                  setSelectedEnd(null);
                  setGuestName("");
                  setShowForm(true);
                }
              }}
              className={`rounded-full text-center py-1 transition ${
                isToday ? "border border-[#eeb868]" : ""
              } ${bg} ${
                reservation
                  ? "cursor-pointer hover:brightness-110 ring-1 ring-white/30"
                  : "cursor-pointer hover:bg-[#eeb868]/20"
              }`}
            >
              {format(dayItem, "d")}
            </div>
          );
        })}
      </div>

      {/* Formulaire d'ajout */}
      {showForm && selectedStart && (
        <div className="mt-6 bg-white p-4 rounded-lg text-[#223e50] shadow-md max-w-md mx-auto">
          <h3 className="text-lg font-bold mb-4 text-center">
            Nouvelle réservation
          </h3>

          <div className="mb-2">
            <label className="text-sm font-semibold">Date de début :</label>
            <input
              type="date"
              className="w-full border px-2 py-1 rounded"
              value={format(selectedStart, "yyyy-MM-dd")}
              onChange={(e) => setSelectedStart(new Date(e.target.value))}
            />
          </div>

          <div className="mb-2">
            <label className="text-sm font-semibold">Date de fin :</label>
            <input
              type="date"
              className="w-full border px-2 py-1 rounded"
              value={selectedEnd ? format(selectedEnd, "yyyy-MM-dd") : ""}
              onChange={(e) => setSelectedEnd(new Date(e.target.value))}
            />
          </div>

          <div className="mb-2">
            <label className="text-sm font-semibold">Nom du client :</label>
            <input
              type="text"
              className="w-full border px-2 py-1 rounded"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => {
                setShowForm(false);
                setSelectedStart(null);
                setSelectedEnd(null);
                setGuestName("");
              }}
              className="px-4 py-1 rounded text-sm bg-gray-300 hover:bg-gray-400"
            >
              Annuler
            </button>
            <button
              disabled={submitting || !selectedEnd || !guestName}
              onClick={async () => {
                setSubmitting(true);
                try {
                  const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reservations`,
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        villa_id: villaId,
                        start_date: format(selectedStart, "yyyy-MM-dd"),
                        end_date: format(selectedEnd, "yyyy-MM-dd"),
                        guest_name: guestName,
                        source: "manual",
                      }),
                    }
                  );

                  if (!res.ok) throw new Error("Erreur lors de la création");

                  const newReservation = await res.json();
                  setReservations((prev) => [...prev, newReservation]);

                  setShowForm(false);
                  setSelectedStart(null);
                  setSelectedEnd(null);
                  setGuestName("");
                } catch (err) {
                  alert("Erreur : " + err.message);
                } finally {
                  setSubmitting(false);
                }
              }}
              className="px-4 py-1 rounded text-sm bg-[#eeb868] hover:bg-[#c6943d]"
            >
              {submitting ? "Création..." : "Créer"}
            </button>
          </div>
        </div>
      )}

      {/* Modale de visualisation / édition */}
      {selectedReservation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl text-[#223e50] shadow-lg max-w-md w-full relative">
            <h3 className="text-xl font-bold mb-4 text-center">
              Détails de la réservation
            </h3>

            <p className="mb-2">
              <span className="font-semibold">Dates :</span>{" "}
              {selectedReservation.source === "manual" ? (
                <>
                  <input
                    type="date"
                    className="border rounded px-2 py-1 text-sm"
                    value={format(editStartDate, "yyyy-MM-dd")}
                    onChange={(e) => setEditStartDate(new Date(e.target.value))}
                  />
                  {" → "}
                  <input
                    type="date"
                    className="border rounded px-2 py-1 text-sm"
                    value={format(editEndDate, "yyyy-MM-dd")}
                    onChange={(e) => setEditEndDate(new Date(e.target.value))}
                  />
                </>
              ) : (
                `${format(
                  new Date(selectedReservation.start_date),
                  "dd/MM/yyyy"
                )} → ${format(
                  new Date(selectedReservation.end_date),
                  "dd/MM/yyyy"
                )}`
              )}
            </p>

            <p className="mb-2">
              <span className="font-semibold">Nom :</span>{" "}
              {selectedReservation.source === "manual" ? (
                <input
                  type="text"
                  className="border rounded px-2 py-1 text-sm w-full"
                  value={editGuestName}
                  onChange={(e) => setEditGuestName(e.target.value)}
                />
              ) : (
                selectedReservation.guest_name
              )}
            </p>

            <p className="mb-4">
              <span className="font-semibold">Source :</span>{" "}
              {selectedReservation.source === "ical"
                ? "iCal (non modifiable)"
                : "Manuelle"}
            </p>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setSelectedReservation(null)}
                className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400 text-sm"
              >
                Fermer
              </button>

              {selectedReservation.source === "manual" && (
                <>
                  <button
                    onClick={async () => {
                      try {
                        const res = await fetch(
                          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reservations/${selectedReservation.id}`,
                          {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              villa_id: villaId,
                              guest_name: editGuestName,
                              start_date: format(editStartDate, "yyyy-MM-dd"),
                              end_date: format(editEndDate, "yyyy-MM-dd"),
                              source: "manual",
                            }),
                          }
                        );

                        if (!res.ok) throw new Error("Échec de la mise à jour");

                        const updated = await res.json();
                        setReservations((prev) =>
                          prev.map((r) => (r.id === updated.id ? updated : r))
                        );
                        setSelectedReservation(null);
                      } catch (err) {
                        alert("Erreur : " + err.message);
                      }
                    }}
                    className="px-4 py-1 rounded bg-[#eeb868] hover:bg-[#c6943d] text-[#223e50] text-sm"
                  >
                    💾 Enregistrer
                  </button>

                  <button
                    onClick={async () => {
                      if (confirm("Supprimer cette réservation manuelle ?")) {
                        try {
                          await fetch(
                            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reservations/${selectedReservation.id}`,
                            { method: "DELETE" }
                          );
                          setReservations((prev) =>
                            prev.filter((r) => r.id !== selectedReservation.id)
                          );
                          setSelectedReservation(null);
                        } catch (err) {
                          alert("Erreur lors de la suppression.");
                        }
                      }
                    }}
                    className="px-4 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm"
                  >
                    Supprimer
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
