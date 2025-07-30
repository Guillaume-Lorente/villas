"use client";

import { useState } from "react";
import Calendar from "@/components/Calendar";
import { Dialog } from "@headlessui/react";
import { ChevronUp, X } from "lucide-react";

export default function MobileReservationModal({ villaId, villaName }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Fixed Reservation Banner */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-[#eeb868] text-[#223e50] lg:hidden shadow-inner flex flex-col items-center cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <ChevronUp className="animate-bounce relative top-1" size={20} />
        <div className="w-full py-4 text-center font-bold text-lg">
          Tarifs et réservation
        </div>
      </div>

      {/* Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 lg:hidden"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[75vh] overflow-y-auto">
          <div className="flex justify-between items-center px-4 pt-4 pb-2 border-b">
            <h2 className="text-lg font-bold text-[#223e50]">Réservation</h2>
            <button onClick={() => setIsOpen(false)}>
              <X className="text-[#223e50]" />
            </button>
          </div>
          <div className="p-4">
            <Calendar villaId={villaId} villaName={villaName} />
          </div>
        </div>
      </Dialog>
    </>
  );
}
