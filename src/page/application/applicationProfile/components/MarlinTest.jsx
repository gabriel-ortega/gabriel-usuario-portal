import React, { useState, useEffect } from "react";
import {
  InputText,
  DatepickerComponent,
  ButtonIcon,
  Dropzone,
} from "../../../../components/layoutComponents";
import { FileInput, Label, FloatingLabel, Select } from "flowbite-react";
import { LiaPercentSolid } from "react-icons/lia";
import { MdOutlineCancel } from "react-icons/md";

import { HiOutlineDocumentText, HiOutlineFolder } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  deleteApplicantFile,
  uploadApplicantFile,
} from "../../../../store/userData";
import toast from "react-hot-toast";

export default function MarlinTest({
  form,
  onDelete,
  onDataChange,
  Editdata,
  title,
}) {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userData);
  // Estado local para manejar el archivo adjunto
  const [attachedFile, setAttachedFile] = useState(
    Editdata?.attachedFile || null
  );

  /* DEFINIMOS LA CONSTANTE CON LOS DATOS A UTILIZAR */
  const [test, setTest] = useState(
    Editdata || {
      PercentageTotal: "",
      PercentageGrammar: "",
      IssueDate: "",
      PercentageReading: "",
      PercentageListening: "",
      PercentageVocabulary: "",
      PercentageNumbers: "",
      PlaceIssue: "",
    }
  );

  /* Validar si el valor ingresado en los input de porcentaje es numérico */
  const handlePercentageChange = (name, value) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      // Convertir el valor a un número si no está vacío
      const numericValue = value === "" ? null : parseFloat(value);

      // Verificar si el valor está dentro del rango de 0 a 100
      if (numericValue === null || (numericValue >= 0 && numericValue <= 100)) {
        // Actualizar test solo si pasa las validaciones
        const updatedTest = {
          ...test,
          [name]: value,
        };
        setTest(updatedTest);
        onDataChange(updatedTest); // Disparar onDataChange después de actualizar
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedTest;

    switch (name) {
      case "PercentageTotal":
      case "PercentageGrammar":
      case "PercentageReading":
      case "PercentageListening":
      case "PercentageVocabulary":
      case "PercentageNumbers":
        handlePercentageChange(name, value);
        break;
      default:
        updatedTest = {
          ...test,
          [name]: value,
        };
        setTest(updatedTest);
        onDataChange(updatedTest); // Disparar onDataChange después de actualizar
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    // console.log(Editdata);
    onDelete(e);
  };

  // Cambia el documento adjunto
  // const changeDocument = (file) => {
  //   if (file) {
  //     setAttachedFile(file);
  //     if (onDataChange && typeof onDataChange === "function") {
  //       onDataChange({
  //         ...test,
  //         attachedFile: { url: "url", name: "archivo" },
  //       });
  //     }
  //   } else {
  //     setAttachedFile(null);
  //     onDataChange({
  //       ...test,
  //       attachedFile: {},
  //     });
  //   }
  // };

  // const changeDocument = async (file) => {
  //   if (file) {
  //     if (!file.url) {
  //       try {
  //         // Mostrar el toast mientras se sube el archivo
  //         const uploadedFile = await toast.promise(
  //           dispatch(
  //             uploadApplicantFile(
  //               userData,
  //               file,
  //               "",
  //               "Marlins Test Certificate"
  //             )
  //           ),
  //           {
  //             loading: "Uploading Marlins Test Certificate...",
  //             success: <b>Certificate uploaded successfully!</b>,
  //             error: <b>Failed to upload the certificate. Please try again.</b>,
  //           }
  //         );

  //         // Actualizar el estado con el archivo subido
  //         setAttachedFile(uploadedFile);

  //         // Actualizar los datos si onDataChange es una función válida
  //         if (onDataChange && typeof onDataChange === "function") {
  //           onDataChange({
  //             ...test,
  //             attachedFile: uploadedFile,
  //           });
  //         }
  //       } catch (error) {
  //         console.error("Error uploading the certificate:", error);
  //       }
  //     }
  //   } else {
  //     setAttachedFile(file);
  //     onDataChange({
  //       ...test,
  //       attachedFile: {},
  //     });
  //   }
  // };
  const changeDocument = async (file) => {
    if (file) {
      if (!file.url) {
        try {
          // Mostrar el toast mientras se sube el archivo
          const uploadedFile = await toast.promise(
            dispatch(
              uploadApplicantFile(
                userData,
                file,
                "",
                "Marlins Test Certificate"
              )
            ),
            {
              loading: "Uploading Marlins Test Certificate...",
              success: <b>Certificate uploaded successfully!</b>,
              error: <b>Failed to upload the certificate. Please try again.</b>,
            }
          );

          // Actualizar el estado con el archivo subido
          setAttachedFile(uploadedFile);

          // Actualizar los datos si onDataChange es una función válida
          if (onDataChange && typeof onDataChange === "function") {
            onDataChange({
              ...test,
              attachedFile: uploadedFile,
            });
          }
        } catch (error) {
          console.error("Error uploading the certificate:", error);
        }
      }
    } else {
      try {
        // Extraer el nombre del archivo a eliminar desde el estado actual
        const { firstName, lastName } = userData;
        const displayName = `${firstName} ${lastName}`;
        const fileExtension = attachedFile.name.split(".").pop().toLowerCase();
        const fileNameToDelete = `${displayName}-Marlins Test Certificate.${fileExtension}`;

        // Mostrar el toast mientras se borra el archivo
        await toast.promise(
          dispatch(deleteApplicantFile(userData, fileNameToDelete)),
          {
            loading: "Deleting Marlins Test Certificate...",
            success: <b>Certificate deleted successfully!</b>,
            error: <b>Failed to delete the certificate. Please try again.</b>,
          }
        );

        // Limpiar el estado
        setAttachedFile(null);
        onDataChange({
          ...test,
          // attachedFile: {},
        });
      } catch (error) {
        console.error("Error deleting the certificate:", error);
      }
    }
  };

  // useEffect(() => {
  //   onDataChange(test);
  // }, [test]);

  return (
    <>
      <section className="flex items-center justify-between mb-5">
        <Label className="pt-2 m-0 mr-5 mb-0 text-xl border-transparent bg-transparent">
          Marlins / Language - Test
        </Label>

        <div>
          {/* BOTON DE ELIMINAR */}
          <ButtonIcon
            onClick={(e) => handleCancel(e)}
            classnamebtn="bg-red-600 hover:bg-red-700 "
            classname="items-end w-20 h-10 mr-5"
            label="Cancel "
            icon={
              <MdOutlineCancel className="h-5  w-5 justify-center items-center" />
            }
          />
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full md:gap-1 mb-5 mt-0 w-full p-3">
        <section className="flex flex-wrap">
          <FloatingLabel
            className="border-transparent bg-transparent"
            variant="outlined"
            label="TOTAL (Percentage IN NUMBER)"
            disabled={true}
          />
          <div className="flex ">
            <InputText
              label=""
              name="PercentageTotal"
              value={Editdata.PercentageTotal || ""}
              onChange={handleChange}
            />
            <LiaPercentSolid className="-translate-x-10 translate-y-4" />
          </div>
        </section>

        <section className="flex flex-wrap">
          <FloatingLabel
            className="border-transparent bg-transparent"
            variant="outlined"
            label="GRAMMAR (Percentage IN NUMBER)"
            disabled={true}
          />
          <div className="flex ">
            <InputText
              label=""
              name="PercentageGrammar"
              value={Editdata.PercentageGrammar || ""}
              onChange={handleChange}
            />
            <LiaPercentSolid className="-translate-x-10 translate-y-4" />
          </div>
        </section>

        <section className="flex flex-wrap">
          <FloatingLabel
            className="border-transparent bg-transparent w-full "
            variant="outlined"
            label="ISSUE DATE"
            disabled={true}
          />
          <div className="flex ">
            <DatepickerComponent
              name="IssueDate"
              currentDate={true}
              datevalue={Editdata.IssueDate ? Editdata.IssueDate : ""}
              onChange={(e) =>
                handleChange({
                  target: { name: "IssueDate", value: e.target.value },
                })
              }
              classnamedate="mr-4   md:mr-4 md:ps-1  w-25 md:w-full"
            />
          </div>
        </section>

        <section className="flex flex-wrap">
          <FloatingLabel
            className="border-transparent bg-transparent"
            variant="outlined"
            label="READING (Percentage IN NUMBER)"
            disabled={true}
          />
          <div className="flex ">
            <InputText
              label=""
              name="PercentageReading"
              value={Editdata.PercentageReading || ""}
              onChange={handleChange}
            />
            <LiaPercentSolid className="-translate-x-10 translate-y-4" />
          </div>
        </section>

        <section className="flex flex-wrap">
          <FloatingLabel
            className="border-transparent bg-transparent"
            variant="outlined"
            label="LISTENING (Percentage IN NUMBER)"
            disabled={true}
          />
          <div className="flex ">
            <InputText
              label=""
              name="PercentageListening"
              value={Editdata.PercentageListening || ""}
              onChange={handleChange}
            />
            <LiaPercentSolid className="-translate-x-10 translate-y-4" />
          </div>
        </section>

        <section className="flex flex-wrap">
          <FloatingLabel
            className="border-transparent bg-transparent"
            variant="outlined"
            label="VOCABULARY (Percentage IN NUMBER)"
            disabled={true}
          />
          <div className="flex ">
            <InputText
              label=""
              name="PercentageVocabulary"
              value={Editdata.PercentageVocabulary || ""}
              onChange={handleChange}
            />
            <LiaPercentSolid className="-translate-x-10 translate-y-4" />
          </div>
        </section>

        <section className="flex flex-wrap">
          <FloatingLabel
            className="border-transparent bg-transparent"
            variant="outlined"
            label="TIMES AND NUMBERS (Percentage IN NUMBER)"
            disabled={true}
          />
          <div className="flex ">
            <InputText
              label=""
              name="PercentageNumbers"
              value={Editdata.PercentageNumbers || ""}
              onChange={handleChange}
            />
            <LiaPercentSolid className="-translate-x-10 translate-y-4" />
          </div>
        </section>

        <section className="flex flex-wrap">
          <FloatingLabel
            className="border-transparent bg-transparent"
            variant="outlined"
            label="PLACE OF ISSUE"
            disabled={true}
          />
          <div className="flex ">
            <InputText
              label=""
              name="PlaceIssue"
              value={Editdata.PlaceIssue || ""}
              onChange={handleChange}
            />
          </div>
        </section>
      </section>
      {/* Área para adjuntar archivo */}
      <p className="text-base md:pb-5 pt-2">Attach Marlin's Test Certificate</p>
      <Dropzone
        DataDocument={attachedFile}
        name="marlinTestAttach"
        label={false}
        onFileChange={changeDocument}
      />
    </>
  );
}
