import { Badge, Table } from "flowbite-react";
import { useEffect, Suspense, useState } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getSecondInterviews } from "../../../../store/userData";
import { ModalYesNo } from "../../../../components/layoutComponents";
import { SecondInterviewForm } from "../../../applicationProcess/components/SecondInterviewForm";
import { LoadingState } from "../../../../components/skeleton/LoadingState";
import { formatDate } from "../../../../util/helperFunctions";
import { setCurrentInterview } from "../../../../store/currentViews/viewSlice";

export const SecondInterviewView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { secondInterview, profile, interviewers, currentInterview } =
    useSelector((state) => state.currentViews);
  const { userData } = useSelector((state) => state.userData);
  const [isOpen, setIsOpen] = useState(false);
  const [isNewVariable, setIsNewVariable] = useState(false);

  const [currentInterviewer, setCurrentInterviewer] = useState({});

  const [latestInterview, setLatestInterview] = useState(
    secondInterview[secondInterview.length - 1] || {}
  );

  useEffect(() => {
    if (secondInterview[secondInterview.length - 1] !== latestInterview) {
      setLatestInterview(secondInterview[secondInterview.length - 1]);
    }
  }, [secondInterview]);

  /* FUNCION PARA CERRAR EL, MODAL */
  const closeModal = () => {
    setIsOpen(false);
    // setEditData(null);
  };

  useEffect(() => {
    dispatch(getSecondInterviews(profile.uid));
  }, []);

  // useMemo(() => {
  //   if (secondInterview.length < 1) {
  //     dispatch(getSecondInterviews(profile.uid));
  //   }
  // }, [id]);

  const handleNew = () => {
    // dispatch(setCurrentHiring({}));
    setCurrentInterviewer({});
    setIsNewVariable(true);
    setIsOpen(true);
  };

  const handleOpen = (id) => {
    // navigate(`/profile/${id}/first-interview/987493814`);
    dispatch(
      setCurrentInterview(
        secondInterview[secondInterview.findIndex((item) => item.id === id)]
      )
    );
    // dispatch(setCurrentHiring(hirings[index]));
    setIsNewVariable(false);
    setIsOpen(true);
  };

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

  return (
    <section className="">
      <div className="mb-3 flex flex-col gap-2 items-center justify-between text-gray-500 sm:flex-row sm:space-x-4 text-sm">
        <span>
          Latest Second Interview Status:{" "}
          <span className="font-bold">{latestInterview?.status || "--"}</span>
        </span>
        <span>
          Latest Interview Date:{" "}
          <span className="font-bold">
            {latestInterview?.interviewDate || "--"}
          </span>
        </span>
        <span className="flex flex-row justify-end">
          <button
            disabled
            className="border border-[#010064] bg-[#010064] text-white size-10 md:w-48 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30 disabled:cursor-not-allowed"
            //   disabled={isSaving}
            onClick={handleNew}
          >
            <HiOutlinePlusSm className="h-4 w-4" />
            <span className="hidden  md:block ">Create new Interview</span>
          </button>
        </span>
      </div>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Version</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Interviewer</Table.HeadCell>
            <Table.HeadCell>Appointment Date</Table.HeadCell>
            <Table.HeadCell>Interview Date</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y cursor-pointer">
            {secondInterview.length < 1 ? (
              <Table.Row>
                <Table.Cell className="whitespace-nowrap">{"--"}</Table.Cell>
                <Table.Cell className="whitespace-nowrap">{"--"}</Table.Cell>
                <Table.Cell className="whitespace-nowrap">{"--"}</Table.Cell>
                <Table.Cell className="whitespace-nowrap">{"--"}</Table.Cell>
                <Table.Cell className="whitespace-nowrap">{"--"}</Table.Cell>
              </Table.Row>
            ) : (
              secondInterview
                .slice() // Crear una copia para no mutar el original
                .reverse() // Invierte el orden de los elementos
                .map((interview, index) => (
                  <Table.Row
                    key={index}
                    onClick={() => handleOpen(interview.id)}
                  >
                    <Table.Cell className="whitespace-nowrap">
                      {`v${index + 1}` || "--"}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {interview.status || "--"}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {interview.interviewer?.name || "--"}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {interview.appointment || "--"}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {interview.interviewDate || "--"}
                    </Table.Cell>
                  </Table.Row>
                ))
            )}
          </Table.Body>
        </Table>
      </div>
      <ModalYesNo
        size="4xl"
        text={
          <div>
            <div className="flex flex-col justify-center mb-2">
              <span>
                {profile.seafarerData?.seafarerProfile?.profile?.firstName ||
                profile.seafarerData?.seafarerProfile?.profile?.lastName
                  ? `${profile.seafarerData?.seafarerProfile?.profile?.firstName} ${profile.seafarerData?.seafarerProfile?.profile?.lastName}`
                  : profile?.displayName
                  ? profile?.displayName
                  : "--"}{" "}
                Second Interview:
              </span>
              <span className="font-semibold">
                {/* {currentHiringState?.company?.value} */}
              </span>
            </div>
            <div className="font-bold flex flex-row items-center justify-start gap-2">
              Interview Status:
              <Badge
                color={getStatusColor(currentInterview?.status)}
                size={"sm"}
              >
                {currentInterview?.status}
              </Badge>
            </div>
            <div className="flex flex-row gap-2 ">
              <div className="font-light text-sm flex flex-row items-center justify-start gap-2">
                Created On:
              </div>
              <div className="font-light text-sm flex flex-row items-center justify-start gap-2">
                Modified On:
              </div>
            </div>
          </div>
        }
        disableButtonConfirm={true}
        disableButtonCancel={true}
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <Suspense fallback={<LoadingState />}>
          <SecondInterviewForm
            interviewers={interviewers}
            isModal
            data={currentInterview}
            isNew={isNewVariable}
            currentInterviewer={userData.uid}
          />
        </Suspense>
      </ModalYesNo>
    </section>
  );
};

export default SecondInterviewView;
