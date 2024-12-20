import { Badge, Button, Modal, Rating, Textarea } from "flowbite-react";
import {
  DatepickerComponent,
  ModalYesNo,
  SelectComponents,
  YesNoInput,
} from "../../../components/layoutComponents";
import { useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import {
  HiCheckCircle,
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlineDocument,
  HiOutlineExclamationCircle,
  HiOutlineMenuAlt1,
  HiOutlineQuestionMarkCircle,
  HiXCircle,
} from "react-icons/hi";
import { MdRotate90DegreesCcw } from "react-icons/md";
import { useForm } from "../../../hooks";
import { useEffect } from "react";
import { FaFloppyDisk } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  setCurrentInterview,
  setProfileView,
  updateSecondInterview,
} from "../../../store/currentViews/viewSlice";
import toast from "react-hot-toast";
import {
  createNewSecondInterviews,
  createSecondInterviews,
  setLogisticId,
  updateSeafarerDataFirebase,
  updateSecondInterviewDoc,
} from "../../../store/userData";
import Stages from "../../../assets/tables/json/RecruitmentStage-static.json";
import FormF_PMSSA11 from "../../recruitment/components/stages components/FormF_PMSSA11";
import { useMemo } from "react";
import FormatsSecondInterview from "../../recruitment/components/stages components/FormatsSecondInterview";
import { getCitasByInterviewId } from "../../../util/services";
import { convertirFechaYHora } from "../../../util/helperFunctions/convertirFechayHora";
import InterviewSchedule from "../../interview/InterviewSchedule";
import { formatDate } from "../../../util/helperFunctions";

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

export const SecondInterviewForm = ({
  data,
  handleOpenModal = () => {},
  onDataChange = () => {},
  interviewers,
  currentInterviewer,
  isModal = false,
  isNew = false,
}) => {
  const dispatch = useDispatch();
  const { profile, secondInterview, currentInterview } = useSelector(
    (state) => state.currentViews
  );
  const [currentAppointment, setCurrentAppointment] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => {
    setIsOpenModal(true);
  };
  const [openModalInterview, setOpenModalInterview] = useState(false);
  const closeModal = () => setIsOpenModal(false);
  const [currentInterviewerData, setCurrentInterviewerData] =
    useState(currentInterviewer);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [openModalWarning, setOpenModalWarning] = useState(false);
  // Estado centralizado para las evaluaciones
  const [evaluations, setEvaluations] = useState({});

  const loadAppointment = async () => {
    const cita = await getCitasByInterviewId(currentInterview.id);
    console.log(cita);
    setCurrentAppointment(cita);
  };

  useEffect(() => {
    if (currentInterview.id) {
      loadAppointment();
    }
  }, [currentInterview]);

  useEffect(() => {
    if (data?.evaluations) {
      setEvaluations(data?.evaluations);
    }
  }, [data]);

  const interviewData = useMemo(() => data, []);

  const {
    interviewer,
    appointment,
    secondInterviewFolder,
    interviewDate,
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

  const createNewNoStage = () => {
    // Clone the firstInterview array to avoid mutating the original array
    const updatedArray = [...secondInterview, currentData];

    // Dispatch the entire updated array
    dispatch(updateSecondInterview(updatedArray));

    toast.promise(
      Promise.all([dispatch(createSecondInterviews(profile.uid, currentData))]),
      {
        loading: "Saving...",
        success: <b>Saved</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
    setOpenModalWarning(false);
  };

  const createNewStage = () => {
    // Clone the firstInterview array to avoid mutating the original array
    const updatedArray = [...firstInterview, currentData];

    // Dispatch the entire updated array
    dispatch(updateFirstInterview(updatedArray));
    dispatch(updateSeafarerStage(2));

    toast.promise(
      Promise.all([
        dispatch(createFirstInterviews(profile.uid, currentData)),
        dispatch(
          updateSeafarerDataFirebase(profile.uid, profile.seafarerData, 2)
        ),
      ]),
      {
        loading: "Saving...",
        success: <b>Saved</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
    setOpenModalWarning(false);
  };

  const saveNew = (e) => {
    e.preventDefault();
    // Clone the firstInterview array to avoid mutating the original array
    const updatedArray = [...secondInterview, currentData];

    // Dispatch the entire updated array
    dispatch(updateSecondInterview(updatedArray));

    toast.promise(
      Promise.all([
        dispatch(createNewSecondInterviews(profile.uid, currentData)),
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
    const updatedArray = [...secondInterview];
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
    dispatch(updateSecondInterview(updatedArray));
    dispatch(setCurrentInterview(updatedArray[currentIndex]));

    toast.promise(
      Promise.all([
        dispatch(
          updateSecondInterviewDoc(
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

  const handleApprove = (e) => {
    // e.preventDefault();}
    // Clone the firstInterview array to avoid mutating the original array
    const updatedArray = [...secondInterview];
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

    const updatedProfile = { ...profile, recruitmentStage: Stages[3].Id };

    // Dispatch the entire updated array
    dispatch(updateSecondInterview(updatedArray));
    dispatch(setCurrentInterview(updatedArray[currentIndex]));
    dispatch(setProfileView(updatedProfile));
    toast.promise(
      Promise.all([
        dispatch(
          updateSecondInterviewDoc(
            profile.uid,
            updatedArray[currentIndex].id,
            updatedArray[currentIndex],
            "Approved"
          ),
          dispatch(
            updateSeafarerDataFirebase(
              profile.uid,
              profile.seafarerData,
              Stages[3].Id
            )
          ),
          dispatch(setLogisticId(profile.uid))
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

  const handleDeny = (e) => {
    // e.preventDefault();
    // Clone the firstInterview array to avoid mutating the original array
    const updatedArray = [...secondInterview];
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

    const updatedProfile = { ...profile, recruitmentStage: Stages[14].Id };

    // Dispatch the entire updated array
    dispatch(updateSecondInterview(updatedArray));
    dispatch(setCurrentInterview(updatedArray[currentIndex]));
    dispatch(setProfileView(updatedProfile));
    toast.promise(
      Promise.all([
        dispatch(
          updateSecondInterviewDoc(
            profile.uid,
            updatedArray[currentIndex].id,
            updatedArray[currentIndex],
            "Dissaproved"
          ),
          dispatch(
            updateSeafarerDataFirebase(
              profile.uid,
              profile.seafarerData,
              Stages[14].Id
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

  const handleReview = (e) => {
    // e.preventDefault();
    // Clone the firstInterview array to avoid mutating the original array
    const updatedArray = [...secondInterview];
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

    const updatedProfile = { ...profile, recruitmentStage: Stages[2].Id };

    // Dispatch the entire updated array
    dispatch(updateSecondInterview(updatedArray));
    dispatch(setCurrentInterview(updatedArray[currentIndex]));
    dispatch(setProfileView(updatedProfile));
    toast.promise(
      Promise.all([
        dispatch(
          updateSecondInterviewDoc(
            profile.uid,
            updatedArray[currentIndex].id,
            updatedArray[currentIndex],
            "Reviewing"
          ),
          dispatch(
            updateSeafarerDataFirebase(
              profile.uid,
              profile.seafarerData,
              Stages[2].Id
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

  const handlePending = (e) => {
    // e.preventDefault();
    // Clone the firstInterview array to avoid mutating the original array
    const updatedArray = [...secondInterview];
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

    const updatedProfile = { ...profile, recruitmentStage: Stages[2].Id };

    // Dispatch the entire updated array
    dispatch(updateSecondInterview(updatedArray));
    dispatch(setCurrentInterview(updatedArray[currentIndex]));
    dispatch(setProfileView(updatedProfile));
    toast.promise(
      Promise.all([
        dispatch(
          updateSecondInterviewDoc(
            profile.uid,
            updatedArray[currentIndex].id,
            updatedArray[currentIndex],
            "Pending"
          ),
          dispatch(
            updateSeafarerDataFirebase(
              profile.uid,
              profile.seafarerData,
              Stages[2].Id
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
        "Are you sure you want to approve this applicant's interview and set them on GAP Pool?"
      );
      setModalConfirm(() => handleApprove);
    } else if (type === "deny") {
      setModalText(
        "Are you sure you want to deny this applicant's Second Interview?"
      );
      setModalConfirm(() => handleDeny);
    } else if (type === "review") {
      setModalText(
        "Are you sure you want to set this Second Interview as In Review?"
      );
      setModalConfirm(() => handleReview);
    } else if (type === "pending") {
      setModalText(
        "Are you sure you want to set this Second Interview as Pending?"
      );
      setModalConfirm(() => handlePending);
    }
    openModal();
  };

  const handleFolder = (value) => {
    const today = formatDate(new Date().toISOString(), "yyyy-mm-dd");
    if (value) {
      // dispatch(
      //   setCurrentInterview({
      //     ...currentInterview,
      //     firstInterviewFolder: { date: today },
      //   })
      // );
      onInputChange({
        target: { name: "secondInterviewFolder", value: { date: today } },
      });
    } else {
      // dispatch(
      //   setCurrentInterview({
      //     ...currentInterview,
      //     firstInterviewFolder: { date: "" },
      //   })
      // );
      onInputChange({
        target: { name: "secondInterviewFolder", value: { date: "" } },
      });
    }
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
              // onClick={() => handleOpenModal("approve")}
              onClick={() => {
                if (isModal) {
                  handleInception("approve");
                } else {
                  handleOpenModal("approve");
                }
              }}
              // disabled={disabled}
            >
              <HiCheckCircle className="h-4 w-4" />
              <span className="hidden md:block ">Approve</span>
            </button>
            <button
              className={`border border-red-600 bg-red-600 text-white size-10 md:w-28 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-red-700 ${
                disabled ? "opacity-30 cursor-not-allowed" : ""
              } `}
              // onClick={() => handleOpenModal("deny")}
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
              // onClick={() => handleOpenModal("review")}
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
              // onClick={() => handleOpenModal("review")}
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
              <span className="hidden md:block ">Pending</span>
            </button>
          </div>
          <button
            className={`${
              isModal ? "" : "hidden"
            } border border-[#010064] bg-[#010064] text-white size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
            // disabled={
            //   isSaving || statusValid || !status || !company || companyValid
            // }
            onClick={(e) => (isNew ? setOpenModalWarning(true) : save(e))}
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
                  {/* {!isFormValid && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    !
                  </span>
                )} */}
                </div>
                <span className="mt-2 md:mt-0 md:ml-2 text-xs md:text-sm">
                  Details
                </span>
              </Tab>
              <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 md:translate-y-0 h-15 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
                <div className="relative flex items-center">
                  <HiOutlineClipboardList className="w-7 h-7 inline-block mr-1" />
                  {/* {!isFormValidEmergency && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    !
                  </span>
                )} */}
                </div>
                <span className="mt-2 md:mt-0 md:ml-2 text-xs md:text-sm">
                  Interview Form (F-PMSSA-11)
                </span>
              </Tab>
              <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
                <div className="relative flex items-center">
                  <HiOutlineDocument className="w-7 h-7 inline-block mr-1" />
                  {/* {!isFormValidVaccines && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    !
                  </span>
                )} */}
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
                      idKey={"id"}
                      valueKey={"displayName"}
                      name_valor={true}
                      initialValue={
                        interviewer?.id
                          ? interviewer?.id
                          : currentInterviewerData
                      }
                      onChange={(e) => onSelectChange(e, "interviewer")}
                    />
                    {/* <DatepickerComponent
                      name="appointment"
                      label="Appointment Date"
                      datevalue={appointment || ""}
                      // datevalue={""}
                      onChange={onInputChange}
                      classnamedate="px-0 ps-0.5 md:ps-1 w-full h-full"
                      // isValid={dateBirthValid ? false : true}
                    /> */}
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-zinc-400">Appointment</span>
                      <button
                        className="border text-sm border-zinc-300 h-10 bg-white rounded-lg hover:bg-zinc-100 text-zinc-500"
                        onClick={() => setOpenModalInterview(true)}
                      >
                        {currentAppointment.lenght < 1
                          ? "No Appointment"
                          : `${
                              currentAppointment &&
                              currentAppointment[0] &&
                              currentAppointment[0].start
                                ? convertirFechaYHora(
                                    currentAppointment[0].start.toDate()
                                  )
                                : "No Appointment"
                            }`}
                      </button>
                    </div>
                    <DatepickerComponent
                      name="interviewDate"
                      label="Interview Date"
                      datevalue={interviewDate || ""}
                      // datevalue={""}
                      onChange={(e) => onInputChange(e)}
                      classnamedate="px-0 ps-0.5 md:ps-1 w-full h-full"
                      // isValid={dateBirthValid ? false : true}
                    />
                    <YesNoInput
                      text="Second Interview Folder Done"
                      classname="justify-left"
                      defaultChecked={
                        secondInterviewFolder?.date ? true : false
                      }
                      onChange={(e) => handleFolder(e.target.value)}
                      // name="newquestion4"
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
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>

                  <div>
                    <span className="text-gray-500">Evaluations</span>
                    <div className="m-auto mt-3 grid grid-cols-1 gap-6 items-end md:grid-cols-3 xl:grid-cols-3">
                      {/* Evaluaciones usando el componente reutilizable */}
                      <Evaluation
                        label="Language"
                        rating={evaluations?.language || ""}
                        onRatingChange={(value) =>
                          handleRatingChange("language", value)
                        }
                      />
                      <Evaluation
                        label="Technical Knowledge"
                        rating={evaluations?.techknow || ""}
                        onRatingChange={(value) =>
                          handleRatingChange("techknow", value)
                        }
                      />
                    </div>
                  </div>
                </section>
              </TabPanel>
              <TabPanel>
                <section className="min-h-96 pt-6">
                  <FormF_PMSSA11
                    formData={data?.fpmssa11}
                    onDataChange={(e) =>
                      onInputChange({ target: { name: "fpmssa11", value: e } })
                    }
                  />
                </section>
              </TabPanel>
              <TabPanel>
                <section className="min-h-96">
                  <FormatsSecondInterview />{" "}
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
      <Modal
        show={openModalInterview}
        size="xxl"
        onClose={() => setOpenModalInterview(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <InterviewSchedule
              type={2}
              uid={currentInterview.uid}
              onAppointmentChange={() => loadAppointment()}
              interviewId={currentInterview.id}
              userName={`${
                profile.seafarerData?.seafarerProfile?.profile?.firstName || ""
              } ${
                profile.seafarerData?.seafarerProfile?.profile?.lastName || ""
              }`}
            />
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={openModalWarning}
        size="md"
        onClose={() => setOpenModalWarning(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Adding a new first interview will set this seafarer's stage as
              "Second Interview". Do you want to continue?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={() => createNewNoStage()}>
                Dont set the new stage
              </Button>
              <Button color="failure" onClick={() => createNewStage()}>
                Set new stage
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
};
