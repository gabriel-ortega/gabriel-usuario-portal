import { Button, Card } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  HiArrowLeft,
  HiCheckCircle,
  HiOutlineQuestionMarkCircle,
  HiSave,
} from "react-icons/hi";
import { FaFloppyDisk } from "react-icons/fa6";
import { useSelector } from "react-redux";
import {
  getApplication,
  setApplication,
  updateApplicationFirestore,
  updateApplicationSent,
  updateApplicationStage,
} from "../../store/userData";
import { useDispatch } from "react-redux";
import { formatTitleCase } from "../../util/helperFunctions";
import {
  ModalYesNo,
  SelectComponents,
} from "../../components/layoutComponents";
import { LoadingState } from "../../components/skeleton/LoadingState";
import { ApplicationProfile } from "./applicationProfile/ApplicationProfile";
import { ApplicationDocument } from "./ApplicationDocument";
import ApplicationCertificates from "./ApplicationCertificates";
import { ApplicationSkill } from "./applicationSkill/ApplicationSkill";
import toast from "react-hot-toast";
import {
  setApplicationView,
  updateReviewVersion,
} from "../../store/currentViews/viewSlice";

export const CorrectApplication = () => {
  const dispatch = useDispatch();
  const { userData, myApplication, isSaving, applicationStage } = useSelector(
    (state) => state.userData
  );

  const { application } = useSelector((state) => state.currentViews);

  useEffect(() => {
    if (userData) {
      dispatch(getApplication(userData.uid, true));
      console.log("first");
    }
  }, []);

  const [latestVersion, setLatestVersion] = useState(0);

  useEffect(() => {
    if (myApplication !== undefined) {
      setLatestVersion(myApplication?.versions?.length - 1);
    }
  }, [myApplication]);

  const handleBackClick = () => {
    dispatch(updateApplicationStage(7));
  };

  const [tabs, setTabs] = useState([
    {
      Id: 1,
      value: "Profile",
    },
    {
      Id: 2,
      value: "Documents",
    },
    {
      Id: 3,
      value: "Certificates",
    },
    {
      Id: 4,
      value: "Experience & Skills",
    },
  ]);

  const [currentTab, setCurrentTab] = useState("1");

  // const [correctionFields, setCorrectionFields] = useState({});

  /* const correctionFields = myApplication?.versions[latestVersion].review || {} */
  const correctionFields =
    myApplication !== undefined
      ? myApplication?.versions[latestVersion].review
      : {};

  const handleSave = (event) => {
    event.preventDefault();

    toast.promise(
      dispatch(
        updateApplicationFirestore(
          userData.uid,
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
  };

  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => setIsOpenModal(false);

  const modalConfirm = () => {
    const vesselTypeUpdate =
      userData.applicationData.startApplication.vesselType[0].id;
    const departmentUpdate =
      userData.applicationData.startApplication.department[0].id;
    const positionUpdate =
      userData.applicationData.startApplication.position[0].id;
    const vesselTypeData = {
      vesselType: vesselTypeUpdate,
      department: departmentUpdate,
      position: positionUpdate,
    };

    // Clonar el arreglo de versiones y actualizar la versión más reciente
    const updatedVersions = [...application.versions];

    // Crear una copia de applicationData y asegurarse de que review esté vacío
    const updatedApplicationData = {
      ...userData.applicationData,
      review: {}, // Aseguramos que el campo review esté vacío
    };

    // Asignar la nueva versión actualizada con review vacío
    updatedVersions[latestVersion + 1] = updatedApplicationData;

    // Crear el objeto application actualizado con las versiones actualizadas
    const newApplicationData = {
      ...application,
      status: 1,
      modifiedDate: new Date().toISOString(),
      vesselType: vesselTypeUpdate,
      department: departmentUpdate,
      position: positionUpdate,
    };

    const updatedApplication = {
      ...newApplicationData,
      versions: updatedVersions,
    };

    // Crear una promesa combinada para ambas operaciones
    const updatePromises = Promise.all([
      dispatch(
        updateApplicationFirestore(
          userData.uid,
          userData.applicationData,
          true,
          7
        )
      ),
      dispatch(
        updateApplicationSent(userData.uid, updatedApplication, vesselTypeData)
      ),
    ]);

    // Usar un solo toast.promise para ambas promesas
    toast.promise(updatePromises, {
      loading: "Saving...",
      success: <b>Saved & Sent Back</b>,
      error: <b>Ups! Something went wrong. Try again</b>,
    });
    dispatch(setApplication(updatedApplication));
    // dispatch(setApplicationView(docSnap.data()));
    dispatch(updateApplicationStage(7));
  };

  return (
    <section className="">
      <button
        className="flex flex-auto items-center text-[#1976d2] text-sm font-style: italic hover:bg-blue-50 my-3"
        onClick={handleBackClick}
        disabled={isSaving}
      >
        <HiArrowLeft className="h-4 w-4 mr-2 mb-2" />
        Back to My Application
      </button>
      {myApplication.status == "" || myApplication.status == 2 ? (
        <Card>
          <div className="flex flex-row items-center gap-5 justify-between">
            Reviewing Application{" "}
            <div className="flex flex-row items-center gap-2">
              <button
                className="border border-[#010064] bg-[#010064] text-white size-10 md:w-36 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30"
                disabled={isSaving}
                onClick={handleSave}
              >
                <FaFloppyDisk className="h-4 w-4" />
                <span className="hidden md:block ">Save Changes</span>
              </button>
              <button
                className={`border border-green-500 bg-green-500 text-white size-10 md:w-28 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-green-600 `}
                onClick={openModal}
                disabled={isSaving}
              >
                <HiCheckCircle className="h-4 w-4" />
                <span className="hidden md:block ">Submit</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="text-md font-light">
              <div>Comments:</div>
              <div className="space-y-2">
                {myApplication !== undefined
                  ? myApplication?.versions[latestVersion].review?.comment
                  : "--"}
              </div>
            </div>
            <div className="text-md">
              <div className="font-light">Fields:</div>
              <div className="space-y-2">
                {Object.entries(correctionFields).map(([section, fields]) => {
                  // Filtra los campos que necesitan corrección
                  const fieldsToCorrect = Object.entries(fields)
                    .filter(
                      ([fieldName, needsCorrection]) => needsCorrection === true
                    )
                    .map(([fieldName]) => formatTitleCase(fieldName)); // Aplica el formato a cada campo

                  if (fieldsToCorrect.length > 0) {
                    return (
                      <div key={section}>
                        <div className="font-light">
                          {formatTitleCase(section)}
                        </div>
                        <div className="pl-4 font-light">
                          {fieldsToCorrect.join(", ")}{" "}
                          {/* Une los campos con comas */}
                        </div>
                      </div>
                    );
                  } else {
                    return null; // Omitir secciones sin campos para corregir
                  }
                })}
              </div>
            </div>
          </div>
          <SelectComponents
            name={"tab"}
            Text="Select an application section"
            className={"md:hidden"}
            data={tabs}
            idKey="Id"
            valueKey="value"
            onChange={(e) => setCurrentTab(e[0].id)}
            name_valor={true}
            initialValue={tabs[0]}
          />
          <div className="hidden md:flex flex-col items-center mt-3">
            <Button.Group>
              <Button
                className={`${
                  currentTab === "1" &&
                  "bg-[#1976d2] text-white focus:text-white"
                }`}
                color="gray"
                onClick={() => setCurrentTab("1")}
              >
                {/* <HiUserCircle className="mr-3 h-4 w-4" /> */}
                {tabs[0].value}
              </Button>
              <Button
                className={`${
                  currentTab === "2" &&
                  "bg-[#1976d2] text-white focus:text-white"
                }`}
                color="gray"
                onClick={() => setCurrentTab("2")}
              >
                {/* <HiAdjustments className="mr-3 h-4 w-4" /> */}
                {tabs[1].value}
              </Button>
              <Button
                className={`${
                  currentTab === "3" &&
                  "bg-[#1976d2] text-white focus:text-white"
                }`}
                color="gray"
                onClick={() => setCurrentTab("3")}
              >
                {/* <HiCloudDownload className="mr-3 h-4 w-4" /> */}
                {tabs[2].value}
              </Button>
              <Button
                className={`${
                  currentTab === "4" &&
                  "bg-[#1976d2] text-white focus:text-white"
                }`}
                color="gray"
                onClick={() => setCurrentTab("4")}
              >
                {/* <HiCloudDownload className="mr-3 h-4 w-4" /> */}
                {tabs[3].value}
              </Button>
            </Button.Group>
          </div>
        </Card>
      ) : (
        <>
          <div className="hidden md:flex flex-col items-center mt-3">
            <Button.Group>
              <Button
                className={`${
                  currentTab === "1" &&
                  "bg-[#1976d2] text-white focus:text-white"
                }`}
                color="gray"
                onClick={() => setCurrentTab("1")}
              >
                {/* <HiUserCircle className="mr-3 h-4 w-4" /> */}
                {tabs[0].value}
              </Button>
              <Button
                className={`${
                  currentTab === "2" &&
                  "bg-[#1976d2] text-white focus:text-white"
                }`}
                color="gray"
                onClick={() => setCurrentTab("2")}
              >
                {/* <HiAdjustments className="mr-3 h-4 w-4" /> */}
                {tabs[1].value}
              </Button>
              <Button
                className={`${
                  currentTab === "3" &&
                  "bg-[#1976d2] text-white focus:text-white"
                }`}
                color="gray"
                onClick={() => setCurrentTab("3")}
              >
                {/* <HiCloudDownload className="mr-3 h-4 w-4" /> */}
                {tabs[2].value}
              </Button>
              <Button
                className={`${
                  currentTab === "4" &&
                  "bg-[#1976d2] text-white focus:text-white"
                }`}
                color="gray"
                onClick={() => setCurrentTab("4")}
              >
                {/* <HiCloudDownload className="mr-3 h-4 w-4" /> */}
                {tabs[3].value}
              </Button>
            </Button.Group>
          </div>
          <SelectComponents
            name={"tab"}
            Text="Select an application section"
            className={"md:hidden"}
            data={tabs}
            idKey="Id"
            valueKey="value"
            onChange={(e) => setCurrentTab(e[0].id)}
            name_valor={true}
            initialValue={tabs[0]}
          />
        </>
      )}
      {!userData ? (
        <LoadingState />
      ) : !currentTab ? (
        <LoadingState />
      ) : currentTab === "1" ? (
        <ApplicationProfile />
      ) : currentTab === "2" ? (
        <ApplicationDocument />
      ) : currentTab === "3" ? (
        <ApplicationCertificates />
      ) : (
        <ApplicationSkill />
      )}
      <ModalYesNo
        text={
          "Are you sure you want to submit your application with corrections?"
        }
        textyes={"Continue"}
        disableButtonConfirm={false}
        textno={"Cancel"}
        icon={<HiOutlineQuestionMarkCircle className="w-9 h-9 m-auto" />}
        isOpen={isOpenModal}
        closeModal={closeModal}
        onConfirm={modalConfirm}
        onCancel={closeModal}
        classmodal="pt-[50%] md:pt-0"
      />
    </section>
  );
};
