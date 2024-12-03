import { useParams } from "react-router-dom";
import {
  HiAdjustments,
  HiArrowLeft,
  HiCheckCircle,
  HiCloudDownload,
  HiDocumentDownload,
  HiOutlinePencilAlt,
  HiOutlineQuestionMarkCircle,
  HiOutlineReply,
  HiOutlineTag,
  HiSave,
  HiUser,
  HiUserCircle,
  HiXCircle,
} from "react-icons/hi";
import { FaFloppyDisk } from "react-icons/fa6";
import { ApplicationProfile } from "./applicationProfile/ApplicationProfile";
import {
  ModalYesNo,
  SelectComponents,
} from "../../components/layoutComponents";
import { Badge, Button, Card, Drawer, Textarea, Tooltip } from "flowbite-react";
import { MdRotate90DegreesCcw } from "react-icons/md";
import { useState } from "react";
import { LoadingState } from "../../components/skeleton/LoadingState";
import { ApplicationDocument } from "./ApplicationDocument";
import ApplicationCertificates from "./ApplicationCertificates";
import { ApplicationSkill } from "./applicationSkill/ApplicationSkill";
import { ReviewForm } from "../recruitment/components/ReviewForm";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  createFirstInterviews,
  getApplication,
  setApplication,
  setApplicationData,
  updateApplicationReview,
  updateApplicationSent,
  updateSeafarerDataFirebase,
} from "../../store/userData";
import { useNavigate } from "react-router-dom";
import {
  setApplicationView,
  setIsRead,
  updateApplication,
  updateReviewVersion,
} from "../../store/currentViews/viewSlice";
import toast from "react-hot-toast";
import { FormPrompt } from "../../hooks/FormPrompt";
import { formatDate, getSeafarerDataObject } from "../../util/helperFunctions";
import Stages from "../../assets/tables/json/RecruitmentStage-static.json";
import applicationStatusData from "../../assets/tables/json/ApplicationStatus-static.json";
import notFound from "../../assets/imagenes/notFound.gif";
import {
  getApplicationCV,
  getPositions,
  getReasons,
} from "../../util/services";
import { StartApplicantion } from "./StartApplicantion";

export const ReviewApplication = () => {
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { userData, isSaving } = useSelector((state) => state.userData);
  const { applicationData } = userData;
  // const { startApplication } = applicationData;
  // const { profile } = applicationData.applicationProfile;
  const { application, positions } = useSelector((state) => state.currentViews);
  const [versions, setVersions] = useState([{ id: 0, name: "v1" }]);
  const [latestVersion, setLatestVersion] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [existe, setExiste] = useState(true);
  const [isLoading, setIsLoading] = useState(!application?.uid ? false : true);
  // const [positions, setPositions] = useState([]);
  const [reasonsData, setReasonsData] = useState([]);
  const [filteredReasonsData, setFilteredReasonsData] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => {
    setIsOpenModal(true);
  };

  const filterReasons = (all = true) => {
    if (!all) {
      if (reasonsData.length > 0) {
        const filter = reasonsData.filter((row) => {
          let stagesArray;

          try {
            stagesArray =
              typeof row.stages === "string"
                ? JSON.parse(row.stages)
                : row.stages;
          } catch (error) {
            console.error("Error parsing stages:", error);
            return false; // Excluir la fila si no es válida
          }
          return stagesArray.includes(1);
        });
        setFilteredReasonsData(filter);
      }
    } else {
      setFilteredReasonsData(reasonsData);
    }
  };

  useEffect(() => {
    filterReasons(false);
  }, [reasonsData]);

  const closeModal = () => setIsOpenModal(false);

  useEffect(() => {
    if (
      positions &&
      userData?.applicationData?.startApplication?.position?.[0]?.id
    ) {
      const matchingPosition = positions.find(
        (pos) =>
          pos.Id == userData?.applicationData?.startApplication?.position[0].id
      );
      if (matchingPosition) {
        setCurrentPosition(matchingPosition);
      }
    }
  }, [positions, userData?.applicationData?.startApplication?.position]);

  async function getCV() {
    try {
      // Verifica que currentPosition esté definido y tenga CVFormatId
      if (!currentPosition || !currentPosition.CVFormatId) {
        console.error("Error: currentPosition o CVFormatId no está definido");
        return;
      }

      const currentPositionId = currentPosition.CVFormatId;
      const url = `https://cv-formater-main.onrender.com/pdf_render/applications?formatId=${currentPositionId}&id=${
        application.uid
      }&version=${Number(selectedVersion.id)}`;

      // Abre la URL en una nueva pestaña
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error al obtener el CV:", error);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      // const positions = await getPositions();
      const reasons = await getReasons();
      setReasonsData(reasons);
      // setPositions(positions);
      if (application?.uid !== id) {
        const existe = await dispatch(getApplication(id));
        setExiste(existe);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (application.versions) {
      setVersions(
        application.versions?.map((version, index) => ({
          id: index.toString(),
          name: `v${index + 1}`,
        }))
      );
      setLatestVersion(application.versions.length - 1);
      // if (application.isRead == false) {
      //   handleSave("", true, !application.isRead);
      // }
    }
  }, [application]);

  useEffect(() => {
    setSelectedVersion(versions[latestVersion]);
  }, [versions, latestVersion]);

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const [tabs, setTabs] = useState([
    {
      Id: 1,
      value: "Profile",
    },
    {
      Id: 2,
      value: "Position/Department",
    },
    {
      Id: 3,
      value: "Documents",
    },
    {
      Id: 4,
      value: "Certificates",
    },
    {
      Id: 5,
      value: "Experience & Skills",
    },
  ]);

  const [currentTab, setCurrentTab] = useState("1");

  const onSelectChange = (e) => {
    const tabselect = e[0].id;
    setCurrentTab(tabselect);
  };

  const handleBackClick = () => {
    navigate("/submissions");
  };

  const [selectedVersion, setSelectedVersion] = useState(latestVersion);

  const handleSave = (e, state, isReadChange) => {
    if (e) {
      e.preventDefault();
    }
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

    const currentVersionData = {
      version: selectedVersion.id,
      applicationData: userData.applicationData,
    };

    // Clonar el arreglo de versiones y actualizar la versión más reciente
    const updatedVersions = [...application.versions];
    updatedVersions[selectedVersion.id] = applicationData;

    // Crear el objeto application actualizado con las versiones actualizadas
    const updatedApplication = {
      ...application,
      versions: updatedVersions,
      modifiedDate: new Date().toISOString(),
      vesselType: vesselTypeUpdate,
      department: departmentUpdate,
      position: positionUpdate,
    };

    const updatedApplicationIsRead = {
      ...application,
      versions: updatedVersions,
      modifiedDate: new Date().toISOString(),
      isRead: isReadChange,
      vesselType: vesselTypeUpdate,
      department: departmentUpdate,
      position: positionUpdate,
    };

    // Ejecutar el dispatch con el objeto application actualizado
    dispatch(updateReviewVersion(currentVersionData));
    if (state) {
      console.log("actualizo");
      dispatch(setIsRead(isReadChange));
    }
    dispatch(
      updateApplication(state ? updatedApplicationIsRead : updatedApplication)
    );

    toast.promise(
      dispatch(
        updateApplicationSent(
          application.uid,
          state ? updatedApplicationIsRead : updatedApplication,
          vesselTypeData
        )
      ),
      {
        loading: "Saving...",
        success: <b>Saved!</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
    // setUnsavedChanges(false);
  };

  const handleEvaluation = (e) => {
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

    const currentVersionData = {
      version: selectedVersion.id,
      applicationData: applicationData,
    };

    // Clonar el arreglo de versiones y actualizar la versión más reciente
    const updatedVersions = [...application.versions];
    updatedVersions[selectedVersion.id] = applicationData;

    // Crear el objeto application actualizado con las versiones actualizadas
    const newApplicationData = {
      ...application,
      // status: "Approved",
      status: 5,
      modifiedDate: new Date().toISOString(),
      vesselType: vesselTypeUpdate,
      department: departmentUpdate,
      position: positionUpdate,
    };

    const updatedApplication = {
      ...newApplicationData,
      versions: updatedVersions,
    };

    const seafarerData = getSeafarerDataObject(
      !applicationData.review
        ? { ...applicationData, review: {} }
        : applicationData
    );

    const newData = {
      ...seafarerData,
      createdOn: application?.createdOn,
    };

    // Ejecutar el dispatch con el objeto application actualizado
    dispatch(updateReviewVersion(currentVersionData));

    dispatch(updateApplication(updatedApplication));

    toast.promise(
      Promise.all([
        dispatch(
          updateApplicationSent(
            application.uid,
            updatedApplication,
            vesselTypeData
          )
        ),
      ]),
      {
        loading: "Saving...",
        success: <b>Saved</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
  };

  const handleApprove = (e) => {
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

    const currentVersionData = {
      version: selectedVersion.id,
      applicationData: applicationData,
    };

    // Clonar el arreglo de versiones y actualizar la versión más reciente
    const updatedVersions = [...application.versions];
    updatedVersions[selectedVersion.id] = applicationData;

    // Crear el objeto application actualizado con las versiones actualizadas
    const newApplicationData = {
      ...application,
      // status: "Approved",
      status: 3,
      modifiedDate: new Date().toISOString(),
      vesselType: vesselTypeUpdate,
      department: departmentUpdate,
      position: positionUpdate,
    };

    const updatedApplication = {
      ...newApplicationData,
      versions: updatedVersions,
    };

    const seafarerData = getSeafarerDataObject(
      !applicationData.review
        ? { ...applicationData, review: {} }
        : applicationData
    );

    const newData = {
      ...seafarerData,
      createdOn: application?.createdOn,
    };

    // Ejecutar el dispatch con el objeto application actualizado
    dispatch(updateReviewVersion(currentVersionData));

    dispatch(updateApplication(updatedApplication));

    toast.promise(
      Promise.all([
        dispatch(
          updateApplicationSent(
            application.uid,
            updatedApplication,
            vesselTypeData
          )
        ),
        dispatch(
          updateSeafarerDataFirebase(application.uid, newData, Stages[1].Id)
        ),
        dispatch(createFirstInterviews(application.uid)),
      ]),
      {
        loading: "Saving...",
        success: <b>Saved & Approved</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
  };

  const handleDeny = (e) => {
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

    const currentVersionData = {
      version: selectedVersion.id,
      applicationData: applicationData,
    };

    // Clonar el arreglo de versiones y actualizar la versión más reciente
    const updatedVersions = [...application.versions];
    updatedVersions[selectedVersion.id] = applicationData;

    // Crear el objeto application actualizado con las versiones actualizadas
    const newApplicationData = {
      ...application,
      status: 4,
      modifiedDate: new Date().toISOString(),
      vesselType: vesselTypeUpdate,
    };

    const updatedApplication = {
      ...newApplicationData,
      vesselType: vesselTypeUpdate,
      department: departmentUpdate,
      position: positionUpdate,
    };

    const seafarerData = getSeafarerDataObject(applicationData);

    const newData = {
      ...seafarerData,
      applicationDate: application?.createdOn,
    };

    // Ejecutar el dispatch con el objeto application actualizado
    dispatch(updateReviewVersion(currentVersionData));

    dispatch(updateApplication(updatedApplication));

    toast.promise(
      Promise.all([
        dispatch(
          updateApplicationSent(
            application.uid,
            updatedApplication,
            vesselTypeData
          )
        ),
        dispatch(updateSeafarerDataFirebase(application.uid, newData, 11)),
      ]),
      {
        loading: "Saving...",
        success: <b>Saved & Approved</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
  };

  const handleSendBack = (e) => {
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

    const currentVersionData = {
      version: selectedVersion.id,
      applicationData: applicationData,
    };

    // Clonar el arreglo de versiones y actualizar la versión más reciente
    const updatedVersions = [...application.versions];
    updatedVersions[selectedVersion.id] = applicationData;

    // Crear el objeto application actualizado con las versiones actualizadas
    const newApplicationData = {
      ...application,
      // status: "Pending Correction",
      status: 2,
      modifiedDate: new Date().toISOString(),
      vesselType: vesselTypeUpdate,
      department: departmentUpdate,
      position: positionUpdate,
    };

    const updatedApplication = {
      ...newApplicationData,
      versions: updatedVersions,
    };

    // Ejecutar el dispatch con el objeto application actualizado
    dispatch(updateReviewVersion(currentVersionData));

    dispatch(updateApplication(updatedApplication));

    toast.promise(
      dispatch(
        updateApplicationSent(
          application.uid,
          updatedApplication,
          vesselTypeData
        )
      ),
      {
        loading: "Saving...",
        success: <b>Saved & Sent Back</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
  };

  const [modalText, setModalText] = useState("");
  const [modalConfirm, setModalConfirm] = useState(() => () => {});

  const handleOpenModal = (type) => {
    if (type === "approve") {
      setModalText("Are you sure you want to approve this application?");
      setModalConfirm(() => handleApprove);
    } else if (type === "deny") {
      // setModalText("Are you sure you want to deny this application?");
      setModalText(
        <div className="flex flex-col gap-2">
          <span>Are you sure you want to deny this application?</span>
          <span>Please provide a reason for rejecting this application.</span>
          <Textarea />
        </div>
      );
      setModalConfirm(() => handleDeny);
    } else if (type === "sendback") {
      setModalText(
        "Are you sure you want to send this application back to the applicant?"
      );
      setModalConfirm(() => handleSendBack);
    } else if (type === "evaluation") {
      setModalText(
        "Are you sure you want to set this application in evaluation?"
      );
      setModalConfirm(() => handleEvaluation);
    }
    openModal();
  };

  const handleVersionChange = (e) => {
    if (e[0].id) {
      setSelectedVersion(e[0]);
      dispatch(setApplicationData(application.versions[e[0].id]));
    }
  };

  useEffect(() => {
    if (selectedVersion?.id < latestVersion) {
      setDisabled(true);
    }
    // if (application.status === "Approved" || application.status === "Denied") {
    //   setDisabled(true);
    // }
    if (application.status === 3 || application.status === 4) {
      setDisabled(true);
    }
    return () => {
      setDisabled(false);
    };
  }, [selectedVersion, latestVersion, application.status]);

  const handleApplicationData = (field, value) => {
    const newData = { ...application, [field]: value };
    dispatch(setApplicationView(newData));
  };

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          {!existe || !userData?.applicationData?.startApplication ? (
            <div className="flex flex-col items-center justify-center h-1/2">
              <img
                src={notFound}
                alt={"Application Not Found"}
                className="size-36"
              />
              <div className="flex flex-col gap-2 items-center justify-center">
                <span>Application not found. Try Again!</span>
                <button
                  className="flex flex-auto items-center text-[#1976d2] text-sm font-style: italic hover:bg-blue-50"
                  onClick={handleBackClick}
                  disabled={isSaving}
                >
                  <HiArrowLeft className="h-4 w-4 mr-2" />
                  Back to Applications
                </button>
              </div>
            </div>
          ) : (
            <>
              <Drawer
                open={isOpen}
                onClose={handleClose}
                position="right"
                className="md:w-1/3"
              >
                <Drawer.Header
                  title="Application Review"
                  titleIcon={() => (
                    <MdRotate90DegreesCcw className="h-4 w-4 mr-2" />
                  )}
                />
                <Drawer.Items>
                  <div className="flex flex-col  gap-2 mt-2">
                    <div className="flex justify-center gap-2">
                      <button
                        className={`border border-green-500 bg-green-500 text-white size-10 md:w-28 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-green-600 disabled:opacity-30 disabled:cursor-not-allowed`}
                        onClick={() => handleOpenModal("approve")}
                        // disabled={disabled}
                      >
                        <HiCheckCircle className="h-4 w-4" />
                        <span className="hidden md:block ">Approve</span>
                      </button>
                      <Tooltip
                        content="Select a Reject Reason before rejecting this application."
                        style="light"
                        className={
                          application?.rejectReason?.id == "" ? "" : "hidden"
                        }
                      >
                        <button
                          className={`border border-red-600 bg-red-600 text-white size-10 md:w-28 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed`}
                          onClick={() => handleOpenModal("deny")}
                          disabled={application.status === 4}
                        >
                          <HiXCircle className="h-4 w-4" />
                          <span className="hidden md:block ">Reject</span>
                        </button>
                      </Tooltip>
                      <button
                        className={`border border-yellow-600 bg-yellow-600 text-white size-10 md:w-28 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-yellow-700 disabled:opacity-30 disabled:cursor-not-allowed`}
                        onClick={() => handleOpenModal("evaluation")}
                        // disabled={application.status === 2 || disabled}
                      >
                        <HiOutlinePencilAlt className="h-4 w-4" />
                        <span className="hidden md:block ">Set Evaluation</span>
                      </button>
                      <button
                        className={`border border-blue-300 bg-white text-blue-600 size-10 md:w-28 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed`}
                        onClick={() => handleOpenModal("sendback")}
                        // disabled={application.status === 4}
                      >
                        <HiOutlineReply className="h-4 w-4" />
                        <span className="hidden md:block ">Send Back</span>
                      </button>
                    </div>
                  </div>
                  <div className="my-4">
                    {!application.uid || !selectedVersion.id ? (
                      <LoadingState />
                    ) : (
                      <ReviewForm
                        disabled={
                          selectedVersion?.id < latestVersion || disabled
                        }
                        // reviewData={userData.applicationData?.review}
                      />
                    )}
                  </div>
                  <div className="my-4 flex flex-row items-end gap-3">
                    <SelectComponents
                      id="seguimientoReason"
                      valueDefault="Reject Reason"
                      Text="Select a Reject Reason"
                      data={filteredReasonsData}
                      name_valor={false}
                      idKey="id"
                      valueKey="reason"
                      name="seguimientoReason"
                      initialValue={application?.seguimientoReason}
                      onChange={(e) => {
                        const selectedValue = e[0];
                        handleApplicationData(
                          "seguimientoReason",
                          selectedValue
                        );
                      }}
                    />
                    <button
                      className={`border border-red-600 bg-red-600 text-white size-10 md:w-28 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed`}
                      onClick={() => filterReasons(true)}
                    >
                      <HiXCircle className="h-4 w-4" />
                      <span className="hidden md:block ">Override Reasons</span>
                    </button>
                  </div>
                  <div className="my-4">
                    <label
                      htmlFor="comment"
                      className="text-sm text-gray-400 font-sans"
                    >
                      Recruiter Comment
                    </label>
                    <Textarea
                      id="comment"
                      placeholder="Leave a comment..."
                      // disabled={disabled}
                      value={application?.comment}
                      required
                      rows={4}
                      color={"blue"}
                      onChange={(e) =>
                        handleApplicationData("comment", e.target.value)
                      }
                    />
                  </div>
                </Drawer.Items>
              </Drawer>
              <button
                className="flex flex-auto items-center text-[#1976d2] text-sm font-style: italic hover:bg-blue-50"
                onClick={handleBackClick}
                disabled={isSaving}
              >
                <HiArrowLeft className="h-4 w-4 mr-2" />
                Back to Applications
              </button>

              <div className="w-full shadow-lg rounded-lg p-6">
                <div className="flex flex-col   lg:justify-between">
                  <div className="flex-row space-y-2">
                    <div className="flex flex-row items-center gap-3">
                      <h2 className="tracking-tight text-gray-500">
                        Application Review:
                      </h2>
                      <div className="w-28 md:w-1/6">
                        <SelectComponents
                          Text="Version"
                          name="selectedVersion"
                          name_valor={true}
                          data={versions || []}
                          idKey={"id"}
                          valueKey={"name"}
                          initialValue={selectedVersion?.id}
                          onChange={(e) => handleVersionChange(e)}
                        />
                      </div>
                      <Badge
                        color={
                          application.status === 1
                            ? "warning"
                            : application.status === 3
                            ? "success"
                            : application.status === 4
                            ? "failure"
                            : application.status === 2
                            ? "purple"
                            : "info"
                        }
                      >
                        {application?.status
                          ? applicationStatusData[application?.status - 1]
                              .statusName
                          : "--"}
                      </Badge>
                      <Badge color={!application.isRead ? "warning" : "green"}>
                        {application?.isRead ? "Read" : "Not Read"}
                      </Badge>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <h1 className="text-2xl md:text-3xl  font-bold tracking-tight w-[85%]">
                        {`${applicationData?.applicationProfile?.profile?.firstName} ${applicationData?.applicationProfile?.profile?.lastName}`}
                      </h1>
                      <div className="flex flex-col md:flex-row gap-2">
                        <button
                          title="Mark as Read"
                          className={`border  border-yellow-300 bg-white text-yellow-400 size-10 md:w-40 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-yellow-100 disabled:opacity-30 disabled:cursor-not-allowed`}
                          disabled={application?.status === 3}
                          onClick={(e) =>
                            handleSave(e, true, !application.isRead)
                          }
                        >
                          <HiOutlineTag className="h-4 w-4" />
                          <span className="hidden md:block ">{`Mark as ${
                            application.isRead ? "not read" : "read"
                          }`}</span>
                        </button>
                        <button
                          title="Save"
                          className={`${
                            ""
                            // application?.status === 3 ? "hidden" : ""
                          } border border-[#010064] bg-[#010064] text-white size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
                          disabled={isSaving}
                          onClick={(e) => handleSave(e)}
                        >
                          <FaFloppyDisk className="h-4 w-4" />
                          <span className="hidden md:block ">Save</span>
                        </button>

                        <button
                          title="Print CV"
                          className="border border-blue-300 bg-white text-blue-600 size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50"
                          onClick={() => getCV()}
                        >
                          <HiDocumentDownload className="h-4 w-4" />
                          <span className="hidden md:block ">Print CV</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 text-gray-500 sm:flex-row sm:space-x-4 text-sm justify-between">
                      <span>
                        Recruitment Department:{" "}
                        <span className="font-bold">
                          {applicationData?.startApplication?.vesselType[0]
                            ?.name || "--"}
                        </span>
                      </span>
                      <span>
                        Department:{" "}
                        <span className="font-bold">
                          {applicationData?.startApplication?.department[0]
                            ?.name || "--"}
                        </span>
                      </span>
                      <span>
                        Position:{" "}
                        <span className="font-bold">
                          {applicationData?.startApplication?.position[0]
                            ?.name || "--"}
                        </span>
                      </span>
                      <span>
                        Submitted on:{" "}
                        <span className="font-bold">
                          {formatDate(application.createdOn, "dd-mm-yyyy")}
                        </span>
                      </span>
                      <div className="flex flex-row justify-center gap-1">
                        <div className="md:hidden">
                          <SelectComponents
                            name={"tab"}
                            Text="Select an application tab"
                            className={""}
                            data={tabs}
                            idKey="Id"
                            valueKey="value"
                            onChange={onSelectChange}
                            name_valor={true}
                            initialValue={tabs[0]}
                          />
                        </div>

                        <button
                          title="Review"
                          className="border border-blue-300 bg-white text-blue-600 min-w-10 size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50"
                          onClick={() => setIsOpen(true)}
                        >
                          <MdRotate90DegreesCcw className="h-4 w-4" />
                          <span className="hidden md:block ">Review</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex flex-col items-center mt-3">
                  {(applicationData.startApplication.position?.[0].id == 1 ||
                    !applicationData.startApplication.position?.[0].id ||
                    applicationData.startApplication.department?.[0].id == 1 ||
                    !applicationData.startApplication.department?.[0].id) && (
                    <span className="text-sm text-red-500">
                      Select a valid Position/Department
                    </span>
                  )}
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
                      {/* <HiUserCircle className="mr-3 h-4 w-4" /> */}
                      {tabs[1].value}
                    </Button>

                    <Button
                      disabled={
                        applicationData.startApplication.position?.[0].id ==
                          1 ||
                        !applicationData.startApplication.position?.[0].id ||
                        applicationData.startApplication.department?.[0].id ==
                          1 ||
                        !applicationData.startApplication.department?.[0].id
                      }
                      className={`${
                        currentTab === "3" &&
                        "bg-[#1976d2] text-white focus:text-white"
                      }`}
                      color="gray"
                      onClick={() => setCurrentTab("3")}
                    >
                      {/* <HiAdjustments className="mr-3 h-4 w-4" /> */}
                      {tabs[2].value}
                    </Button>

                    <Button
                      disabled={
                        applicationData.startApplication.position?.[0].id ==
                          1 ||
                        !applicationData.startApplication.position?.[0].id ||
                        applicationData.startApplication.department?.[0].id ==
                          1 ||
                        !applicationData.startApplication.department?.[0].id
                      }
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

                    <Button
                      className={`${
                        currentTab === "5" &&
                        "bg-[#1976d2] text-white focus:text-white"
                      }`}
                      color="gray"
                      onClick={() => setCurrentTab("5")}
                    >
                      {/* <HiCloudDownload className="mr-3 h-4 w-4" /> */}
                      {tabs[4].value}
                    </Button>
                  </Button.Group>
                </div>
              </div>
              <Card className="mt-5 border-gray-100 pb-5">
                <section className="w-auto overflow-x-auto">
                  {!application.uid || !selectedVersion.id ? (
                    <LoadingState />
                  ) : !currentTab ? (
                    <LoadingState />
                  ) : currentTab === "1" ? (
                    <ApplicationProfile disabled={disabled} />
                  ) : currentTab === "2" ? (
                    <StartApplicantion disabled={disabled} />
                  ) : currentTab === "3" ? (
                    <ApplicationDocument disabled={disabled} />
                  ) : currentTab === "4" ? (
                    <ApplicationCertificates disabled={disabled} />
                  ) : (
                    <ApplicationSkill disabled={disabled} />
                  )}
                </section>
              </Card>
              <ModalYesNo
                text={modalText}
                textyes={"Continue"}
                disableButtonConfirm={false}
                textno={"Cancel"}
                icon={
                  <HiOutlineQuestionMarkCircle className="w-9 h-9 m-auto" />
                }
                isOpen={isOpenModal}
                closeModal={closeModal}
                onConfirm={modalConfirm}
                onCancel={closeModal}
                classmodal="pt-[50%] md:pt-0"
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default ReviewApplication;
