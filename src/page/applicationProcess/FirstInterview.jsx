import { Badge, Card } from "flowbite-react";
import { FaFloppyDisk } from "react-icons/fa6";
import {
  HiArrowLeft,
  HiOutlinePlusSm,
  HiOutlineQuestionMarkCircle,
  HiOutlineUser,
} from "react-icons/hi";
import {
  ModalYesNo,
  SelectComponents,
} from "../../components/layoutComponents";
import { useState } from "react";
import { FirstInterviewForm } from "./components/FirstInterviewForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getFirstInterviews, getSeafarerData } from "../../store/userData";
import { getInterviewers } from "../../util/services";
import toast from "react-hot-toast";
import { LoadingState } from "../../components/skeleton/LoadingState";
import { FormPrompt } from "../../hooks/FormPrompt";
import {
  setCurrentInterview,
  setFirstInterview,
  setProfileView,
  updateFirstInterview,
} from "../../store/currentViews/viewSlice";
import {
  createSecondInterviews,
  updateFirstInterviewDoc,
  updateSeafarerDataFirebase,
} from "../../store/userData/thunks";
import Stages from "../../assets/tables/json/RecruitmentStage-static.json";

export default function FirstInterview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isSaving } = useSelector((state) => state.userData);
  const { uid } = useSelector((state) => state.auth);
  const { profile, firstInterview, currentInterview } = useSelector(
    (state) => state.currentViews
  );
  const [profileData, setProfileData] = useState(profile);

  const [latestVersion, setLatestVersion] = useState(0);
  const [versions, setVersions] = useState([{ id: 0, name: "v1" }]);
  const [selectedVersion, setSelectedVersion] = useState([]);
  const [interviewers, setInterviewers] = useState([]);
  // const [firstInterviewData, setFirstInterviewData] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [Saved, setSaved] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => setIsOpenModal(false);

  const load = async () => {
    const data = await getInterviewers();
    setInterviewers(data);
  };

  useEffect(() => {
    if (interviewers.length < 1) {
      load();
    }
    if (profile?.uid !== id) {
      dispatch(getFirstInterviews(id));
      dispatch(getSeafarerData(id));
    }
  }, []);

  const handleBackClick = () => {
    navigate("/firstinterviews");
  };

  useEffect(() => {
    if (firstInterview) {
      setVersions(
        firstInterview // Invierte el orden de los elementos
          .map((version, index) => ({
            id: index.toString(),
            name: `v${index + 1}`,
          }))
      );
      setLatestVersion(firstInterview.length - 1);
    }
  }, [firstInterview]);

  // useEffect(() => {

  //     setSelectedVersion(versions[latestVersion]);

  //     setFirstInterviewData(firstInterview[latestVersion]);

  //     dispatch(setCurrentInterview(firstInterview[latestVersion]));

  // }, [versions, latestVersion, firstInterview]);
  useEffect(() => {
    if (
      versions.length > 0 &&
      latestVersion >= 0 &&
      firstInterview[latestVersion]
    ) {
      const selected = versions[latestVersion];
      if (
        selectedVersion?.id !== selected?.id ||
        currentInterview !== firstInterview[latestVersion]
      ) {
        setSelectedVersion(selected);
        // setFirstInterviewData(firstInterview[latestVersion]);
        dispatch(setCurrentInterview(firstInterview[latestVersion]));
      }
    }
  }, [versions, latestVersion, firstInterview]);

  const handleVersionChange = (e) => {
    if (e[0].id) {
      setSelectedVersion(e[0]);
      dispatch(setCurrentInterview(firstInterview[e[0].id]));
    }
  };

  const save = (e) => {
    e.preventDefault();
    // Clone the firstInterview array to avoid mutating the original array
    const updatedArray = [...firstInterview];

    // Replace the object at the index [latestVersion] with updatedData

    // const targetData = updatedData[selectedVersion.id] || firstInterviewData;
    const targetData = updatedData[selectedVersion.id] || currentInterview;

    updatedArray[selectedVersion.id] = {
      ...targetData,
      interviewer: targetData.interviewer || { id: uid },
    };

    // console.log(updatedArray[selectedVersion.id]);

    // Dispatch the entire updated array
    dispatch(updateFirstInterview(updatedArray));
    dispatch(setCurrentInterview(updatedArray[selectedVersion.id]));

    toast.promise(
      Promise.all([
        dispatch(
          updateFirstInterviewDoc(
            profile.uid,
            // firstInterviewData.id,
            currentInterview.id,
            updatedArray[selectedVersion.id],
            currentInterview.status
          )
        ),
      ]),
      {
        loading: "Saving...",
        success: <b>Saved</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
    setSaved(true);
    setHasUnsavedChanges(false);
  };

  const seeProfile = () => {
    navigate("/profile/" + id);
  };

  const handleApprove = (e) => {
    // Clone the firstInterview array to avoid mutating the original array
    const updatedArray = [...firstInterview];

    // Replace the object at the index [latestVersion] with updatedData
    // const targetData = updatedData[selectedVersion] || firstInterviewData;
    const targetData = updatedData[selectedVersion] || currentInterview;

    const newUpdatedData = {
      ...targetData,
      status: "Approved",
      interviewer: targetData.interviewer || { id: uid },
    };

    updatedArray[selectedVersion.id] = newUpdatedData;

    const updatedProfile = { ...profile, recruitmentStage: Stages[2].Id };

    console.log(updatedArray[selectedVersion.id]);

    // Dispatch the entire updated array
    dispatch(updateFirstInterview(updatedArray));
    dispatch(setProfileView(updatedProfile));
    dispatch(setCurrentInterview(updatedArray[selectedVersion.id]));

    toast.promise(
      Promise.all([
        dispatch(
          updateFirstInterviewDoc(
            profile.uid,
            // firstInterviewData.id,
            currentInterview.id,
            updatedArray[selectedVersion.id],
            "Approved"
          ),
          dispatch(
            updateSeafarerDataFirebase(
              profile.uid,
              profile.seafarerData,
              Stages[2].Id
            )
          ),
          dispatch(createSecondInterviews(profile.uid))
        ),
      ]),
      {
        loading: "Saving...",
        success: <b>Saved & Approved</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
    setSaved(true);
    setHasUnsavedChanges(false);
  };

  const handleDeny = (e) => {
    // Clone the firstInterview array to avoid mutating the original array
    const updatedArray = [...firstInterview];

    // Replace the object at the index [latestVersion] with updatedData
    // const targetData = updatedData[selectedVersion] || firstInterviewData;
    const targetData = updatedData[selectedVersion] || currentInterview;

    const newUpdatedData = {
      ...targetData,
      status: "Dissaproved",
      interviewer: targetData.interviewer || { id: uid },
    };

    updatedArray[selectedVersion.id] = newUpdatedData;

    const updatedProfile = { ...profile, recruitmentStage: Stages[13].Id };

    console.log(updatedArray[selectedVersion.id]);

    // Dispatch the entire updated array
    dispatch(updateFirstInterview(updatedArray));
    dispatch(setProfileView(updatedProfile));
    dispatch(setCurrentInterview(updatedArray[selectedVersion.id]));

    toast.promise(
      Promise.all([
        dispatch(
          updateFirstInterviewDoc(
            profile.uid,
            // firstInterviewData.id,
            currentInterview.id,
            updatedArray[selectedVersion.id],
            "Dissaproved"
          ),
          dispatch(
            updateSeafarerDataFirebase(
              profile.uid,
              profile.seafarerData,
              Stages[13].Id
            )
          )
        ),
      ]),
      {
        loading: "Saving...",
        success: <b>Saved & Dissaproved</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
    setSaved(true);
    setHasUnsavedChanges(false);
  };

  const handleReview = (e) => {
    // Clone the firstInterview array to avoid mutating the original array
    const updatedArray = [...firstInterview];

    // Replace the object at the index [latestVersion] with updatedData
    // const targetData = updatedData[selectedVersion] || firstInterviewData;
    const targetData = updatedData[selectedVersion] || currentInterview;

    const newUpdatedData = {
      ...targetData,
      status: "Reviewing",
      interviewer: targetData.interviewer || { id: uid },
    };

    updatedArray[selectedVersion.id] = newUpdatedData;
    const updatedProfile = { ...profile, recruitmentStage: Stages[1].Id };

    console.log(updatedArray[selectedVersion.id]);

    // Dispatch the entire updated array
    dispatch(updateFirstInterview(updatedArray));
    dispatch(setProfileView(updatedProfile));
    dispatch(setCurrentInterview(updatedArray[selectedVersion.id]));

    toast.promise(
      Promise.all([
        dispatch(
          updateFirstInterviewDoc(
            profile.uid,
            // firstInterviewData.id,
            currentInterview.id,
            updatedArray[selectedVersion.id],
            "Reviewing"
          ),
          dispatch(
            updateSeafarerDataFirebase(
              profile.uid,
              profile.seafarerData,
              Stages[1].Id
            )
          )
        ),
      ]),
      {
        loading: "Saving...",
        success: <b>Saved</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
    setSaved(true);
    setHasUnsavedChanges(false);
  };

  const [modalText, setModalText] = useState("");
  const [modalConfirm, setModalConfirm] = useState(() => () => {});

  const handleOpenModal = (type) => {
    if (type === "approve") {
      setModalText(
        "Are you sure you want to approve this applicant and set it ready for Second Interview?"
      );
      setModalConfirm(() => handleApprove);
    } else if (type === "deny") {
      setModalText(
        "Are you sure you want to deny this applicant's First Interview?"
      );
      setModalConfirm(() => handleDeny);
    } else if (type === "review") {
      setModalText(
        "Are you sure you want to set this First Interview as In Review?"
      );
      setModalConfirm(() => handleReview);
    }
    openModal();
  };
  const [updatedData, setUpdatedData] = useState({});

  const handleDataChange = (newData) => {
    const updatedInterviews = [...firstInterview];
    updatedInterviews[selectedVersion.id] = newData; // Update the object at the selected position
    if (updatedInterviews !== updatedData) {
      if (!hasUnsavedChanges && !Saved) {
        setHasUnsavedChanges(true);
      }
      setUpdatedData(updatedInterviews);
    }
  };

  const handleNew = () => {
    console.log("hola");
  };

  return (
    <>
      <FormPrompt hasUnsavedChanges={hasUnsavedChanges} />
      <button
        className="flex flex-auto items-center text-[#1976d2] text-sm font-style: italic hover:bg-blue-50"
        onClick={handleBackClick}
        // disabled={isSaving}
      >
        <HiArrowLeft className="h-4 w-4 mr-2" />
        Back to First Interviews
      </button>
      <div className="w-full shadow-lg rounded-lg p-6">
        <div className="flex flex-col   lg:justify-between">
          <div className="flex-row space-y-2">
            <div className="flex flex-row items-center gap-3">
              <h2 className="tracking-tight text-gray-500">
                Seafarer First Interviews:
              </h2>
              <div className="w-28 md:w-1/6">
                <SelectComponents
                  Text="Version"
                  name="selectedVersion"
                  name_valor={true}
                  data={
                    versions
                      .slice() // Crear una copia para no mutar el original
                      .reverse() || []
                  }
                  idKey={"id"}
                  valueKey={"name"}
                  initialValue={selectedVersion?.id}
                  onChange={(e) => handleVersionChange(e)}
                />
              </div>
              <button
                disabled
                title="New Interview"
                className="border border-blue-300 bg-white text-blue-600 size-10 md:w-32 md:h-10 flex gap-1 justify-center items-center rounded-lg text-sm hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed"
                onClick={() => handleNew()}
              >
                <HiOutlinePlusSm className="h-4 w-4" />
                <span className="hidden md:block ">New Interview</span>
              </button>
            </div>
            <div className="flex flex-row justify-between items-center gap-2">
              <h1 className="text-2xl md:text-3xl  font-bold tracking-tight w-[85%]">
                {`${
                  profile?.seafarerData?.seafarerProfile?.profile?.firstName ||
                  "-"
                } ${
                  profile?.seafarerData?.seafarerProfile?.profile?.lastName ||
                  "-"
                }`}
              </h1>
              <div className="flex flex-col md:flex-row gap-2">
                <button
                  title="Save"
                  className="border border-[#010064] bg-[#010064] text-white size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30"
                  disabled={isSaving}
                  onClick={(e) => save(e)}
                >
                  <FaFloppyDisk className="h-4 w-4" />
                  <span className="hidden md:block ">Save</span>
                </button>
                <button
                  title="View Profile"
                  className="border border-blue-300 bg-white text-blue-600 size-10 md:w-28 md:h-10 flex gap-1 justify-center items-center rounded-lg text-sm hover:bg-blue-50"
                  onClick={() => seeProfile()}
                >
                  <HiOutlineUser className="h-4 w-4" />
                  <span className="hidden md:block ">View Profile</span>
                </button>
              </div>
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
                Recruitment Stage: {/* <span className="font-bold"> */}
                <div className="flex items-center justify-start">
                  <Badge color="purple">
                    {profile?.recruitmentStage
                      ? Stages[profile?.recruitmentStage - 1].StageName
                      : "Undefined"}
                  </Badge>
                </div>
                {/* </span> */}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Card className="mt-5 border-gray-100 pb-5">
        <section className="w-auto overflow-x-auto my-5 mx-3">
          {!currentInterview?.id || currentInterview == undefined ? (
            <LoadingState />
          ) : (
            <FirstInterviewForm
              // data={firstInterviewData}
              data={currentInterview}
              interviewers={interviewers}
              currentInterviewer={uid}
              handleOpenModal={(e) => handleOpenModal(e)}
              onDataChange={(e) => handleDataChange(e)}
            />
          )}
        </section>
      </Card>
      <ModalYesNo
        text={modalText}
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
    </>
  );
}
