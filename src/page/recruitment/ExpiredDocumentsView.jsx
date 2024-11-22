import { Pagination, Table } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  exportAnyExcel,
  fetchExpiredDocumentsReport,
  getPositions,
  getVessels,
  getVesselType,
} from "../../util/services";
import { useEffect } from "react";
import { LoadingState } from "../../components/skeleton/LoadingState";
import { InputText } from "../../components/layoutComponents";
import stageData from "../../assets/tables/json/RecruitmentStage-static.json";

export const ExpiredDocumentsView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [seafarers, setSeafarers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingVar, setLoadingVar] = useState(true);
  const [vesselData, setVesselData] = useState([]);
  const [positionsData, setPositionsData] = useState([]);
  const [vesselTypesData, setVesselTypesData] = useState([]);

  const getPositionName = (id) => {
    if (id == 1) return "N/A";
    const item = positionsData.find((entry) => entry.Id == id);
    return item ? item.PositionName || item.Id || id : id; // Ajustar clave según tu estructura
  };
  const getVesselTypeName = (id) => {
    const item = vesselTypesData.find((entry) => entry.Id == id);
    return item ? item.Name || item.Id || id : id; // Ajustar clave según tu estructura
  };
  const getVesselName = (id) => {
    const item = vesselData.find((entry) => entry.Id == id);
    return item ? item["Vessel Name"] || item.Id || id : id; // Ajustar clave según tu estructura
  };
  const getStageName = (id) => {
    const item = stageData.find((entry) => entry.Id == id);
    return item ? item.StageName || item.Id || id : id; // Ajustar clave según tu estructura
  };

  const handleProfileLink = (uid) => {
    navigate("/profile/" + uid);
  };

  const loadResults = async (months) => {
    try {
      // if (lastVisible) {
      const seafarersData = await fetchExpiredDocumentsReport(months);
      const vessels = await getVessels();
      const positionsData = await getPositions();
      const typeOfVesselData = await getVesselType();
      setVesselData(vessels);
      setPositionsData(positionsData);
      setVesselTypesData(typeOfVesselData);
      setSeafarers(seafarersData.expiredDocuments);
      setLoadingVar(false);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  useEffect(() => {
    setLoadingVar(true);
    loadResults();
  }, []);

  const [value, setValue] = useState(1);

  // Manejar cambios del slider
  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setValue(newValue);
    setLoadingVar(true);
    loadResults(newValue);
  };

  const sendArrayToBackend = () => {
    const formattedSeafarers = seafarers.map((seafarer) => {
      // Crear un nuevo objeto sin el campo `uid` y reordenar propiedades
      const {
        uid,
        recruitmentStage,
        position,
        returnDate,
        vessel,
        name,
        seafarerName,
        seafarerVesselType,
        expirationDate,
        isExpired,
        monthsRemaining,
      } = seafarer;

      return {
        document: name,
        seafarerName,
        recruitmentStage: getStageName(recruitmentStage),
        seafarerVesselType: getVesselTypeName(seafarerVesselType),
        position: getPositionName(position),
        returnDate,
        vessel: getVesselName(vessel),
        expirationDate,
        isExpired,
        monthsRemaining,
      };
    });

    exportAnyExcel(
      {
        dataDinamic: formattedSeafarers,
        title: `Expired Documents (${value} months)`,
      },
      `Expired Documents (${value} months)`
    );
  };

  return (
    <>
      <div className="pl-3 pb-4 pt-5  flex flex-row gap-3 items-center justify-between ">
        <div className="flex flex-row gap-2 items-center justify-between">
          <h1 className="md:pl-5 text-lg md:text-lg text-black font-bold">
            Expired Documents
          </h1>
          <span>{seafarers.length}</span>
        </div>

        <button
          disabled={loadingVar}
          onClick={sendArrayToBackend}
          className="h-8 w-32 bg-green-700 text-center text-sm rounded-md text-white disabled:opacity-35"
        >
          Export to Excel
        </button>
      </div>
      <div className="flex flex-col items-start mb-4 ml-10">
        <label htmlFor="slider" className="text-sm font-medium mb-2">
          Months until Expiry
        </label>
        <input
          disabled={loadingVar}
          type="range"
          id="slider"
          min="1"
          max="30"
          value={value}
          onChange={handleSliderChange}
          className="w-48"
        />
        <span className="mt-2 text-sm font-semibold">Months: {value}</span>
      </div>
      <section>
        <section className="px-8 ">
          {loadingVar ? (
            <LoadingState />
          ) : (
            <div className="overflow-x-auto max-h-96">
              <Table hoverable className="hidden md:block">
                <Table.Head>
                  <Table.HeadCell className="">No.</Table.HeadCell>
                  {/* <Table.HeadCell className="whitespace-nowrap hover:cursor-pointer">
                  Logistic ID
                </Table.HeadCell> */}
                  <Table.HeadCell className="hover:cursor-pointer">
                    Recruitment Dept.
                  </Table.HeadCell>
                  <Table.HeadCell className="hover:cursor-pointer">
                    Name
                  </Table.HeadCell>
                  <Table.HeadCell className="hover:cursor-pointer">
                    Document Type
                  </Table.HeadCell>
                  <Table.HeadCell className="hover:cursor-pointer">
                    Document Name
                  </Table.HeadCell>
                  <Table.HeadCell className="hover:cursor-pointer">
                    Expiry Date
                  </Table.HeadCell>
                  <Table.HeadCell className="hover:cursor-pointer">
                    Months Remaining
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y cursor-pointer">
                  {seafarers.map((seafarer, index) => (
                    <Table.Row
                      key={index}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      onClick={() => handleProfileLink(seafarer.uid)}
                      title={seafarer.uid}
                    >
                      <Table.Cell className="whitespace-nowrap font-light">
                        {index + 1}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {getVesselTypeName(seafarer.seafarerVesselType)}
                      </Table.Cell>

                      <Table.Cell className="whitespace-nowrap">
                        {seafarer.seafarerName.toUpperCase()}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {seafarer.type}
                      </Table.Cell>
                      <Table.Cell className="">{seafarer.name}</Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {seafarer.expirationDate}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {seafarer.monthsRemaining}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          )}
        </section>

        {/* <div className="flex overflow-x-auto justify-center mt-2">
          <Pagination
            currentPage={currentPage}
            // totalPages={seafarerCount / 25}
            totalPages={10}
            // onPageChange={onPageChange}
          />
        </div> */}
      </section>
    </>
  );
};

export default ExpiredDocumentsView;
