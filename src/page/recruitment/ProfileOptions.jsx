import React from "react";
import { Card, Popover, Table, Textarea, Tooltip } from "flowbite-react";
import { GoPlusCircle } from "react-icons/go";
import {
  ModalYesNo,
  SelectComponents,
} from "../../components/layoutComponents";
import {
  HiOutlinePencil,
  HiOutlinePencilAlt,
  HiOutlineReply,
  HiXCircle,
} from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { LoadingState } from "../../components/skeleton/LoadingState";
import { FaFloppyDisk } from "react-icons/fa6";
import { useEffect } from "react";
import {
  getDepartments,
  getPositions,
  getVesselType,
} from "../../util/services";
import {
  setProfileView,
  updateSeafarerData,
  updateSeafarerDepartment,
  updateSeafarerPosition,
  updateSeafarerStage,
  updateSeafarerVesselType,
} from "../../store/currentViews/viewSlice";
import toast from "react-hot-toast";
import {
  updateSeafarerDataFirebase,
  updateSeafarerNotes,
  updateUsersData,
} from "../../store/userData";
import stageData from "../../assets/tables/json/RecruitmentStage-static.json";
import { formatDate, getSeafarerDataObject } from "../../util/helperFunctions";

export const ProfileOptions = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const { profile } = useSelector((state) => state.currentViews);
  const { userData } = useSelector((state) => state.userData);
  const [currentModal, setCurrentModal] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [clean, setClean] = useState();
  const [datafilter, setDataFilter] = useState({
    Vessel: [],
    Departament: [],
    Position: [],
  });
  const [selectedValues, setSelectedValues] = useState({
    vesselType: profile?.seafarerData?.vesselTypessel || [],
    department: profile?.seafarerData?.department || [],
    position: profile?.seafarerData?.position || [],
  });
  const [disableSelect, setDisableSelect] = useState({
    Vessel: false,
    Departament: false,
    Position: false,
  });
  const [currentComment, setCurrentComment] = useState({});
  const [commentState, setCommentState] = useState("");
  const [sortedNotes, setSortedNotes] = useState([]);
  const [sortedHistory, setSortedHistory] = useState([]);
  const [hasApplicationData, setHasApplicationData] = useState();

  useEffect(() => {
    if (
      profile.recruitmentStage === 1 && // Verifica que el stage sea 1
      profile.seafarerData && // Asegura que exista seafarerData
      Object.keys(profile.seafarerData).length === 0 && // Verifica que el objeto esté vacío
      profile.applicationData && // Asegura que exista applicationData
      Object.keys(profile.applicationData).length > 0 // Verifica que el objeto no esté vacío
    ) {
      setHasApplicationData(true);
    } else {
      setHasApplicationData(false); // Asegura que el estado se actualice si las condiciones no se cumplen
    }
  }, [profile]);

  const seguimientoStages = [
    7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 22, 23, 24, 25, 26, 27,
  ];

  const onCurrentCommentChange = (e) => {
    const { name, value } = e.target;
    setCurrentComment((prev) => ({
      ...prev,
      note: { ...prev.note, [name]: value },
    }));
  };

  const onInsertCommentChange = (e) => {
    const { value } = e.target;
    setCommentState(value);
  };

  const loadResults = async () => {
    try {
      const vessel = await getVesselType();
      const department = await getDepartments();
      const position = await getPositions();
      setData({
        Vessel: vessel,
        Departament: department,
        Position: position,
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  useEffect(() => {
    if (profile?.seafarerData) {
      setSelectedValues({
        vesselType: profile?.seafarerData?.vesselType,
        department: profile?.seafarerData?.department,
        position: profile?.seafarerData?.position,
      });
    }
    if (!data.Departament || !data.Position) {
      loadResults();
    }
  }, [profile]);

  useEffect(() => {
    if (!isLoading) {
      // console.log(selectedValues.vesselType);
      if (selectedValues.vesselType) {
        if (data.Departament.length !== 0 && data.Position.length !== 0) {
          if (!disableSelect.Vessel) {
            setDataFilter((prevState) => ({
              ...prevState,
              Departament: data.Departament.filter((item) => {
                const filterdepartament = item.TypeOfVessel.replace(
                  /[{}]/g,
                  ""
                ).split(",");
                return filterdepartament.includes(
                  selectedValues.vesselType[0].id
                );
              }),
              Position: data.Position.filter((dept) =>
                selectedValues.vesselType[0].id === "1"
                  ? dept.PassengerDeptID == selectedValues.department[0].id
                  : dept.MerchantDeptID == selectedValues.department[0].id
              ),
            }));
          }
        }
      }
    }
  }, [clean, data, isLoading]);

  const handleSelectChange = (value, name) => {
    if (
      selectedValues.vesselType[0].id == "" &&
      disableSelect.Departament == true
    ) {
      setSelectedValues((prevState) => ({
        ...prevState,
        department: [{ id: "", name: "" }],
      }));
    }

    if (
      (selectedValues.department[0].id == "" &&
        disableSelect.Position == true) ||
      selectedValues.vesselType[0].id == ""
    ) {
      setSelectedValues((prevState) => ({
        ...prevState,
        position: [{ id: "", name: "" }],
      }));
    }
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setClean(clean == false ? true : false);
  };
  const [selectedStage, setselectedStage] = useState({});

  const handleStageChange = (e) => {
    setselectedStage(e[0]);
  };

  const closeModal = (e) => {
    e.preventDefault(), setIsOpen(false);
    // setEditData(null);
  };
  useEffect(() => {
    const sortedNotes = profile.notes
      ? [...profile.notes]
          .filter((note) => note.type === 1 || note.type === 3)
          .sort((a, b) => new Date(b["createdOn"]) - new Date(a["createdOn"]))
      : [];
    setSortedNotes(sortedNotes);
  }, [profile.notes]);

  useEffect(() => {
    const sortedHistory = profile.notes
      ? [...profile.notes]
          .filter((note) => note.type === 2)
          .sort((a, b) => new Date(b["createdOn"]) - new Date(a["createdOn"]))
      : [];
    setSortedHistory(sortedHistory);
  }, [profile.notes]);

  const updatePosition = () => {
    const { position, department } = selectedValues;
    dispatch(updateSeafarerPosition(position));
    dispatch(updateSeafarerDepartment(department));
    const toUpdate = {
      ...profile.seafarerData,
      position: position,
      department: department,
    };
    setIsOpen(false);
    toast.promise(dispatch(updateSeafarerDataFirebase(profile.uid, toUpdate)), {
      loading: "Saving...",
      success: <b>Saved!</b>,
      error: <b>Ups! Something went wrong. Try again</b>,
    });
  };

  const updateRecDept = () => {
    const { vesselType } = selectedValues;
    dispatch(updateSeafarerVesselType(vesselType));
    const toUpdate = {
      ...profile.seafarerData,
      vesselType: vesselType,
    };
    setIsOpen(false);
    toast.promise(dispatch(updateSeafarerDataFirebase(profile.uid, toUpdate)), {
      loading: "Saving...",
      success: <b>Saved!</b>,
      error: <b>Ups! Something went wrong. Try again</b>,
    });
  };

  const updateStage = () => {
    const newStage = Number(selectedStage.id);
    dispatch(updateSeafarerStage(newStage));
    setIsOpen(false);
    toast.promise(
      dispatch(
        updateSeafarerDataFirebase(profile.uid, profile.seafarerData, newStage)
      ),
      {
        loading: "Saving...",
        success: <b>Saved!</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
  };

  const updateNote = () => {
    const updatedNotes = sortedNotes.map((note, index) => {
      // Verifica si el id coincide y actualiza el note
      if (index === currentComment.id) {
        return { ...note, Note: currentComment.note.Note };
      }

      return note; // Devuelve la nota sin cambios si el id no coincide
    });

    toast.promise(dispatch(updateSeafarerNotes(profile.uid, updatedNotes)), {
      loading: "Saving...",
      success: <b>Saved!</b>,
      error: <b>Ups! Something went wrong. Try again</b>,
    });
    setIsOpen(false);
  };

  const addNewNote = () => {
    // Crear la nueva nota con un ID único (puedes ajustarlo según tu lógica de ID)
    const newNoteEntry = {
      Note: commentState,
      type: 1,
      createdOn: new Date().toISOString().split("T")[0],
      user: userData.displayName || "Anonymous", // Ajusta según el usuario actual
    };

    // Agregar la nueva nota a la lista de notas existentes
    const updatedNotes = [...profile.notes, newNoteEntry];

    toast.promise(dispatch(updateSeafarerNotes(profile.uid, updatedNotes)), {
      loading: "Saving...",
      success: <b>Saved!</b>,
      error: <b>Ups! Something went wrong. Try again</b>,
    });
    setCommentState("");
  };

  const deleteNote = () => {
    // Filtrar notas excluyendo la nota con el id seleccionado
    const updatedNotes = sortedNotes.filter(
      (note, index) => index !== currentComment.id
    );

    // Despachar el estado actualizado
    toast.promise(dispatch(updateSeafarerNotes(profile.uid, updatedNotes)), {
      loading: "Deleting...",
      success: <b>Deleted!</b>,
      error: <b>Ups! Something went wrong. Try again</b>,
    });

    setIsOpen(false); // Cierra el modal o popup si estás usando uno
  };

  const [retireMessage, setRetireMessage] = useState("");
  const [reactivateMessage, setReactivateMessage] = useState("");

  const handleRetireModal = () => {
    const currentStage = profile.recruitmentStage;
    let message = "";

    switch (currentStage) {
      case 1:
        message =
          "This applicant has decided to withdraw from the application process, their status will change to 'Retired in Application Process'";
        break;
      case 2:
        message =
          "This applicant has decided to withdraw from the application process, their status will change to 'Retired in First Interview'";
        break;
      case 3:
        message =
          "This applicant has decided to withdraw from the application process, their status will change to 'Retired in Second Interview'";
        break;
      case 4:
        message =
          "This applicant has decided to withdraw from the application process, their status will change to 'Retired in GAP Pool'";
        break;
      case 5:
        message =
          "This applicant has decided to withdraw from the application process, their status will change to 'Refused - Own Request / Active Retired'";
        break;
      case 6:
        message =
          "This applicant has decided to withdraw from the application process, their status will change to 'Refused - Own Request / Active Retired'";
        break;
      case 13:
        message =
          "This applicant has decided to withdraw from the application process, their status will change to 'Retired in Evaluation'";
        break;
      case 20:
        message =
          "This applicant has decided to withdraw from the application process while being in VACATION, what status do you wish to apply";
        break;
      default:
        message = "Invalid stage";
    }

    setRetireMessage(message);
    setCurrentModal("retire");
    setIsOpen(true);
  };

  const handleReactivateModal = () => {
    const currentStage = profile.SeguimientoID;
    let message = "";

    switch (currentStage) {
      case 1:
        message =
          "This applicant was retired in the application process, their status will change to 'Application Process'";
        break;
      case 2:
        message =
          "This applicant was retired in First Interview, their status will change to 'First Interview'";
        break;
      case 3:
        message =
          "This applicant was retired in Second Interview, their status will change to 'Second Interview'";
        break;
      case 4:
        message =
          "This applicant was retired in GAP Pool, their status will change to 'GAP Pool'";
        break;
      case 5:
        message =
          "This applicant was retired in Hiring Process, their status will change to 'GAP Pool'";
        break;
      case 6:
        message =
          "This applicant was retired in Embarkation Process, their status will change to 'GAP Pool'";
        break;
      case 13:
        message =
          "This applicant was retired in Evaluation, their status will change to 'Evaluation'";
        break;
      case 20:
        message =
          "This applicant was retired from the application process while being in VACATION, their status will change to 'GAP Pool'";
        break;
      default:
        message = "Invalid stage";
    }

    setReactivateMessage(message);
    setCurrentModal("reactivate");
    setIsOpen(true);
  };

  const handleRetireStage = () => {
    const currentStage = profile.recruitmentStage;

    let newStage;
    let additionalFields = {};

    switch (currentStage) {
      case 1:
        newStage = 10;
        additionalFields = { available: false };
        break;
      case 2:
        newStage = 8;
        additionalFields = {
          firstInterview: { status: "Retired" },
          available: false,
        };
        break;
      case 3:
        newStage = 9;
        additionalFields = {
          secondInterview: { status: "Retired" },
          available: false,
        };
        break;
      case 4:
        newStage = 16;
        additionalFields = { available: false };
        break;
      case 5:
        newStage = 23;
        additionalFields = { available: false };
        break;
      case 6:
        newStage = 23;
        additionalFields = { available: false };
        break;
      case 13:
        newStage = 7;
        additionalFields = { available: false };
        break;
      case 20:
        newStage = 23;
        additionalFields = { available: false };
        break;
      // case 20:
      //   // Prompt user for decision (e.g., modal with options)
      //   const answerOptions = ["Own Request", "Mind Change", "Unavailable"];
      //   const respuesta = window.prompt(
      //     "This applicant has decided to withdraw while on VACATION. Choose a status to apply:",
      //     answerOptions.join(", ")
      //   );

      //   switch (respuesta) {
      //     case "Own Request":
      //       newStage = 23;
      //       additionalFields = { Available: false };
      //       break;
      //     case "Mind Change":
      //       newStage = 22;
      //       additionalFields = { Available: false };
      //       break;
      //     case "Unavailable":
      //       newStage = 25;
      //       additionalFields = { Available: false };
      //       break;
      //     default:
      //       return; // Exit if no valid response
      //   }

      //   // Set active contract to false for currentStage 20
      //   const activeContract = (profile.contracts || []).find(
      //     (contract) => contract.Active
      //   );
      //   if (activeContract) {
      //     additionalFields.contracts = profile.contracts.map((contract) =>
      //       contract === activeContract ? { ...contract, Active: false } : contract
      //     );
      //   }
      //   break;
      default:
        console.warn("Invalid stage");
        return;
    }

    // Dispatch the update with new recruitment stage and additional fields
    const updatedSeafarerData = {
      recruitmentStage: newStage,
      ...additionalFields,
      SeguimientoDate: new Date().toISOString(),
      SeguimientoID: currentStage,
    };

    const profileData = {
      ...profile,
      recruitmentStage: newStage,
      ...additionalFields,
      SeguimientoDate: new Date().toISOString(),
      SeguimientoID: currentStage,
    };
    setIsOpen(false);

    dispatch(setProfileView(profileData));

    toast.promise(dispatch(updateUsersData(profile.uid, updatedSeafarerData)), {
      loading: "Saving...",
      success: <b>Saved!</b>,
      error: <b>Ups! Something went wrong. Try again</b>,
    });
  };

  const handleReactivate = () => {
    const currentStage = profile.SeguimientoID;

    let newStage;
    let additionalFields = {};

    switch (currentStage) {
      case 1:
        newStage = currentStage;
        additionalFields = { available: true };
        break;
      case 2:
        newStage = currentStage;
        additionalFields = {
          available: true,
        };
        break;
      case 3:
        newStage = currentStage;
        additionalFields = {
          available: true,
        };
        break;
      case 4:
        newStage = currentStage;
        additionalFields = { available: true };
        break;
      case 5:
        newStage = 4;
        additionalFields = { available: true };
        break;
      case 6:
        newStage = 4;
        additionalFields = { available: true };
        break;
      case 13:
        newStage = currentStage;
        additionalFields = { available: true };
        break;
      case 20:
        newStage = 4;
        additionalFields = { available: true };
        break;
      // case 20:
      //   // Prompt user for decision (e.g., modal with options)
      //   const answerOptions = ["Own Request", "Mind Change", "Unavailable"];
      //   const respuesta = window.prompt(
      //     "This applicant has decided to withdraw while on VACATION. Choose a status to apply:",
      //     answerOptions.join(", ")
      //   );

      //   switch (respuesta) {
      //     case "Own Request":
      //       newStage = 23;
      //       additionalFields = { Available: false };
      //       break;
      //     case "Mind Change":
      //       newStage = 22;
      //       additionalFields = { Available: false };
      //       break;
      //     case "Unavailable":
      //       newStage = 25;
      //       additionalFields = { Available: false };
      //       break;
      //     default:
      //       return; // Exit if no valid response
      //   }

      //   // Set active contract to false for currentStage 20
      //   const activeContract = (profile.contracts || []).find(
      //     (contract) => contract.Active
      //   );
      //   if (activeContract) {
      //     additionalFields.contracts = profile.contracts.map((contract) =>
      //       contract === activeContract ? { ...contract, Active: false } : contract
      //     );
      //   }
      //   break;
      default:
        console.warn("Invalid stage");
        return;
    }

    // Dispatch the update with new recruitment stage and additional fields
    const updatedSeafarerData = {
      recruitmentStage: newStage,
      ...additionalFields,
      SeguimientoDate: "",
      SeguimientoID: 0,
    };

    const profileData = {
      ...profile,
      recruitmentStage: newStage,
      ...additionalFields,
      SeguimientoDate: "",
      SeguimientoID: 0,
    };
    setIsOpen(false);

    dispatch(setProfileView(profileData));

    toast.promise(dispatch(updateUsersData(profile.uid, updatedSeafarerData)), {
      loading: "Saving...",
      success: <b>Saved!</b>,
      error: <b>Ups! Something went wrong. Try again</b>,
    });
  };

  const handleSetProfileData = () => {
    const seafarerData = getSeafarerDataObject(profile.applicationData);
    // console.log(seafarerData);
    dispatch(updateSeafarerData(seafarerData));
  };

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 justify-start items-start">
        {hasApplicationData && (
          <button
            onClick={() => {
              setCurrentModal("applicationData");
              setIsOpen(true);
            }}
            className="text-sm font-sans text-white  bg-[#010064]  hover:bg-[#262550] py-2 px-4 rounded flex items-center gap-2 transition-all duration-200"
          >
            Set Application Data
          </button>
        )}
        <button
          onClick={() => {
            setCurrentModal("changePosition");
            setIsOpen(true);
          }}
          className="text-sm font-sans text-blue-500 hover:text-white bg-blue-50 hover:bg-blue-500 py-2 px-4 rounded flex items-center gap-2 transition-all duration-200"
        >
          Change Position / Department
        </button>
        <button
          onClick={() => {
            setCurrentModal("transfer");
            setIsOpen(true);
          }}
          className="text-sm font-sans text-yellow-500 hover:text-white bg-yellow-50 hover:bg-yellow-500 py-2 px-4 rounded flex items-center gap-2 transition-all duration-200"
        >
          Transfer Recruitment Department
        </button>
        <button
          onClick={() => {
            setCurrentModal("reject");
            setIsOpen(true);
          }}
          className="text-sm font-sans text-green-500 hover:text-white bg-green-50 hover:bg-green-500 py-2 px-4 rounded flex items-center gap-2 transition-all duration-200"
        >
          Update Recruitment Stage
        </button>
        {seguimientoStages.includes(profile.recruitmentStage) ? (
          <button
            onClick={() => {
              handleReactivateModal();
            }}
            className="text-sm font-sans text-white hover:text-white bg-green-500 hover:bg-green-600 py-2 px-4 rounded flex items-center gap-2 transition-all duration-200"
          >
            Reactivate Process
          </button>
        ) : (
          <button
            onClick={() => {
              handleRetireModal();
            }}
            className="text-sm font-sans text-red-500 hover:text-white bg-red-50 hover:bg-red-500 py-2 px-4 rounded flex items-center gap-2 transition-all duration-200"
          >
            Retire Applicant
          </button>
        )}
      </div>

      <div className="flex flex-col gap-6">
        {/* Section for Adding Comment */}
        <div className="flex flex-row gap-4 items-end justify-between">
          <div className="w-full">
            <label
              htmlFor="comment"
              className="text-sm text-gray-600 font-sans"
            >
              Recruiter Comment
            </label>
            <Textarea
              name="commentState"
              value={commentState}
              placeholder="Insert a comment/note"
              className="w-full mt-2 h-16"
              onChange={onInsertCommentChange}
            />
          </div>
          <Tooltip
            content={"Write a comment first."}
            style="light"
            className={!commentState ? "" : "hidden"}
          >
            <button
              // disabled
              title="Add Comment"
              className={`border  border-blue-500 bg-blue-500 text-white size-10 md:w-44 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-600 hover:border-blue-600 disabled:opacity-30 disabled:cursor-not-allowed`}
              disabled={!commentState}
              onClick={() => addNewNote()}
            >
              <GoPlusCircle className=" size-5" />
              <span className="hidden md:block ">{"Add"}</span>
            </button>
          </Tooltip>
        </div>

        {/* Section for Comments / Notes */}
        <div className="w-full">
          <label htmlFor="comment" className="text-sm text-gray-600 font-sans">
            Comments / Notes
          </label>
          <Card className="rounded-md max-h-60 overflow-y-auto mt-2 shadow-md">
            <Table className="table-auto w-full">
              <Table.Head>
                <Table.HeadCell>Added By</Table.HeadCell>
                <Table.HeadCell>Comment</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {sortedNotes.length < 1 ? (
                  <Table.Row>
                    <Table.Cell>{"--"}</Table.Cell>
                    <Table.Cell>{"--"}</Table.Cell>
                  </Table.Row>
                ) : (
                  sortedNotes.map((note, index) => (
                    <Popover
                      arrow={false}
                      key={index}
                      content={
                        <div className="flex justify-center gap-2">
                          <button
                            className={`border border-blue-300 bg-white text-blue-600 size-10 md:w-28 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed`}
                            onClick={() => {
                              setCurrentComment({ note: note, id: index });
                              setCurrentModal("comment");
                              setIsOpen(true);
                            }}
                          >
                            <HiOutlinePencilAlt className="h-4 w-4" />
                            <span className="hidden md:block ">Edit</span>
                          </button>
                          <button
                            className={`border border-red-600 bg-red-600 text-white size-10 md:w-28 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed`}
                            onClick={() => {
                              setCurrentComment({ note: note, id: index });
                              setCurrentModal("deleteComment");
                              setIsOpen(true);
                            }}
                          >
                            <HiXCircle className="h-4 w-4" />
                            <span className="hidden md:block ">Delete</span>
                          </button>
                        </div>
                      }
                    >
                      <Table.Row className="hover:bg-gray-100 cursor-pointer">
                        <Table.Cell>
                          <div className="flex flex-col">
                            <span>{note.user}</span>
                            <span className="text-xs font-light">
                              {"on: " + note.createdOn}
                            </span>
                          </div>
                        </Table.Cell>
                        <Table.Cell>{note.Note || "--"}</Table.Cell>
                      </Table.Row>
                    </Popover>
                  ))
                )}
              </Table.Body>
            </Table>
          </Card>
        </div>

        {/* Section for Profile History */}
        <div className="w-full">
          <label
            htmlFor="profile-history"
            className="text-sm text-gray-600 font-sans"
          >
            Profile History
          </label>
          <Card className="rounded-md max-h-60 overflow-y-auto mt-2 shadow-md">
            <Table className="table-auto w-full">
              <Table.Head>
                <Table.HeadCell>Changed By</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {sortedHistory.length < 1 ? (
                  <Table.Row>
                    <Table.Cell>{"--"}</Table.Cell>
                    <Table.Cell>{"--"}</Table.Cell>
                  </Table.Row>
                ) : (
                  sortedHistory.map((history, index) => (
                    <Table.Row
                      key={index}
                      className="hover:bg-gray-100 cursor-pointer"
                    >
                      <Table.Cell>
                        <div className="flex flex-col">
                          <span>{history.user}</span>
                          <span className="text-xs font-light">
                            {"on: " + history.createdOn}
                          </span>
                        </div>
                      </Table.Cell>
                      <Table.Cell>{history.Note || "--"}</Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table>
          </Card>
        </div>
      </div>
      <div className="flex flex-row gap-3">
        <div className="flex flex-col gap-1 text-sm">
          <span>Created On:</span>
          <span className="text-xs font-light">
            {profile?.createdOn
              ? formatDate(profile.createdOn, "dddd, mmmm dd yyyy")
              : "--"}
          </span>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <span>Last Modified:</span>
          <span className="text-xs font-light">
            {profile?.modifiedOn
              ? formatDate(profile.modifiedOn, "dddd, mmmm dd yyyy")
              : "--"}
          </span>
        </div>
      </div>
      <ModalYesNo
        size="2xl"
        text={
          currentModal == "changePosition" ? (
            <div>Changing Position and Department</div>
          ) : currentModal == "transfer" ? (
            <div>Transfering Seafarer</div>
          ) : currentModal == "retire" ? (
            <div>Retiring Seafarer</div>
          ) : currentModal == "reactivate" ? (
            <div>Reactivate Seafarer</div>
          ) : currentModal == "reject" ? (
            <div>Rejecting Seafarer</div>
          ) : currentModal == "comment" ? (
            <div>Updating Comment</div>
          ) : currentModal == "deleteComment" ? (
            <div>Deleting Comment</div>
          ) : currentModal == "applicationData" ? (
            <div>Set Profile Data</div>
          ) : (
            <div>Undefined</div>
          )
        }
        disableButtonConfirm={true}
        disableButtonCancel={true}
        isOpen={isOpen}
        closeModal={closeModal}
      >
        {currentModal == "changePosition" ? (
          <div className="flex flex-col justify-center items-center gap-4">
            <span>Select the desired Department and/or Position</span>
            {/* Display current department and position */}
            <div className="w-full flex flex-col gap-2">
              <div className="text-center">
                <span className="text-gray-500">Current Department: </span>
                <span className="font-semibold text-gray-700">
                  {profile?.seafarerData?.department[0].name || "None"}
                </span>
              </div>
              <div className="text-center">
                <span className="text-gray-500">Current Position: </span>
                <span className="font-semibold text-gray-700">
                  {profile?.seafarerData?.position[0].name || "None"}
                </span>
              </div>
            </div>
            <SelectComponents
              id="department"
              valueDefault={"Department"}
              data={datafilter.Departament}
              name_valor={true}
              idKey="Id"
              valueKey="DepartmentName"
              name="department"
              Text="Select a Department"
              initialValue={selectedValues?.department[0]?.id}
              onChange={(value) => handleSelectChange(value, "department")}
            />
            <SelectComponents
              id="position"
              valueDefault={"Position"}
              data={datafilter.Position}
              name_valor={true}
              idKey="Id"
              valueKey="PositionName"
              name="position"
              Text="Select a Position"
              initialValue={selectedValues?.position[0]?.id}
              onChange={(value) => handleSelectChange(value, "position")}
            />
            <div className="flex flex-row justify-center items-center gap-3">
              <button
                title="Cancel"
                className={`w-16 border border-blue-300 bg-white text-blue-600 size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50 disabled:opacity-30`}
                //   disabled={isSaving}
                onClick={(e) => closeModal(e)}
              >
                {/* <FaFloppyDisk className="h-4 w-4" /> */}
                <span className="">Cancel</span>
              </button>
              <button
                title="Continue"
                className={`w-16 border border-[#010064] bg-[#010064] text-white size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
                //   disabled={isSaving}
                onClick={(e) => updatePosition(e)}
              >
                {/* <FaFloppyDisk className="h-4 w-4" /> */}
                <span className=" ">Update</span>
              </button>
            </div>
          </div>
        ) : currentModal == "transfer" ? (
          <div className="flex flex-col justify-center items-center gap-4">
            <span>Select the desired recruitment department</span>
            <div className="w-full flex flex-col gap-2">
              <div className="text-center">
                <span className="text-gray-500">Current Department: </span>
                <span className="font-semibold text-gray-700">
                  {profile?.seafarerData?.vesselType[0].name || "None"}
                </span>
              </div>
            </div>
            <SelectComponents
              id="vesselType"
              valueDefault={"Recruitment Department"}
              data={data.Vessel}
              name_valor={true}
              idKey="Id"
              valueKey="Name"
              name="vesselType"
              Text="Select a Recruitment Department"
              initialValue={selectedValues?.vesselType[0]?.id}
              onChange={(value) => handleSelectChange(value, "vesselType")}
            />
            <div className="flex flex-row justify-center items-center gap-3">
              <button
                title="Cancel"
                className={`w-16 border border-blue-300 bg-white text-blue-600 size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50 disabled:opacity-30`}
                //   disabled={isSaving}
                onClick={(e) => closeModal(e)}
              >
                {/* <FaFloppyDisk className="h-4 w-4" /> */}
                <span className="">Cancel</span>
              </button>
              <button
                title="Continue"
                className={`w-16 border border-[#010064] bg-[#010064] text-white size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
                //   disabled={isSaving}
                onClick={() => updateRecDept()}
              >
                {/* <FaFloppyDisk className="h-4 w-4" /> */}
                <span className="">Update</span>
              </button>
            </div>
          </div>
        ) : currentModal == "retire" ? (
          <div className="flex flex-col justify-center items-center gap-4">
            <span>{retireMessage}</span>
            <div className="flex flex-row justify-center items-center gap-3">
              <button
                title="Cancel"
                className={`w-16 border border-blue-300 bg-white text-blue-600 size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50 disabled:opacity-30`}
                //   disabled={isSaving}
                onClick={(e) => closeModal(e)}
              >
                {/* <FaFloppyDisk className="h-4 w-4" /> */}
                <span className=" ">Cancel</span>
              </button>
              <button
                title="Continue"
                className={`w-16 border border-red-600 bg-red-600 text-white size-10 md:w-28 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed`}
                //   disabled={isSaving}
                onClick={() => handleRetireStage()}
              >
                {/* <FaFloppyDisk className="h-4 w-4" /> */}
                <span className=" ">Retire</span>
              </button>
            </div>
          </div>
        ) : currentModal == "reactivate" ? (
          <div className="flex flex-col justify-center items-center gap-4">
            <span>{reactivateMessage}</span>
            <div className="flex flex-row justify-center items-center gap-3">
              <button
                title="Cancel"
                className={`w-16 border border-blue-300 bg-white text-blue-600 size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50 disabled:opacity-30`}
                //   disabled={isSaving}
                onClick={(e) => closeModal(e)}
              >
                {/* <FaFloppyDisk className="h-4 w-4" /> */}
                <span className=" ">Cancel</span>
              </button>
              <button
                title="Continue"
                className={`w-16 border border-green-600 bg-green-600 text-white size-10 md:w-28 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-green-700 disabled:opacity-30 disabled:cursor-not-allowed`}
                //   disabled={isSaving}
                onClick={() => handleReactivate()}
              >
                {/* <FaFloppyDisk className="h-4 w-4" /> */}
                <span className=" ">Reactivate</span>
              </button>
            </div>
          </div>
        ) : currentModal == "reject" ? (
          <div className="flex flex-col justify-center items-center gap-4">
            <span>
              Updating manually the recruitment profile of a seafarer may damage
              reports regarding this seafarer. Select the desired stage.
            </span>
            <div className="w-full flex flex-col gap-2">
              <div className="text-center">
                <span className="text-gray-500">Current Stage: </span>
                <span className="font-semibold text-gray-700">
                  {profile?.recruitmentStage
                    ? stageData[profile?.recruitmentStage - 1].StageName
                    : "--"}
                </span>
              </div>
            </div>
            <SelectComponents
              id="vesselType"
              valueDefault={"Recruitment Stage"}
              data={stageData}
              name_valor={true}
              idKey="Id"
              valueKey="StageName"
              name="recruitmentStage"
              Text="Select a Recruitment Stage"
              initialValue={stageData[profile?.recruitmentStage - 1].Id}
              onChange={(value) => handleStageChange(value)}
            />
            <div className="flex flex-row justify-center items-center gap-3">
              <button
                title="Cancel"
                className={`w-16 border border-blue-300 bg-white text-blue-600 size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50 disabled:opacity-30`}
                //   disabled={isSaving}
                onClick={(e) => closeModal(e)}
              >
                {/* <FaFloppyDisk className="h-4 w-4" /> */}
                <span className=" ">Cancel</span>
              </button>
              <button
                title="Continue"
                className={`w-16 border border-[#010064] bg-[#010064] text-white size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
                //   disabled={isSaving}
                onClick={() => updateStage()}
              >
                {/* <FaFloppyDisk className="h-4 w-4" /> */}
                <span className=" ">Continue</span>
              </button>
            </div>
          </div>
        ) : currentModal == "comment" ? (
          <div className="flex flex-col justify-center items-center gap-4">
            <span>
              {`Comment originally added by: `}
              <span className="font-bold">{currentComment?.note.user}</span>
              {` | Created on: `}
              <span className="font-bold">
                {currentComment?.note.createdOn}
              </span>
            </span>
            <Textarea
              name="Note"
              value={currentComment?.note?.Note}
              className="h-36"
              onChange={(e) => onCurrentCommentChange(e)}
            />
            <div className="flex flex-row justify-center items-center gap-3">
              <button
                title="Cancel"
                className={`w-16 border border-blue-300 bg-white text-blue-600 size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50 disabled:opacity-30`}
                //   disabled={isSaving}
                onClick={(e) => closeModal(e)}
              >
                {/* <FaFloppyDisk className="h-4 w-4" /> */}
                <span className=" ">Cancel</span>
              </button>
              <button
                title="Continue"
                className={`w-16 border border-[#010064] bg-[#010064] text-white size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
                //   disabled={isSaving}
                onClick={() => updateNote()}
              >
                {/* <FaFloppyDisk className="h-4 w-4" /> */}
                <span className=" ">Save</span>
              </button>
            </div>
          </div>
        ) : currentModal == "deleteComment" ? (
          <div className="flex flex-col justify-center items-center gap-4">
            <span>
              {`Comment originally added by: `}
              <span className="font-bold">{currentComment?.note.user}</span>
              {` | Created on: `}
              <span className="font-bold">
                {currentComment?.note.createdOn}
              </span>
            </span>
            {/* <Textarea
              name="Note"
              value={currentComment?.note?.Note}
              className="h-36"
              onChange={(e) => onCurrentCommentChange(e)}
            /> */}
            <span className="">{"Comment:"}</span>
            <span className="font-bold m-5">{currentComment?.note?.Note}</span>
            <div className="flex flex-row justify-center items-center gap-3">
              <button
                title="Cancel"
                className={`w-16 border border-blue-300 bg-white text-blue-600 size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50 disabled:opacity-30`}
                //   disabled={isSaving}
                onClick={(e) => closeModal(e)}
              >
                {/* <FaFloppyDisk className="h-4 w-4" /> */}
                <span className=" ">Cancel</span>
              </button>
              <button
                title="Continue"
                className={`w-16 border border-red-600 bg-red-600 text-white size-10 md:w-28 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed`}
                //   disabled={isSaving}
                onClick={() => deleteNote()}
              >
                {/* <FaFloppyDisk className="h-4 w-4" /> */}
                <span className=" ">Delete</span>
              </button>
            </div>
          </div>
        ) : currentModal == "applicationData" ? (
          <div className="flex flex-col justify-center items-center gap-4">
            <span>
              This Applicant is in application stage and has application data.
              Do you want to apply this data to the applicant's profile?
            </span>
            <div className="flex flex-row justify-center items-center gap-3">
              <button
                title="Cancel"
                className={`w-16 border border-blue-300 bg-white text-blue-600 size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50 disabled:opacity-30`}
                //   disabled={isSaving}
                onClick={(e) => closeModal(e)}
              >
                {/* <FaFloppyDisk className="h-4 w-4" /> */}
                <span className=" ">Cancel</span>
              </button>
              <button
                title="Continue"
                className={`w-16 border border-green-600 bg-green-600 text-white size-10 md:w-28 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-green-700 disabled:opacity-30 disabled:cursor-not-allowed`}
                //   disabled={isSaving}
                onClick={() => handleSetProfileData()}
              >
                {/* <FaFloppyDisk className="h-4 w-4" /> */}
                <span className=" ">Apply</span>
              </button>
            </div>
          </div>
        ) : (
          <LoadingState />
        )}
      </ModalYesNo>
    </section>
  );
};
