import { useEffect, useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SelectComponents } from "../../components/layoutComponents";
import { Alert, Badge, Button, Card, Drawer } from "flowbite-react";
import { HiArrowLeft, HiDotsVertical } from "react-icons/hi";
import { FaFloppyDisk } from "react-icons/fa6";
import { LoadingState } from "../../components/skeleton/LoadingState";
import { FormPrompt } from "../../hooks/FormPrompt";
import { formatDate } from "../../util/helperFunctions";
import {
  getProfileUpdate,
  getSeafarerData,
  setUserData,
  submitProfileUpdate,
} from "../../store/userData";
import toast from "react-hot-toast";
import { setProfileView } from "../../store/currentViews/viewSlice";
import notFound from "../../assets/imagenes/notFound.gif";
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

export default function MyProfile() {
  const dispatch = useDispatch();
  const { userData, isSaving } = useSelector((state) => state.userData);
  const { profile } = useSelector((state) => state.currentViews);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [existe, setExiste] = useState(true);
  const [isLoading, setIsLoading] = useState(!profile?.uid ? false : true);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let existe = "";
      try {
        if (!profile?.profileUpdate) dispatch(getSeafarerData(userData.uid));
        else dispatch(getProfileUpdate(userData.uid));
        setExiste(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [profile?.uid, userData.uid, dispatch]);

  const handleBackClick = () => {
    navigate("/home");
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

  const save = (e) => {
    e.preventDefault();
    const data = { ...profile, profileUpdate: true };
    dispatch(setProfileView(data));
    dispatch(setUserData(data));
    toast.promise(
      dispatch(submitProfileUpdate(profile.uid, profile.seafarerData)),
      {
        loading: "Saving...",
        success: <b>Saved!</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
    setHasUnsavedChanges(false);
  };

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          {1 === userData.recruitmentStage ||
          7 === userData.recruitmentStage ||
          8 === userData.recruitmentStage ||
          9 === userData.recruitmentStage ||
          10 === userData.recruitmentStage ||
          11 === userData.recruitmentStage ||
          12 === userData.recruitmentStage ||
          13 === userData.recruitmentStage ||
          14 === userData.recruitmentStage ||
          15 === userData.recruitmentStage ||
          16 === userData.recruitmentStage ||
          17 === userData.recruitmentStage ||
          18 === userData.recruitmentStage ? (
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
                  Back to Home
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
                <Drawer.Items></Drawer.Items>
              </Drawer>
              <button
                className="flex flex-auto items-center text-[#1976d2] text-sm font-style: italic hover:bg-blue-50"
                onClick={handleBackClick}
                disabled={isSaving}
              >
                <HiArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </button>
              {userData.profileUpdate && (
                <Alert color="warning" rounded>
                  <span className="font-medium">Profile Update Pending!</span>{" "}
                  An agent will be reviewing your update request soon. In the
                  meantime, any changes will not reflect on your profile.
                </Alert>
              )}
              <div className="w-full shadow-lg rounded-lg p-6">
                <div className="flex flex-col   lg:justify-between">
                  <div className="flex-row space-y-2">
                    <div className="flex flex-row justify-between items-center gap-2">
                      <h1 className="text-2xl md:text-3xl  font-bold tracking-tight w-[85%]">
                        {`${
                          profile?.seafarerData?.seafarerProfile?.profile
                            ?.firstName || "-"
                        } ${
                          profile?.seafarerData?.seafarerProfile?.profile
                            ?.lastName || "-"
                        }`}
                      </h1>
                      {userData.profileUpdate ? null : (
                        <div className="flex flex-col md:flex-row gap-2">
                          <button
                            className="border border-[#010064] bg-[#010064] text-white size-10 md:w-36 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30"
                            disabled={isSaving}
                            onClick={save}
                          >
                            <FaFloppyDisk className="h-4 w-4" />
                            <span className="hidden md:block ">
                              Request Update
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 text-gray-500 sm:flex-row sm:space-x-4 text-sm">
                      <span>
                        Recruitment Department:{" "}
                        <span className="font-bold">
                          {profile.seafarerData?.vesselType
                            ? profile.seafarerData?.vesselType[0]?.name
                            : "--"}
                        </span>
                      </span>
                      <span>
                        Department:{" "}
                        <span className="font-bold">
                          {profile.seafarerData?.department
                            ? profile.seafarerData?.department[0]?.name
                            : "--"}
                        </span>
                      </span>
                      <span>
                        Position:{" "}
                        <span className="font-bold">
                          {profile.seafarerData?.position
                            ? profile.seafarerData?.position[0]?.name
                            : "--"}
                        </span>
                      </span>
                      <span>
                        Application Date:{" "}
                        <span className="font-bold">
                          {formatDate(
                            profile.seafarerData?.applicationDate,
                            // "dd-mm-yyyy"
                            "mm-dd-yyyy"
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
                        <Button color="gray" onClick={() => setCurrentTab("1")}>
                          {/* <HiUserCircle className="mr-3 h-4 w-4" /> */}
                          {tabs[0].value}
                        </Button>
                        <Button color="gray" onClick={() => setCurrentTab("2")}>
                          {/* <HiAdjustments className="mr-3 h-4 w-4" /> */}
                          {tabs[1].value}
                        </Button>
                        <Button color="gray" onClick={() => setCurrentTab("3")}>
                          {/* <HiCloudDownload className="mr-3 h-4 w-4" /> */}
                          {tabs[2].value}
                        </Button>
                        <Button color="gray" onClick={() => setCurrentTab("4")}>
                          {/* <HiCloudDownload className="mr-3 h-4 w-4" /> */}
                          {tabs[3].value}
                        </Button>
                      </Button.Group>
                    </div>
                  </div>
                </div>
              </div>
              <Card className="mt-5 border-gray-100 pb-5">
                <section className="w-auto overflow-x-auto">
                  {!profile.uid ? (
                    <LoadingState />
                  ) : !currentTab ? (
                    <LoadingState />
                  ) : currentTab === "1" ? (
                    <Suspense fallback={<LoadingState />}>
                      <RecruitmentSeafarerProfile
                        data={profile.seafarerData?.seafarerProfile}
                        uid={profile.uid}
                        onChange={(e) => handleProfileChange(e)}
                        disabled={userData.profileUpdate || false}
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
                        disabled={userData.profileUpdate || false}
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
                        disabled={userData.profileUpdate || false}
                      />
                    </Suspense>
                  ) : currentTab === "4" ? (
                    <Suspense fallback={<LoadingState />}>
                      <RecruitmentSkills
                        skillsData={profile.seafarerData?.skills}
                        positionData={profile.seafarerData?.position || []}
                        disabled={userData.profileUpdate || false}
                        // onChange={(e) => handleSkillsChange(e)}
                      />
                    </Suspense>
                  ) : (
                    <Suspense fallback={<LoadingState />}>
                      <div>User Account Manager</div>
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
