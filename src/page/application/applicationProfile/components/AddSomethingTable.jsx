import React, { useState } from "react";
import {
  ButtonIcon,
  ModalYesNo,
  TableComponent,
} from "../../../../components/layoutComponents";
import { GoPlusCircle } from "react-icons/go";
import { useEffect } from "react";
import { MdFilterAltOff } from "react-icons/md";

export const AddSomethingTable = ({
  title,
  formTitle,
  childrenForm = <></>,
  newFormData,
  headers,
  itemName = "",
  onDataChange,
  bgClassName = "border border-gray-200 bg-gray-50",
  profileComponent,
  disabled = false,
  sorting = false,
  enumaration = true,
}) => {
  /* VARIABLE PARA LA FUNCION DEL MODAL*/
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [editData, setEditData] = useState(null);

  const [formData, setFormData] = useState(newFormData);

  /* FUNCION PARA ABRIR EL MODAL */
  const openModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };
  /* FUNCION PARA CERRAR EL, MODAL */
  const closeModal = () => {
    setIsOpen(false);
    setEditData(null);
  };

  const handleTableChange = (actionType, data) => {
    const updateDataArray = (prevDataArray) => {
      if (actionType === 0) {
        // Add new data
        return [...prevDataArray, data];
      } else if (actionType === 1) {
        // Update existing data
        return prevDataArray.map((item, index) => {
          if (index === editData.id) {
            return { ...data };
          }
          return item;
        });
      }
      return prevDataArray; // If no actionType matches, return the previous data
    };

    // Update the formData state
    setFormData((prevDataArray) => updateDataArray(prevDataArray));

    // Clear the edit state and close the modal
    setEditData(null);
    closeModal();
  };

  /*  Función para manejar la edición de elementos DE LA TABLA DE CONTACT*/
  const handleEdit = (id) => {
    const item = formData[id];
    setEditData({ id, data: item });
    setIsOpen(true);
  };

  /*  Función para manejar la eliminación de elementos de la tablA DE CONTACTO*/
  const handleDelete = (indexToDelete) => {
    if (formData && formData[indexToDelete]) {
      setFormData((prevFormData) => {
        // Crea una copia del array
        const updatedFormData = [...prevFormData];
        // Elimina el elemento en el índice especificado
        updatedFormData.splice(indexToDelete, 1);
        // Retorna la nueva copia del array
        return updatedFormData;
      });
    } else {
      console.error(`No such element`);
    }
  };

  const clonedChildren = React.cloneElement(childrenForm, {
    editData,
    onDataChange: handleTableChange,
  });

  useEffect(() => {
    if (isLoaded) {
      if (typeof onDataChange === "function") {
        onDataChange(formData);
      }
    }
  }, [formData, onDataChange]);

  useEffect(() => {
    setIsLoaded(true);

    return () => {
      setIsLoaded(true);
    };
  }, []);

  return (
    <section className="">
      <section
        className={`${bgClassName} dark:border-gray-600 dark:bg-gray-700 mt-auto p-4 rounded-lg divide-y divide-[#A9ADB3]`}
      >
        <ModalYesNo
          size="4xl"
          text={formTitle}
          disableButtonConfirm={true}
          disableButtonCancel={true}
          isOpen={isOpen}
          closeModal={closeModal}
        >
          <div>{clonedChildren}</div>
        </ModalYesNo>

        <section className="flex flex-col md:flex-row items-center justify-between ">
          <div className="flex flex-row gap-5">
            <h2 className="font-bold mb-2 md:mb-0  md:px-2 md:flex-grow text-center md:text-start">
              {title}
            </h2>
          </div>

          <ButtonIcon
            onClick={openModal}
            classnamebtn="bg-[#1976d2]"
            classname={`flex items-center py-2 px-0 md:py-2 md:px-2 ${
              disabled ? "hidden" : "block"
            }`}
            label="Add"
            icon={<GoPlusCircle className="ml-2 h-5 w-5" />}
          />
        </section>
        {/* <section className="flex items-center">
          <div className="">
            <TableComponent
              items={formData}
              headers={headers}
              handleEdite={(value) => handleEdit(value)}
              handleDelet={(value) => handleDelete(value)}
            />
          </div>
        </section> */}
        <section className="flex items-center w-full overflow-x-auto">
          <div className="w-full max-w-full">
            <TableComponent
              items={formData}
              headers={headers}
              handleEdite={(value) => handleEdit(value)}
              handleDelet={(value) => handleDelete(value)}
              isProfileComponent={profileComponent}
              disabled={disabled}
              sorting={sorting}
              setSortedData={(e) => setFormData(e)}
              enumaration={enumaration}
            />
          </div>
        </section>
      </section>
    </section>
  );
};
