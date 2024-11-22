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

export const AdditionalDocumentsForm = ({
  editData,
  onDataChange,
  userData,
}) => {
  const dispatch = useDispatch();
  // const { userData } = useSelector((state) => state.userData);
  const [initialForm, setInitialForm] = useState({
    documentName: "",
    documentDate: "",
    documentCountry: {},
    documentExpiration: "",
  });

  useEffect(() => {
    if (editData) {
      setInitialForm(editData.data);
    }
  }, [editData]);

  const {
    documentName,
    documentDate,
    documentCountry,
    documentExpiration,
    documentAttach,
    formState,
    onInputChange,
    onSelectCountryChange,
  } = useForm(initialForm);

  const changeDocument = async (file) => {
    if (!documentName) {
      toast.error(
        "Please set a valid Document Name before uploading an attachment."
      );
    } else if (!userData?.firstName || !userData?.lastName) {
      toast.error(
        "This seafarer's name is undefined. Make sure to set a first and last name before uploading a file."
      );
    } else {
      let tituloalt;
      tituloalt = documentName.replace(/\//g, "");

      if (file) {
        if (!file.url) {
          try {
            // Mostrar el toast mientras se sube el archivo
            const uploadedFile = await toast.promise(
              dispatch(
                uploadApplicantFile(
                  userData,
                  file,
                  "additionalDocuments",
                  tituloalt
                )
              ),
              {
                loading: `Uploading ${documentName}...`,
                success: <b>{documentName} uploaded successfully!</b>,
                error: (
                  <b>Failed to upload {documentName}. Please try again.</b>
                ),
              }
            );

            // Actualizar los datos con el archivo subido
            onInputChange({
              target: {
                name: "documentAttach",
                value: uploadedFile,
              },
            });
          } catch (error) {
            console.error(`Error uploading ${documentName}:`, error);
          }
        }
      } else {
        try {
          // Extraer el nombre del archivo a eliminar
          const fileExtension = documentAttach.name
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
                `${"additionalDocuments"}/`
              )
            ),
            {
              loading: `Deleting ${documentName}...`,
              success: <b>{documentName} deleted successfully!</b>,
              error: <b>Failed to delete {documentName}. Please try again.</b>,
            }
          );

          // Limpiar los datos
          //   const updatedData = {
          //     ...data,
          //     DataDocument: null,
          //   };
          onInputChange({
            target: { name: "documentAttach", value: null },
          });
          //   onDataChange(id, updatedData);
        } catch (error) {
          console.error(`Error deleting ${documentName}:`, error);
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
          label="Document Name"
          name="documentName"
          value={documentName || ""}
          onChange={onInputChange}
        />
        <SelectComponentCountry
          text={"Issue Country"}
          name={"documentCountry"}
          classNameSelect="relative "
          initialValue={documentCountry}
          onChange={onSelectCountryChange}
        />

        <DatepickerComponent
          label="Document Issue Date"
          name="documentDate"
          datevalue={documentDate || ""}
          onChange={onInputChange}
        />

        <DatepickerComponent
          label="Document Expiration Date"
          name="documentExpiration"
          datevalue={documentExpiration || ""}
          onChange={onInputChange}
        />
      </form>
      <Dropzone
        DataDocument={documentAttach}
        name={"documentAttach"}
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
