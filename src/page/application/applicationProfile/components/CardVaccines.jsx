import { useState, useEffect } from "react";
import { Button, FloatingLabel, Modal } from "flowbite-react";
import {
  HiOutlineDocumentText,
  HiOutlineTrash,
  HiQuestionMarkCircle,
} from "react-icons/hi";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { GoPlusCircle } from "react-icons/go";
import {
  SelectComponentCountry,
  DatepickerComponent,
  ButtonIcon,
  SelectComponents,
} from "../../../../components/layoutComponents";
import vaccineBrandsData from "../../../../assets/tables/json/VaccineBrands.json";
import { useDispatch, useSelector } from "react-redux";

export function CardVaccines({
  titulo,
  id,
  name,
  onDataChange,
  Datacard,
  vaccineType,
}) {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userData);
  const [openModalWarning, setOpenModalWarning] = useState(false);
  // Estado local para manejar las cards y el archivo adjunto
  const [cards, setCards] = useState(getInitialCards());
  const [attachedFile, setAttachedFile] = useState(null);
  const [selectedDose, setSelectedDose] = useState("Booster Dose");
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);

  // Función para obtener las cards iniciales dependiendo del tipo de vacuna
  function getInitialCards() {
    if (vaccineType === "COVID BOOK") {
      return [
        {
          Doze: "First Dose",
          VaccineBrand: "",
          IssueDate: "",
          CountryIssue: "",
          DataDocument: null,
        },
        {
          Doze: "Second Dose",
          VaccineBrand: "",
          IssueDate: "",
          CountryIssue: "",
          DataDocument: null,
        },
        {
          Doze: "Booster Dose",
          VaccineBrand: "",
          IssueDate: "",
          CountryIssue: "",
          DataDocument: null,
        },
      ];
    } else if (vaccineType === "YELLOW FEVER") {
      return [
        {
          Doze: "",
          VaccineBrand: "",
          IssueDate: "",
          CountryIssue: "",
          DataDocument: null,
          ExpireDate: "",
        },
      ];
    }
    return [];
  }

  // Efecto para actualizar las cards y el archivo adjunto cuando se recibe Datacard
  useEffect(() => {
    if (Datacard) {
      // setCards(Datacard.cards || getInitialCards());
      setCards(Datacard.cards);
      // console.log(Datacard.cards);
      // setAttachedFile(Datacard.attachedFile || null);
    }
  }, [vaccineType]);

  // Función para agregar una nueva card
  const addNewCard = (e) => {
    e.preventDefault();
    if (vaccineType === "COVID BOOK") {
      setCards([
        ...cards,
        {
          Doze: selectedDose || "Booster Dose",
          VaccineBrand: "",
          IssueDate: "",
          CountryIssue: "",
          DataDocument: null,
        },
      ]);
    } else if (vaccineType === "YELLOW FEVER") {
      setCards([
        ...cards,
        {
          Doze: "",
          VaccineBrand: "",
          IssueDate: "",
          CountryIssue: "",
          DataDocument: null,
          ExpireDate: "",
        },
      ]);
    }
    setOpenModalWarning(false);
    setSelectedDose("Booster Dose");
  };

  const handleDataChange = (e, index) => {
    /*  Manejar el cambio de eventos y valor*/
    const { name, value } = e.target || e;
    /*  copia actualizada de las cards */
    const updatedCards = cards.map((card, idx) => {
      if (idx === index) {
        /* Actualizacion del campo correspondiente en la card específica */
        return {
          ...card,
          [name]: value,
        };
      }
      return card;
    });

    setCards(updatedCards);

    // Si onDataChange está definido como función, llamamos a onDataChange con los datos actualizados
    if (onDataChange && typeof onDataChange === "function") {
      onDataChange(id, name, { cards: updatedCards, attachedFile });
    }
  };

  const handleDelete = (index) => {
    // Crear el nuevo array sin el elemento en el índice especificado
    const updatedCards = [
      ...cards.slice(0, index), // Elementos antes del índice
      ...cards.slice(index + 1), // Elementos después del índice
    ];

    // Actualizar el estado
    setCards(updatedCards);

    // Invocar onDataChange si está definido y es una función
    if (onDataChange && typeof onDataChange === "function") {
      onDataChange(id, name, { cards: updatedCards, attachedFile });
    }
  };

  const handleDoseChange = (e) => {
    setSelectedDose(e[0].id);
  };

  const handleAddNewModal = (e) => {
    e.preventDefault();
    setOpenModalWarning(true);
  };

  return (
    <section className="border border-gray-200 bg-gray-100 dark:border-gray-600 dark:bg-gray-700 mt-5 p-4 rounded-lg divide-y divide-[#A9ADB3]">
      <section className="flex items-center justify-between pb-4 border-b border-black border-b-3">
        <section className="flex items-center space-x-2 pl-2">
          <HiOutlineDocumentText className="w-6 h-6" />
          <h3 className="font-bold">{vaccineType}</h3>
          {vaccineType === "YELLOW FEVER" ? (
            <h4 className="pl-5">
              Please indicate if your yellow fever dose expires or not.
            </h4>
          ) : (
            <h4></h4>
          )}
        </section>
        {vaccineType === "COVID BOOK" && (
          <section>
            <ButtonIcon
              classnamebtn="hidden sm:block items-end justi fy-end md:block bg-[#1976d2] w-24 sm:w-full md:w-full h-15"
              classname="flex justify-center"
              label="Add More Doses"
              icon={
                <GoPlusCircle className="ml-0 h-5 w-10 justify-center items-center" />
              }
              // onClick={(e) => addNewCard(e)}
              onClick={(e) => handleAddNewModal(e)}
            />
            <ButtonIcon
              classnamebtn="md:hidden sm:hidden bg-[#1976d2] w-20 items-center justify-center sm:w-full md:w-full h-15"
              classname="flex justify-center"
              label="Add"
              icon={
                <GoPlusCircle className="ml-0 h-5 w-10 justify-center items-center" />
              }
              // onClick={(e) => addNewCard(e)}
              onClick={(e) => handleAddNewModal(e)}
            />
          </section>
        )}
      </section>

      {/* Cards de datos */}
      <section
        className="flex flex-wrap py-5 items-center justify-center md:gap-0 space-y-2 md:space-x-5 gap-5 sm:gap-2 "
        ref={parent}
      >
        {cards.map((card, index) => (
          <section
            key={index}
            className={`${
              // !Datacard.cards?.[index].VaccineBrand?.id &&
              // !Datacard.cards?.[index].IssueDate &&
              // !Datacard.cards?.[index].CountryIssue?.id
              card.VaccineBrand?.id == "" ||
              card.IssueDate == "" ||
              card.CountryIssue == ""
                ? "border border-red-500"
                : "border border-gray-200"
            } bg-white w-80 md:w-full-screen dark:border-gray-600 dark:bg-gray-700 mt-auto p-2 rounded-lg`}
          >
            {vaccineType === "COVID BOOK" && (
              <div className="flex flex-row justify-between items-start gap-3">
                <FloatingLabel
                  variant="outlined"
                  label={card.Doze}
                  disabled={true}
                />
                <button
                  className="size-10 border rounded-lg bg-red-600 flex items-center justify-center text-white hover:bg-red-700"
                  onClick={() => handleDelete(index)}
                >
                  <HiOutlineTrash />
                </button>
              </div>
            )}

            {vaccineType === "YELLOW FEVER" && (
              <div className="mb-5">
                <SelectComponents
                  name="Doze"
                  valueDefault="Dose"
                  data={[
                    {
                      value: "Unlimited Dose",
                    },
                    {
                      value: "Limited Dose",
                    },
                  ]}
                  idKey="value"
                  valueKey="value"
                  name_valor={true}
                  initialValue={card.Doze || ""}
                  className="text-gray-400"
                  onChange={(e, name) => {
                    const value = e[0].name;
                    const target = { name, value };
                    handleDataChange(target, index);
                  }}
                />
              </div>
            )}
            {vaccineType === "COVID BOOK" && (
              <SelectComponents
                name="VaccineBrand"
                valueDefault="Vaccine Brand"
                data={vaccineBrandsData}
                idKey="Id"
                valueKey="Brand"
                name_valor={true}
                initialValue={card.VaccineBrand?.id}
                className="text-gray-400"
                onChange={(e, inputName) => {
                  const fieldName = inputName;
                  const selectedValue = e[0];
                  const { id, name } = selectedValue;
                  handleDataChange(
                    { target: { name: fieldName, value: selectedValue } },
                    index
                  );
                }}
              />
            )}
            {!card.CountryIssue.Id ? (
              <SelectComponentCountry
                text="Country of Issue"
                name="CountryIssue"
                classNameSelect="relative mt-1 h-full inset-0 z-20 w-full"
                value={card.CountryIssue}
                initialValue={{}}
                onChange={(e, name) => {
                  const fieldName = name;
                  const value = e;
                  handleDataChange(
                    { target: { name: fieldName, value } },
                    index
                  );
                }}
                isValid={true}
              />
            ) : (
              <>
                <SelectComponentCountry
                  text="Country of Issue"
                  name="CountryIssue"
                  classNameSelect="relative mt-1 h-full inset-0 z-20 w-full"
                  value={card.CountryIssue}
                  initialValue={card.CountryIssue}
                  onChange={(e, name) => {
                    const fieldName = name;
                    const value = e;
                    handleDataChange(
                      { target: { name: fieldName, value } },
                      index
                    );
                  }}
                  isValid={true}
                />
              </>
            )}
            <DatepickerComponent
              label="Date of Issue"
              classnamedate=""
              classnamelabel="-translate-y-5 text-gray-400"
              datevalue={card.IssueDate ? card.IssueDate : ""}
              name="IssueDate"
              onChange={(e) =>
                handleDataChange(
                  { target: { name: "IssueDate", value: e.target.value } },
                  index
                )
              }
            />
            <section
              className={`${card.Doze === "Limited Dose" ? "" : "hidden"}`}
            >
              <DatepickerComponent
                disabled={card.Doze === "Limited Dose" ? false : true}
                label="Expire Date"
                classnamedate=""
                classnamelabel="-translate-y-5 text-gray-400"
                datevalue={card.ExpireDate ? card.ExpireDate : ""}
                name="ExpireDate"
                onChange={(e) =>
                  handleDataChange(
                    { target: { name: "ExpireDate", value: e.target.value } },
                    index
                  )
                }
              />
            </section>

            {/* {card.Doze === "Limited Dose" && (
              <DatepickerComponent
                label="Expire Date"
                classnamedate=""
                classnamelabel="-translate-y-5 text-gray-400"
                datevalue={card.ExpireDate}
                name="ExpireDate"
                onChange={(e) =>
                  handleDataChange(
                    { target: { name: "ExpireDate", value: e.target.value } },
                    index
                  )
                }
              />
            )} */}
          </section>
        ))}
      </section>

      {/* Área para adjuntar archivo */}
      {/* <section className="">
        <p className="text-base md:pb-5 pt-2">Attach (Upload Vaccine Card)</p>
        <Dropzone
          label={false}
          DataDocument={attachedFile}
          onFileChange={changeDocument}
          // onFileChange={(e) => {
          //   console.log(e);
          // }}
          name={"covidBook"}
        />
      </section> */}
      <Modal
        show={openModalWarning}
        size="md"
        onClose={() => setOpenModalWarning(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {/* <HiQuestionMarkCircle lassName="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {" Please select a Dose"}
            </h3>
            <div className="my-3">
              <SelectComponents
                id="dose"
                valueDefault={"Recruitment Stage"}
                data={[
                  { value: "First Dose" },
                  { value: "Second Dose" },
                  { value: "Booster Dose" },
                ]}
                initialValue={"Booster Dose"}
                name_valor={true}
                idKey="value"
                valueKey="value"
                name="dose"
                Text="Select Vaccine Dose"
                classname="min-h-28"
                onChange={(e) => handleDoseChange(e)}
              />
            </div>
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={() => setOpenModalWarning(false)}>
                Cancel
              </Button>
              <Button
                color="failure"
                disabled={!selectedDose}
                onClick={(e) => {
                  addNewCard(e);
                  // console.log(selectedDose);
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
}
