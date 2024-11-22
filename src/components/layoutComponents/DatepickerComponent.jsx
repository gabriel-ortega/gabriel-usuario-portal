import { useEffect, useState } from "react";
import { HiOutlineCalendar } from "react-icons/hi";

export function DatepickerComponent({
  bordercolor = "gray-200",
  color = "black",
  helpertext = "",
  label,
  classnamedate,
  classnamelabel,
  currentDate = false,
  name,
  onChange,
  datevalue,
  disabled = false,
  isValid = true,
}) {
  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState({ valid: isValid, message: helpertext });
  useEffect(() => {
    setSelectedDate(datevalue);
  }, [datevalue]);
  const handleDateChange = (e) => {
    let date = e.target.value;
    const today = new Date().toISOString().split("T")[0]; // Obtiene la fecha actual en formato "YYYY-MM-DD"

    if (currentDate && date > today) {
      setError({
        valid: false,
        message: "Cannot set a future date",
      });
      return; // Evita que se actualice el estado si la fecha es mayor a hoy
    } else {
      setError({
        valid: true,
        message: "",
      });
    }

    setSelectedDate(date);
    onChange(e);
  };

  return (
    <div className={`relative ${classnamedate}`}>
      <span
        className={`${
          label ? "" : "hidden"
        } text-sm px-1 -translate-y-5 md:-translate-y-5 text-gray-400 -translate-x-5 ${
          error.valid ? classnamelabel : "text-red-500"
        } `}
        htmlFor={name}
      >
        {label}
      </span>
      <div className={`relative mt-1`}>
        <input
          disabled={disabled}
          type="date"
          value={selectedDate}
          className={`w-full rounded-lg h-10 bg-gray-50 border border-${
            isValid ? "gray-300" : "red-600"
          } pl-10 md:pl-3 text-${error.valid ? "gray-500" : "red-600"}`}
          name={name}
          onChange={handleDateChange}
        />
        <HiOutlineCalendar
          className={`absolute top-1/2 left-2 transform -translate-y-1/2 md:hidden w-6 h-6`}
        />
      </div>
      <span className={`text-xs text-${error.valid ? "gray-500" : "red-600"}`}>
        {error.valid ? "" : error.message}
      </span>
    </div>
  );
}
