import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ButtonIcon,
  SelectComponents,
} from "../../components/layoutComponents";
import { Badge, Button, Card, Drawer, Dropdown } from "flowbite-react";
import {
  HiArrowLeft,
  HiDocumentDownload,
  HiDotsVertical,
  HiSave,
} from "react-icons/hi";
import { FaFloppyDisk } from "react-icons/fa6";
import { LoadingState } from "../../components/skeleton/LoadingState";
import { FormPrompt } from "../../hooks/FormPrompt";
import { lazy } from "react";
import { Suspense } from "react";
import { capitalizeFirstLetter, formatDate } from "../../util/helperFunctions";
import { useDispatch } from "react-redux";
import {
  getSeafarerData,
  setUserData,
  updateSeafarerDataFirebase,
  updateUsersData,
} from "../../store/userData";
import toast from "react-hot-toast";
import { updateSeafarerData } from "../../store/currentViews/viewSlice";
import notFound from "../../assets/imagenes/notFound.gif";
import { ProfileOptions } from "./ProfileOptions";
import stageData from "../../assets/tables/json/RecruitmentStage-static.json";
import {
  getDepartments,
  getPositions,
  getVesselType,
} from "../../util/services";
const RecruitmentSeafarerProfile = lazy(() =>
  import("../recruitment/components/RecruitmentSeafarerProfile")
);
const RecruitmentDocuments = lazy(() =>
  import("../recruitment/components/RecruitmentDocuments")
);
const RecruitmentSkills = lazy(() =>
  import("../recruitment/components/RecruitmentSkills")
);
const RecruitmentCertificates = lazy(() =>
  import("../recruitment/components/RecruitmentCertificates")
);
const RecruitmentAttachments = lazy(() =>
  import("../recruitment/components/RecruitmentAttachments")
);
const RecruitmentStages = lazy(() =>
  import("../recruitment/components/RecruitmentStages")
);
const ApplicantAccount = lazy(() =>
  import("../accountSettings/ApplicantAccount")
);

export default function RecruitmentProfile() {
  const dispatch = useDispatch();
  const { isSaving } = useSelector((state) => state.userData);
  const { profile } = useSelector((state) => state.currentViews);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [existe, setExiste] = useState(true);
  const [isLoading, setIsLoading] = useState(!profile?.uid ? false : true);
  const [currentPositionData, setCurrentPositionData] = useState();

  const [positions, setPositions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [typeOfVessel, setTypeOfVessel] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({});

  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      const positions = await getPositions();
      const departments = await getDepartments();
      const typeOfVessel = await getVesselType();
      setPositions(positions);
      setDepartments(departments);
      setTypeOfVessel(typeOfVessel);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (positions && profile?.seafarerData?.position?.[0]?.id) {
      const matchingPosition = positions.find(
        (pos) => pos.Id == profile.seafarerData.position[0].id
      );

      if (matchingPosition) {
        setCurrentPosition(matchingPosition);
      }
    }
  }, [positions, profile?.seafarerData?.position]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      if (profile?.uid !== id) {
        const existe = await dispatch(getSeafarerData(id)); // Usamos await aquí
        setExiste(existe); // Ahora debería establecer el valor correctamente
        // setExiste(true);
      }
      if (!currentPositionData && profile.seafarerData?.position) {
        const positions = await getPositions();
        const currentPosition = positions.find(
          (position) => position.Id == profile.seafarerData.position[0].id
        );
        setCurrentPositionData(currentPosition);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  // useEffect(() => {
  //   console.log(currentPosition);
  // }, [currentPosition]);

  const handleBackClick = () => {
    navigate("/seafarers");
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
    {
      Id: 5,
      value: "Attachments",
    },
    {
      Id: 6,
      value: "Recruitment Process",
    },
    {
      Id: 7,
      value: "Account",
    },
  ]);

  const [currentTab, setCurrentTab] = useState("1");

  const onSelectChange = (e) => {
    const tabselect = e[0].id;
    setCurrentTab(tabselect);
  };

  const [allSeafarerData, setAllSeafarerData] = useState(
    profile.seafarerData || {
      seafarerProfile: {},
      seafarerDocuments: [],
      additionalDocuments: [],
      seafarerCertficates: [],
      additionalCertificates: [],
      skills: {
        onboard: [],
        onland: [],
        skill: [],
      },
    }
  );

  useEffect(() => {
    dispatch(updateSeafarerData(allSeafarerData));
  }, [allSeafarerData]);

  const handleProfileChange = () => {
    // console.log(e);
    setHasUnsavedChanges(true);
    // setAllSeafarerData({ ...allSeafarerData, seafarerProfile: e });
  };

  const handleDocumentsChange = () => {
    // if (allSeafarerData[arrayName] !== e) {
    setHasUnsavedChanges(true);
    // setAllSeafarerData({ ...allSeafarerData, [arrayName]: e });
    // }
  };

  const handleCertificatesChange = () => {
    // if (allSeafarerData[arrayName] !== e) {
    setHasUnsavedChanges(true);
    //   setAllSeafarerData({ ...allSeafarerData, [arrayName]: e });
    // }
  };

  const handleSkillsChange = () => {
    // if (allSeafarerData.skills[arrayName] !== e) {
    setHasUnsavedChanges(true);
    //   setAllSeafarerData({
    //     ...allSeafarerData,
    //     skills: {
    //       ...allSeafarerData.skills, // Spread the current skills object
    //       [arrayName]: e, // Update the specific array within skills
    //     },
    //   });
    // }
  };

  async function getCV() {
    try {
      // Verifica que currentPosition esté definido y tenga CVFormatId
      if (!currentPosition || !currentPosition.CVFormatId) {
        console.error("Error: currentPosition o CVFormatId no está definido");
        return;
      }

      const currentPositionId = currentPosition.CVFormatId;
      const url = `https://cv-formater.onrender.com/pdf_render/seafarers?formatId=${currentPositionId}&id=${profile.uid}`;

      // Abre la URL en una nueva pestaña
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error al obtener el CV:", error);
    }
  }

  const save = (e) => {
    e.preventDefault();
    const date = new Date().toISOString();
    // toast.promise(
    //   dispatch(updateSeafarerDataFirebase(profile.uid, profile.seafarerData)),
    //   {
    //     loading: "Saving...",
    //     success: <b>Saved!</b>,
    //     error: <b>Ups! Something went wrong. Try again</b>,
    //   }
    // );
    toast.promise(dispatch(updateUsersData(profile.uid, profile)), {
      loading: "Saving...",
      success: <b>Saved!</b>,
      error: <b>Ups! Something went wrong. Try again</b>,
    });
    dispatch(setUserData({ ...profile, modifiedOn: date }));

    setHasUnsavedChanges(false);
  };

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          {!existe ? (
            <div className="flex flex-col items-center justify-center h-1/2">
              <img
                src={notFound}
                alt={"Profile Not Found"}
                className="size-36"
              />
              <div className="flex flex-col gap-2 items-center justify-center">
                <span>Profile not found. Try Again!</span>
                <button
                  className="flex flex-auto items-center text-[#1976d2] text-sm font-style: italic hover:bg-blue-50"
                  onClick={handleBackClick}
                  disabled={isSaving}
                >
                  <HiArrowLeft className="h-4 w-4 mr-2" />
                  Back to Seafarers
                </button>
              </div>
            </div>
          ) : (
            <>
              <FormPrompt hasUnsavedChanges={hasUnsavedChanges} />
              <Drawer
                open={isOpen}
                onClose={handleClose}
                position="right"
                className="md:w-1/3"
              >
                <Drawer.Header
                  title="Profile Options"
                  titleIcon={() => <HiDotsVertical className="h-4 w-4 mr-2" />}
                />
                <Drawer.Items>
                  <ProfileOptions
                    positions={positions}
                    departments={departments}
                    typeOfVessel={typeOfVessel}
                  />
                </Drawer.Items>
              </Drawer>
              <button
                className="flex flex-auto items-center text-[#1976d2] text-sm font-style: italic hover:bg-blue-50"
                onClick={handleBackClick}
                disabled={isSaving}
              >
                <HiArrowLeft className="h-4 w-4 mr-2" />
                Back to Seafarers
              </button>

              <div className="w-full shadow-lg rounded-lg p-6">
                <div className="flex flex-col   lg:justify-between">
                  <div className="flex-row space-y-2">
                    <div className="flex flex-row items-center gap-3">
                      <h2 className="tracking-tight text-gray-500">
                        Seafarer Profile:
                      </h2>
                      <Badge color="purple">
                        {profile?.recruitmentStage
                          ? stageData.find(
                              (stage) => stage.Id == profile?.recruitmentStage
                            )?.StageName
                          : "Undefined"}
                      </Badge>
                      <Badge color={profile?.available ? "green" : "warning"}>
                        {profile?.available ? "Available" : "Unavailable"}
                      </Badge>
                      <span>{profile.email}</span>
                      <span>{profile.logisticId}</span>
                    </div>
                    <div className="flex flex-row justify-between items-center gap-2">
                      <h1 className="text-2xl md:text-3xl  font-bold tracking-tight w-[85%]">
                        {`${
                          profile.seafarerData?.seafarerProfile?.profile
                            ?.firstName ||
                          profile.applicationData?.applicationProfile?.profile
                            ?.firstName ||
                          profile.applicationData?.applicantProfile?.profile
                            ?.firstName ||
                          "-"
                        } ${
                          profile.seafarerData?.seafarerProfile?.profile
                            ?.lastName ||
                          profile.applicationData?.applicationProfile?.profile
                            ?.lastName ||
                          profile.applicationData?.applicantProfile?.profile
                            ?.lastName ||
                          "-"
                        }`}
                      </h1>
                      <div className="flex flex-col md:flex-row gap-2">
                        <button
                          className="border border-[#010064] bg-[#010064] text-white size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30"
                          disabled={isSaving}
                          onClick={save}
                        >
                          <FaFloppyDisk className="h-4 w-4" />
                          <span className="hidden md:block ">Save</span>
                        </button>
                        <button
                          className="border border-blue-300 bg-white text-blue-600 size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50"
                          onClick={() => getCV()}
                        >
                          <HiDocumentDownload className="h-4 w-4" />
                          <span className="hidden md:block ">Print CV</span>
                        </button>
                        <button
                          className="border border-blue-300 bg-white text-blue-600 size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50"
                          onClick={() => setIsOpen(true)}
                        >
                          <HiDotsVertical className="h-4 w-4" />
                          <span className="hidden md:block ">Options</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 text-gray-500 sm:flex-row sm:space-x-4 text-sm">
                      <span>
                        Recruitment Department:{" "}
                        <span className="font-bold">
                          {profile.seafarerData?.vesselType?.[0]?.name ||
                            profile.applicationData?.startApplication
                              .vesselType?.[0]?.name ||
                            "--"}
                        </span>
                      </span>
                      <span>
                        Department:{" "}
                        <span className="font-bold">
                          {profile.seafarerData?.department?.[0]?.name ||
                            profile.applicationData?.startApplication
                              .department?.[0]?.name ||
                            "--"}
                        </span>
                      </span>
                      <span>
                        Position:{" "}
                        <span className="font-bold">
                          {profile.seafarerData?.position?.[0]?.name ||
                            profile.applicationData?.startApplication
                              .position?.[0]?.name ||
                            "--"}
                        </span>
                      </span>
                      <span>
                        Application Date:{" "}
                        <span className="font-bold">
                          {formatDate(
                            profile.seafarerData?.applicationDate || "",
                            "MM-dd-yyyy"
                          )}
                        </span>
                      </span>
                      <div className="flex flex-row justify-end gap-1">
                        <SelectComponents
                          name={"tab"}
                          Text="Select an profile tab"
                          className={"md:hidden"}
                          data={tabs}
                          idKey="Id"
                          valueKey="value"
                          onChange={onSelectChange}
                          name_valor={true}
                          initialValue={tabs[0]}
                        />
                      </div>
                    </div>
                    <div className="hidden md:flex flex-col items-center mt-3 overflow-x-auto">
                      <Button.Group>
                        <Button
                          className={`${
                            currentTab === "1" &&
                            "bg-[#1976d2] text-white focus:text-white"
                          }`}
                          color="gray"
                          onClick={() => setCurrentTab("1")}
                        >
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
                          {tabs[3].value}
                        </Button>
                        <Button
                          className={`${
                            currentTab === "5" &&
                            "bg-[#1976d2] text-white focus:text-white"
                          }`}
                          color="gray"
                          onClick={() => setCurrentTab("5")}
                        >
                          {tabs[4].value}
                        </Button>
                        <Button
                          className={`${
                            currentTab === "6" &&
                            "bg-[#1976d2] text-white focus:text-white"
                          }`}
                          color="gray"
                          onClick={() => setCurrentTab("6")}
                        >
                          {tabs[5].value}
                        </Button>
                        <Button
                          className={`${
                            currentTab === "7" &&
                            "bg-[#1976d2] text-white focus:text-white"
                          }`}
                          color="gray"
                          onClick={() => setCurrentTab("7")}
                        >
                          {tabs[6].value}
                        </Button>
                      </Button.Group>
                    </div>
                  </div>
                </div>
              </div>
              <Card className="mt-5 border-gray-100 pb-5">
                <section className="w-auto overflow-x-auto">
                  {/* {!profile.uid ? ( */}
                  {!profile ? (
                    <LoadingState />
                  ) : !currentTab ? (
                    <LoadingState />
                  ) : currentTab === "1" ? (
                    <Suspense fallback={<LoadingState />}>
                      <RecruitmentSeafarerProfile
                        data={profile.seafarerData?.seafarerProfile}
                        uid={profile.uid}
                        onChange={(e) => handleProfileChange(e)}
                        // onChange={(e) => console.log(e)}
                      />
                    </Suspense>
                  ) : currentTab === "2" ? (
                    <Suspense fallback={<LoadingState />}>
                      <RecruitmentDocuments
                        documentsData={
                          profile.seafarerData?.seafarerDocument || []
                        }
                        additionalData={
                          profile.seafarerData?.additionalDocuments || []
                        }
                        seafarerData={{
                          uid: profile?.uid,
                          firstName:
                            profile.seafarerData?.seafarerProfile?.profile
                              ?.firstName,
                          lastName:
                            profile.seafarerData?.seafarerProfile?.profile
                              ?.lastName,
                        }}
                        onChange={(e) => handleDocumentsChange(e)}
                        // onChange={(e) => console.log(e)}
                      />
                    </Suspense>
                  ) : currentTab === "3" ? (
                    <Suspense fallback={<LoadingState />}>
                      <RecruitmentCertificates
                        certificatesData={
                          profile.seafarerData?.seafarerCertificates || []
                        }
                        additionalData={
                          profile.seafarerData?.additionalCertificates || []
                        }
                        seafarerData={{
                          uid: profile?.uid,
                          firstName:
                            profile.seafarerData?.seafarerProfile?.profile
                              ?.firstName,
                          lastName:
                            profile.seafarerData?.seafarerProfile?.profile
                              ?.lastName,
                        }}
                        onChange={(e) => handleCertificatesChange(e)}
                      />
                    </Suspense>
                  ) : currentTab === "4" ? (
                    <Suspense fallback={<LoadingState />}>
                      <RecruitmentSkills
                        skillsData={profile.seafarerData?.skills}
                        // skillsData={[]}
                        // positionData={profile.seafarerData?.position || []}
                        positionData={currentPositionData || {}}
                        // onChange={(e) => handleSkillsChange(e)}
                      />
                    </Suspense>
                  ) : currentTab === "5" ? (
                    <Suspense fallback={<LoadingState />}>
                      <RecruitmentAttachments />
                    </Suspense>
                  ) : currentTab === "6" ? (
                    <Suspense fallback={<LoadingState />}>
                      <RecruitmentStages uid={profile?.uid} />
                    </Suspense>
                  ) : (
                    <Suspense fallback={<LoadingState />}>
                      <ApplicantAccount />
                    </Suspense>
                  )}
                </section>
              </Card>
            </>
          )}
        </>
      )}
    </>
  );
}
