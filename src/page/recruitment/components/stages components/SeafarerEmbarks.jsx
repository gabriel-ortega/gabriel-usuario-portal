import { Badge, Table } from "flowbite-react";
import { useState, lazy } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { ModalYesNo } from "../../../../components/layoutComponents";
import { Suspense } from "react";
import { LoadingState } from "../../../../components/skeleton/LoadingState";
import { useSelector } from "react-redux";
import EmbarkStatus from "../../../../assets/tables/json/EmbarkStatus-static.json";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getSeafarerEmbarksBySeafarer,
  getSeafarerHiringsById,
} from "../../../../store/userData";
import { setCurrentEmbark } from "../../../../store/currentViews/viewSlice";
import { getVessels } from "../../../../util/services";
import { formatDate } from "../../../../util/helperFunctions";
// import { EmbarkForm } from "./EmbarkForm";
const EmbarkForm = lazy(() => import("./EmbarkForm"));

export const SeafarerEmbarks = () => {
  const dispatch = useDispatch();
  const [hasEmbarks, setHasEmbarks] = useState(false);
  const {
    embarks,
    profile,
    currentEmbark: currentEmbarkState,
    currentHiring,
    positions,
  } = useSelector((state) => state.currentViews);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [vesselsData, setVesselsData] = useState([]);

  const [sortedEmbarks, setSortedEmbarks] = useState([]);
  useEffect(() => {
    const newEmbarks = [...embarks];
    const sorted = newEmbarks.sort(
      (a, b) => new Date(b.signOnDate) - new Date(a.signOnDate)
    );
    setSortedEmbarks(sorted);
  }, [embarks]);

  const load = async () => {
    const vessels = await getVessels();
    setVesselsData(vessels);
    setIsLoading(false);
  };

  useEffect(() => {
    if (vesselsData.length < 1) {
      load();
    }
    dispatch(getSeafarerEmbarksBySeafarer(profile.uid));
  }, []);

  const handleOpen = (index) => {
    dispatch(setCurrentEmbark(sortedEmbarks[index]));
    dispatch(getSeafarerHiringsById(sortedEmbarks[index].contractId));
    setIsOpen(true);
  };

  /* FUNCION PARA CERRAR EL, MODAL */
  const closeModal = () => {
    setIsOpen(false);
    // setEditData(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return "warning";
      case 2:
        return "green";
      case 3:
        return "orange";
      case 4:
        return "green";
      case 5:
        return "red";
      case 6:
        return "red";
      default:
        return "gray"; // Default color
    }
  };
  const statusColor = getStatusColor(currentEmbarkState?.status || "");
  return (
    <section className="">
      <div className="mb-3 flex flex-col gap-2 items-center justify-between text-gray-500 sm:flex-row sm:space-x-4 text-sm">
        <span>
          Currently OnBoard Of:{" "}
          <span className="font-bold">
            {embarks.length > 0
              ? embarks.find((embark) => embark.status == 2)?.vessel?.name ||
                "--"
              : "--"}
          </span>
        </span>
      </div>

      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            {/* <Table.HeadCell>No.</Table.HeadCell> */}
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Company</Table.HeadCell>
            <Table.HeadCell>Vessel</Table.HeadCell>
            <Table.HeadCell>Return Date</Table.HeadCell>
            <Table.HeadCell>Commence Date</Table.HeadCell>
            <Table.HeadCell>Sign On Date</Table.HeadCell>
            <Table.HeadCell>Contract Length (Months)</Table.HeadCell>
            <Table.HeadCell>Estimated Sign Off Date</Table.HeadCell>
            <Table.HeadCell>Sign Off Date</Table.HeadCell>
            <Table.HeadCell>DOA</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y cursor-pointer">
            {sortedEmbarks.length < 1 || isLoading ? (
              <Table.Row>
                <Table.Cell className="whitespace-nowrap">{"--"}</Table.Cell>
                <Table.Cell className="whitespace-nowrap">{"--"}</Table.Cell>
                <Table.Cell className="whitespace-nowrap">{"--"}</Table.Cell>
                <Table.Cell className="whitespace-nowrap">{"--"}</Table.Cell>
                <Table.Cell className="whitespace-nowrap">{"--"}</Table.Cell>
                <Table.Cell className="whitespace-nowrap">{"--"}</Table.Cell>
                <Table.Cell className="whitespace-nowrap">{"--"}</Table.Cell>
                <Table.Cell className="whitespace-nowrap">{"--"}</Table.Cell>
                <Table.Cell className="whitespace-nowrap">{"--"}</Table.Cell>
                <Table.Cell className="whitespace-nowrap">{"--"}</Table.Cell>
              </Table.Row>
            ) : (
              sortedEmbarks.map((embark, index) => (
                <Table.Row key={index} onClick={() => handleOpen(index)}>
                  {/* <Table.Cell className="whitespace-nowrap">
                    {index + 1 || "--"}
                  </Table.Cell> */}
                  <Table.Cell className="whitespace-nowrap">
                    {EmbarkStatus[embark?.status - 1]?.StatusName || "--"}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {embark.contractCompany?.name || "--"}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {/* {embark.vessel?.name || "--"} */}
                    {vesselsData[Number(embark.vessel?.id) - 1][
                      "Vessel Name"
                    ] || "--"}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {embark.returnDate
                      ? formatDate(embark.returnDate, "mm-dd-yyyy")
                      : "--"}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {embark.commenceDate
                      ? formatDate(embark.commenceDate, "mm-dd-yyyy")
                      : "--"}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {embark.signOnDate
                      ? formatDate(embark.signOnDate, "mm-dd-yyyy")
                      : "--"}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {embark.contractLength || "--"}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {embark.estimatedSignOffDate
                      ? formatDate(embark.estimatedSignOffDate, "mm-dd-yyyy")
                      : "--"}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {embark.signOffDate
                      ? formatDate(embark.signOffDate, "mm-dd-yyyy")
                      : "--"}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {embark.doa ? formatDate(embark.doa, "mm-dd-yyyy") : "--"}
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
            <div className="flex flex-row justify-center mb-2">
              <span>
                {profile.seafarerData?.seafarerProfile?.profile?.firstName ||
                profile.seafarerData?.seafarerProfile?.profile?.lastName
                  ? `${profile.seafarerData?.seafarerProfile?.profile?.firstName} ${profile.seafarerData?.seafarerProfile?.profile?.lastName}`
                  : profile?.displayName
                  ? profile?.displayName
                  : "--"}{" "}
                Embark:
              </span>
            </div>
            <div className="font-bold flex flex-row items-center justify-start gap-2">
              Company:
              <span className="text-gray-500 font-normal">
                {currentHiring.company?.name}
              </span>
            </div>
            <div className="font-bold flex flex-row items-center justify-start gap-2">
              Embark Status:
              <Badge color={statusColor} size={"sm"}>
                {EmbarkStatus[currentEmbarkState?.status - 1]?.StatusName || ""}
              </Badge>
            </div>
            <div className="font-bold flex flex-row items-center justify-start gap-2">
              Embarked As:
              <span className="text-gray-500 font-normal">
                {currentEmbarkState.position &&
                  positions &&
                  positions.find((pos) => pos.Id == currentEmbarkState.position)
                    .PositionName}
              </span>
            </div>
          </div>
        }
        disableButtonConfirm={true}
        disableButtonCancel={true}
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <Suspense fallback={<LoadingState />}>
          <EmbarkForm isModal data={currentEmbarkState} />
        </Suspense>
      </ModalYesNo>
    </section>
  );
};

export default SeafarerEmbarks;
