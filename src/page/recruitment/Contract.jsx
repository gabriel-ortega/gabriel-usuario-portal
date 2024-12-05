import HiringForm from "./components/stages components/HiringForm";
import { HiArrowLeft, HiOutlineUser } from "react-icons/hi";
import { FormPrompt } from "../../hooks/FormPrompt";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaFloppyDisk } from "react-icons/fa6";
import { Badge, Card } from "flowbite-react";
import { LoadingState } from "../../components/skeleton/LoadingState";
import { getInterviewers } from "../../util/services";
import { useEffect } from "react";
import {
  getSeafarerData,
  getSeafarerHirings,
  getSeafarerHiringsById,
  updateSeafarerHiring,
} from "../../store/userData";
import { setInterviewers } from "../../store/currentViews/viewSlice";
import toast from "react-hot-toast";
import notFound from "../../assets/imagenes/notFound.gif";
import stageData from "../../assets/tables/json/RecruitmentStage-static.json";

export const Contract = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isSaving, userData } = useSelector((state) => state.userData);
  const { profile, currentHiring, interviewers, hirings } = useSelector(
    (state) => state.currentViews
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [existe, setExiste] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      if (currentHiring?.id !== id) {
        const existeVar = await dispatch(getSeafarerHiringsById(id));
        setExiste(existeVar);
      }
      if (interviewers.length < 1) {
        load();
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (profile?.uid !== currentHiring?.uid) {
      console.log("buscando seafarerData");
      dispatch(getSeafarerData(currentHiring.uid));
    }
    if (hirings.length < 1 && currentHiring?.uid) {
      dispatch(getSeafarerHirings(currentHiring?.uid));
    }
  }, [currentHiring]);

  const save = (e) => {
    e.preventDefault();
    setHasUnsavedChanges(false);

    // Comprobación si status.name es 1 y ya existe un hiring activo
    if (currentHiring.status.id === "1") {
      const existingActiveHiring = hirings.find(
        (hiring) => hiring.status.id === "1" && hiring.id !== currentHiring.id // Evita validar contra sí mismo en edición
      );

      if (existingActiveHiring) {
        toast.error(
          `There is already an active hiring with ${existingActiveHiring.company.name}. You cannot add another.`
        );
        return; // Evita la creación/actualización si ya existe uno activo
      }
    }

    // Comprobación si ya existe otro hiring con la misma compañía
    const existingSameCompanyHiring = hirings.find(
      (hiring) =>
        hiring.company.id === currentHiring.company.id &&
        hiring.id !== currentHiring.id // Evita validar contra sí mismo en edición
    );

    if (existingSameCompanyHiring) {
      toast.error(
        `There is already a hiring with the company ${existingSameCompanyHiring.company.name}. Please use a different company.`
      );
      return; // Evita la creación/actualización si ya existe una contratación con la misma compañía
    }

    // Actualizar un registro de hiring existente
    toast.promise(
      dispatch(updateSeafarerHiring(currentHiring.id, currentHiring)),
      {
        loading: "Saving...",
        success: <b>Saved</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
  };

  const load = async () => {
    const data = await getInterviewers();
    dispatch(setInterviewers(data));
  };

  const handleBackClick = () => {
    navigate("/hirings");
  };

  const seeProfile = () => {
    navigate("/profile/" + profile.uid);
  };

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          {!existe ? (
            <div className="flex flex-col items-center justify-center h-1/2">
              <img
                src={notFound}
                alt={"Application Not Found"}
                className="size-36"
              />
              <div className="flex flex-col gap-2 items-center justify-center">
                <span>Hiring Contract not found. Try Again!</span>
                <button
                  className="flex flex-auto items-center text-[#1976d2] text-sm font-style: italic hover:bg-blue-50"
                  onClick={handleBackClick}
                  disabled={isSaving}
                >
                  <HiArrowLeft className="h-4 w-4 mr-2" />
                  Back to Hirings
                </button>
              </div>
            </div>
          ) : (
            <>
              <FormPrompt hasUnsavedChanges={hasUnsavedChanges} />
              <button
                className="flex flex-auto items-center text-[#1976d2] text-sm font-style: italic hover:bg-blue-50"
                onClick={handleBackClick}
                disabled={isSaving}
              >
                <HiArrowLeft className="h-4 w-4 mr-2" />
                Back to Hirings
              </button>
              <div className="w-full shadow-lg rounded-lg p-6">
                <div className="flex flex-col   lg:justify-between">
                  <div className="flex-row space-y-2">
                    <div className="flex flex-row items-center gap-3">
                      <h2 className="tracking-tight text-gray-500">
                        Seafarer Contract:
                      </h2>
                      {/* <div className="w-28 md:w-1/6 font-bold"> */}
                      <Badge size={"sm"} color={"warning"}>
                        {currentHiring?.company?.name}
                      </Badge>
                      {/* </div> */}
                    </div>
                    <div className="flex flex-row justify-between items-center gap-2">
                      <h1 className="text-2xl md:text-3xl  font-bold tracking-tight w-[85%]">
                        {`${
                          profile?.seafarerData?.seafarerProfile?.profile
                            ?.firstName || "-"
                        } ${
                          profile?.seafarerData?.seafarerProfile?.profile
                            ?.lastName || "-"
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
                              ? stageData[profile?.recruitmentStage - 1]
                                  .StageName
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
                  {!currentHiring?.id || currentHiring == undefined ? (
                    <LoadingState />
                  ) : (
                    <HiringForm
                      data={currentHiring}
                      interviewers={interviewers}
                      currentInterviewer={userData.uid}
                      onDataChange={() => setHasUnsavedChanges(true)}
                    />
                  )}
                </section>
              </Card>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Contract;
