import { useDispatch } from "react-redux";
import { Button, Card, Pagination, Table } from "flowbite-react";
import {
  downloadExcel,
  exportAnyExcel,
  fetchHiringActiveData,
  getCompanies,
  getVessels,
} from "../../util/services";
import { useEffect } from "react";
import { LoadingState } from "../../components/skeleton/LoadingState";
import { useState } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import {
  setCompanies,
  setCurrentHiring,
  setProfileView,
  setVessels,
} from "../../store/currentViews/viewSlice";
import { useNavigate } from "react-router-dom";
import stageData from "../../assets/tables/json/RecruitmentStage-static.json";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { InstantSearch } from "react-instantsearch";
import { algoliasearch } from "algoliasearch";
import { HiringsRefinements } from "./components/hiringsList/HiringsRefinements";
import { GapoolSearchBox } from "./components/gappoolList/GapoolSearchBox";
import { CustomCurrentRefinements } from "./components/gappoolList/CustomCurrentRefinements";
import { Configure } from "react-instantsearch";
import { HiringsInfiniteHits } from "./components/hiringsList/HiringsInfiniteHits";
import { useSelector } from "react-redux";
const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_ID,
  import.meta.env.VITE_ALGOLIA_KEY
);

export const HiringsDashboard = () => {
  const { companies } = useSelector((state) => state.currentViews);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [companiesData, setCompaniesData] = useState([]);
  const [rawHiringsData, setRawHiringsData] = useState([]);

  // Memorizar la función de carga de datos usando useCallback para evitar recrearla en cada render.
  const load = useCallback(async () => {
    // setIsLoading(true); // Mover dentro de la función para asegurarnos de que siempre se reinicia al iniciar carga
    // const activeHirings = await fetchHiringActiveData();
    // const companiesData = await getCompanies();
    // dispatch(setCompanies(companiesData));
    // setCompaniesData(companiesData);
    // setRawHiringsData(activeHirings.data);
    // setIsLoading(false); // Finaliza el proceso de carga
  }, []);

  // Memorizar el valor de activeHirings solo si rawHiringsData cambia
  const activeHirings = useMemo(() => rawHiringsData, [rawHiringsData]);

  // useEffect para cargar datos cuando el componente se monta
  useEffect(() => {
    load();
    // setIsLoading(true);
  }, [load]); // Dependerá de la función load, que está memorizada.

  const groupedByCompany = activeHirings.reduce((acc, hiring) => {
    const companyId = hiring.company?.id || "Unknown"; // Si no hay ID de compañía, usa "Unknown"
    if (!acc[companyId]) {
      acc[companyId] = {
        companyName: hiring.company?.name || "Unknown",
        count: 0, // Inicializamos el contador de seafarers
      };
    }
    acc[companyId].count += 1; // Incrementa el conteo de seafarers para esta compañía
    return acc;
  }, {});

  const groupedByStage = activeHirings.reduce((acc, hiring) => {
    const stageId = hiring.seafarer.recruitmentStage?.Id || "Unknown"; // Si no hay ID de compañía, usa "Unknown"
    if (!acc[stageId]) {
      acc[stageId] = {
        StageName: hiring.seafarer.recruitmentStage?.StageName || "Unknown",
        count: 0, // Inicializamos el contador de seafarers
      };
    }
    acc[stageId].count += 1; // Incrementa el conteo de seafarers para esta compañía
    return acc;
  }, {});

  const [filters, setFilters] = useState({});

  const handleDowloadExcelActive = async () => {
    setIsLoading(true);
    try {
      await downloadExcel([], "hiringactive", "hiring_active");
      setIsLoading(false);
    } catch (error) {
      console.error("Error al descargar el reporte:", error.message);
      setIsLoading(false);
    }
  };

  const handleDowloadExcelTotal = async () => {
    setIsLoading(true);
    try {
      await downloadExcel([], "hiring", "hiring");
      setIsLoading(false);
    } catch (error) {
      console.error("Error al descargar el reporte:", error.message);
      setIsLoading(false);
    }
  };

  return (
    <section className="px-5 py-5">
      <h1 className="text-lg md:text-lg  text-black font-bold mb-4">
        Hirings Dashboard
      </h1>
      <div className="flex flex-col md:flex-row gap-5 md:gap-10 items-center justify-center px-5">
        <Card className="flex flex-col gap-3 items-center justify-center text-xs">
          <span className="font-bold text-gray-500">
            Currently Active Seafarers
          </span>
          <span className="text-center">{activeHirings.length}</span>
        </Card>
        <Card className="flex flex-col gap-3 items-center justify-center text-xs">
          <span className="font-bold text-gray-500">
            Cruise Ship Dept. Active Seafarers
          </span>
          <span className="text-center">
            {
              activeHirings.filter(
                (hiring) =>
                  hiring.seafarer?.seafarerData?.vesselType?.[0]?.id === "1"
              ).length
            }
          </span>
        </Card>
        <Card className="flex flex-col gap-3 items-center justify-center text-xs">
          <span className="font-bold text-gray-500">
            Merchant Vessel Dept. Active Seafarers
          </span>
          <span className="text-center">
            {
              activeHirings.filter(
                (hiring) =>
                  hiring.seafarer?.seafarerData?.vesselType?.[0]?.id === "2"
              ).length
            }
          </span>
        </Card>
      </div>
      <TabGroup className="py-5">
        <TabList className="flex flex-row items-center  justify-center bg-white ">
          <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 flex flex-col md:flex-row py-2 text-sm text-black items-center justify-center md:w-56 relative">
            Active Seafarers
          </Tab>
          <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 md:translate-y-0 h-15 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
            All Contracts
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="">
            <section className="p-8 w-full h-full">
              <div className="flex justify-end">
                <Button
                  isProcessing={isLoading}
                  color={"success"}
                  onClick={() => handleDowloadExcelActive()}
                >
                  Export to Excel
                </Button>
              </div>
              <InstantSearch
                indexName="hiringsIndex"
                searchClient={searchClient}
              >
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="md:w-1/3">
                    <HiringsRefinements onFilters={(e) => setFilters(e)} />
                  </div>
                  <div className="container overflow-y-auto">
                    <div className="">
                      <GapoolSearchBox />

                      <CustomCurrentRefinements />
                    </div>
                    <Configure hitsPerPage={50} filters={"status:1"} />
                    <HiringsInfiniteHits />
                  </div>
                </div>
              </InstantSearch>
            </section>
          </TabPanel>
          <TabPanel className="">
            <section className="p-8 w-full h-full">
              <div className="flex justify-end">
                <Button
                  isProcessing={isLoading}
                  color={"success"}
                  onClick={() => handleDowloadExcelTotal()}
                >
                  Export to Excel
                </Button>
              </div>
              <InstantSearch
                indexName="hiringsIndex"
                searchClient={searchClient}
              >
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="md:w-1/3">
                    <HiringsRefinements onFilters={(e) => setFilters(e)} />
                  </div>
                  <div className="container overflow-y-auto">
                    <div className="">
                      <GapoolSearchBox />
                      <CustomCurrentRefinements />
                    </div>
                    <Configure hitsPerPage={50} />
                    <HiringsInfiniteHits />
                  </div>
                </div>
              </InstantSearch>
            </section>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </section>
  );
};

export default HiringsDashboard;

// {isLoading ? (
//   <LoadingState />
// ) : (
//   <>
//     <div className="flex flex-col md:flex-row gap-5 md:gap-10 items-center justify-center px-5">
//       <Card className="flex flex-col gap-3 items-center justify-center text-xs">
//         <span className="font-bold text-gray-500">
//           Currently Active Seafarers
//         </span>
//         <span className="text-center">{activeHirings.length}</span>
//       </Card>
//       <Card className="flex flex-col gap-3 items-center justify-center text-xs">
//         <span className="font-bold text-gray-500">
//           Passenger Vessel Dept. Active Seafarers
//         </span>
//         <span className="text-center">
//           {
//             activeHirings.filter(
//               (hiring) =>
//                 hiring.seafarer?.seafarerData?.vesselType?.[0]?.id === "1"
//             ).length
//           }
//         </span>
//       </Card>
//       <Card className="flex flex-col gap-3 items-center justify-center text-xs">
//         <span className="font-bold text-gray-500">
//           Merchant Vessel Dept. Active Seafarers
//         </span>
//         <span className="text-center">
//           {
//             activeHirings.filter(
//               (hiring) =>
//                 hiring.seafarer?.seafarerData?.vesselType?.[0]?.id === "2"
//             ).length
//           }
//         </span>
//       </Card>
//     </div>
//     <section className="my-10">
//       <div className="flex flex-row justify-between">
//         <span className="font-semibold ">Active Seafarers</span>
//         <button
//           onClick={sendArrayToBackend}
//           className="h-8 w-32 bg-green-700 text-center text-sm rounded-md text-white"
//         >
//           Export to Excel
//         </button>
//       </div>
//       <div className="my-10">
//         <div className="overflow-x-auto max-h-96">
//           <Table hoverable className="">
//             <Table.Head>
//               <Table.HeadCell className="whitespace-nowrap">
//                 Logistic ID
//               </Table.HeadCell>
//               <Table.HeadCell>Recruitment Dept.</Table.HeadCell>
//               <Table.HeadCell>Name</Table.HeadCell>
//               <Table.HeadCell>Position</Table.HeadCell>
//               <Table.HeadCell>Nationality</Table.HeadCell>
//               <Table.HeadCell>Process Stage</Table.HeadCell>
//               <Table.HeadCell>Company</Table.HeadCell>
//               <Table.HeadCell>Employee Number</Table.HeadCell>
//               <Table.HeadCell>Latest DOA</Table.HeadCell>
//               <Table.HeadCell>Amount of Embarks</Table.HeadCell>
//               <Table.HeadCell>Contract Start Date</Table.HeadCell>
//             </Table.Head>
//             <Table.Body className="divide-y cursor-pointer">
//               {activeHirings.length < 1 ? (
//                 <Table.Row>
//                   <Table.Cell className="whitespace-nowrap">
//                     {"--"}
//                   </Table.Cell>
//                   <Table.Cell className="whitespace-nowrap">
//                     {"--"}
//                   </Table.Cell>
//                   <Table.Cell className="whitespace-nowrap">
//                     {"--"}
//                   </Table.Cell>
//                   <Table.Cell className="whitespace-nowrap">
//                     {"--"}
//                   </Table.Cell>
//                   <Table.Cell className="whitespace-nowrap">
//                     {"--"}
//                   </Table.Cell>
//                   <Table.Cell className="whitespace-nowrap">
//                     {"--"}
//                   </Table.Cell>
//                   <Table.Cell className="whitespace-nowrap">
//                     {"--"}
//                   </Table.Cell>
//                   <Table.Cell className="whitespace-nowrap">
//                     {"--"}
//                   </Table.Cell>
//                   <Table.Cell className="whitespace-nowrap">
//                     {"--"}
//                   </Table.Cell>
//                   <Table.Cell className="whitespace-nowrap">
//                     {"--"}
//                   </Table.Cell>
//                   <Table.Cell className="whitespace-nowrap">
//                     {"--"}
//                   </Table.Cell>
//                   <Table.Cell className="whitespace-nowrap">
//                     {"--"}
//                   </Table.Cell>
//                 </Table.Row>
//               ) : (
//                 activeHirings.map((hiring, index) => (
//                   <Table.Row
//                     key={index}
//                     className="bg-white dark:border-gray-700 dark:bg-gray-800"
//                     onClick={() => handleContractLink(hiring, hiring.id)}
//                   >
//                     <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
//                       {hiring.seafarer?.logisticId || "--"}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap ">
//                       {hiring.seafarer?.seafarerData?.vesselType?.[0]
//                         ?.name || "--"}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap">
//                       {hiring.seafarer.seafarerData?.seafarerProfile
//                         ?.profile?.firstName ||
//                       hiring.seafarer.seafarerData?.seafarerProfile
//                         ?.profile?.lastName
//                         ? `${hiring.seafarer.seafarerData?.seafarerProfile?.profile?.firstName} ${hiring.seafarer.seafarerData?.seafarerProfile?.profile?.lastName}`.toUpperCase()
//                         : hiring.seafarer?.displayName
//                         ? hiring.seafarer?.displayName.toUpperCase()
//                         : "--".toUpperCase()}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap ">
//                       {hiring.seafarer?.seafarerData?.position?.[0]
//                         ?.name || "--"}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap ">
//                       {hiring.seafarer?.seafarerData?.seafarerProfile
//                         ?.profile?.countryBirth?.CountryName || "--"}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap ">
//                       {hiring.seafarer?.recruitmentStage
//                         ? stageData[hiring.seafarer?.recruitmentStage - 1]
//                             .StageName
//                         : "--"}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap ">
//                       {/* {companiesData.find(
//                         (companies) => hiring.company?.id === companies.Id
//                       )?.CompanyName || "--"} */}
//                       {companiesData.find(
//                         (companies) =>
//                           String(hiring.company?.id) ===
//                           String(companies.Id)
//                       )?.CompanyName || "--"}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap ">
//                       {hiring.employeeNumber || "--"}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap ">
//                       {hiring.latestDOA || "--"}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap ">
//                       {hiring.embCount || "--"}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap ">
//                       {hiring.contractDate || "--"}
//                     </Table.Cell>
//                   </Table.Row>
//                 ))
//               )}
//             </Table.Body>
//           </Table>
//         </div>
//         {/* <div className="flex overflow-x-auto justify-center">
//           <Pagination
//             currentPage={1}
//             totalPages={3}
//             // onPageChange={onPageChange}
//           />
//         </div> */}
//       </div>
//     </section>
//     <section className="flex flex-col md:flex-row gap-5 md:gap-10 items-center justify-center">
//       <Card>
//         <span className="text-xs font-medium text-gray-500">
//           Active Seafarers by Company
//         </span>
//         <div className="overflow-x-auto">
//           <Table hoverable className="">
//             <Table.Head>
//               <Table.HeadCell className="whitespace-nowrap">
//                 Company
//               </Table.HeadCell>
//               <Table.HeadCell>Seafarers</Table.HeadCell>
//             </Table.Head>
//             <Table.Body className="divide-y cursor-pointer">
//               {Object.entries(groupedByCompany).map(
//                 ([companyId, companyData]) => (
//                   <Table.Row key={companyId}>
//                     <Table.Cell className="whitespace-nowrap font-bold">
//                       {companyData.companyName}{" "}
//                       {/* Nombre de la compañía */}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap">
//                       {companyData.count} {/* Cantidad de seafarers */}
//                     </Table.Cell>
//                   </Table.Row>
//                 )
//               )}
//             </Table.Body>
//           </Table>
//         </div>
//       </Card>
//       <Card className="">
//         <span className="text-xs font-medium text-gray-500">
//           Active Seafarers by Recruitment Stage
//         </span>
//         <div className="overflow-x-auto">
//           <Table hoverable>
//             <Table.Head>
//               <Table.HeadCell className="whitespace-nowrap">
//                 Recruitment Stage
//               </Table.HeadCell>
//               <Table.HeadCell>Seafarers</Table.HeadCell>
//             </Table.Head>
//             <Table.Body className="divide-y cursor-pointer">
//               {Object.entries(groupedByStage).map(
//                 ([stageId, stageData]) => (
//                   <Table.Row key={stageId}>
//                     <Table.Cell className="whitespace-nowrap font-bold">
//                       {stageData.StageName} {/* Nombre de la compañía */}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap">
//                       {stageData.count} {/* Cantidad de seafarers */}
//                     </Table.Cell>
//                   </Table.Row>
//                 )
//               )}
//             </Table.Body>
//           </Table>
//         </div>
//       </Card>
//     </section>
//     <section className="my-10">
//       <span className="font-semibold ">All Contracts</span>
//       <div className="my-10">
//         <div className="overflow-x-auto">
//           <Table hoverable className="">
//             <Table.Head>
//               <Table.HeadCell className="whitespace-nowrap">
//                 Logistic ID
//               </Table.HeadCell>
//               <Table.HeadCell>Name</Table.HeadCell>
//               <Table.HeadCell>Company</Table.HeadCell>
//               <Table.HeadCell>Employee Number</Table.HeadCell>
//               <Table.HeadCell>Status</Table.HeadCell>
//               <Table.HeadCell>Contract Start Date</Table.HeadCell>
//               <Table.HeadCell>Contract End Date</Table.HeadCell>
//             </Table.Head>
//             <Table.Body className="divide-y cursor-pointer">
//               <Table.Row>
//                 <Table.Cell className="whitespace-nowrap">
//                   {"--"}
//                 </Table.Cell>
//                 <Table.Cell className="whitespace-nowrap">
//                   {"--"}
//                 </Table.Cell>
//                 <Table.Cell className="whitespace-nowrap">
//                   {"--"}
//                 </Table.Cell>
//                 <Table.Cell className="whitespace-nowrap">
//                   {"--"}
//                 </Table.Cell>
//                 <Table.Cell className="whitespace-nowrap">
//                   {"--"}
//                 </Table.Cell>
//                 <Table.Cell className="whitespace-nowrap">
//                   {"--"}
//                 </Table.Cell>
//                 <Table.Cell className="whitespace-nowrap">
//                   {"--"}
//                 </Table.Cell>
//               </Table.Row>
//             </Table.Body>
//           </Table>
//         </div>
//         <div className="flex overflow-x-auto justify-center">
//           <Pagination
//             currentPage={1}
//             totalPages={3}
//             // onPageChange={onPageChange}
//           />
//         </div>
//       </div>
//     </section>
//   </>
// )}
