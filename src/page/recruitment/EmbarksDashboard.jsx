import { Button, Card, Pagination, Table } from "flowbite-react";
import { useCallback } from "react";
import { useState } from "react";
import {
  countCanceledEmbarks,
  countCompletedEmbarks,
  countTotalEmbarks,
  downloadExcel,
  exportAnyExcel,
  fetchActiveEmbarksData,
  getCompanies,
} from "../../util/services";
import { useEffect } from "react";
import { useMemo } from "react";
import { LoadingState } from "../../components/skeleton/LoadingState";
import { useDispatch } from "react-redux";
import {
  setCurrentEmbark,
  setCurrentHiring,
  setProfileView,
} from "../../store/currentViews/viewSlice";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../util/helperFunctions";
import stageData from "../../assets/tables/json/RecruitmentStage-static.json";
import embarkStatus from "../../assets/tables/json/EmbarkStatus-static.json";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { InstantSearch } from "react-instantsearch";
import { algoliasearch } from "algoliasearch";
import { GapoolSearchBox } from "./components/gappoolList/GapoolSearchBox";
import { CustomCurrentRefinements } from "./components/gappoolList/CustomCurrentRefinements";
import { Configure } from "react-instantsearch";
import { EmbarksRefinements } from "./components/embarksList/EmbarksRefinements";
import { EmbarksInfiniteHits } from "./components/embarksList/EmbarksInfiniteHits";
import { SelectComponents } from "../../components/layoutComponents";

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_ID,
  import.meta.env.VITE_ALGOLIA_KEY
);

export const EmbarksDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [companiesData, setCompaniesData] = useState([]);
  const [embarksCount, setEmbarksCount] = useState(0);
  const [embarksCompletedCount, setEmbarksCompletedCount] = useState(0);
  const [embarksCanceledCount, setEmbarksCanceledCount] = useState(0);
  const [rawEmbarksData, setRawEmbarksData] = useState([]);
  const [rawEndingEmbarks, setRawEndingEmbarks] = useState([]);
  const [rawPendingEmbarks, setRawPendingEmbarks] = useState([]);
  const [filterExcel, setFilterExcel] = useState("");
  // Memorizar la función de carga de datos usando useCallback para evitar recrearla en cada render.
  const load = useCallback(async () => {
    setIsLoading(true); // Mover dentro de la función para asegurarnos de que siempre se reinicia al iniciar carga
    // const { sortedActiveEmbarks, endingEmbarks, pendingEmbarks } =
    //   await fetchActiveEmbarksData();
    // const companiesData = await getCompanies();
    // const embarksCount = await countTotalEmbarks();
    // const embarksCompletedCount = await countCompletedEmbarks();
    // const embarksCanceledCount = await countCanceledEmbarks();
    // setEmbarksCanceledCount(embarksCanceledCount);
    // setEmbarksCompletedCount(embarksCompletedCount);
    // setEmbarksCount(embarksCount);
    // setCompaniesData(companiesData);
    // setRawEmbarksData(sortedActiveEmbarks);
    // setRawEndingEmbarks(endingEmbarks);
    // setRawPendingEmbarks(pendingEmbarks);
    setIsLoading(false); // Finaliza el proceso de carga
  }, []);

  // useEffect para cargar datos cuando el componente se monta
  useEffect(() => {
    load();
  }, [load]); // Dependerá de la función load, que está memorizada.

  // Memorizar el valor de activeHirings solo si rawHiringsData cambia
  const activeEmbarks = useMemo(() => rawEmbarksData, [rawEmbarksData]);
  const endingEmbarks = useMemo(() => rawEndingEmbarks, [rawEndingEmbarks]);
  const pendingEmbarks = useMemo(() => rawPendingEmbarks, [rawPendingEmbarks]);

  const handleEmbarkLink = (embarkData, id) => {
    const { contract, seafarer, ...embarkWithoutContractSeafarer } = embarkData;

    // Dispatch con el objeto modificado
    dispatch(setCurrentEmbark(embarkWithoutContractSeafarer));
    dispatch(setCurrentHiring(embarkData.contract));
    dispatch(setProfileView(embarkData.seafarer));
    navigate("/embark/" + id);
  };

  const [baseFilters, setBaseFilters] = useState("status:2 OR status:3");
  const [selectFilterValue, setSelectFilterValue] = useState();

  const onSelectChange = (e, inputName) => {
    const value = e.target.value;
    setFilterExcel(value);
    const now = new Date();
    // Calcular el inicio del mes actual
    const startOfCurrentMonth =
      new Date(now.getFullYear(), now.getMonth(), 1).getTime() / 1000;

    // Calcular el fin del mes actual
    const endOfCurrentMonth =
      new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).getTime() /
      1000;

    if (value == 1) {
      `estimatedSignOffDate < ${Math.floor(
        now.setDate(now.getDate() - 365) / 1000
      )}`;
    } else if (value == 2) {
      `estimatedSignOffDate:${Math.floor(startOfCurrentMonth)} TO ${Math.floor(
        endOfCurrentMonth
      )}`;
    }
    setSelectFilterValue(value);
  };

  const [filters, setFilters] = useState({});

  async function sendArrayToBackend() {
    // exportApplicationsExcel(filters);
    console.log(filters);
  }

  const handleDowloadExcelAssignedEmbark = async () => {
    setIsLoading(true);
    try {
      await downloadExcel([], "embarkassignedvessel", "embark_assigned_vessel");
      setIsLoading(false);
    } catch (error) {
      console.error("Error al descargar el reporte:", error.message);
      setIsLoading(false);
    }
  };

  const handleDowloadExcelEmbark = async () => {
    setIsLoading(true);
    try {
      await downloadExcel([], "embark", "embark");
      setIsLoading(false);
    } catch (error) {
      console.error("Error al descargar el reporte:", error.message);
      setIsLoading(false);
    }
  };

  const handleDowloadExcelEmbarkActive = async () => {
    setIsLoading(true);
    try {
      if (filterExcel == "2") {
        await downloadExcel([], "embarkpending", "embark_pending");
      } else if (filterExcel == "1") {
        await downloadExcel([], "embarkmes", "embark_current_month");
      } else {
        await downloadExcel([], "embarkactive", "embark_active");
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error al descargar el reporte:", error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(selectFilterValue);
  }, [selectFilterValue]);

  return (
    <section className="px-5 py-5">
      <h1 className="text-lg md:text-lg  text-black font-bold mb-4">
        Embarks Dashboard
      </h1>
      <TabGroup className="py-5">
        <TabList className="flex flex-row items-center  justify-center bg-white ">
          <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 flex flex-col md:flex-row py-2 text-sm text-black items-center justify-center md:w-56 relative">
            Active Embarks
          </Tab>
          <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 flex flex-col md:flex-row py-2 text-sm text-black items-center justify-center md:w-56 relative">
            Assigned Embarks
          </Tab>
          <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 md:translate-y-0 h-15 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
            All Embarks
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="">
            <section className="p-8 w-full h-full">
              <div className="flex justify-between my-2">
                <div className="w-1/6">
                  <SelectComponents
                    Text="Other Views"
                    data={[
                      { id: 1, name: "Ending on Current Month" },
                      { id: 2, name: "Ending Pending" },
                    ]}
                    idKey={"id"}
                    valueKey={"name"}
                    name_valor={false}
                    onChange={onSelectChange}
                  />
                </div>
                <Button
                  isProcessing={isLoading}
                  color={"success"}
                  onClick={() => handleDowloadExcelEmbarkActive()}
                >
                  Export to Excel
                </Button>
              </div>
              <InstantSearch
                indexName="embarksIndex"
                searchClient={searchClient}
              >
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="md:w-1/3">
                    <EmbarksRefinements onFilters={(e) => setFilters(e)} />
                  </div>
                  <div className="container overflow-y-auto">
                    <div className="">
                      <GapoolSearchBox />

                      <CustomCurrentRefinements />
                    </div>
                    <Configure
                      hitsPerPage={50}
                      // filters={
                      //   selectFilterValue
                      //     ? `${baseFilters} AND ${selectFilterValue}`
                      //     : baseFilters
                      // }
                      filters={
                        "estimatedSignOffDate < 1751587200 AND (status:2 OR status:6)"
                      }
                    />
                    <EmbarksInfiniteHits type={"active"} />
                  </div>
                </div>
              </InstantSearch>
            </section>
          </TabPanel>
          <TabPanel className="">
            <section className="p-8 w-full h-full">
              <div className="flex justify-end my-2">
                <Button
                  isProcessing={isLoading}
                  color={"success"}
                  onClick={() => handleDowloadExcelAssignedEmbark()}
                >
                  Export to Excel
                </Button>
              </div>
              <InstantSearch
                indexName="embarksIndex"
                searchClient={searchClient}
              >
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="md:w-1/3">
                    <EmbarksRefinements onFilters={(e) => setFilters(e)} />
                  </div>
                  <div className="container overflow-y-auto">
                    <div className="">
                      <GapoolSearchBox />

                      <CustomCurrentRefinements />
                    </div>
                    <Configure hitsPerPage={50} filters={"status:1"} />
                    <EmbarksInfiniteHits type={"assigned"} />
                  </div>
                </div>
              </InstantSearch>
            </section>
          </TabPanel>
          <TabPanel className="">
            <section className="p-8 w-full h-full">
              <div className="flex justify-end my-2">
                <Button
                  isProcessing={isLoading}
                  color={"success"}
                  onClick={() => handleDowloadExcelEmbark()}
                >
                  Export to Excel
                </Button>
              </div>
              <InstantSearch
                indexName="embarksIndex"
                searchClient={searchClient}
              >
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="md:w-1/3">
                    <EmbarksRefinements onFilters={(e) => setFilters(e)} />
                  </div>
                  <div className="container overflow-y-auto">
                    <div className="">
                      <GapoolSearchBox />
                      <CustomCurrentRefinements />
                    </div>
                    <Configure hitsPerPage={50} />
                    <EmbarksInfiniteHits type={"all"} />
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

export default EmbarksDashboard;

// {isLoading ? (
//   <LoadingState />
// ) : (
//   <>
//     <div className="flex flex-col md:flex-row gap-5 md:gap-10 items-center justify-center px-5">
//       <Card className="flex flex-col gap-3 items-center justify-center text-xs">
//         <span className="font-bold text-gray-500">Ongoing Embarks</span>
//         <span className="text-center">{activeEmbarks.length}</span>
//       </Card>
//       <Card className="flex flex-col gap-3 items-center justify-center text-xs">
//         <span className="font-bold text-gray-500">Completed Embarks</span>
//         <span className="text-center">{embarksCompletedCount}</span>
//       </Card>
//       <Card className="flex flex-col gap-3 items-center justify-center text-xs">
//         <span className="font-bold text-gray-500">
//           Contract Revoked Embarks
//         </span>
//         <span className="text-center">{embarksCanceledCount}</span>
//       </Card>
//       <Card className="flex flex-col gap-3 items-center justify-center text-xs">
//         <span className="font-bold text-gray-500">Total Embarks</span>
//         <span className="text-center">{embarksCount}</span>
//       </Card>
//     </div>
//     <section className="my-10">
//       <span className="font-semibold ">Active Embarks</span>
//       <button
//         onClick={getExcel}
//         className="h-8 w-32 bg-green-700 text-center text-sm rounded-md text-white"
//       >
//         Export to Excel
//       </button>
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
//               <Table.HeadCell>Company</Table.HeadCell>
//               <Table.HeadCell>Vessel</Table.HeadCell>
//               <Table.HeadCell>Embark Status</Table.HeadCell>
//               <Table.HeadCell>Sign On Date</Table.HeadCell>
//               <Table.HeadCell>Estimated Sign Off</Table.HeadCell>
//               <Table.HeadCell>Sign Off Date</Table.HeadCell>
//             </Table.Head>
//             <Table.Body className="divide-y cursor-pointer">
//               {activeEmbarks.length < 0 ? (
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
//                   {/* <Table.Cell className="whitespace-nowrap">
//                   {"--"}
//                 </Table.Cell> */}
//                 </Table.Row>
//               ) : (
//                 activeEmbarks.map((embark, index) => (
//                   <Table.Row
//                     key={index}
//                     className="bg-white dark:border-gray-700 dark:bg-gray-800"
//                     onClick={() => handleEmbarkLink(embark, embark.id)}
//                   >
//                     <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
//                       {embark.seafarer?.logisticId || "--"}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap ">
//                       {embark.seafarer?.seafarerData?.vesselType?.[0]
//                         ?.name || "--"}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap">
//                       {embark.seafarer.seafarerData?.seafarerProfile
//                         ?.profile?.firstName ||
//                       embark.seafarer.seafarerData?.seafarerProfile
//                         ?.profile?.lastName
//                         ? `${embark.seafarer.seafarerData?.seafarerProfile?.profile?.firstName} ${embark.seafarer.seafarerData?.seafarerProfile?.profile?.lastName}`
//                         : embark.seafarer?.displayName
//                         ? embark.seafarer?.displayName
//                         : "--"}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap ">
//                       {embark.seafarer?.seafarerData?.position?.[0]
//                         ?.name || "--"}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap ">
//                       {/* {companiesData.find(
//                         (companies) => hiring.company?.id === companies.Id
//                       )?.CompanyName || "--"} */}
//                       {companiesData.find(
//                         (companies) =>
//                           String(embark.contract?.company?.id) ===
//                           String(companies.Id)
//                       )?.CompanyName || "--"}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap ">
//                       {embark.vessel?.name || "--"}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap ">
//                       {embarkStatus[embark.status - 1].StatusName || "--"}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap ">
//                       {embark.signOnDate || "--"}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap ">
//                       {embark.estimatedSignOffDate || "--"}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap ">
//                       {embark.signOffDate || "--"}
//                     </Table.Cell>
//                   </Table.Row>
//                 ))
//               )}
//             </Table.Body>
//           </Table>
//         </div>
//         <div className="flex overflow-x-auto justify-center mt-2">
//           <Pagination
//             currentPage={1}
//             totalPages={3}
//             // onPageChange={onPageChange}
//           />
//         </div>
//       </div>
//     </section>
//     <section className="my-10 flex flex-col md:flex-row gap-5 md:gap-10 items-center justify-center">
//       <Card className=" w-1/2">
//         <span className="text-xs font-medium text-gray-500">
//           Embarks Ending on the Current Month
//         </span>
//         <div className="overflow-x-auto max-h-96">
//           <Table hoverable className="">
//             <Table.Head>
//               <Table.HeadCell className="">Embark Status</Table.HeadCell>
//               <Table.HeadCell>Name</Table.HeadCell>
//               <Table.HeadCell>Vessel</Table.HeadCell>
//               <Table.HeadCell>Sign On Date</Table.HeadCell>
//               <Table.HeadCell>Estimated Sign Off</Table.HeadCell>
//             </Table.Head>
//             <Table.Body className="divide-y cursor-pointer">
//               {endingEmbarks.length < 1 ? (
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
//                 </Table.Row>
//               ) : (
//                 endingEmbarks.map((embark, index) => (
//                   <Table.Row
//                     key={index}
//                     className="bg-white dark:border-gray-700 dark:bg-gray-800"
//                   >
//                     <Table.Cell className="whitespace-nowrap ">
//                       {embark.status.name || "--"}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap">
//                       {embark.seafarer.seafarerData?.seafarerProfile
//                         ?.profile?.firstName ||
//                       embark.seafarer.seafarerData?.seafarerProfile
//                         ?.profile?.lastName
//                         ? `${embark.seafarer.seafarerData?.seafarerProfile?.profile?.firstName} ${embark.seafarer.seafarerData?.seafarerProfile?.profile?.lastName}`
//                         : embark.seafarer?.displayName
//                         ? embark.seafarer?.displayName
//                         : "--"}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap ">
//                       {embark.vessel?.name || "--"}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap ">
//                       {embark.signOnDate || "--"}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap ">
//                       {embark.estimatedSignOffDate || "--"}
//                     </Table.Cell>
//                   </Table.Row>
//                 ))
//               )}
//             </Table.Body>
//           </Table>
//         </div>
//       </Card>
//       <Card className=" w-1/2">
//         <span className="text-xs font-medium text-gray-500">
//           Embarks Pending to Set as Completed
//         </span>
//         <div className="overflow-x-auto max-h-96">
//           <Table hoverable className="">
//             <Table.Head>
//               <Table.HeadCell className="">Embark Status</Table.HeadCell>
//               <Table.HeadCell>Name</Table.HeadCell>
//               <Table.HeadCell>Vessel</Table.HeadCell>
//               <Table.HeadCell>Sign On Date</Table.HeadCell>
//               <Table.HeadCell>Estimated Sign Off</Table.HeadCell>
//             </Table.Head>
//             <Table.Body className="divide-y cursor-pointer">
//               {pendingEmbarks.length < 1 ? (
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
//                 </Table.Row>
//               ) : (
//                 pendingEmbarks.map((embark, index) => (
//                   <Table.Row
//                     key={index}
//                     className="bg-white dark:border-gray-700 dark:bg-gray-800"
//                   >
//                     <Table.Cell className="whitespace-nowrap ">
//                       {embark.status.name || "--"}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap">
//                       {embark.seafarer.seafarerData?.seafarerProfile
//                         ?.profile?.firstName ||
//                       embark.seafarer.seafarerData?.seafarerProfile
//                         ?.profile?.lastName
//                         ? `${embark.seafarer.seafarerData?.seafarerProfile?.profile?.firstName} ${embark.seafarer.seafarerData?.seafarerProfile?.profile?.lastName}`
//                         : embark.seafarer?.displayName
//                         ? embark.seafarer?.displayName
//                         : "--"}
//                     </Table.Cell>
//                     <Table.Cell className="whitespace-nowrap ">
//                       {embark.vessel?.name || "--"}
//                     </Table.Cell>

//                     <Table.Cell className="whitespace-nowrap ">
//                       {embark.signOnDate || "--"}
//                     </Table.Cell>

//                     <Table.Cell className="whitespace-nowrap ">
//                       {embark.estimatedSignOffDate || "--"}
//                     </Table.Cell>
//                   </Table.Row>
//                 ))
//               )}
//             </Table.Body>
//           </Table>
//         </div>
//       </Card>
//     </section>
//     <section className="my-10">
//       <span className="font-semibold ">All Embarks</span>
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
//               <Table.HeadCell>Company</Table.HeadCell>
//               <Table.HeadCell>Vessel</Table.HeadCell>
//               <Table.HeadCell>Embark Status</Table.HeadCell>
//               <Table.HeadCell>Sign On Date</Table.HeadCell>
//               <Table.HeadCell>Sign Off Date</Table.HeadCell>
//               <Table.HeadCell>Sign Off Reason</Table.HeadCell>
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
//         <div className="flex overflow-x-auto justify-center mt-2">
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
