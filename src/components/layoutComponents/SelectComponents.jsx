import { Select } from "flowbite-react";
import { useState, useEffect } from "react";
import { truncateText } from "../../util/helperFunctions";

export function SelectComponents({
  Text = "Select an option",
  name,
  data,
  idKey,
  valueKey,
  className,
  valueDefault,
  id,
  classnamediv,
  onChange,
  disabled,
  classelect,
  name_valor = false,
  initialValue,
  isValid = true,
  isRequire=true
}) {
  const [selectedValue, setSelectedValue] = useState(initialValue || "");

  useEffect(() => {
    setSelectedValue(initialValue || "");
  }, [initialValue]);

  const handleChange = (e, name) => {
    const selectedOption = e.target.value;
    setSelectedValue(selectedOption);
    if (name_valor === false) {
      onChange(e);
    } else {
      onChange(
        [
          {
            id: selectedOption,
            name: e.target.options[e.target.selectedIndex].text,
          },
        ],
        name
      );
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`block ${classnamediv}`}>
        <label
          htmlFor={id}
          className={`text-sm ${classnamediv} block text-gray-400`}
        >
          {valueDefault}
        </label>
      </div>
      <Select
        id={id}
        required={isRequire}
        className={`${classelect}`}
        // className="border-gray-300 bg-gray-50 text-gray-900  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 "
        color={isValid ? "gray" : "failure"}
        value={selectedValue}
        onChange={(e) => handleChange(e, name)}
        name={name}
        disabled={disabled}
      >
        <option id="" value="">
          {Text}
        </option>
        {Array.isArray(data) &&
          data.map((item) => (
            <option
              key={item[idKey]}
              id={item[idKey]}
              className="w-52"
              value={item[idKey]}
              name={name}
            >
              {item[valueKey]}
            </option>
          ))}
      </Select>
    </div>
  );
}
