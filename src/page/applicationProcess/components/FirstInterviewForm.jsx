import { Badge, Rating, Textarea } from "flowbite-react";
import {
  DatepickerComponent,
  ModalYesNo,
  SelectComponents,
  YesNoInput,
} from "../../../components/layoutComponents";
import { useState, useEffect } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import {
  HiCheckCircle,
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlineDocument,
  HiOutlineMenuAlt1,
  HiOutlineQuestionMarkCircle,
  HiXCircle,
} from "react-icons/hi";
import { MdRotate90DegreesCcw } from "react-icons/md";
import { useForm } from "../../../hooks";
import { FaFloppyDisk } from "react-icons/fa6";
import { useSelector } from "react-redux";
import {
  setCurrentInterview,
  setProfileView,
  updateFirstInterview,
} from "../../../store/currentViews/viewSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  createNewFirstInterviews,
  createSecondInterviews,
  updateFirstInterviewDoc,
  updateSeafarerDataFirebase,
} from "../../../store/userData";
import Stages from "../../../assets/tables/json/RecruitmentStage-static.json";
import FormF_PMSSA7 from "../../recruitment/components/stages components/FormF_PMSSA7";
import FormF_PMSSA11 from "../../recruitment/components/stages components/FormF_PMSSA11";
import FormF_PMSSA20 from "../../recruitment/components/stages components/FormF_PMSSA20";
import FormF_PMSSA7_V5 from "../../recruitment/components/stages components/FormF_PMSSA7_V5";
import { useMemo } from "react";
import FormatsFirstInterview from "../../recruitment/components/stages components/FormatsFirstInterview";

// Componente de evaluación reutilizable
const Evaluation = ({ label, rating, onRatingChange }) => {
  return (
    <div>
      <span className="text-gray-600 text-sm">{label}:</span>
      <Rating size={"md"}>
        {[1, 2, 3, 4].map((value) => (
          <Rating.Star
            key={value}
            className="hover:cursor-pointer"
            filled={rating >= value}
            onClick={() => onRatingChange(value)}
          />
        ))}
      </Rating>
    </div>
  );
};

export const FirstInterviewForm = ({
  data,
  handleOpenModal = () => {},
  onDataChange = () => {},
  interviewers,
  currentInterviewer,
  isModal = false,
  isNew = false,
}) => {
  const dispatch = useDispatch();
  const { profile, firstInterview, currentInterview } = useSelector(
    (state) => state.currentViews
  );
  const [currentInterviewerData, setCurrentInterviewerData] =
    useState(currentInterviewer);

  const [currentData, setCurrentData] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => {
    setIsOpenModal(true);
  };
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const closeModal = () => setIsOpenModal(false);

  // Estado centralizado para las evaluaciones
  const [evaluations, setEvaluations] = useState({});

  useEffect(() => {
    if (data?.evaluations) {
      setEvaluations(data?.evaluations);
    }
  }, [data]);

  const interviewData = useMemo(() => data, []);

  // Hook para gestionar el formulario
  const {
    interviewer,
    appointment,
    interviewDate,
    firstInterviewFolder,
    comment,
    formState,
    unsavedChanges,
    onInputChange,
    onSelectChange,
  } = useForm(
    interviewData || {
      interviewer: "",
      appointment: "",
      interviewDate: "",
      comment: "",
    }
  );

  // Manejador de cambios de evaluación
  const handleRatingChange = (field, value) => {
    setEvaluations((prev) => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  // Combinar formState y evaluations para pasar a onDataChange
  useEffect(() => {
    let combinedState = {
      ...formState,
      evaluations: evaluations || {},
    };
    if (!formState.interviewer) {
      combinedState = {
        ...formState,
        interviewer: {
          id: currentInterviewerData,
          name: interviewers.find(
            (current) => current.uid === currentInterviewerData
          )?.displayName,
        },
      };
      dispatch(setCurrentInterview(combinedState));
    }
    if (unsavedChanges || hasUnsavedChanges) {
      if (isModal) {
        setCurrentData(combinedState);
      } else {
        onDataChange(combinedState);
      }
      dispatch(setCurrentInterview(combinedState));
    }
  }, [formState, evaluations]);

  const disabled = false;
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "purple";
      case "Appointed":
        return "default";
      case "Approved":
        return "green";
      case "Dissapproved":
        return "red";
      case "Reviewing":
        return "yellow";
      default:
        return "gray"; // Default color
    }
  };

  const statusColor = getStatusColor(data?.status);

  const saveNew = (e) => {
    e.preventDefault();
    // Clone the firstInterview array to avoid mutating the original array
    const updatedArray = [...firstInterview, currentData];

    // Dispatch the entire updated array
    dispatch(updateFirstInterview(updatedArray));

    toast.promise(
      Promise.all([
        dispatch(createNewFirstInterviews(profile.uid, currentData)),
      ]),
      {
        loading: "Saving...",
        success: <b>Saved</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
    // setSaved(true);
    // setHasUnsavedChanges(false);
  };

  const save = (e) => {
    e.preventDefault();
    // Clone the firstInterview array to avoid mutating the original array
    const updatedArray = [...firstInterview];
    const currentIndex = updatedArray.findIndex(
      (item) => item.id === currentInterview.id
    );

    // Actualización de current interview
    const updatedData = currentData || data;
    updatedArray[currentIndex] = {
      ...updatedArray[currentIndex],
      ...updatedData,
    };

    // Si no existe interviewer, añadir currentInterviewerData
    if (!updatedArray[currentIndex].interviewer) {
      updatedArray[currentIndex] = {
        ...updatedArray[currentIndex],
        interviewer: { id: currentInterviewerData },
      };
    }

    // Dispatch the entire updated array
    dispatch(updateFirstInterview(updatedArray));
    dispatch(setCurrentInterview(updatedArray[currentIndex]));

    toast.promise(
      Promise.all([
        dispatch(
          updateFirstInterviewDoc(
            profile.uid,
            updatedArray[currentIndex].id,
            updatedArray[currentIndex],
            updatedArray[currentIndex].status
          )
        ),
      ]),
      {
        loading: "Saving...",
        success: <b>Saved</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
    // setSaved(true);
    // setHasUnsavedChanges(false);
  };

  const handleApprove = () => {
    // e.preventDefault();
    // Clone the firstInterview array to avoid mutating the original array
    const updatedArray = [...firstInterview];
    const currentIndex = updatedArray.findIndex(
      (item) => item.id === currentInterview.id
    );

    // Verifica si existe currentData, y mezcla con los datos existentes
    const newUpdatedData = {
      ...(updatedArray[currentIndex] || {}), // Mantén los datos actuales del array
      ...(currentData || data), // Mezcla currentData o data si están presentes
      status: "Approved", // Sobrescribe el campo status
    };

    // Actualiza el array con el nuevo objeto fusionado
    updatedArray[currentIndex] = newUpdatedData;

    if (!updatedArray[currentIndex].interviewer) {
      updatedArray[currentIndex] = {
        ...updatedArray[currentIndex],
        interviewer: { id: currentInterviewerData },
      };
    }

    const updatedProfile = {
      ...profile,
      recruitmentStage: Stages[2].Id,
      secondInterviewGoDate: new Date().toISOString(),
    };

    // Dispatch the entire updated array
    dispatch(updateFirstInterview(updatedArray));
    dispatch(setCurrentInterview(updatedArray[currentIndex]));
    dispatch(setProfileView(updatedProfile));
    toast.promise(
      Promise.all([
        dispatch(
          updateFirstInterviewDoc(
            profile.uid,
            updatedArray[currentIndex].id,
            updatedArray[currentIndex],
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
    // setSaved(true);
    // setHasUnsavedChanges(false);
  };

  const handleDeny = () => {
    // e.preventDefault();
    // Clone the firstInterview array to avoid mutating the original array
    const updatedArray = [...firstInterview];
    const currentIndex = updatedArray.findIndex(
      (item) => item.id === currentInterview.id
    );

    // Verifica si existe currentData, y mezcla con los datos existentes
    const newUpdatedData = {
      ...(updatedArray[currentIndex] || {}), // Mantén los datos actuales del array
      ...(currentData || data), // Mezcla currentData o data si están presentes
      status: "Dissaproved", // Sobrescribe el campo status
    };

    // Actualiza el array con el nuevo objeto fusionado
    updatedArray[currentIndex] = newUpdatedData;

    if (!updatedArray[currentIndex].interviewer) {
      updatedArray[currentIndex] = {
        ...updatedArray[currentIndex],
        interviewer: { id: currentInterviewerData },
      };
    }

    const updatedProfile = { ...profile, recruitmentStage: Stages[13].Id };

    // Dispatch the entire updated array
    dispatch(updateFirstInterview(updatedArray));
    dispatch(setCurrentInterview(updatedArray[currentIndex]));
    dispatch(setProfileView(updatedProfile));
    toast.promise(
      Promise.all([
        dispatch(
          updateFirstInterviewDoc(
            profile.uid,
            updatedArray[currentIndex].id,
            updatedArray[currentIndex],
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
    // setSaved(true);
    // setHasUnsavedChanges(false);
  };

  const handleReview = () => {
    // e.preventDefault();
    // Clone the firstInterview array to avoid mutating the original array
    const updatedArray = [...firstInterview];
    const currentIndex = updatedArray.findIndex(
      (item) => item.id === currentInterview.id
    );

    // Verifica si existe currentData, y mezcla con los datos existentes
    const newUpdatedData = {
      ...(updatedArray[currentIndex] || {}), // Mantén los datos actuales del array
      ...(currentData || data), // Mezcla currentData o data si están presentes
      status: "Reviewing", // Sobrescribe el campo status
    };

    // Actualiza el array con el nuevo objeto fusionado
    updatedArray[currentIndex] = newUpdatedData;

    if (!updatedArray[currentIndex].interviewer) {
      updatedArray[currentIndex] = {
        ...updatedArray[currentIndex],
        interviewer: { id: currentInterviewerData },
      };
    }

    const updatedProfile = { ...profile, recruitmentStage: Stages[1].Id };

    // Dispatch the entire updated array
    dispatch(updateFirstInterview(updatedArray));
    dispatch(setCurrentInterview(updatedArray[currentIndex]));
    dispatch(setProfileView(updatedProfile));
    toast.promise(
      Promise.all([
        dispatch(
          updateFirstInterviewDoc(
            profile.uid,
            updatedArray[currentIndex].id,
            updatedArray[currentIndex],
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
    // setSaved(true);
    // setHasUnsavedChanges(false);
  };

  const handlePending = () => {
    // e.preventDefault();
    // Clone the firstInterview array to avoid mutating the original array
    const updatedArray = [...firstInterview];
    const currentIndex = updatedArray.findIndex(
      (item) => item.id === currentInterview.id
    );

    // Verifica si existe currentData, y mezcla con los datos existentes
    const newUpdatedData = {
      ...(updatedArray[currentIndex] || {}), // Mantén los datos actuales del array
      ...(currentData || data), // Mezcla currentData o data si están presentes
      status: "Pending", // Sobrescribe el campo status
    };

    // Actualiza el array con el nuevo objeto fusionado
    updatedArray[currentIndex] = newUpdatedData;

    if (!updatedArray[currentIndex].interviewer) {
      updatedArray[currentIndex] = {
        ...updatedArray[currentIndex],
        interviewer: { id: currentInterviewerData },
      };
    }

    const updatedProfile = { ...profile, recruitmentStage: Stages[1].Id };

    // Dispatch the entire updated array
    dispatch(updateFirstInterview(updatedArray));
    dispatch(setCurrentInterview(updatedArray[currentIndex]));
    dispatch(setProfileView(updatedProfile));
    toast.promise(
      Promise.all([
        dispatch(
          updateFirstInterviewDoc(
            profile.uid,
            updatedArray[currentIndex].id,
            updatedArray[currentIndex],
            "Pending"
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
    // setSaved(true);
    // setHasUnsavedChanges(false);
  };

  const [modalText, setModalText] = useState("");
  const [modalConfirm, setModalConfirm] = useState(() => () => {});

  const handleInception = (type) => {
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
    } else if (type === "pending") {
      setModalText(
        "Are you sure you want to set this First Interview as Pending?"
      );
      setModalConfirm(() => handlePending);
    }
    openModal();
  };

  return (
    <section>
      <section>
        <div className="flex flex-row justify-between items-center gap-2">
          <div
            className={`${
              isModal ? "hidden" : ""
            } font-bold flex flex-row items-center justify-start gap-2`}
          >
            Interview Status:
            <Badge color={statusColor} size={"sm"}>
              {data?.status}
            </Badge>
          </div>
          <div className="flex justify-center md:justify-start gap-2 my-2">
            <button
              className={`border border-green-500 bg-green-500 text-white size-10 md:w-28 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-green-600 ${
                disabled ? "opacity-30 cursor-not-allowed" : ""
              }`}
              onClick={() => {
                if (isModal) {
                  handleInception("approve");
                } else {
                  handleOpenModal("approve");
                }
              }}
            >
              <HiCheckCircle className="h-4 w-4" />
              <span className="hidden md:block ">Approve</span>
            </button>
            <button
              className={`border border-red-600 bg-red-600 text-white size-10 md:w-28 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-red-700 ${
                disabled ? "opacity-30 cursor-not-allowed" : ""
              } `}
              onClick={() => {
                if (isModal) {
                  handleInception("deny");
                } else {
                  handleOpenModal("deny");
                }
              }}
              disabled={disabled}
            >
              <HiXCircle className="h-4 w-4" />
              <span className="hidden md:block ">Decline</span>
            </button>
            <button
              className={`border border-blue-300 bg-white text-blue-600 size-10 md:w-28 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50 ${
                disabled ? "opacity-30 cursor-not-allowed" : ""
              } `}
              onClick={() => {
                if (isModal) {
                  handleInception("review");
                } else {
                  handleOpenModal("review");
                }
              }}
              disabled={disabled}
            >
              <MdRotate90DegreesCcw className="h-4 w-4" />
              <span className="hidden md:block ">In Review</span>
            </button>
            <button
              className={`border border-yellow-300 bg-white text-yellow-600 size-10 md:w-28 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-yellow-50 ${
                disabled ? "opacity-30 cursor-not-allowed" : ""
              } `}
              onClick={() => {
                if (isModal) {
                  handleInception("pending");
                } else {
                  handleOpenModal("pending");
                }
              }}
              disabled={disabled}
            >
              <HiOutlineClock className="h-4 w-4" />
              <span className="hidden md:block ">Set Pending</span>
            </button>
          </div>
          <button
            className={`${
              isModal ? "" : "hidden"
            } border border-[#010064] bg-[#010064] text-white size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
            // disabled={
            //   isSaving || statusValid || !status || !company || companyValid
            // }
            onClick={isNew ? saveNew : save}
            title={isNew ? "Save New" : "Save"}
          >
            <FaFloppyDisk className="h-4 w-4" />
            <span className="hidden md:block ">
              {isNew ? "Save New" : "Save"}
            </span>
          </button>
        </div>

        <div className="my-5">
          <TabGroup>
            <TabList className=" flex flex-row  justify-center bg-white  ">
              <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 flex flex-col md:flex-row py-2 text-sm text-black items-center justify-center md:w-56 relative">
                <div className=" relative flex items-center">
                  <HiOutlineMenuAlt1 className=" w-7 h-7 md:inline-block mr-1 flex " />
                </div>
                <span className="mt-2 md:mt-0 md:ml-2 text-xs md:text-sm">
                  Details
                </span>
              </Tab>
              <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 md:translate-y-0 h-15 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
                <div className="relative flex items-center">
                  <HiOutlineClipboardList className="w-7 h-7 inline-block mr-1" />
                </div>
                <span className="mt-2 md:mt-0 md:ml-2 text-xs md:text-sm">
                  Interview Form (F-PMSSA-07)
                </span>
              </Tab>
              <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
                <div className="relative flex items-center">
                  <HiOutlineDocument className="w-7 h-7 inline-block mr-1" />
                </div>
                <span className="mt-2 md:mt-0 md:ml-2 text-xs md:text-sm">
                  Operational Forms
                </span>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <section className="min-h-96">
                  <div className="m-auto grid grid-cols-1 gap-6 items-end sm:grid-cols-1 md:grid-cols-4 xl:grid-cols-4 pt-6">
                    <SelectComponents
                      Text="Select Interviewer"
                      name={"interviewer"}
                      valueDefault="Interviewer"
                      data={interviewers}
                      name_valor={true}
                      idKey={"uid"}
                      valueKey={"displayName"}
                      initialValue={
                        interviewer?.id
                          ? interviewer?.id
                          : currentInterviewerData
                      }
                      onChange={(e) => onSelectChange(e, "interviewer")}
                    />
                    <DatepickerComponent
                      name="appointment"
                      label="Appointment Date"
                      datevalue={appointment || ""}
                      onChange={onInputChange}
                      classnamedate="px-0 ps-0.5 md:ps-1 w-full h-full"
                    />
                    <DatepickerComponent
                      name="interviewDate"
                      label="Interview Date"
                      datevalue={interviewDate || ""}
                      onChange={onInputChange}
                      classnamedate="px-0 ps-0.5 md:ps-1 w-full h-full"
                    />
                    <YesNoInput
                      text="First Interview Folder Done"
                      classname="justify-left"
                      defaultChecked={firstInterviewFolder?.date ? true : false}
                      // onChange={changeData}
                      name="newquestion4"
                    />
                  </div>

                  <div className="mt-5 mb-5">
                    <Textarea
                      id="comment"
                      name="comment"
                      value={comment}
                      placeholder="Interview Comment..."
                      required
                      rows={4}
                      color="blue"
                      onChange={onInputChange}
                    />
                  </div>

                  <div>
                    <span className="text-gray-500">Evaluations</span>
                    <div className="m-auto mt-3 grid grid-cols-1 gap-6 items-end md:grid-cols-3 xl:grid-cols-3">
                      <Evaluation
                        label="English Level"
                        rating={evaluations?.english || 0}
                        onRatingChange={(value) =>
                          handleRatingChange("english", value)
                        }
                      />
                      <Evaluation
                        label="Experience"
                        rating={evaluations?.experience || 0}
                        onRatingChange={(value) =>
                          handleRatingChange("experience", value)
                        }
                      />
                      <Evaluation
                        label="Personality"
                        rating={evaluations?.personality || 0}
                        onRatingChange={(value) =>
                          handleRatingChange("personality", value)
                        }
                      />
                    </div>
                  </div>
                </section>
              </TabPanel>
              <TabPanel className="">
                <section>
                  {/* <FormF_PMSSA7/> */}
                  <FormF_PMSSA7_V5
                    formData={data?.fpmssa07}
                    onDataChange={(e) =>
                      onInputChange({ target: { name: "fpmssa07", value: e } })
                    }
                  />
                </section>
              </TabPanel>
              <TabPanel>
                <section className="min-h-96">
                  {" "}
                  <FormatsFirstInterview />{" "}
                </section>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </section>
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
    </section>
  );
};

export default FirstInterviewForm;
