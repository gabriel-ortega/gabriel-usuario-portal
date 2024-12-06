import React, { useState, useEffect } from "react";
import {
  InputText,
  SelectComponenteCountryCode,
} from "../../../../components/layoutComponents";
import { Button } from "flowbite-react";
import { useForm } from "../../../../hooks";

export default function FormsContact({ onDataChange, editData, validate }) {
  const [data, setData] = useState({
    firstNames: "",
    lastNames: "",
    address: "",
    relationship: "",
    phone: { value: "" },
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const { phone, onSelectPhoneChange, formState } = useForm(data);

  useEffect(() => {
    if (
      data.firstNames &&
      data.lastNames &&
      data.address &&
      data.relationship &&
      phone.value
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [data, formState]);

  useEffect(() => {
    if (editData && editData.data) {
      setData(editData.data);
    }
  }, [editData]);

  const submitData = (e) => {
    e.preventDefault();
    let accion = "";
    editData != null ? (accion = 1) : (accion = 0);
    onDataChange(accion, formState);
  };

  const changeData = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-9"
      onSubmit={submitData}
    >
      <InputText
        label="First Names*"
        name="firstNames"
        isValid={validate && data.firstNames}
        value={data.firstNames || ""}
        onChange={changeData}
      />
      <InputText
        label="Last Names*"
        name="lastNames"
        isValid={validate && data.lastNames}
        value={data.lastNames || ""}
        onChange={changeData}
      />
      <InputText
        label="Address*"
        name="address"
        isValid={validate && data.address}
        value={data.address || ""}
        onChange={changeData}
      />
      <InputText
        label="Relationship*"
        name="relationship"
        isValid={validate && data.relationship}
        value={data.relationship || ""}
        onChange={changeData}
      />
      <SelectComponenteCountryCode
        classNamePhone="mb-2 w-full block inset-0 z-40"
        name="phone"
        isValid={validate && phone.value ? true : false}
        value={data.phone.value}
        data={data.phone.value}
        onChange={onSelectPhoneChange}
      />
      <Button
        className="bg-[#1976d2] m-auto w-[50%] md:w-[20%] mt-5"
        type="submit"
        onClick={submitData}
        disabled={validate && !isFormValid}
      >
        {editData != null ? "Update" : "Add"}
      </Button>
    </form>
  );
}
