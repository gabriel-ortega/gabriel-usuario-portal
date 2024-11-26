import { useState, useEffect } from "react";
import { Button } from "flowbite-react";

export function YesNoInput({
  text,
  defaultChecked,
  onChange,
  name = "",
  isValid = true,
  classname = "justify-center",
  disabled = false,
}) {
  const [colorbutton, setColorbutton] = useState();

  useEffect(() => {
    setColorbutton(defaultChecked);
  }, [defaultChecked]);
  const handleClick = (button) => {
    setColorbutton(button);
    const payload = { target: { name: name, value: button } };
    onChange(payload);
  };

  return (
    <div className="">
      <div className="">
        <a
          htmlFor=""
          className={`text-sm pb-1 ${
            isValid ? "text-gray-400" : "text-red-500"
          }  block`}
        >
          {text}
        </a>
        <Button.Group className={`flex ${classname} items-center `}>
          <Button
            color={colorbutton == true ? "blue" : "gray"} // Comparación estricta
            onClick={() => handleClick(true)}
            className={`w-1/2 px-10 md:px-12 ${
              isValid ? "" : "border-red-600"
            }`}
            disabled={disabled}
          >
            Yes
          </Button>
          <Button
            color={colorbutton == false ? "blue" : "gray"} // Comparación estricta
            onClick={() => handleClick(false)}
            className={`w-1/2 px-10 md:px-12 ${
              isValid ? "" : "border-red-600"
            }`}
            disabled={disabled}
          >
            No
          </Button>
        </Button.Group>
      </div>
    </div>
  );
}
