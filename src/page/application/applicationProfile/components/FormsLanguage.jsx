import React, { useState, useEffect } from "react";
import {
  InputText,
  ButtonIcon,
  SelectComponents,
} from "../../../../components/layoutComponents";
import { Label, Select, TextInput } from "flowbite-react";
import { LiaPercentSolid } from "react-icons/lia";
import { FloatingLabel } from "flowbite-react";
import { HiOutlineTrash } from "react-icons/hi";
import { useDeferredValue } from "react";
import languagesData from "../../../../assets/tables/json/Languages-static.json";

export default function FormsLanguage({
  form,
  onDelete,
  onDataChange,
  Editdata,
  title,
  PercentageWrite,
  PercentageSpeak,
}) {
  /* DEFINIMOS LA CONSTANTE CON LOS DATOS A UTILIZAR */
  // const [languageData, setLanguageData] = useState(Editdata||{
  //   Language: title,
  //   PercentageWrite: "",
  //   PercentageSpeak: "",
  // });

  // // useEffect(() => {
  // //   if (Editdata) {
  // //     const initialData = Editdata;
  // //     setLanguageData(initialData);
  // //   }
  // // }, []);

  // /*  Función para validar y actualizar el estado de porcentaje*/
  // const handlePercentageChange = (name, value) => {
  //   // Verificar si el valor ingresado es numérico o está vacío
  //   if (value === "" || /^\d*\.?\d*$/.test(value)) {
  //     // Convertir el valor a un número si no está vacío
  //     const numericValue = value === "" ? "" : parseFloat(value);

  //     // Verificar si el valor está dentro del rango de 0 a 100
  //     if (numericValue === null || (numericValue >= 0 && numericValue <= 100)) {
  //       // Actualizar languageData solo si pasa las validaciones
  //       setLanguageData({
  //         ...languageData,
  //         [name]: numericValue,
  //       });
  //     }
  //   }
  // };

  // /* FUNCION PARA MANEJAR LOS DATOS DEL FORMULARIO */
  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   switch (name) {
  //     case "PercentageWrite":
  //     case "PercentageSpeak":
  //       handlePercentageChange(name, value);
  //       break;
  //     default:
  //       setLanguageData({
  //         ...languageData,
  //         [name]: value,
  //       });
  //   }
  // };

  // useEffect(() => {
  //   onDataChange(languageData);
  // }, [languageData]);

  // /* FUNCION PARA ELIMINAR EL FORMULARIO AGREGADO */
  // const handleDelete = (e) => {
  //   e.preventDefault();
  //   onDelete(form.id);
  // };

  const [languageData, setLanguageData] = useState(
    Editdata || {
      Language: title,
      PercentageWrite: "",
      PercentageSpeak: "",
    }
  );

  /* Función para validar y actualizar el estado de porcentaje */
  const handlePercentageChange = (name, value) => {
    // Verificar si el valor ingresado es numérico o está vacío
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      // Convertir el valor a un número si no está vacío
      const numericValue = value === "" ? "" : parseFloat(value);

      // Verificar si el valor está dentro del rango de 0 a 100
      if (numericValue === null || (numericValue >= 0 && numericValue <= 100)) {
        // Actualizar languageData solo si pasa las validaciones
        const updatedData = {
          ...languageData,
          [name]: numericValue,
        };
        console.log(name, numericValue);
        setLanguageData(updatedData);
        onDataChange(updatedData); // Llamar a onDataChange aquí
      }
    }
  };

  /* Función para manejar los datos del formulario */
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedData;

    switch (name) {
      case "PercentageWrite":
      case "PercentageSpeak":
        handlePercentageChange(name, value);
        break;
      default:
        updatedData = {
          ...languageData,
          [name]: value,
        };
        setLanguageData(updatedData);
        onDataChange(updatedData); // Llamar a onDataChange aquí
    }
  };

  /* FUNCION PARA ELIMINAR EL FORMULARIO AGREGADO */
  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(form.id);
  };

  return (
    <>
      <section className="flex flex-col border-2 rounded-xl mb-2">
        {/* ESTE LABEL SE DEFINE EN LA PRINCIPAL COMO SPANISH O ENGLISH */}
        <Label className="pt-2 m-5 mr-5 mb-0 text-base">{title}</Label>
        {/* CONDICION PARA QUE SI EL LABEL TIENE UN VALOR (SPANISH O ENGLISH) NO SE MUESTRE EL SELECT Y
        SI ES CASO CONTRARIO SE MUESTRE ESTO EN CASO QUE LA PERSONA HABLE O ESCRIBA OTROS IDIOMAS */}
        {title === "" && (
          /* SECCION DEL SELECT Y QUE MUESTRE EL BASURERO PARA ELIMINAR */
          <section className="p-2 md:p-4 rounded-lg">
            <section className="flex items-center justify-between mb-5">
              {/* TITULO DEL FORMULARIO AL AGREGAR IDIOMAS */}
              <h1 className="text-base mb-2">Language</h1>
              <div>
                {/* BOTON DE ELIMINAR */}
                <ButtonIcon
                  onClick={handleDelete}
                  classnamebtn="bg-red-600 hover:bg-red-700"
                  classname="items-end w-20 h-10 mr-5"
                  label="Delete"
                  icon={
                    <HiOutlineTrash className="h-5 w-5 justify-center items-center" />
                  }
                />
              </div>
            </section>
            <section className="pr-4 md:pr-3">
              {/* SELECT DE LOS IDIOMAS(ACTUAL SOLO SE TIENEN ESTAS OPCIONES) */}
              <Select
                label="Language"
                value={languageData.Language}
                onChange={handleChange}
                name="Language"
              >
                <option value="">Select the Language</option>
                {languagesData.map((language, index) => (
                  <option key={index} value={language.Id}>
                    {language["Language-En"]}
                  </option>
                ))}
              </Select>
            </section>
          </section>
        )}
        {/* FORMULARIO DE LENGUAJES */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-1 mb-5 mt-0 w-full p-3">
          <section className="flex flex-wrap h-5">
            {/* LABEL DEL TITULO WRITE PARA IDENTIFICAR EL PORCENTAJE DE WWRITE */}
            <FloatingLabel
              variant="outlined"
              className="border-transparent bg-transparent"
              label="WRITE"
              disabled={true}
            />
          </section>
          <section className="flex ">
            {/* INPUT DEL PORCENTAJE DE WRITE */}
            <InputText
              label="Percentage Write (IN NUMBER)"
              name="PercentageWrite"
              value={languageData.PercentageWrite || ""}
              isValid={languageData.PercentageWrite ? true : false}
              onChange={handleChange}
              // onChange={handlePercentageChange}
            />
            {/* ICONO DE PORCENTAJE */}
            <LiaPercentSolid className="-translate-x-10 translate-y-4" />
          </section>

          <section className="h-5 flex flex-wrap">
            {/* LABEL DEL TITULO DE SPEAK PARA IDENTIFICAR EL PORCENTAJE DEL SPEAK */}
            <FloatingLabel
              className="border-transparent bg-transparent"
              variant="outlined"
              label="SPEAK"
              disabled={true}
            />
          </section>
          <section className="flex">
            {/* INPUT DEL PORCENTAJE DE SPEAK */}
            <InputText
              label="Percentage Speak  (IN NUMBER)"
              name="PercentageSpeak"
              value={languageData.PercentageSpeak || ""}
              isValid={languageData.PercentageSpeak ? true : false}
              onChange={handleChange}
              // onChange={handlePercentageChange}
            />
            {/* ICONO DEL PORCENTAJE */}
            <LiaPercentSolid className="-translate-x-10 translate-y-4" />
          </section>
        </section>
      </section>
    </>
  );
}
