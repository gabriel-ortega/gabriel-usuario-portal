import { useState, useEffect } from "react";
import {
  DatepickerComponent,
  InputText,
  Dropzone,
  SelectComponentCountry,
} from "./";
import { HiOutlineDocumentText } from "react-icons/hi";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import toast from "react-hot-toast";
import { deleteApplicantFile, uploadApplicantFile } from "../../store/userData";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export function CardDocument({
  id,
  name,
  titulo,
  handleRemoveDocument,
  onDataChange,
  Datacard,
  buttonDelete = false,
  fieldConfig,
  type,
  mandatory = false,
}) {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userData);
  const [data, setData] = useState({});

  // const changeDocument = (file) => {
  //   const updatedData = {
  //     ...data,
  //     DataDocument: file
  //   };
  //   setData(updatedData);
  //   onDataChange(id, updatedData);
  // }

  const changeDocument = async (file) => {
    let tituloalt;
    tituloalt = titulo.replace(/\//g, "");
    if (file) {
      if (!file.url) {
        try {
          // Mostrar el toast mientras se sube el archivo
          const uploadedFile = await toast.promise(
            dispatch(uploadApplicantFile(userData, file, type, tituloalt)),
            {
              loading: `Uploading ${titulo}...`,
              success: <b>{titulo} uploaded successfully!</b>,
              error: <b>Failed to upload {titulo}. Please try again.</b>,
            }
          );

          // Actualizar los datos con el archivo subido
          const updatedData = {
            ...data,
            documentAttach: uploadedFile,
          };
          setData(updatedData);
          onDataChange(id, updatedData);
        } catch (error) {
          console.error(`Error uploading ${titulo}:`, error);
        }
      }
    } else {
      try {
        // Extraer el nombre del archivo a eliminar
        const fileExtension = data.documentAttach.name
          .split(".")
          .pop()
          .toLowerCase();
        const { firstName, lastName } = userData;
        const displayName =
          !firstName || !lastName
            ? `${userData.applicationData?.applicationProfile?.profile.firstName} ${userData.applicationData?.applicationProfile?.profile.lastName}`
            : `${firstName} ${lastName}`;
        const fileNameToDelete = `${displayName}-${tituloalt}.${fileExtension}`;

        // Mostrar el toast mientras se borra el archivo
        await toast.promise(
          dispatch(deleteApplicantFile(userData, fileNameToDelete, `${type}/`)),
          {
            loading: `Deleting ${titulo}...`,
            success: <b>{titulo} deleted successfully!</b>,
            error: <b>Failed to delete {titulo}. Please try again.</b>,
          }
        );

        // Limpiar los datos
        const updatedData = {
          ...data,
          documentAttach: null,
        };
        setData(updatedData);
        onDataChange(id, updatedData);
      } catch (error) {
        console.error(`Error deleting ${titulo}:`, error);
      }
    }
  };

  useEffect(() => {
    if (Datacard) {
      setData(Datacard.data);
    }
  }, [Datacard]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const changeData = (e, name) => {
    const updatedData = {
      ...data,
      [name == "country" ? "country" : e.target.name]:
        name == "country" ? e : e.target.value,
    };
    setData(updatedData);
    onDataChange(id, updatedData);
  };

  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  };

  const renderField = (field) => {
    switch (field.type) {
      case "inputText":
        return (
          <section className="pt-5" key={field.name}>
            <InputText
              label={field.label}
              key={field.name}
              value={data[field.name] || ""}
              name={field.name}
              onChange={changeData}
              className="pt-3"
              // isValid={Object.entries(data).every(([key, value]) => {
              //   console.log(key);
              //   if (key == field.name) return true; // Ignora el campo actual

              //   if (value && typeof value === "object") {
              //     return value.Id != null; // Valida que `Id` exista si es un objeto
              //   }

              //   // return value?.toString().trim() !== ""; // Valida que no sea vacío si es un string o número
              //   return value !== ""; // Valida que no sea vacío si es un string o número
              // })}
            />
          </section>
        );
      case "select":
        return !data[field.name] ? (
          // <section key={field.name}>
          <SelectComponentCountry
            classNameSelect="relative mt-1 h-full inset-0 z-20 w-full"
            key={field.name}
            text={field.label}
            name={field.name}
            initialValue={{}}
            onChange={(e, name) => changeData(e, name)}
          />
        ) : (
          // </section>
          <section key={field.name}>
            <SelectComponentCountry
              classNameSelect="relative mt-1 h-full inset-0 z-20 w-full"
              key={field.name}
              text={field.label}
              name={field.name}
              initialValue={data[field.name]}
              onChange={changeData}
            />
          </section>
        );
      case "datePicker":
        return (
          <DatepickerComponent
            key={field.name}
            classnamedate="pt-1"
            label={field.label}
            classnamelabel="-translate-y-5"
            datevalue={data[field.name] || ""}
            name={field.name}
            onChange={changeData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <section
        className={`${
          mandatory ? "border border-red-500" : "border border-gray-200"
        }  bg-gray-50 dark:border-gray-600 dark:bg-gray-700 mt-auto p-4 rounded-lg divide-y divide-[#A9ADB3]`}
      >
        <div className="grid grid-cols-2 items-center pl-2 ">
          <div className="flex w-60 gap-2">
            <HiOutlineDocumentText className="w-6 h-6 " />
            <div className="flex flex-col gap-1">
              <h4 className="text-base pb-1 border-black border-b-3">
                {truncateTitle(titulo, 28)}
              </h4>
              {mandatory && <p className="text-red-500">Mandatory*</p>}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleRemoveDocument(id);
            }}
            className={` ${
              buttonDelete ? "hidden" : ""
            } justify-self-end bg-red-500 text-white text-sm rounded h-9 w-16 mb-1`}
          >
            Delete
          </button>
        </div>
        <div className="md:pl-3 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <section className="">
            <p className="text-base pb-2 pt-2 ">Details</p>
            {fieldConfig && fieldConfig.map((field) => renderField(field))}
          </section>
          <Dropzone
            DataDocument={data.documentAttach}
            name={name}
            onFileChange={changeDocument}
          />
        </div>
      </section>
    </>
  );
}
