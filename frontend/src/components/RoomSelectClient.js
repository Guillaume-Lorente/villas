"use client";
import Select from "react-select";

export default function RoomSelectClient({
  selectedOption,
  setSelectedOption,
  options,
  setPriceDetails,
}) {
  return (
    <Select
      options={options.map((opt) => ({
        label: opt.label,
        value: opt.label,
      }))}
      value={
        selectedOption
          ? { label: selectedOption.label, value: selectedOption.label }
          : null
      }
      onChange={(selected) => {
        const found = options.find((opt) => opt.label === selected.value);
        setSelectedOption(found);
        setPriceDetails(null);
      }}
      menuPlacement="top"
      menuPosition="fixed"
      placeholder="-- Sélectionner une option --"
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "#d1d5db",
          borderRadius: 6,
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: 8,
          paddingRight: 8,
          fontSize: "0.875rem",
          boxShadow: "none",
        }),
        option: (base, state) => ({
          ...base,
          fontSize: "0.875rem",
          backgroundColor: state.isFocused ? "#eeb868" : "white",
          color: state.isFocused ? "#223e50" : "#223e50",
        }),
        menu: (base) => ({
          ...base,
          zIndex: 9999,
        }),
      }}
    />
  );
}
