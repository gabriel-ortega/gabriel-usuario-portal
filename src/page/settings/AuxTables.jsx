import { Card, Sidebar } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { AddSomethingTable } from "../application/applicationProfile/components/AddSomethingTable";
import { useEffect } from "react";
import {
  getApplicationsource,
  getCertificates,
  getCompanies,
  getCorregimientoPanama,
  getCountry,
  getDepartments,
  getDistritoPanama,
  getDocument,
  getEducation,
  getHarvester,
  getLanguage,
  getMaterialStatus,
  getPositions,
  getProvincias,
  getReasons,
  getSignReasons,
  getVaccinebrands,
  getVessels,
  getVesselType,
  getVesselTypeName,
} from "../../util/services";
import { LoadingState } from "../../components/skeleton/LoadingState";
import notFound from "../../assets/imagenes/notFound.gif";

const tables = [
  { id: "vesselTypes", name: "Vessel Types", fetchData: getVesselType },
  { id: "countries", name: "Countries", fetchData: getCountry },
  { id: "departments", name: "Departments", fetchData: getDepartments },
  { id: "positions", name: "Positions", fetchData: getPositions },
  { id: "maritalStatus", name: "Marital Status", fetchData: getMaterialStatus },
  { id: "education", name: "Education", fetchData: getEducation },
  { id: "documents", name: "Documents", fetchData: getDocument },
  { id: "typeVessel", name: "Type of Vessels", fetchData: getVesselTypeName },
  { id: "certificates", name: "Certificates", fetchData: getCertificates },
  { id: "harvesters", name: "Harvesters", fetchData: getHarvester },
  {
    id: "applicationSource",
    name: "Application Sources",
    fetchData: getApplicationsource,
  },
  { id: "companies", name: "Companies", fetchData: getCompanies },
  {
    id: "corregimientos",
    name: "Panama Corregimientos",
    fetchData: getCorregimientoPanama,
  },
  { id: "distritos", name: "Panama Distritos", fetchData: getDistritoPanama },
  { id: "provincias", name: "Panama Provincias", fetchData: getProvincias },
  { id: "languages", name: "Languages", fetchData: getLanguage },
  { id: "stageReasons", name: "Retire Reasons", fetchData: getReasons },
  { id: "signOffReasons", name: "Sign Off Reasons", fetchData: getSignReasons },
  { id: "vaccines", name: "Vaccine Brands", fetchData: getVaccinebrands },
  { id: "vessels", name: "Vessels", fetchData: getVessels },
];

export const AuxTables = () => {
  const [activeStage, setActiveStage] = useState("");
  const [headers, setHeaders] = useState([]);
  const [tableData, setTableData] = useState([]); // Datos de la tabla seleccionada
  const [loading, setLoading] = useState(false); // Estado de carga
  useEffect(() => {
    setHeaders(tableData.length > 0 ? Object.keys(tableData[0]) : []);
  }, [tableData]);

  useEffect(() => {
    const loadTableData = async () => {
      if (!activeStage) return;

      setLoading(true);
      try {
        // Buscar la tabla seleccionada y ejecutar su función `fetchData`
        const table = tables.find((tab) => tab.id === activeStage);
        const data = table ? await table.fetchData() : [];
        setTableData(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching table data:", error);
        setTableData([]);
      } finally {
        setLoading(false);
      }
    };

    loadTableData();
  }, [activeStage]);

  return (
    <section className="pl-3 pt-5">
      <div className="flex flex-row gap-2 items-center justify-between">
        <h1 className="md:pl-5 text-lg md:text-lg text-black font-bold">
          Auxiliary Tables
        </h1>
      </div>
      <div className="flex">
        <Sidebar aria-label="Tables">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              {tables
                .sort((a, b) => a.name.localeCompare(b.name)) // Ordenar por 'name' alfabéticamente
                .map((tab) => (
                  <Sidebar.Item
                    className={`cursor-pointer ${
                      activeStage === tab.id &&
                      "bg-[#1976d2] text-white focus:text-white hover:text-black"
                    }`}
                    key={tab.id}
                    onClick={() => setActiveStage(tab.id)}
                  >
                    {tab.name}
                  </Sidebar.Item>
                ))}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
        <Card className="ml-2 w-screen h-full overflow-x-auto">
          {/* Main Content Area */}
          <div className="flex-1 px-6">
            <h2 className="text-md font-bold mb-4">
              {tables.find((stage) => stage.id === activeStage)?.name}
            </h2>
            {loading ? (
              <LoadingState />
            ) : (
              <>
                {!activeStage ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <img
                      src={notFound}
                      alt={"Application Not Found"}
                      className="size-36"
                    />
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <span>Select a table</span>
                    </div>
                  </div>
                ) : (
                  <AddSomethingTable
                    //   title="Seafarer Documents"
                    //   formTitle="Seafarer Document"
                    bgClassName=""
                    sorting={true}
                    headers={headers}
                    // disabled={disabled}
                    newFormData={tableData}
                    childrenForm={<></>}
                    // onDataChange={(e) => {
                    //   if (e !== documentsData) {
                    //     handleDocumentsChange(e);
                    //   }
                    // }}
                    enumaration={false}
                  />
                )}
              </>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default AuxTables;
