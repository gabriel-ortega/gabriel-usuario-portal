import { Badge, Table } from "flowbite-react";
import { useSelector } from "react-redux";

import {
  getSeafarerData,
  getSeafarerEmbarksById,
  getSeafarerEmbarksBySeafarer,
  getSeafarerHiringsById,
} from "../../store/userData";
import { HiArrowLeft, HiDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoadingState } from "../../components/skeleton/LoadingState";
import { useEffect } from "react";

import { getSeafarerHirings } from "../../store/userData";
import { useState } from "react";
import notFound from "../../assets/imagenes/notFound.gif";
import EmbarkStatus from "../../assets/tables/json/EmbarkStatus-static.json";
import { ModalYesNo } from "../../components/layoutComponents";
import { ApplicantEmbarkForm } from "../recruitment/components/stages components/ApplicantEmbarkForm";
import { Suspense } from "react";
import { setCurrentEmbark } from "../../store/currentViews/viewSlice";

export default function MyEmbarks() {
  const dispatch = useDispatch();
  const { userData, isSaving } = useSelector((state) => state.userData);
  const { hirings, profile, currentHiring, currentEmbark, embarks } =
    useSelector((state) => state.currentViews); // Ensure `profile` is defined here
  const [existe, setExiste] = useState(true);
  const [isLoading, setIsLoading] = useState(!profile?.uid);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleBackClick = () => {
    navigate("/home");
  };
  const handleOpen = (index) => {
    dispatch(setCurrentEmbark(embarks[index]));
    dispatch(getSeafarerHiringsById(embarks[index].contractId));
    setIsOpen(true);
  };

  useEffect(() => {
    dispatch(getSeafarerEmbarksBySeafarer(userData.uid));
    dispatch(getSeafarerData(userData.uid));
  }, []);

  useEffect(() => {
    if (profile?.uid) {
      setIsLoading(false);
    }

    return () => {
      setIsLoading(true);
    };
  }, [profile]);

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

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          {1 === userData.recruitmentStage ||
          7 === userData.recruitmentStage ||
          8 === userData.recruitmentStage ||
          9 === userData.recruitmentStage ||
          10 === userData.recruitmentStage ||
          11 === userData.recruitmentStage ||
          12 === userData.recruitmentStage ||
          13 === userData.recruitmentStage ||
          14 === userData.recruitmentStage ||
          15 === userData.recruitmentStage ||
          16 === userData.recruitmentStage ||
          17 === userData.recruitmentStage ||
          18 === userData.recruitmentStage ? (
            <div className="flex flex-col items-center justify-center h-1/2">
              <img
                src={notFound}
                alt={"Profile Not Found"}
                className="size-36"
              />
              <div className="flex flex-col gap-2 items-center justify-center">
                <span>Profile not found. Try Again!</span>
                <button
                  className="flex flex-auto items-center text-[#1976d2] text-sm font-style: italic hover:bg-blue-50"
                  onClick={handleBackClick}
                  disabled={isSaving}
                >
                  <HiArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </button>
              </div>
            </div>
          ) : (
            <div className="p-5">
              <h1 className="text-lg font-bold ">Embarks</h1>
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
                  </Table.Head>
                  <Table.Body className="divide-y cursor-pointer">
                    {embarks.length < 1 ? (
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
                      embarks.map((embark, index) => (
                        <Table.Row
                          key={index}
                          onClick={() => handleOpen(index)}
                        >
                          {/* <Table.Cell className="whitespace-nowrap">
                    {index + 1 || "--"}
                  </Table.Cell> */}
                          <Table.Cell className="whitespace-nowrap">
                            {EmbarkStatus[embark?.status - 1]?.StatusName ||
                              "--"}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            {embark.contractCompany?.name || "--"}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            {embark.vessel?.name || "--"}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            {embark.returnDate || "--"}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            {embark.commenceDate || "--"}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            {embark.signOnDate || "--"}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            {embark.contractLength || "--"}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            {embark.estimatedSignOffDate || "--"}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            {embark.signOffDate || "--"}
                          </Table.Cell>
                        </Table.Row>
                      ))
                    )}
                  </Table.Body>
                </Table>
              </div>
            </div>
          )}
        </>
      )}
      <ModalYesNo
        size="2xl"
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
              <Badge color={getStatusColor(currentEmbark?.status)} size={"sm"}>
                {EmbarkStatus[currentEmbark?.status - 1]?.StatusName || ""}
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
          <ApplicantEmbarkForm />
        </Suspense>
      </ModalYesNo>
    </>
  );
}
