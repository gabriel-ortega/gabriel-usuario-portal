import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { GrContactInfo } from "react-icons/gr";
import { HiTranslate, HiUser } from "react-icons/hi";
import { MdOutlineVaccines } from "react-icons/md";
import { SeafarerProfile } from "./profile components/SeafarerProfile";
import { AddSomethingTable } from "../../application/applicationProfile/components/AddSomethingTable";
import { CardVaccines } from "../../application/applicationProfile/components/CardVaccines";
import { useState } from "react";
import { VaccineAttach } from "../../application/applicationProfile/components/VaccineAttach";
import { AdditionalVaccineForm } from "../../application/applicationProfile/components/AdditionalVaccineForm";
import FormsLanguage from "../../application/applicationProfile/components/FormsLanguage";
import { ButtonIcon } from "../../../components/layoutComponents";
import { GoPlusCircle } from "react-icons/go";
import MarlinTest from "../../application/applicationProfile/components/MarlinTest";
import { useEffect } from "react";
import FormsContact from "../../application/applicationProfile/components/FormsContact";
import { useDispatch } from "react-redux";
import { updateSeafarerProfileData } from "../../../store/currentViews/viewSlice";
import { LoadingState } from "../../../components/skeleton/LoadingState";

export const RecruitmentSeafarerProfile = ({
  data,
  onChange,
  uid,
  disabled = false,
}) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [profileData, setProfileData] = useState(data || {});

  // useEffect(() => {
  //   if (data) {
  //     setProfileData(data);
  //   }

  //   return () => {
  //     setProfileData({});
  //   };
  // }, [data]);

  const handleProfileFields = (e) => {
    if (profileData?.profile !== e) {
      // console.log(e);
      setProfileData({
        ...profileData,
        profile: e,
      });
    }
  };

  const handleContacts = (e) => {
    if (profileData?.contacts?.contact !== e) {
      setProfileData({
        ...profileData,
        contacts: { contact: e },
      });
    }
  };

  const handleVaccineDataChange = (vaccineType, fieldName, value) => {
    setProfileData({
      ...profileData,
      vaccines: {
        ...profileData?.vaccines,
        [vaccineType]: value,
        // [vaccineType]: {
        //   // ...profileData.vaccines[vaccineType],
        //   [fieldName]: value,
        // },
      },
    });
  };

  const onVaccineUpload = async (attach) => {
    if (attach) {
      setProfileData({
        ...profileData,
        vaccines: {
          ...profileData?.vaccines,
          attach: attach,
        },
      });
    }
  };

  const handleVaccineAdd = (e) => {
    if (profileData.vaccines?.additionalVaccines !== e && e) {
      setProfileData({
        ...profileData,
        vaccines: {
          ...profileData?.vaccines,
          additionalVaccines: e,
        },
      });
    }
  };

  const [defaultLanguageForms, setDefaultLanguageForms] = useState([]);

  /*  Función para agregar un nuevo formulario de MarlinTest */
  const handleAddMarlinTestForm = (e) => {
    e.preventDefault();
    setShowH2(false);
    const newForm = {
      // id: new Date().getTime(),
    };
    setMarlinTestForms([...marlinTestForms, newForm]);
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      lang: {
        ...prevProfileData.lang,
        marlins: [...(prevProfileData.lang?.marlins || []), newForm], // Mantiene los elementos anteriores y agrega newForm
      },
    }));
  };

  const [marlinTestForms, setMarlinTestForms] = useState(
    profileData.lang?.marlins || []
  );

  /* Función para actualizar los datos guardados */
  const handleDataChange = (index, newData) => {
    setMarlinTestForms((prevLanguageForms) => {
      const updatedForms = [...prevLanguageForms];
      updatedForms[index] = newData; // Actualizar el formulario de idioma en el índice especificado
      return updatedForms;
    });
    setProfileData((prevProfileData) => {
      const updatedLang = {
        ...prevProfileData.lang,
        marlins: prevProfileData?.lang?.marlins
          ? [...prevProfileData.lang.marlins] // Clonar para evitar mutación directa
          : [], // Inicializar si no existe
      };

      // Asegurarse de que el índice en 'other' exista
      updatedLang.marlins[index] = newData;

      return {
        ...prevProfileData,
        lang: updatedLang, // Actualizar lang con la nueva versión de other
      };
    });
  };

  const handleDeleteMarlinTestForm = (index, e) => {
    setShowH2(true);
    const updatedForms = [...marlinTestForms]; // Crear una copia del arreglo actual
    updatedForms.splice(index, 1); // Eliminar el elemento en la posición `index`
    setMarlinTestForms(updatedForms); // Actualizar el estado con el nuevo arreglo
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      lang: {
        ...prevProfileData.lang,
        marlins: prevProfileData.lang?.marlins.filter((_, i) => i !== index), // Filtra el array y elimina el elemento con el índice proporcionado
      },
    }));
  };

  /* Función para agregar un nuevo formulario de idioma */
  const [languageForms, setLanguageForms] = useState([]);

  const handleAddLanguageForm = (e) => {
    e.preventDefault();
    const newForm = {
      // id: new Date().getTime(),
      // title: "",
      // PercentageWrite: 0,
      // PercentageSpeak: 0,
    };
    setLanguageForms([...languageForms, newForm]);
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      lang: {
        ...prevProfileData.lang,
        other: [...(prevProfileData.lang?.other || []), newForm], // Mantiene los elementos anteriores y agrega newForm
      },
    }));
  };

  const handleDeleteLanguageForm = (index, e) => {
    const updatedForms = [...languageForms]; // Crear una copia del arreglo actual
    updatedForms.splice(index, 1); // Eliminar el elemento en la posición `index`
    setLanguageForms(updatedForms); // Actualizar el estado con el nuevo arreglo
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      lang: {
        ...prevProfileData.lang,
        other: prevProfileData.lang?.other.filter((_, i) => i !== index), // Filtra el array y elimina el elemento con el índice proporcionado
      },
    }));
  };

  // Función para guardar los datos del formulario de idiomas adicionales
  const saveLanguageData = (index, newData) => {
    setLanguageForms((prevLanguageForms) => {
      const updatedForms = [...prevLanguageForms];
      updatedForms[index] = newData; // Actualizar el formulario de idioma en el índice especificado
      return updatedForms;
    });
    setProfileData((prevProfileData) => {
      const updatedLang = {
        ...prevProfileData.lang,
        other: prevProfileData?.lang?.other
          ? [...prevProfileData.lang.other] // Clonar para evitar mutación directa
          : [], // Inicializar si no existe
      };

      // Asegurarse de que el índice en 'other' exista
      updatedLang.other[index] = newData;

      return {
        ...prevProfileData,
        lang: updatedLang, // Actualizar lang con la nueva versión de other
      };
    });
  };

  // Función para guardar los datos del formulario de ingles y español
  const saveLanguageDataDefault = (index, newData) => {
    // console.log(newData);
    setProfileData({
      ...profileData,
      lang: {
        ...profileData.lang,
        default: {
          ...profileData?.lang?.default,
          [index]: newData,
        },
      },
    });
    // setUnsavedChanges(true);
  };

  const [showH2, setShowH2] = useState(
    (profileData.lang?.marlins?.[0] &&
      Object.values(profileData.lang.marlins[0]).every(
        (value) => value === "" || value === null || value === undefined
      )) ||
      false
  ); // Estado para controlar la visibilidad del h2

  useEffect(() => {
    if (isLoaded) {
      onChange(true);
      dispatch(updateSeafarerProfileData(profileData));
    }
  }, [profileData]);

  useEffect(() => {
    setIsLoaded(true);

    return () => {
      setIsLoaded(true);
    };
  }, []);

  return (
    <>
      {!profileData ? (
        <LoadingState />
      ) : (
        <TabGroup className="pt-5 md:pt-8">
          {/*------------------------------------------------- LISTA DE LOS TABS --------------------------------------------- */}
          <TabList className=" flex flex-row  justify-center bg-white  ">
            <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 flex flex-col md:flex-row py-2 text-sm text-black items-center justify-center md:w-56 relative">
              <div className=" relative flex items-center">
                <HiUser className=" w-7 h-7 md:inline-block mr-1 flex " />
                {/* {!isFormValid && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    !
                  </span>
                )} */}
              </div>
              <span className="mt-2 md:mt-0 md:ml-2 text-xs md:text-sm">
                PROFILE
              </span>
            </Tab>
            <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 md:translate-y-0 h-15 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
              <div className="relative flex items-center">
                <GrContactInfo className="w-7 h-7 inline-block mr-1" />
                {/* {!isFormValidEmergency && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    !
                  </span>
                )} */}
              </div>
              <span className="mt-2 md:mt-0 md:ml-2 text-xs md:text-sm">
                EMERGENCY CONTACTS
              </span>
            </Tab>
            <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
              <div className="relative flex items-center">
                <MdOutlineVaccines className="w-7 h-7 inline-block mr-1" />
                {/* {!isFormValidVaccines && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    !
                  </span>
                )} */}
              </div>
              <span className="mt-2 md:mt-0 md:ml-2 text-xs md:text-sm">
                VACCINES
              </span>
            </Tab>
            <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
              <div className="relative flex items-center">
                <HiTranslate className="w-5 h-5 inline-block mr-1" />
                {/* {!isFormValidLanguages && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    !
                  </span>
                )} */}
              </div>
              <span className="mt-2 md:mt-0 md:ml-2 text-xs md:text-sm">
                LANGUAGES
              </span>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel className="items-center">
              <div
                style={{
                  pointerEvents: disabled ? "none" : "auto",
                  opacity: disabled ? 0.5 : 1,
                }}
              >
                <section className="mx-3">
                  {!profileData ? (
                    <LoadingState />
                  ) : (
                    <SeafarerProfile
                      userData={{ ...profileData?.profile, uid: uid }}
                      // userData={data?.profile || {}}
                      onChange={(e) => console.log(e)}
                      // onChange={(e) => handleProfileFields(e)}
                    />
                  )}
                </section>
              </div>
            </TabPanel>
            {/*------------------------------------------------- TAB CONTACTS--------------------------------------------- */}
            <TabPanel className="items-center">
              <section className="mx-3 mt-3">
                <AddSomethingTable
                  title={"Emergency Contacts"}
                  headers={[
                    "First Names",
                    "Last Names",
                    "Address",
                    "Relationship",
                    "Phone",
                  ]}
                  childrenForm={<FormsContact />}
                  newFormData={profileData?.contacts?.contact || []}
                  onDataChange={(e) => handleContacts(e)}
                  disabled={disabled}
                />
              </section>
            </TabPanel>
            {/*------------------------------------------------- TAB VACUNAS--------------------------------------------- */}
            <TabPanel className="items-center ">
              {/*------------------------------------------------- CARD DE COVID--------------------------------------------- */}
              <div
                style={{
                  pointerEvents: disabled ? "none" : "auto",
                  opacity: disabled ? 0.5 : 1,
                }}
              >
                <section>
                  <CardVaccines
                    id="covid"
                    name="covidBook"
                    vaccineType="COVID BOOK"
                    onDataChange={(e, otrovalor, objeto) => {
                      handleVaccineDataChange("covid", otrovalor, objeto);
                    }}
                    Datacard={profileData?.vaccines?.covid}
                  />
                </section>
                {/*------------------------------------------------- CARD DE YELLOW FEVER--------------------------------------------- */}
                <section className="pt-5">
                  <CardVaccines
                    id="yellow"
                    name="yellowFever"
                    vaccineType="YELLOW FEVER"
                    onDataChange={(e, otrovalor, objeto) => {
                      handleVaccineDataChange("yellowFever", otrovalor, objeto);
                    }}
                    Datacard={profileData?.vaccines?.yellowFever}
                  />
                </section>
                <section className="">
                  <VaccineAttach
                    vaccineAttachData={{
                      covidData: profileData.vaccines?.attach?.covid,
                      yellowData: profileData.vaccines?.attach?.yellow,
                    }}
                    onAttachChange={(e) => onVaccineUpload(e)}
                    // disabled={isSaving}
                    userData={{
                      uid: uid,
                      firstName:
                        profileData.profile?.firstName || "undefinedName",
                      lastName:
                        profileData.profile?.lastName || "undefinedLastName",
                    }}
                  />
                </section>
              </div>
              {/*------------------------------------------------- VACUNAS ADICIONALES--------------------------------------------- */}
              <section className="pt-5">
                <AddSomethingTable
                  title={"Add any aditional vaccines"}
                  formTitle={"Additional Vaccine"}
                  headers={["Vaccine Name", "Vaccine Date"]}
                  itemName="additionalVaccines"
                  newFormData={profileData?.vaccines?.additionalVaccines || []}
                  onDataChange={(e) => handleVaccineAdd(e)}
                  childrenForm={<AdditionalVaccineForm />}
                  disabled={disabled}
                />
              </section>
            </TabPanel>
            {/*------------------------------------------------- TAB DE IDIOMAS--------------------------------------------- */}

            <TabPanel>
              {/*------------------------------------------------- LANGUAGES--------------------------------------------- */}
              <div
                style={{
                  pointerEvents: disabled ? "none" : "auto",
                  opacity: disabled ? 0.5 : 1,
                }}
              >
                <section className=" bg-gray-100 border-2 mb-2 mt-5 border-gray-200 rounded-2xl p-3">
                  <section className="flex flex-col md:flex-row items-center justify-between mb-5">
                    <h2 className="font-bold mb-2 md:mb-0  md:px-2 md:flex-grow text-center md:text-start">
                      PLEASE ADD THE PERCENTAGES OF THE LANGUAGES YOU
                      SPEAK/WRITE{" "}
                    </h2>
                  </section>
                  <section className=" space-y-5">
                    <FormsLanguage
                      title="ENGLISH"
                      Editdata={profileData?.lang?.default?.ENGLISH || {}}
                      onDataChange={(e) => {
                        saveLanguageDataDefault("ENGLISH", e);
                      }}
                    />
                    <FormsLanguage
                      title="SPANISH"
                      Editdata={profileData?.lang?.default?.SPANISH || {}}
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

                      {languageForms.map((form, index) => (
                        <FormsLanguage
                          key={index}
                          title=""
                          form={form}
                          Editdata={profileData.lang?.other[index] || {}}
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

                    {profileData.lang?.marlins?.[0] &&
                      !Object.values(profileData.lang.marlins[0]).every(
                        (value) =>
                          value === "" || value === null || value === undefined
                      ) &&
                      marlinTestForms.map((form, index) => (
                        <MarlinTest
                          key={index}
                          form={form}
                          onDelete={(e) => handleDeleteMarlinTestForm(index, e)}
                          Editdata={profileData.lang?.marlins[index] || {}}
                          onDataChange={(e) => {
                            handleDataChange(index, e);
                          }}
                          title=""
                        />
                      ))}

                    {/* {marlinTestForms.length === 0 && ( */}
                    {profileData.lang?.marlins?.[0] &&
                      Object.values(profileData.lang.marlins[0]).every(
                        (value) =>
                          value === "" || value === null || value === undefined
                      ) && (
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
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      )}
    </>
  );
};

export default RecruitmentSeafarerProfile;
