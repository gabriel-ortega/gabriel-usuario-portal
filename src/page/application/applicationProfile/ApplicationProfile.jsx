import {
  InputText,
  TableComponent,
  SelectComponentCountry,
  SelectComponenteCountryCode,
  ModalYesNo,
  DatepickerComponent,
  SelectComponents,
  RangeComponent,
  // ButtonGroup,
  ButtonIcon,
} from "../../../components/layoutComponents";
import { AddSomethingTable } from "./components/AddSomethingTable";
import { AdditionalVaccineForm } from "./components/AdditionalVaccineForm";
import { CardVaccines } from "./components/CardVaccines";
import FormsContact from "./components/FormsContact";
import MarlinTest from "./components/MarlinTest";
import FormsLanguage from "./components/FormsLanguage";
import { Alert, Button, Tooltip } from "flowbite-react";
import logo from "../../../components/layoutDefault/avatar.jpg";
import { GoPlusCircle } from "react-icons/go";
import {
  HiOutlineArrowSmRight,
  HiOutlineArrowSmLeft,
  HiTranslate,
  HiUser,
  HiInformationCircle,
} from "react-icons/hi";
import { MdOutlineVaccines } from "react-icons/md";
import { useState, useEffect } from "react";
import { getEducation, getMaterialStatus } from "../../../util/services";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { GrContactInfo } from "react-icons/gr";
import Cookies from "js-cookie";
import {
  deleteApplicantFile,
  setSaving,
  updateApplicationFirestore,
  updateApplicationProfileContacts,
  updateApplicationProfileLangDefault,
  updateApplicationProfileLangMarlins,
  updateApplicationProfileLangOther,
  updateApplicationProfileVaccines,
  updateApplicationProfileVaccinesAdditional,
  updateApplicationProfileVaccinesAttach,
  updateApplicationStage,
  uploadApplicantFile,
} from "../../../store/userData";
import { useSelector } from "react-redux";
import { ApplicantProfile } from "./components/ApplicantProfile";
import toast from "react-hot-toast";
import { useRef } from "react";
import { VaccineAttach } from "./components/VaccineAttach";
import { FormPrompt } from "../../../hooks/FormPrompt";

export function ApplicationProfile({ disabled = false }) {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  const { isLoading, userData, applicationStage, isSaving } = useSelector(
    (state) => state.userData
  );

  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleBack = () => {
    toast.promise(
      dispatch(
        updateApplicationFirestore(
          userData.uid,
          userData.applicationData,
          true,
          1
        )
      ),
      {
        loading: "Saving...",
        success: <b>Progress Saved!</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
  };

  /* VARIABLE PARA LA FUNCION DEL MODAL*/
  const [isOpen, setIsOpen] = useState(false);

  /* FUNCION PARA ABRIR EL MODAL */
  const openModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };
  /* FUNCION PARA CERRAR EL, MODAL */
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    setUnsavedChanges(false);
    toast.promise(
      dispatch(
        updateApplicationFirestore(
          userData.uid,
          userData.applicationData,
          true,
          3
        )
      ),
      {
        loading: "Saving...",
        success: <b>Progress Saved!</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
  };

  const onVaccineUpload = async (attach) => {
    if (attach) {
      dispatch(updateApplicationProfileVaccinesAttach(attach));
      setUnsavedChanges(true);
      setIsFormValidVaccines(true);
    }
  };

  /* DEFINIENDO LAS VARIABLES PARA LA FUNCION DE GUARDAR DATOS */
  const [savedData, setSavedData] = useState();

  /*  Estado para formularios MarlinTest */
  const [marlinTestForms, setMarlinTestForms] = useState(
    userData.applicationData.applicationProfile.lang.marlins
  );

  /* Función para actualizar los datos guardados */
  const handleDataChange = (index, newData) => {
    setMarlinTestForms((prevLanguageForms) => {
      const updatedForms = [...prevLanguageForms];
      updatedForms[index] = newData; // Actualizar el formulario de idioma en el índice especificado
      return updatedForms;
    });
    setUnsavedChanges(true);
  };

  /*  Función para agregar un nuevo formulario de MarlinTest */
  const handleAddMarlinTestForm = (e) => {
    e.preventDefault();
    setShowH2(false);
    const newForm = {
      // id: new Date().getTime(),
    };
    setMarlinTestForms([...marlinTestForms, newForm]);
  };

  /*  Función para eliminar un formulario de MarlinTest*/
  // const handleDeleteMarlinTestForm = (id) => {
  //   setShowH2(true);
  //   const updatedFormList = marlinTestForms.filter((form) => form.id !== id);
  //   setMarlinTestForms(updatedFormList);
  // };

  const handleDeleteMarlinTestForm = (index) => {
    setShowH2(true);
    const updatedForms = [...marlinTestForms]; // Crear una copia del arreglo actual
    updatedForms.splice(index, 1); // Eliminar el elemento en la posición `index`
    setMarlinTestForms(updatedForms); // Actualizar el estado con el nuevo arreglo
  };

  /* Función para agregar un nuevo formulario de idioma */
  const [languageForms, setLanguageForms] = useState(
    userData.applicationData?.applicationProfile?.lang.other
  );

  /* Función para agregar un nuevo formulario de idioma ingles y español*/
  const [defaultLanguageForms, setDefaultLanguageForms] = useState(
    userData.applicationData.applicationProfile.lang.default
  );

  const handleAddLanguageForm = (e) => {
    e.preventDefault();
    const newForm = {
      // id: new Date().getTime(),
      // title: "",
      // PercentageWrite: 0,
      // PercentageSpeak: 0,
    };
    setLanguageForms([...languageForms, newForm]);
  };

  // const handleDeleteLanguageForm = (id) => {
  //   const updatedForms = languageForms.filter((form) => form.id !== id);
  //   setLanguageForms(updatedForms);
  // };
  const handleDeleteLanguageForm = (index, e) => {
    const updatedForms = [...languageForms]; // Crear una copia del arreglo actual
    updatedForms.splice(index, 1); // Eliminar el elemento en la posición `index`
    setLanguageForms(updatedForms); // Actualizar el estado con el nuevo arreglo
  };

  // Función para guardar los datos del formulario de idiomas adicionales
  const saveLanguageData = (index, newData) => {
    setLanguageForms((prevLanguageForms) => {
      const updatedForms = [...prevLanguageForms];
      updatedForms[index] = newData; // Actualizar el formulario de idioma en el índice especificado
      return updatedForms;
    });
    setUnsavedChanges(true);
  };

  // Función para guardar los datos del formulario de ingles y español
  const saveLanguageDataDefault = (index, newData) => {
    setDefaultLanguageForms({
      ...defaultLanguageForms,
      [index]: newData,
    });
    setUnsavedChanges(true);
  };

  useEffect(() => {
    // console.log("language Update");
    dispatch(updateApplicationProfileLangDefault(defaultLanguageForms));
    const isAnyFieldInvalid = [
      defaultLanguageForms.SPANISH?.PercentageWrite === "" ||
        defaultLanguageForms.SPANISH?.PercentageWrite === undefined,
      defaultLanguageForms.SPANISH?.PercentageSpeak === "" ||
        defaultLanguageForms.SPANISH?.PercentageSpeak === undefined,
      defaultLanguageForms.ENGLISH?.PercentageWrite === "" ||
        defaultLanguageForms.ENGLISH?.PercentageWrite === undefined,
      defaultLanguageForms.ENGLISH?.PercentageSpeak === "" ||
        defaultLanguageForms.ENGLISH?.PercentageSpeak === undefined,
    ].some((condition) => condition);

    setIsFormValidLanguages(!isAnyFieldInvalid);
  }, [defaultLanguageForms]);

  useEffect(() => {
    // console.log("language Update");
    dispatch(updateApplicationProfileLangOther(languageForms));
  }, [languageForms]);

  useEffect(() => {
    // console.log("language Update");
    dispatch(updateApplicationProfileLangMarlins(marlinTestForms));
  }, [marlinTestForms]);

  const [vaccineData, setVaccineData] = useState(
    userData.applicationData.applicationProfile.vaccines
  );

  const [isFormValidVaccines, setIsFormValidVaccines] = useState(true);

  const handleVaccineDataChange = (vaccineType, fieldName, value) => {
    const updateVaccine = {
      ...vaccineData,
      [vaccineType]: value,
    };
    setVaccineData(updateVaccine);
    dispatch(updateApplicationProfileVaccines(updateVaccine));
    setUnsavedChanges(true);
    const attachData =
      userData?.applicationData?.applicationProfile?.vaccines?.attach || null;

    // if (
    //   (vaccineData?.covid && !attachData?.covid) ||
    //   (vaccineData.yellowFever && !attachData?.yellow)
    // ) {
    //   setIsFormValidVaccines(false);
    // } else {
    //   setIsFormValidVaccines(true);
    // }
  };

  useEffect(() => {
    if (
      (userData.applicationData.applicationProfile.vaccines?.covid?.cards?.some(
        (card) =>
          card?.VaccineBrand?.id || card?.IssueDate || card?.CountryIssue?.id
      ) &&
        !userData?.applicationData?.applicationProfile?.vaccines?.attach
          ?.covid) ||
      (userData.applicationData.applicationProfile.vaccines?.yellowFever?.cards?.some(
        (card) =>
          card?.VaccineBrand?.id || card?.IssueDate || card?.CountryIssue?.id
      ) &&
        !userData?.applicationData?.applicationProfile?.vaccines?.attach
          ?.yellow)
    ) {
      setIsFormValidVaccines(false);
    } else {
      setIsFormValidVaccines(true);
    }
  }, [userData.applicationData.applicationProfile.vaccines]);

  const [formData, setFormData] = useState(
    userData.applicationData.applicationProfile.contacts
  );

  const [showH2, setShowH2] = useState(true); // Estado para controlar la visibilidad del h2

  /* DEFINIR LOS TITULOOS DELA TABLA DE CONTACTOS DE EMERGENCIA */
  const headers = {
    contact: ["First Names", "Last Names", "Address", "Relationship", "Phone"],
  };

  const [editData, setEditData] = useState(null);

  /*  Función para manejar la actualización de datos en formData */
  const handleInputChange = (valor, value, data) => {
    const updateData = (prevDataArray) => {
      if (value === 0) {
        const newFormData = [...prevDataArray, data];
        return newFormData.sort(
          (a, b) => new Date(b.Dateon) - new Date(a.Dateon)
        );
      } else if (value === 1) {
        const updatedFormData = prevDataArray.map((item, index) => {
          if (index === editData.id) {
            return { ...data };
          }
          return item;
        });
        return updatedFormData.sort(
          (a, b) => new Date(b.Dateon) - new Date(a.Dateon)
        );
      }
    };

    /* FUNCION PARA MANEJAR EL FORMULARIO  */
    setFormData((prevFormData) => {
      /* Obtiene el array de datos actual para la clave específica (valor) del formulario */
      const prevDataArray = prevFormData[valor] || [];
      /*  Retorna un nuevo objeto de estado actualizado (formData) */
      return {
        /* Copia el estado anterior de formData */
        ...prevFormData,
        /*  Actualiza el array de datos para la clave específica usando updateData */
        [valor]: updateData(prevDataArray),
      };
    });

    /* Limpia el estado de edición, estableciéndolo como null  */
    setEditData(null);
    /* Cierra el modal después de completar la actualización del formulario */
    closeModal();
  };

  const [isFormValidEmergency, setIsFormValidEmergency] = useState(true);

  useEffect(() => {
    // console.log("All Data Update");
    dispatch(updateApplicationProfileContacts(formData));
    setUnsavedChanges(true);
    if (formData?.contact?.length < 1 || !formData?.contact) {
      setIsFormValidEmergency(false);
    } else {
      setIsFormValidEmergency(true);
    }
  }, [formData]);

  /*  Función para manejar la edición de elementos DE LA TABLA DE CONTACT*/
  const handleEdit = (valor, id) => {
    if (valor === "contact") {
      const item = formData[valor].find((_, index) => index === id);
      if (item) {
        setEditData({ id, data: item });
      }
    }
    // openModal();
    setIsOpen(true);
  };

  /*  Función para manejar la eliminación de elementos de la tablA DE CONTACTO*/
  const handleDelete = (valor, indexToDelete) => {
    if (formData && formData[valor]) {
      setFormData((prevFormData) => {
        const updatedArray = prevFormData[valor].filter(
          (_, index) => index !== indexToDelete
        );
        return {
          ...prevFormData,
          [valor]: updatedArray,
        };
      });
    } else {
      console.error(`Invalid valor: ${valor}`);
    }
  };

  const handleVaccineAdd = (e) => {
    dispatch(updateApplicationProfileVaccinesAdditional(e));
  };

  /* BOTON SAVE PARA MOSTRAR LOS DATOS INGRESADOS EN PERFIL */
  const enviar = (event) => {
    event.preventDefault();
    toast.promise(
      dispatch(
        updateApplicationFirestore(
          uid,
          userData.applicationData,
          false,
          userData.applicationStage
        )
      ),
      {
        loading: "Saving...",
        success: <b>Saved!</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );

    setUnsavedChanges(false);
  };

  const [isFormValid, setIsFormValid] = useState(true);

  const handleValidProfile = (e) => {
    setIsFormValid(e);
  };

  const [isFormValidLanguages, setIsFormValidLanguages] = useState(true);

  const disabledStyle = disabled ? "opacity-50" : "";

  return (
    <>
      {/* <form className={disabledStyle}>
      <fieldset disabled={disabled}> */}
      <FormPrompt hasUnsavedChanges={unsavedChanges} />
      <TabGroup className="pt-5 md:pt-8">
        {/*------------------------------------------------- LISTA DE LOS TABS --------------------------------------------- */}
        <TabList className="flex flex-row  justify-center bg-white  ">
          <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 flex flex-col md:flex-row py-2 text-sm text-black items-center justify-center md:w-56 relative">
            <div className="relative flex items-center">
              <HiUser className="w-7 h-7 md:inline-block mr-1 flex" />
              {!isFormValid && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  !
                </span>
              )}
            </div>
            <span className="mt-2 md:mt-0 md:ml-2 text-xs md:text-sm">
              PROFILE
            </span>
          </Tab>
          <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 md:translate-y-0 h-15 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
            <div className="relative flex items-center">
              <GrContactInfo className="w-7 h-7 inline-block mr-1" />
              {!isFormValidEmergency && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  !
                </span>
              )}
            </div>
            <span className="mt-2 md:mt-0 md:ml-2 text-xs md:text-sm">
              EMERGENCY CONTACTS
            </span>
          </Tab>

          <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
            <div className="relative flex items-center">
              <MdOutlineVaccines className="w-7 h-7 inline-block mr-1" />
              {!isFormValidVaccines && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  !
                </span>
              )}
            </div>
            <span className="mt-2 md:mt-0 md:ml-2 text-xs md:text-sm">
              VACCINES
            </span>
          </Tab>

          <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
            <div className="relative flex items-center">
              <HiTranslate className="w-5 h-5 inline-block mr-1" />
              {!isFormValidLanguages && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  !
                </span>
              )}
            </div>
            <span className="mt-2 md:mt-0 md:ml-2 text-xs md:text-sm">
              LANGUAGES
            </span>
          </Tab>
        </TabList>

        {/*  */}
        <TabPanels>
          {/*------------------------------------------------- TAB DE PERFIL  --------------------------------------------- */}
          <TabPanel className="items-center">
            <ApplicantProfile
              onUnsavedChange={(e) => {
                setUnsavedChanges(e);
              }}
              formValid={handleValidProfile}
              disabledStyle={disabledStyle}
              disabled={disabled}
            />
          </TabPanel>
          {/*------------------------------------------------- TAB DE CONTACTOS DE EMERGENCIA --------------------------------------------- */}

          <TabPanel>
            <form className={`${disabledStyle} w-full`}>
              {/* <fieldset disabled={disabled} className="w-full"> */}
              {!isFormValidEmergency && (
                <div className="pt-3">
                  <Alert color="failure" icon={HiInformationCircle}>
                    Provide, at least, one (1) emergency contact.
                  </Alert>
                </div>
              )}
              <section className="flex justify-center">
                <section className=" bg-gray-100 border-2 mb-2 mt-5 border-gray-200 rounded-2xl p-3 w-full">
                  <section className="flex flex-col md:flex-row items-center justify-between ">
                    <h2 className="font-bold mb-2 md:mb-0  md:px-2 md:flex-grow text-center md:text-start">
                      PLEASE PROVIDE YOUR EMERGENCY CONTACTS
                    </h2>

                    <ButtonIcon
                      onClick={(e) => openModal(e)}
                      classnamebtn="bg-[#1976d2]"
                      classname="flex items-center py-2 px-0 md:py-2 md:px-2"
                      label="Add"
                      icon={<GoPlusCircle className="ml-2 h-5 w-5" />}
                    />

                    <ModalYesNo
                      size="4xl"
                      text="ADD NEW EMERGENCY CONTACT"
                      disableButtonConfirm={true}
                      disableButtonCancel={true}
                      isOpen={isOpen}
                      closeModal={closeModal}
                    >
                      <FormsContact
                        onDataChange={(value, data) =>
                          handleInputChange("contact", value, data)
                        }
                        // onDataChange={(value, data) => console.log(value, data)}
                        editData={editData}
                        validate
                      />
                    </ModalYesNo>
                  </section>

                  <section>
                    <TableComponent
                      items={formData.contact}
                      headers={headers.contact}
                      handleEdite={(value) => handleEdit("contact", value)}
                      handleDelet={(value) => handleDelete("contact", value)}
                      isProfileComponent={false}
                    />
                  </section>
                </section>
              </section>
              {/* </fieldset> */}
            </form>
          </TabPanel>
          {/*-------------------------------------------------TAB DE VACUNAS --------------------------------------------- */}

          <TabPanel className="items-center ">
            {/*------------------------------------------------- CARD DE COVID--------------------------------------------- */}
            <form className={`${disabledStyle} w-full`}>
              {/* <fieldset disabled={false} className="w-full"> */}
              <section className="flex justify-center">
                <section className=" w-80 md:w-full">
                  <section>
                    <div className="pt-3">
                      <Alert color="warning" icon={HiInformationCircle}>
                        You can apply for any position even without vaccination.
                        Have in mind that if you are select for the position,{" "}
                        <span className="font-medium">
                          you will need to get vaccinated.
                        </span>
                      </Alert>
                    </div>
                    <CardVaccines
                      id="covid"
                      name="covidBook"
                      vaccineType="COVID BOOK"
                      onDataChange={(e, otrovalor, objeto) => {
                        handleVaccineDataChange("covid", otrovalor, objeto);
                      }}
                      Datacard={vaccineData?.covid}
                    />
                  </section>
                  {/*------------------------------------------------- CARD DE YELLOW FEVER--------------------------------------------- */}
                  <section className="pt-5">
                    <CardVaccines
                      id="yellow"
                      name="yellowFever"
                      vaccineType="YELLOW FEVER"
                      onDataChange={(e, otrovalor, objeto) => {
                        handleVaccineDataChange(
                          "yellowFever",
                          otrovalor,
                          objeto
                        );
                      }}
                      Datacard={vaccineData?.yellowFever}
                    />
                  </section>
                  {!isFormValidVaccines && (
                    <div className="pt-5">
                      <Alert color="failure" icon={HiInformationCircle}>
                        If you add any vaccine data you will need to attach your
                        vaccine card as well.
                      </Alert>
                    </div>
                  )}
                  <section className="">
                    <VaccineAttach
                      vaccineAttachData={{
                        covidData:
                          userData.applicationData.applicationProfile.vaccines
                            ?.attach?.covid || null,
                        yellowData:
                          userData.applicationData.applicationProfile.vaccines
                            ?.attach?.yellow || null,
                      }}
                      // onAttachChange={(e) => console.log(e)}
                      onAttachChange={(e) => onVaccineUpload(e)}
                      disabled={isSaving}
                      userData={userData}
                    />
                  </section>
                </section>
              </section>
              <section className="flex justify-center">
                <section className="pt-5 w-80 md:w-full">
                  <AddSomethingTable
                    title={"Add any aditional vaccines"}
                    formTitle={"Additional Vaccine"}
                    headers={["Vaccine Name", "Vaccine Date"]}
                    itemName="additionalVaccines"
                    newFormData={
                      userData.applicationData.applicationProfile.vaccines
                        ?.additionalVaccines || []
                    }
                    onDataChange={handleVaccineAdd}
                    childrenForm={<AdditionalVaccineForm />}
                  />
                </section>
              </section>
              {/* </fieldset> */}
            </form>
          </TabPanel>

          {/*------------------------------------------------- TAB DE IDIOMAS--------------------------------------------- */}

          <TabPanel>
            {/*------------------------------------------------- LANGUAGES--------------------------------------------- */}
            <form className={`${disabledStyle} w-full`}>
              {/* <fieldset disabled={false} className="w-full"> */}
              <section className=" bg-gray-100 border-2 mb-2 mt-5 border-gray-200 rounded-2xl p-3">
                <section className="flex flex-col md:flex-row items-center justify-between mb-5">
                  <h2 className="font-bold mb-2 md:mb-0  md:px-2 md:flex-grow text-center md:text-start">
                    PLEASE ADD THE PERCENTAGES OF THE LANGUAGES YOU SPEAK/WRITE{" "}
                  </h2>
                </section>
                <section className=" space-y-5">
                  <FormsLanguage
                    title="ENGLISH"
                    Editdata={
                      userData.applicationData.applicationProfile.lang.default
                        ?.ENGLISH
                    }
                    onDataChange={(e) => {
                      saveLanguageDataDefault("ENGLISH", e);
                    }}
                  />
                  <FormsLanguage
                    title="SPANISH"
                    Editdata={
                      userData.applicationData.applicationProfile.lang.default
                        ?.SPANISH
                    }
                    onDataChange={(e) => {
                      saveLanguageDataDefault("SPANISH", e);
                    }}
                  />
                </section>
              </section>

              <section className="bg-gray-100 border-2 mb-2 mt-5 border-gray-200 rounded-2xl p-3">
                <section className="items-center justify-between">
                  <section className="mt-4">
                    <h2 className="text-center text-lg font-semibold mb-2">
                      If you speak or write in another language tap the ADD
                      button and add the language with its percentage.{" "}
                    </h2>

                    {languageForms?.length > 0 &&
                      languageForms.map((form, index) => (
                        <FormsLanguage
                          // key={form.id}
                          key={index}
                          title=""
                          form={form}
                          Editdata={
                            userData.applicationData.applicationProfile.lang
                              .other[index]
                          }
                          onDelete={(e) => handleDeleteLanguageForm(index, e)}
                          onDataChange={(data) => saveLanguageData(index, data)}
                          PercentageWrite={form.PercentageWrite}
                          PercentageSpeak={form.PercentageSpeak}
                        />
                      ))}

                    <ButtonIcon
                      onClick={handleAddLanguageForm}
                      classnamebtn="bg-[#1976d2]"
                      classname="flex items-center justify-center py-2 px-0 md:py-2 md:px-2"
                      label="Add"
                      icon={<GoPlusCircle className="ml-2 h-5 w-5" />}
                    />
                  </section>
                </section>
              </section>

              {/*------------------------------------------------- MARLIN TEST--------------------------------------------- */}
              <section className="bg-gray-100 border-2 mb-2 mt-5 border-gray-200 rounded-2xl p-3">
                <section className="items-center justify-between">
                  {showH2 && ( // Mostrar el h2 solo si showH2 es true
                    <h2 className="text-center text-lg font-semibold mb-2">
                      If you have taken Marlin's Test, tap the ADD button and
                      add your results.
                    </h2>
                  )}

                  {marlinTestForms?.length > 0 &&
                    marlinTestForms.map((form, index) => (
                      <MarlinTest
                        key={index}
                        userData={{
                          firstName:
                            userData.applicationData?.applicationProfile
                              ?.profile?.firstName,
                          lastName:
                            userData.applicationData?.applicationProfile
                              ?.profile?.lastName,
                          uid: userData.uid,
                        }}
                        // form={form}
                        onDelete={(e) => handleDeleteMarlinTestForm(index)}
                        Editdata={
                          userData.applicationData.applicationProfile.lang
                            .marlins[index] || {}
                        }
                        // onDataChange={handleDataChange}
                        onDataChange={(e) => {
                          // console.log(e);
                          handleDataChange(index, e);
                        }}
                        title=""
                      />
                    ))}

                  {marlinTestForms?.length === 0 && (
                    <ButtonIcon
                      onClick={handleAddMarlinTestForm}
                      classnamebtn="bg-[#1976d2]"
                      classname="flex items-center justify-center py-2 px-0 md:py-2 md:px-2"
                      label="Add"
                      icon={<GoPlusCircle className="ml-2 h-5 w-5" />}
                    />
                  )}
                </section>
              </section>
              {/* </fieldset> */}
            </form>
          </TabPanel>
        </TabPanels>
      </TabGroup>

      {/* BOTONES */}
      {userData.role === 3 && userData.applicationStage < 7 && (
        <div className="flex items-center justify-center  pt-7 pb-7 gap-8">
          {/* BOTON DE ATRAS */}
          <ButtonIcon
            icon={<HiOutlineArrowSmLeft className="mr-2 h-5 w-5 " />}
            classnamebtn="bg-[#1976d2] items-center text-center "
            label="Back"
            left={true}
            onClick={handleBack}
          />

          {/* BOTON DE CONTINUAR */}
          {!(
            isFormValid &&
            isFormValidEmergency &&
            isFormValidLanguages &&
            isFormValidVaccines
          ) ? (
            <Tooltip
              content="Make sure you filled all mandatory fields"
              style="light"
            >
              <ButtonIcon
                onClick={handleConfirm}
                classnamebtn="bg-[#1976d2]"
                classname="flex justify-center"
                label="Next Step"
                icon={<HiOutlineArrowSmRight className="ml-2 h-5 w-5" />}
                disabled
              />
            </Tooltip>
          ) : (
            <ButtonIcon
              onClick={handleConfirm}
              classnamebtn="bg-[#1976d2]"
              classname="flex justify-center"
              label="Next Step"
              icon={<HiOutlineArrowSmRight className="ml-2 h-5 w-5" />}
              disabled={false}
            />
          )}
        </div>
      )}
      {/* </fieldset>
    </form> */}
    </>
  );
}
