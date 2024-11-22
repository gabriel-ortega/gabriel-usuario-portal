import { Badge, Table } from "flowbite-react";
import { useState, lazy } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { ModalYesNo } from "../../../../components/layoutComponents";
import { Suspense } from "react";
import { LoadingState } from "../../../../components/skeleton/LoadingState";
import { useDispatch } from "react-redux";
import { getSeafarerHirings } from "../../../../store/userData";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../../../../util/helperFunctions";
import { setCurrentHiring } from "../../../../store/currentViews/viewSlice";
const HiringForm = lazy(() => import("./HiringForm"));

export const SeafarerHiring = () => {
  const dispatch = useDispatch();
  const { isSaving, isLoading, userData } = useSelector(
    (state) => state.userData
  );
  const {
    hirings,
    profile,
    currentHiring: currentHiringState,
    interviewers,
  } = useSelector((state) => state.currentViews);
  const [hasHirings, setHasHirings] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isNewVariable, setIsNewVariable] = useState(false);

  /* FUNCION PARA CERRAR EL, MODAL */
  const closeModal = () => {
    setIsOpen(false);
    // setEditData(null);
  };

  useEffect(() => {
    dispatch(getSeafarerHirings(profile.uid));
  }, []);

  const handleNew = () => {
    // if (profile.recruitmentStage !== 5) {
    //   setOpenModal(true);
    // }
    dispatch(setCurrentHiring({}));
    setIsNewVariable(true);
    setIsOpen(true);
  };

  const handleOpen = (index) => {
    dispatch(setCurrentHiring(hirings[index]));
    setIsNewVariable(false);
    setIsOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "green";
      case "Inactive":
        return "red";
      default:
        return "gray"; // Default color
    }
  };

  const existingActiveHiring = hirings.find(
    (hiring) => hiring.status.id === "1"
  );

  const oldestHiring =
    hirings.length > 0
      ? hirings.reduce((oldest, current) => {
          return new Date(current.contractDate) < new Date(oldest.contractDate)
            ? current
            : oldest;
        })
      : null;

  return (
    <section className="">
      {hirings ? (
        <>
          <div className="mb-3 flex flex-col gap-2 items-center justify-between text-gray-500 sm:flex-row sm:space-x-4 text-sm">
            <span>
              Active Since:{" "}
              <span className="font-bold">
                {oldestHiring?.contractDate
                  ? formatDate(oldestHiring?.contractDate, "dd-mm-yyyy")
                  : "--" || "--"}{" "}
              </span>
            </span>
            <span>
              Currently Active With:{" "}
              <span className="font-bold">
                {existingActiveHiring?.company.name || "--"}
              </span>
            </span>
            <span className="flex flex-row justify-end">
              <button
                className="border border-[#010064] bg-[#010064] text-white size-10 md:w-48 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30"
                //   disabled={isSaving}
                onClick={(e) => handleNew()}
              >
                <HiOutlinePlusSm className="h-4 w-4" />
                <span className="hidden  md:block ">Create new Contract</span>
              </button>
            </span>
          </div>
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>No.</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Company</Table.HeadCell>
                <Table.HeadCell>Employee Number</Table.HeadCell>
                <Table.HeadCell>Latest DOA</Table.HeadCell>
                <Table.HeadCell>Amount of Embarkations</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y cursor-pointer">
                {hirings.length < 1 ? (
                  <Table.Row>
                    <Table.Cell className="whitespace-nowrap">
                      {"--"}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {"--"}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {"--"}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {"--"}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {"--"}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {"--"}
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  hirings.map((hiring, index) => (
                    <Table.Row key={index} onClick={(e) => handleOpen(index)}>
                      <Table.Cell className="whitespace-nowrap">
                        {index + 1 || "--"}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {hiring.status?.name || "--"}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {hiring.company?.name || "--"}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {hiring.employeeNumber || "--"}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {hiring.latestDOA || "--"}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {hiring.amountEmbarks || "--"}
                      </Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table>
          </div>
        </>
      ) : (
        <LoadingState />
      )}
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
                Contract:
              </span>
              <span className="font-semibold">
                {currentHiringState?.company?.value}
              </span>
            </div>
            <div className="font-bold flex flex-row items-center justify-start gap-2">
              Contract Status:
              <Badge
                color={getStatusColor(currentHiringState?.status?.name)}
                size={"sm"}
              >
                {currentHiringState?.status?.name}
              </Badge>
            </div>
          </div>
        }
        disableButtonConfirm={true}
        disableButtonCancel={true}
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <Suspense fallback={<LoadingState />}>
          <HiringForm
            isModal
            data={currentHiringState}
            isNew={isNewVariable}
            interviewers={interviewers}
            currentInterviewer={userData.uid}
          />
        </Suspense>
      </ModalYesNo>
    </section>
  );
};

export default SeafarerHiring;
