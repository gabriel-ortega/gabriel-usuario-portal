import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  approveProfileUpdate,
  getProfileUpdate,
  getSeafarerData,
  readProfileUpdate,
  setLoading,
} from "../../store/userData";
import { useDispatch } from "react-redux";
import { compareData } from "../../util/helperFunctions/compareData";
import { useState } from "react";
import { LoadingState } from "../../components/skeleton/LoadingState";
import { FormPrompt } from "../../hooks/FormPrompt";
import { Badge, Button, Card, Drawer, Label } from "flowbite-react";
import {
  HiArrowLeft,
  HiCheckCircle,
  HiDotsVertical,
  HiOutlineUser,
} from "react-icons/hi";
import { formatDate, formatTitleCase } from "../../util/helperFunctions";
import { SelectComponents } from "../../components/layoutComponents";
import { Suspense } from "react";
import { lazy } from "react";
import { Navigate } from "react-big-calendar";
import { useNavigate } from "react-router-dom";
import {
  setProfileView,
  updateSeafarerData,
} from "../../store/currentViews/viewSlice";
import toast from "react-hot-toast";
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

export const ReviewUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { profileUpdate, profile } = useSelector((state) => state.currentViews);
  const [oldData, setOldData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const [profileChanges, setProfileChanges] = useState();
  const [contactsChanges, setContactsChanges] = useState();
  const [vaccinesChanges, setVaccinesChanges] = useState();
  const [languagesChanges, setLanguagesChanges] = useState();
  const [documentsChanges, setDocumentsChanges] = useState();
  const [additionalDocumentsChanges, setadditionalDocumentsChanges] =
    useState();
  const [certificatesChanges, setCertificatesChanges] = useState();
  const [additionalCertificatesChanges, setadditionalCertificatesChanges] =
    useState();
  const [onboardChanges, setOnboardChanges] = useState();
  const [onlandChanges, setOnlandChanges] = useState();
  const [setskillsChanges, setSkillsChanges] = useState();

  const handleBackClick = () => {
    navigate("/updaterequests");
  };

  const seeProfile = () => {
    dispatch(setProfileView({}));
    navigate("/profile/" + profile.uid);
  };

  useEffect(() => {
    if (id !== profileUpdate?.id) {
      dispatch(getProfileUpdate(id)); // Cargar el perfil inicial.
    }
  }, [id, profileUpdate?.id]);

  useEffect(() => {
    if (profileUpdate?.uid) {
      dispatch(getSeafarerData(profileUpdate.uid)); // Cargar datos del marinero cuando `profileUpdate` tenga `uid`.
      if (!profileUpdate.isRead) {
        dispatch(readProfileUpdate(profileUpdate.id, profileUpdate));
      }
    }
  }, [profileUpdate?.uid]);

  // Comparar datos y almacenar cambios
  useEffect(() => {
    setIsLoading(true);
    if (profileUpdate?.seafarerData && profile?.seafarerData) {
      const old = profile?.seafarerData;
      const updated = profileUpdate.seafarerData;

      // Comparar y actualizar estados
      setProfileChanges(
        compareData(
          old.seafarerProfile.profile,
          updated.seafarerProfile.profile
        )
      );
      setContactsChanges(
        compareData(
          old.seafarerProfile.contacts.contact,
          updated.seafarerProfile.contacts.contact
        )
      );
      setVaccinesChanges(
        compareData(
          old.seafarerProfile.vaccines,
          updated.seafarerProfile.vaccines
        )
      );
      setLanguagesChanges(
        compareData(old.seafarerProfile.lang, updated.seafarerProfile.lang)
      );
      setDocumentsChanges(
        compareData(old.seafarerDocument, updated.seafarerDocument)
      );
      setCertificatesChanges(
        compareData(old.seafarerCertificates, updated.seafarerCertificates)
      );
      setOnboardChanges(
        compareData(old.skills.onboard, updated.skills.onboard)
      );
      setOnlandChanges(compareData(old.skills.onland, updated.skills.onland));
      setSkillsChanges(compareData(old.skills.skill, updated.skills.skill));
      if (!oldData) {
        console.log("reemplazando");
        // Actualizar datos globales con los nuevos
        dispatch(updateSeafarerData(updated));
        setOldData(old);
      }
      setIsLoading(false);
    }
  }, [profileUpdate, profile, dispatch]);

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

  const approve = () => {
    setLoading(true);
    toast.promise(
      dispatch(
        approveProfileUpdate(
          profile.uid,
          profileUpdate.id,
          profile.seafarerData,
          profileUpdate
        )
      ),
      {
        loading: "Saving...",
        success: <b>Saved!</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
    setLoading(false);
  };

  useEffect(() => {
    console.log(profileChanges);
  }, [profileChanges]);

  return (
    <section>
      <>
        {!oldData ? (
          <LoadingState />
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
                title="Update Details"
                titleIcon={() => <HiDotsVertical className="h-4 w-4 mr-2" />}
              />
              <Drawer.Items>
                <div>
                  <Label className="text-gray-400 ">Profile Changes</Label>
                  <div className="mt-3">
                    <ul className="space-y-3">
                      {Object.entries(profileChanges).map(([key, change]) => {
                        // Verificar si el valor es un objeto
                        const value1 =
                          typeof change.value1 === "object"
                            ? change.value1.value
                            : change.value1;
                        const value2 =
                          typeof change.value2 === "object"
                            ? change.value2.value
                            : change.value2;

                        // Convertir booleanos a texto "true" o "false"
                        const formattedValue1 =
                          typeof value1 === "boolean"
                            ? value1.toString()
                            : value1;
                        const formattedValue2 =
                          typeof value2 === "boolean"
                            ? value2.toString()
                            : value2;

                        return (
                          <li key={key} className="flex flex-row gap-3">
                            <span className="text-sm">
                              {formatTitleCase(key)}:
                            </span>
                            <span>{formattedValue1}</span>
                            {formattedValue2 === "" ? (
                              <Badge color={"red"}>deleted</Badge>
                            ) : (
                              <Badge color={"green"}>changed</Badge>
                            )}
                            <span>{formattedValue2}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </Drawer.Items>
            </Drawer>
            <button
              className="flex flex-auto items-center text-[#1976d2] text-sm font-style: italic hover:bg-blue-50"
              onClick={handleBackClick}
              // disabled={isSaving}
            >
              <HiArrowLeft className="h-4 w-4 mr-2" />
              Back to Update Requests
            </button>
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
                    {/* {userData.profileUpdate ? null : ( */}
                    <div className="flex flex-col md:flex-row gap-2">
                      <button
                        title="View Profile"
                        className="border border-blue-300 bg-white text-blue-600 size-10 md:w-28 md:h-10 flex gap-1 justify-center items-center rounded-lg text-sm hover:bg-blue-50"
                        onClick={() => seeProfile()}
                      >
                        <HiOutlineUser className="h-4 w-4" />
                        <span className="hidden md:block ">View Profile</span>
                      </button>
                      {profile.profileUpdate ? (
                        <>
                          <button
                            className="border border-green-500 bg-green-500 text-white size-10 md:w-44 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-green-600 disabled:opacity-30"
                            disabled={isLoading}
                            onClick={() => approve()}
                          >
                            <HiCheckCircle className="h-4 w-4" />
                            <span className="hidden md:block ">
                              Approve Update
                            </span>
                          </button>
                          <button
                            className="border border-blue-300 bg-white text-blue-600 size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50"
                            onClick={() => setIsOpen(true)}
                          >
                            <HiDotsVertical className="h-4 w-4" />
                            <span className="hidden md:block ">Details</span>
                          </button>
                        </>
                      ) : (
                        <Badge color={"info"}>Update Approved</Badge>
                      )}
                    </div>
                    {/* )} */}
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
                      isUpdate={true}
                      // onChange={(e) => handleProfileChange(e)}
                      // disabled={userData.profileUpdate || false}
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
                      // onChange={(e) => handleDocumentsChange(e)}
                      // disabled={userData.profileUpdate || false}
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
                      // onChange={(e) => handleCertificatesChange(e)}
                      // disabled={userData.profileUpdate || false}
                    />
                  </Suspense>
                ) : currentTab === "4" ? (
                  <Suspense fallback={<LoadingState />}>
                    <RecruitmentSkills
                      skillsData={profile.seafarerData?.skills}
                      positionData={profile.seafarerData?.position || []}
                      // disabled={userData.profileUpdate || false}
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
    </section>
  );
};

export default ReviewUpdate;
