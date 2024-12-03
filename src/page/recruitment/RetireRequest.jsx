import React from "react";
import { fetchRetirementRequests } from "../../util/services";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingState } from "../../components/skeleton/LoadingState";
import { Badge, Button, Modal, Table } from "flowbite-react";
import applicationStatusData from "../../assets/tables/json/ApplicationStatus-static.json";
import stageData from "../../assets/tables/json/RecruitmentStage-static.json";
import { formatDate } from "../../util/helperFunctions";
import {
  HiOutlineExclamationCircle,
  HiOutlinePencil,
  HiOutlineUser,
} from "react-icons/hi";
import toast from "react-hot-toast";
import {
  updateApplicationSentStatus,
  updateRetireRequest,
  updateUsersData,
} from "../../store/userData";

export const RetireRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [valueFilter, setValueFilter] = useState({
    department: "",
  });
  const [applications, setApplications] = useState([]);
  const [loadingVar, setLoadingVar] = useState(true);
  const [openModalWarning, setOpenModalWarning] = useState(false);
  const [selected, setSelected] = useState({});

  const handleProfileLink = (uid) => {
    navigate("/profile/" + uid);
  };

  const loadResults = async () => {
    try {
      const applicationsData = await fetchRetirementRequests();
      setApplications(applicationsData.retireeInfo);
      setLoadingVar(false);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  useEffect(() => {
    setLoadingVar(true);
    loadResults();
  }, []);

  const handleSelected = (e) => {
    console.log(e);
    setSelected(e);
    setOpenModalWarning(true);
  };

  const handleRetire = () => {
    const currentStage = selected.recruitmentStage;

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
      case 6:
        newStage = 22;
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
      SeguimientoComment: selected.retirementReason,
      seguimientoReason: 39,
      retireRequest: false,
    };

    toast.promise(
      Promise.all([
        dispatch(updateUsersData(selected.uid, updatedSeafarerData)),

        dispatch(updateRetireRequest(selected.id, 3)),
        dispatch(updateApplicationSentStatus(selected.uid, 6)),
      ]),
      {
        loading: "Saving...",
        success: <b>Saved!</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );

    setOpenModalWarning(false);
    loadResults();
  };

  const handleDeny = () => {
    // Dispatch the update with new recruitment stage and additional fields
    const updatedSeafarerData = {
      retireRequest: false,
    };

    toast.promise(
      Promise.all([
        dispatch(updateUsersData(selected.uid, updatedSeafarerData)),

        dispatch(updateRetireRequest(selected.id, 4)),
      ]),
      {
        loading: "Saving...",
        success: <b>Saved!</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
    setOpenModalWarning(false);
  };

  return (
    <div>
      <h1 className=" pl-3 md:pl-5 pt-5 text-lg md:text-lg pb-4 text-black font-bold">
        Process Retirement Requests
      </h1>
      <div className="px-8">
        <div className="overflow-x-auto ">
          {loadingVar ? (
            <LoadingState />
          ) : (
            <Table className="hidden md:block">
              <Table.Head>
                <Table.HeadCell>Actions</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Submission Date</Table.HeadCell>
                <Table.HeadCell>Process Stage</Table.HeadCell>
                <Table.HeadCell>Recruitment Dept.</Table.HeadCell>
                <Table.HeadCell>Department</Table.HeadCell>
                <Table.HeadCell>Position</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y ">
                {applications.map((application, index) => {
                  return (
                    <Table.Row
                      key={index}
                      className={` dark:border-gray-700 dark:bg-gray-800`}
                    >
                      <Table.Cell>
                        <div className="flex flex-row gap-2 items-center">
                          <button
                            title="View Profile"
                            className="border border-blue-300 bg-white text-blue-600 size-10 flex gap-1 justify-center items-center rounded-lg text-sm hover:bg-blue-50"
                            onClick={() => handleProfileLink(application.uid)}
                          >
                            <HiOutlineUser className="h-4 w-4" />
                          </button>
                          {application.status !== 4 &&
                            application.status !== 3 && (
                              <button
                                title="Options"
                                className="border border-green-300 bg-white text-green-600 size-10 flex gap-1 justify-center items-center rounded-lg text-sm hover:bg-green-50"
                                onClick={() => handleSelected(application)}
                              >
                                <HiOutlinePencil className="h-4 w-4" />
                              </button>
                            )}
                        </div>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {application?.status ? (
                          <Badge
                            color={
                              application?.status === 1
                                ? "warning"
                                : application?.status === 3
                                ? "success"
                                : application?.status === 4
                                ? "failure"
                                : application?.status === 2
                                ? "purple"
                                : "info"
                            }
                          >
                            {application?.status
                              ? applicationStatusData[application?.status - 1]
                                  .statusName
                              : "--"}
                          </Badge>
                        ) : (
                          "--"
                        )}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {application.seafarerName || "--"}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {formatDate(application.createdOn, "yyyy-mm-dd") ||
                          "--"}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {application.recruitmentStage
                          ? stageData.find(
                              (stage) =>
                                stage.Id == application.recruitmentStage
                            )?.StageName
                          : "--"}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {application.vesselType || "--"}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {application.department || "--"}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {application.position || "--"}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          )}
        </div>
      </div>
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
              {
                "Are you sure that you want to Retire this applicant from the Application Process?"
              }
            </h3>
            <div className="flex flex-col gap-3 my-4">
              <span>{`Applicant: ${
                selected.seafarerName || "Undefined"
              }`}</span>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">
                  This Applicant is retiring while being on:
                </span>
                <span className="text-sm font-light ">
                  {selected.recruitmentStage
                    ? stageData.find(
                        (stage) => stage.Id == selected.recruitmentStage
                      )?.StageName
                    : "--"}
                </span>
              </div>
              <span className="text-sm font-semibold ">
                Reason provided by the applicant:
              </span>
              <span className="text-sm font-light ">
                {selected.retirementReason}
              </span>
            </div>
            <div className="my-3">
              <span></span>
            </div>
            <div className="flex justify-center gap-4">
              <Button
                color="warning"
                // disabled={!retireReason}
                onClick={() => {
                  handleDeny();
                }}
              >
                Deny
              </Button>
              <Button color="failure" onClick={() => handleRetire()}>
                Approve & Retire
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RetireRequest;
