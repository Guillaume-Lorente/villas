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
  isAfter,
  isBefore,
  isWithinInterval,
  startOfDay,
  differenceInCalendarDays,
  parseISO
} from "date-fns";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Select from "react-select";
import dynamic from "next/dynamic";
import { cache } from "react";
import { fr } from "date-fns/locale";
import { useLanguage } from "@/context/LanguageContext";

export default function Calendar({ villaId, villaName }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectingStart, setSelectingStart] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [reservedDates, setReservedDates] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [priceDetails, setPriceDetails] = useState(null);

  const roomOptionsByVilla = {
    1: [
      {
        labelKey: "v1.option1",
        room_count: 1,
        includes_sofa_bed: false,
        max_guests: 2,
      },
      {
        labelKey: "v1.option2",
        room_count: 2,
        includes_sofa_bed: false,
        max_guests: 4,
      },
      {
        labelKey: "v1.option3",
        room_count: 2,
        includes_sofa_bed: true,
        max_guests: 6,
      },
    ],
    2: [
      {
        labelKey: "v2.option1",
        room_count: 2,
        includes_sofa_bed: false,
        max_guests: 6,
      },
      {
        labelKey: "v2.option2",
        room_count: 3,
        includes_sofa_bed: false,
        max_guests: 9,
      },
      {
        labelKey: "v2.option3",
        room_count: 4,
        includes_sofa_bed: false,
        max_guests: 11,
      },
    ],
    3: [
      {
        labelKey: "v3.option1",
        room_count: 1,
        includes_sofa_bed: false,
        max_guests: 3,
      },
      {
        labelKey: "v3.option2",
        room_count: 2,
        includes_sofa_bed: false,
        max_guests: 6,
      },
      {
        labelKey: "v3.option3",
        room_count: 3,
        includes_sofa_bed: false,
        max_guests: 8,
      },
    ],
  };

  const options = roomOptionsByVilla[villaId] || [];
  const RoomSelect = dynamic(() => import("./RoomSelectClient"), {
    ssr: false,
  });

  useEffect(() => {
  const fetchReservations = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reservations/villa/${villaId}`,
        { cache: "no-store" }
      );
      const data = await res.json();

      const allDates = data.flatMap(({ start_date, end_date }) => {
        const dates = [];

        // Ignorer la journée d’arrivée (start) et la journée de départ (end)
        let current = addDays(parseISO(start_date), 1);
        const end = parseISO(end_date);

        while (current < end) {
          dates.push(new Date(current));
          current = addDays(current, 1);
        }

        return dates;
      });

      setReservedDates(allDates);
    } catch (err) {
      console.error("Erreur chargement réservations:", err);
    }
  };

  fetchReservations();
}, [villaId]);

  const isReserved = (date) =>
    reservedDates.some((reserved) => isSameDay(reserved, date));

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

  const handleDateClick = (clickedDate) => {
  const normalized = startOfDay(clickedDate);
  if (isBefore(normalized, startOfDay(today)) || isReserved(normalized)) return;

  if (startDate && isSameDay(normalized, startDate)) {
    setStartDate(null);
    setEndDate(null);
    setSelectingStart(true);
    setErrorMessage("");
    return;
  }

  if (selectingStart || (startDate && endDate)) {
    setStartDate(normalized);
    setEndDate(null);
    setSelectingStart(false);
    setErrorMessage("");
    setPriceDetails(null);
  } else {
    if (isAfter(normalized, startDate)) {
      const rangeHasReserved = reservedDates.some((reserved) =>
        isWithinInterval(reserved, { start: startDate, end: normalized })
      );
      if (rangeHasReserved) {
        setErrorMessage(
          "Cette plage inclut des dates déjà réservées. Veuillez choisir une autre période."
        );
        return;
      }
      setEndDate(normalized);
      setSelectingStart(true);
      setErrorMessage("");
      setPriceDetails(null);
    } else {
      setStartDate(normalized);
      setEndDate(null);
      setErrorMessage("");
      setPriceDetails(null);
    }
  }
};


  const isInRange = (day) =>
    startDate &&
    endDate &&
    isWithinInterval(day, { start: startDate, end: endDate });

  const isDisabled = (day) =>
    isBefore(day, startOfDay(today)) || isReserved(day);

  const getNights = () => {
  if (!startDate || !endDate) return 0;
  return Math.max(0, differenceInCalendarDays(endDate, startDate));
};

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    const autoCalculate = async () => {
      if (!startDate || !endDate || !selectedOption) return;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/calculate-price`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              villaId,
              startDate,
              endDate,
              room_count: selectedOption.room_count,
              includes_sofa_bed: selectedOption.includes_sofa_bed,
            }),
          }
        );
        const data = await res.json();
        if (data.error) {
          setErrorMessage(data.error);
          setPriceDetails(null);
        } else {
          setPriceDetails(data);
          setErrorMessage("");
        }
      } catch (err) {
        console.error("Erreur de calcul:", err);
        setErrorMessage("Erreur de calcul du prix.");
        setPriceDetails(null);
      }
    };

    autoCalculate();
  }, [startDate, endDate, selectedOption, villaId]);

  const { t } = useLanguage();

  return (
    <div
      className="text-sm text-[#223e50] select-none"
      role="region"
      aria-label="Calendrier de réservation de la villa"
    >
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          aria-label="Mois précédent"
        >
          ◀
        </button>
        <h3 className="font-semibold text-[#eeb868]">
          {capitalize(format(currentMonth, "MMMM yyyy", { locale: fr }))}
        </h3>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          aria-label="Mois suivant"
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
          const isSelectedStart = startDate && isSameDay(dayItem, startDate);
          const isSelectedEnd = endDate && isSameDay(dayItem, endDate);
          const inRange = isInRange(dayItem);
          const disabled = isDisabled(dayItem);

          return (
            <div
              key={i}
              tabIndex={disabled ? -1 : 0}
              role="button"
              aria-pressed={isSelectedStart || isSelectedEnd}
              aria-label={format(dayItem, "EEEE d MMMM yyyy", { locale: fr })}
              onClick={() => !disabled && handleDateClick(dayItem)}
              onKeyDown={(e) => {
                if (!disabled && (e.key === "Enter" || e.key === " ")) {
                  handleDateClick(dayItem);
                }
              }}
              className={`rounded-full text-center py-1 cursor-pointer transition ${
                disabled
                  ? "text-gray-400 line-through cursor-not-allowed"
                  : isSelectedStart || isSelectedEnd
                  ? "bg-[#eeb868] text-[#223e50] font-bold"
                  : inRange
                  ? "bg-[#eeb868]/80"
                  : isToday
                  ? "border border-[#eeb868] text-[#eeb868]"
                  : "hover:bg-[#eeb868]/20"
              }`}
            >
              {format(dayItem, "d")}
            </div>
          );
        })}
      </div>

      {startDate && endDate && (
        <p className="mt-4 text-xs text-center text-[#eeb868] font-medium">
          {t("calendar.selectedRange")}{" "}
          <strong>{format(startDate, "dd/MM/yyyy")}</strong> {t("calendar.to")}{" "}
          <strong>{format(endDate, "dd/MM/yyyy")}</strong>
        </p>
      )}

      {errorMessage && (
        <div className="mt-4 text-xs text-center text-red-500 font-medium">
          <p>
            {t("calendar.errorMessage")}{" "}
            <a
              href="/contact"
              className="underline text-[#eeb868] hover:text-[#c6943d] transition"
            >
              {t("calendar.contactLink")}
            </a>
            .
          </p>
        </div>
      )}

      <div className="mt-6">
        <label className="block text-xs font-semibold mb-2 text-[#eeb868]">
          {t("calendar.roomLabel")}
        </label>
        <RoomSelect
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          setPriceDetails={setPriceDetails}
          options={options.map((option) => ({
            ...option,
            label: t(`calendar.${option.labelKey}`),
          }))}
        />
      </div>

      {priceDetails !== null && startDate && endDate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-4 text-center text-base font-bold text-[#223e50]"
        >
          {priceDetails.discountApplied && (
            <div className="mb-2">
              <span className="bg-[#eeb868] text-[#223e50] text-xs px-3 py-1 rounded-full font-semibold">
                {t("calendar.promoBadge")}
              </span>
            </div>
          )}
          {getNights()} {getNights() > 1 ? "nuits" : "nuit"} –
          {priceDetails.discountApplied ? (
            <>
              <span className="line-through text-gray-400 ml-1">
                {priceDetails.totalBeforeDiscount.toFixed(2)} €
              </span>{" "}
              <span className="text-[#eeb868] ml-2">
                {priceDetails.totalAfterDiscount.toFixed(2)} €
              </span>
            </>
          ) : (
            <span className="text-[#eeb868] ml-1">
              {priceDetails.totalBeforeDiscount.toFixed(2)} €
            </span>
          )}
        </motion.div>
      )}
      {startDate && endDate && selectedOption && priceDetails && (
        <div className="mt-6">
          <a
            href={`/reservation?start=${startDate.toISOString()}&end=${endDate.toISOString()}&rooms=${
              selectedOption.room_count
            }&sofa=${selectedOption.includes_sofa_bed}&villa=${villaId}&price=${
              priceDetails.totalAfterDiscount
            }`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Réserver du ${format(
              startDate,
              "dd/MM/yyyy"
            )} au ${format(endDate, "dd/MM/yyyy")} pour ${
              selectedOption.label
            }`}
            className="block w-full bg-[#eeb868] text-[#223e50] font-bold py-3 rounded text-center hover:bg-[#c6943d] transition"
          >
            {t("calendar.reserveNow")}
          </a>
        </div>
      )}
    </div>
  );
}
