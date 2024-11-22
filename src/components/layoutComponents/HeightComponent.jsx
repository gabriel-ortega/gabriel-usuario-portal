import { Button } from "flowbite-react";
import { InputText } from "./InputText";

import { useState } from "react";
import { useMemo } from "react";

export const HeightComponent = ({ initialHeight, onHeightChange }) => {
  const data = useMemo(() => initialHeight, []);
  const [selectedHeightFormat, setSelectedHeightFormat] = useState(
    initialHeight?.selected || null
  );

  const [height, setHeight] = useState(
    data || {
      m: "",
      ft: { ft: "", inches: "" },
      selected: "",
      format: "",
    }
  );

  // Función para convertir de metros a pies
  const convertToFeet = (meters) => {
    const feet = meters * 3.28084;
    const ft = Math.floor(feet);
    const inches = Math.round((feet - ft) * 12);
    return { ft, inches };
  };

  // Función para convertir de pies a metros
  const convertToMeters = (feet = 0, inches = 0) => {
    const meters = feet * 0.3048 + inches * 0.0254;
    return meters.toFixed(2);
  };

  // Actualiza el objeto de altura cuando el usuario cambia la unidad o el valor
  const handleInputChange = (value, unit) => {
    if (unit === "m") {
      const { ft, inches } = convertToFeet(value);
      setHeight({
        ...height,
        m: value,
        ft: { ft: ft, inches: inches },
        format: `${ft}' ${inches}"`,
      });
      onHeightChange({
        ...height,
        m: value,
        ft: { ft: ft, inches: inches },
        format: `${ft}' ${inches}"`,
      });
    } else if (unit === "ft") {
      const meters = convertToMeters(value.ft || 0, value.inches || 0);
      setHeight({
        ...height,
        m: meters,
        ft: { ft: value.ft, inches: value.inches },
        format: `${value.ft}' ${value.inches}"`,
      });
      onHeightChange({
        ...height,
        m: meters,
        ft: { ft: value.ft, inches: value.inches },
        format: `${value.ft}' ${value.inches}"`,
      });
    }
  };

  // Maneja el cambio de formato seleccionado
  const handleFormatSelection = (format) => {
    setSelectedHeightFormat(format);
    setHeight({ ...height, selected: format });
    onHeightChange({ ...height, selected: format });
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="comment" className="text-sm text-gray-400 font-sans">
        Height
      </label>
      <div className="grid grid-cols-[150px,1fr] ">
        <Button.Group className="h-12">
          <Button
            color={height?.selected === "m" ? "blue" : "gray"}
            onClick={() => handleFormatSelection("m")}
            className={`px-2 md:px-2 ${
              selectedHeightFormat !== null ? "" : "border-red-600"
            }`}
          >
            m
          </Button>
          <Button
            color={height?.selected === "ft" ? "blue" : "gray"}
            onClick={() => handleFormatSelection("ft")}
            className={`px-2 md:px-2 ${
              selectedHeightFormat !== null ? "" : "border-red-600"
            }`}
          >
            ft
          </Button>
        </Button.Group>

        {height?.selected == "m" ? (
          <InputText
            label="Height (m)"
            name="heightMeters"
            type="text"
            regexType="4"
            value={height.m}
            onChange={(e) => handleInputChange(e.target.value, "m")}
            isValid={height.m}
          />
        ) : height?.selected == "ft" ? (
          <div className="grid grid-cols-2 items-center justify-center gap-5">
            <InputText
              label="Feet"
              name="heightFeet"
              type="text"
              regexType="5"
              value={height.ft.ft}
              isValid={height.m}
              onChange={(e) =>
                handleInputChange(
                  { ft: e.target.value, inches: height.ft.inches },
                  "ft"
                )
              }
            />
            <InputText
              label="Inches"
              name="heightInches"
              type="text"
              regexType="6"
              value={height.ft.inches}
              isValid={height.m}
              onChange={(e) =>
                handleInputChange(
                  { ft: height.ft.ft, inches: e.target.value },
                  "ft"
                )
              }
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
