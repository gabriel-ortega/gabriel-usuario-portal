import { Button } from "flowbite-react";
import { useState } from "react";
import { InputText } from "./InputText";
import { useEffect } from "react";

export const WeightComponent = ({ initialWeight, onWeightChange }) => {
  const [valueForm, setValueForm] = useState({ kg: "", lb: "", selected: "" });
  useEffect(() => {
    if (initialWeight) {
      setValueForm(initialWeight);
    }
  }, [initialWeight]);

  // Función para convertir kg a lb
  const kgToLb = (kg) => (kg ? (kg * 2.20462).toFixed(2) : "");

  // Función para convertir lb a kg
  const lbToKg = (lb) => (lb ? (lb / 2.20462).toFixed(2) : "");

  // Manejar el cambio de valor de peso
  const handleWeightChange = (e) => {
    if (valueForm.selected === "kg") {
      setValueForm({
        ...valueForm,
        kg: e.target.value,
        lb: kgToLb(e.target.value),
      });
    } else {
      setValueForm({
        ...valueForm,
        kg: lbToKg(e.target.value),
        lb: e.target.value,
      });
    }
    // Enviar los datos al componente padre
    onWeightChange({
      kg: valueForm.selected == "kg" ? e.target.value : lbToKg(e.target.value),
      lb: valueForm.selected == "lb" ? e.target.value : kgToLb(e.target.value),
      selected: valueForm.selected,
    });
  };

  const handleFormatSelection = (format) => {
    setValueForm({
      ...valueForm,
      selected: format,
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="comment" className="text-sm text-gray-400 font-sans">
        Weight
      </label>
      <div className="grid grid-cols-[150px,1fr] gap-0">
        <Button.Group className="h-12">
          <Button
            color={valueForm.selected === "kg" ? "blue" : "gray"} // Comparación estricta para kg
            onClick={() => handleFormatSelection("kg")}
            className={`px-2 md:px-2 ${
              valueForm.selected !== "" ? "" : "border-red-600"
            }`}
          >
            kg
          </Button>
          <Button
            color={valueForm.selected === "lb" ? "blue" : "gray"} // Comparación estricta para lb
            onClick={() => handleFormatSelection("lb")}
            className={`px-2 md:px-2 ${
              valueForm.selected !== "" ? "" : "border-red-600"
            }`}
          >
            lb
          </Button>
        </Button.Group>
        <InputText
          regexType="3"
          classname={valueForm.selected ? "" : "hidden"}
          label={`Weight ${
            valueForm.selected === "kg"
              ? "(kg)"
              : valueForm.selected === "lb"
              ? "(lb)"
              : ""
          }`}
          name="weight"
          disabled={valueForm.selected == null}
          type="text"
          value={valueForm.selected == "kg" ? valueForm.kg : valueForm.lb}
          onChange={handleWeightChange}
          isValid={valueForm.kg || valueForm.lb}
        />
      </div>
    </div>
  );
};
