import React from "react";
import {
  DatepickerComponent,
  InputText,
  SelectComponentCountry,
  Dropzone,
  SelectComponents,
} from "../../../../components/layoutComponents";
import { Button } from "flowbite-react";
import { useState } from "react";
import { useForm } from "../../../../hooks";
import toast from "react-hot-toast";
import {
  deleteApplicantFile,
  uploadApplicantFile,
} from "../../../../store/userData";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const DocumentsForm = ({
  editData,
  onDataChange,
  userData,
  documentNames = [],
}) => {
  const dispatch = useDispatch();

  const [initialForm, setInitialForm] = useState(
    editData?.data.data || {
      documentName: { id: "", name: "" },
      documentNumber: "",
      placeIssue: "",
      country: {},
      issueDate: "",
      expirationDate: "",
      documentAttach: null,
    }
  );

  const {
    documentName,
    documentNumber,
    placeIssue,
    country,
    issueDate,
    expirationDate,
    documentAttach,
    formState,
    onInputChange,
    onSelectCountryChange,
    onSelectChange,
  } = useForm(initialForm);

  const [objeto, setObjeto] = useState({
    data: {},
    documentName: "",
  });

  useEffect(() => {
    // Actualizar el objeto cada vez que formState o documentName cambien
    setObjeto({
      data: formState,
      documentName: documentName,
    });
  }, [formState, documentName]);

  const changeDocument = async (file) => {
    if (!documentName?.name) {
      toast.error(
        "Please set a valid Document Name before uploading an attachment."
      );
    } else if (!userData?.firstName || !userData?.lastName) {
      toast.error(
        "This seafarer's name is undefined. Make sure to set a first and last name before uploading a file."
      );
    } else {
      let tituloalt;
      tituloalt = documentName?.name.replace(/\//g, "");
      if (file) {
        if (!file.url) {
          try {
            // Mostrar el toast mientras se sube el archivo
            const uploadedFile = await toast.promise(
              dispatch(
                uploadApplicantFile(userData, file, "documents", tituloalt)
              ),
              {
                loading: `Uploading ${documentName?.name}...`,
                success: <b>{documentName?.name} uploaded successfully!</b>,
                error: (
                  <b>
                    Failed to upload {documentName?.name}. Please try again.
                  </b>
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
            console.error(`Error uploading ${documentName?.name}:`, error);
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
              loading: `Deleting ${documentName?.name}...`,
              success: <b>{documentName?.name} deleted successfully!</b>,
              error: (
                <b>Failed to delete {documentName?.name}. Please try again.</b>
              ),
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
          console.error(`Error deleting ${documentName?.name}:`, error);
        }
      }
    }
  };

  const submitData = (e) => {
    e.preventDefault();
    let accion = "";
    editData != null ? (accion = 1) : (accion = 0);
    onDataChange(accion, objeto);
  };

  return (
    <>
      <form className="m-auto grid grid-cols-1 gap-4 items-end sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
        <SelectComponents
          valueDefault="Document Name"
          Text=""
          name_valor={true}
          data={documentNames}
          valueKey="DocumentName"
          idKey="Id"
          name="documentName"
          initialValue={documentName?.id}
          onChange={onSelectChange}
          isValid={documentName?.id ? true : false}
        />
        <InputText
          label="Document Number"
          name="documentNumber"
          value={documentNumber}
          onChange={onInputChange}
        />
        <InputText
          label="Document Place of Issue"
          name="placeIssue"
          value={placeIssue}
          onChange={onInputChange}
        />
        <SelectComponentCountry
          text={"Issue Country"}
          name={"country"}
          initialValue={country}
          onChange={onSelectCountryChange}
        />

        <DatepickerComponent
          label="Document Issue Date"
          name="issueDate"
          datevalue={issueDate || ""}
          onChange={onInputChange}
        />

        <DatepickerComponent
          label="Document Expiration Date"
          name="expirationDate"
          datevalue={expirationDate || ""}
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
        disabled={!documentName?.id ? true : false}
      >
        {editData != null ? "Update" : "Add"}
      </Button>
    </>
  );
};
