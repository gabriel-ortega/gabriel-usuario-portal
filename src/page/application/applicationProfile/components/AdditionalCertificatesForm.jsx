import React from "react";
import { useForm } from "../../../../hooks";
import { useEffect } from "react";
import {
  DatepickerComponent,
  InputText,
  SelectComponentCountry,
  Dropzone,
} from "../../../../components/layoutComponents";
import { Button } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  deleteApplicantFile,
  uploadApplicantFile,
} from "../../../../store/userData";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export const AdditionalCertificatesForm = ({
  editData,
  onDataChange,
  userData,
}) => {
  const dispatch = useDispatch();
  const [initialForm, setInitialForm] = useState({
    certificateName: "",
    certificateDate: "",
    certificateCountry: {},
    certificateExpiration: "",
  });

  useEffect(() => {
    if (editData) {
      setInitialForm(editData.data);
    }
  }, [editData]);

  const {
    educationInstitution,
    certificateName,
    startDate,
    certificateCountry,
    endDate,
    certificateAttach,
    formState,
    onInputChange,
    onSelectCountryChange,
  } = useForm(initialForm);

  const changeDocument = async (file) => {
    if (!certificateName) {
      toast.error(
        "Please set a valid Certificate Name before uploading an attachment."
      );
    } else if (!userData?.firstName || !userData?.lastName) {
      toast.error(
        "This seafarer's name is undefined. Make sure to set a first and last name before uploading a file."
      );
    } else {
      let tituloalt;
      tituloalt = certificateName.replace(/\//g, "");

      if (file) {
        if (!file.url) {
          try {
            // Mostrar el toast mientras se sube el archivo
            const uploadedFile = await toast.promise(
              dispatch(
                uploadApplicantFile(
                  userData,
                  file,
                  "additionalCertificates",
                  tituloalt
                )
              ),
              {
                loading: `Uploading ${certificateName}...`,
                success: <b>{certificateName} uploaded successfully!</b>,
                error: (
                  <b>Failed to upload {certificateName}. Please try again.</b>
                ),
              }
            );

            // Actualizar los datos con el archivo subido
            onInputChange({
              target: {
                name: "certificateAttach",
                value: uploadedFile,
              },
            });
          } catch (error) {
            console.error(`Error uploading ${certificateName}:`, error);
          }
        }
      } else {
        try {
          // Extraer el nombre del archivo a eliminar
          const fileExtension = certificateAttach.name
            .split(".")
            .pop()
            .toLowerCase();
          const { firstName, lastName } = userData;
          const displayName = `${firstName} ${lastName}`;
          const fileNameToDelete = `${displayName}-${tituloalt}.${fileExtension}`;

          // Mostrar el toast mientras se borra el archivo
          await toast.promise(
            dispatch(
              deleteApplicantFile(
                userData,
                fileNameToDelete,
                `${"additionalCertificates"}/`
              )
            ),
            {
              loading: `Deleting ${certificateName}...`,
              success: <b>{certificateName} deleted successfully!</b>,
              error: (
                <b>Failed to delete {certificateName}. Please try again.</b>
              ),
            }
          );

          // Limpiar los datos
          //   const updatedData = {
          //     ...data,
          //     DataDocument: null,
          //   };
          onInputChange({
            target: { name: "certificateAttach", value: null },
          });
          //   onDataChange(id, updatedData);
        } catch (error) {
          console.error(`Error deleting ${certificateName}:`, error);
        }
      }
    }
  };

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
          label="Name of Education Institution"
          name="educationInstitution"
          value={educationInstitution || ""}
          onChange={onInputChange}
        />
        <InputText
          label="Certificate Name"
          name="certificateName"
          value={certificateName || ""}
          onChange={onInputChange}
        />
        <SelectComponentCountry
          text={"Issue Country"}
          name={"certificateCountry"}
          classNameSelect="relative "
          initialValue={certificateCountry}
          onChange={onSelectCountryChange}
        />

        <DatepickerComponent
          label="Education Start Date"
          name="startDate"
          datevalue={startDate || ""}
          onChange={onInputChange}
        />

        <DatepickerComponent
          label="Education End Date"
          name="endDate"
          datevalue={endDate || ""}
          onChange={onInputChange}
        />
      </form>
      <Dropzone
        DataDocument={certificateAttach}
        name={"certificateAttach"}
        onFileChange={changeDocument}
      />
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
