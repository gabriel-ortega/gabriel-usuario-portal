import { FloatingLabel } from "flowbite-react";
import { useState, useEffect } from "react";
import { validaciones } from "../../util/regex";

export function InputText({
  disabled = false,
  labelinput = "",
  label,
  value,
  name,
  onChange,
  read = false,
  classname,
  helpertext = "",
  type = "text",
  regexType = "",
  isValid = true,
}) {
  const [error, setError] = useState({ valid: true, message: "" });
  const [valueInput, setValueInput] = useState(value);

  const handleChange = (e) => {
    let value = e.target.value;
    const { isValid, message } = validaciones({ regexType, value });
    setError({
      valid: isValid,
      message: value === "" ? "" : message,
    });

    if (isValid || value === "") {
      setValueInput(value);
      onChange(e);
    }
  };

  // Sincroniza el valor interno con el valor recibido desde el componente padre
  useEffect(() => {
    setValueInput(value);
  }, [value]);

  return (
    <div className={`w-full bottom-0 ${classname}`}>
      <div className={`${labelinput === "" ? "hidden" : "block"} `}>
        <span htmlFor={name} className={`text-sm  block`}>
          {labelinput}
        </span>
      </div>

      <FloatingLabel
        disabled={disabled}
        readOnly={read}
        value={valueInput}
        name={name}
        variant="outlined"
        onChange={handleChange}
        label={label}
        helperText={!isValid ? helpertext : ""}
        className="bg-white m-0 disabled:opacity-30 disabled:cursor-not-allowed"
        type={type}
        color={isValid ? "default" : "error"}
        autoComplete="on"
      />
      <p className={`${!error.valid ? "block" : "hidden"} text-xs text-red-600`}>
        {error.message}
      </p>
    </div>
  );
}
