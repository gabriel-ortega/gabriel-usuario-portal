import React from "react";
import { useForm } from "../../../../hooks";
import {
  DatepickerComponent,
  InputText,
} from "../../../../components/layoutComponents";
import { Button } from "flowbite-react";
import { useState, useEffect } from "react";

export const AdditionalVaccineForm = ({ editData, onDataChange }) => {
  const [initialForm, setInitialForm] = useState({
    vaccineName: "",
    vaccineDate: "",
  });

  useEffect(() => {
    if (editData) {
      setInitialForm(editData.data);
    }
  }, [editData]);

  const { vaccineName, vaccineDate, formState, onInputChange } =
    useForm(initialForm);

  const submitData = (e) => {
    e.preventDefault();
    let accion = "";
    editData != null ? (accion = 1) : (accion = 0);
    onDataChange(accion, formState);
  };

  return (
    <>
      <form className="m-auto grid grid-cols-1 gap-4 items-end sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
        <InputText
          label="Vaccine Name"
          name="vaccineName"
          value={vaccineName || ""}
          onChange={onInputChange}
        />
        <DatepickerComponent
          label="Vaccine Date"
          name="vaccineDate"
          datevalue={vaccineDate || ""}
          onChange={onInputChange}
        />
      </form>
      <Button
        className="bg-[#1976d2] w-full sm:w-full md:w-full xl:w-full mt-5 mx-auto col-span-1 md:col-span-2 xl:col-span-1"
        type="submit"
        onClick={submitData}
      >
        {editData != null ? "Update" : "Add"}
      </Button>
    </>
  );
};
