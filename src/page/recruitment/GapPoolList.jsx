import { useState, useEffect } from "react";
import { Avatar, Button, Card, Pagination, Table } from "flowbite-react";
import {
  countDocumentsWithLogisticId,
  countGappoolData,
  downloadExcel,
  exportAnyExcel,
  fetchAllGapPoolData,
  fetchGapPoolData,
  fetchGapPoolReport,
} from "../../util/services";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../util/helperFunctions";
import { useDispatch } from "react-redux";
import { setProfileView } from "../../store/currentViews/viewSlice";
import stageData from "../../assets/tables/json/RecruitmentStage-static.json";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import {
  SelectComponents,
  TableComponent,
} from "../../components/layoutComponents";
import PdfView from "../../components/layoutComponents/PdfView";
import GapolReport from "../../reports/GapolReport";

// import "instantsearch.css/themes/algolia.css";
import { algoliasearch } from "algoliasearch";
import { InstantSearch } from "react-instantsearch";
import { CustomCurrentRefinements } from "./components/gappoolList/CustomCurrentRefinements";
import { GapoolInfiniteHits } from "./components/gappoolList/GapoolInfiniteHits";
import { GapoolRefinements } from "./components/gappoolList/GapoolRefinements";
import { GapoolSearchBox } from "./components/gappoolList/GapoolSearchBox";
import { Configure } from "react-instantsearch";
import { SeafarersRefinements } from "./components/seafarersList/SeafarersRefinements";

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_ID,
  import.meta.env.VITE_ALGOLIA_KEY
);

export default function GapPoolList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [seafarers, setSeafarers] = useState([]);
  const [dataPagination, setDataPagination] = useState();
  const [dataFilter, setDataFilter] = useState();
  const [dataDashboard, setDataDashboard] = useState({});
  const [openForm, setOpenForm] = useState(false);
  const [loadingVar, setLoadingVar] = useState(true);

  /* availableExperienceBoardList:[
        {
          logisticId:"1",
          name:"carlos Mendoza",
          position:"youth Staff",
          nationality:"panama",
          previouslyEmbarked:"si",
          previousCompany:"Royal Caribbean",
          employeeNumber:"61897663"

        }
      ],
      availableExperienceLandList:[
        {
          logisticId:"1",
          name:"carlos Mendoza",
          position:"youth Staff",
          nationality:"panama",
          previouslyEmbarked:"si",
          previousCompany:"Royal Caribbean",
          employeeNumber:"61897663"

        }
      ],unavailableExperienceBoardList:[
        {
          logisticId:"1",
          name:"carlos Mendoza",
          position:"youth Staff",
          nationality:"panama",
          previouslyEmbarked:"si",
          previousCompany:"Royal Caribbean",
          employeeNumber:"61897663"

        }
      ],unavailableExperienceLandList:[
        {
          logisticId:"1",
          name:"carlos Mendoza",
          position:"youth Staff",
          nationality:"panama",
          previouslyEmbarked:"si",
          previousCompany:"Royal Caribbean",
          employeeNumber:"61897663"

        }
      ] */

  const [data, setData] = useState({});
  const [valueFilter, setValueFilter] = useState({
    department: "",
  });
  const [selectValue, setSelectedValue] = useState({});

  const loadReportData = async () => {
    const gapoolReportData = await fetchGapPoolReport();
    setData(gapoolReportData);
    console.log(gapoolReportData);

    const { recruitmentDepartments } = gapoolReportData; // Extrae recruimentDepartment de tu estado data

    const selectValue = Object.keys(recruitmentDepartments).map(
      (key, index) => {
        return {
          id: index + 1, // El índice será el id, sumando 1 para empezar desde 1
          name: key, // Toma el campo name de cada departamento
        };
      }
    );
    setSelectedValue(selectValue);
    if (valueFilter.department === "") {
      // Si el valor es vacío, guarda recruimentDepartmentTotal
      setDataDashboard(gapoolReportData.applicantsTotal);
    } else {
      // Busca el departamento cuyo 'name' coincida con el valor del select
      const selectedDepartment = Object.values(
        gapoolReportData.recruitmentDepartments
      ).find((department) => department.name === selectValue.name);

      if (selectedDepartment) {
        setDataDashboard(selectedDepartment);
      }
    }

    setLoadingVar(false);
  };

  const handleSelectChange = (selectedName) => {
    setValueFilter((prevState) => ({
      ...prevState,
      department: selectedName.name,
    }));
    // console.log(data.recruitmentDepartments[String(selectedName.name)]);
    if (selectedName.id === "") {
      // Si el valor es vacío, guarda recruimentDepartmentTotal
      setDataDashboard(data.applicantsTotal);
    } else {
      // Busca el departamento cuyo 'name' coincida con el valor del select
      // const selectedDepartment = Object.values(
      //   data.recruitmentDepartments
      // ).find(([key]) => key === selectedName.name);

      // if (selectedDepartment) {
      setDataDashboard(data.recruitmentDepartments[String(selectedName.name)]);
      // }
    }
  };

  const closePdf = () => {
    setOpenForm(false); // Detiene la carga al cerrar el PDF
  };

  const handleButtonClick = () => {
    setOpenForm(!openForm);
  };
  const handleProfileLink = (uid, seafarerData) => {
    dispatch(setProfileView(seafarerData));
    navigate("/profile/" + uid);
  };

  const [count, setCount] = useState();

  const loadResults = async () => {
    try {
      const seafarersData = await fetchGapPoolData();
      const allgapooldcount = await countDocumentsWithLogisticId();
      setCount(allgapooldcount);
      setSeafarers(seafarersData.data);
      // setDataFilter(seafarersData);
      await loadReportData();
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  useEffect(() => {
    setLoadingVar(true);
    loadResults();
  }, []);

  useEffect(() => {
    if (dataFilter) {
      let pagination = paginate(dataFilter, 1, currentPage);
      setDataPagination(pagination.paginatedItems);
    }
  }, [dataFilter, currentPage]);

  const onPageChange = (page) => setCurrentPage(page);

  function paginate(array, itemsPerPage, currentPage) {
    const totalPages = Math.ceil(array.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = array.slice(startIndex, endIndex);

    return {
      currentPage,
      totalPages,
      paginatedItems,
    };
  }

  const [filters, setFilters] = useState({});

  const handleDowloadExcelGappool = async () => {
    try {
      await downloadExcel([], "gapool", "Reporte_de_Application");
    } catch (error) {
      console.error("Error al descargar el reporte:", error.message);
    }
  };

  const handleDowloadExcelGappoolmercante = async () => {
    try {
      await downloadExcel([], "gapoolmercante", "Reporte_de_Application");
    } catch (error) {
      console.error("Error al descargar el reporte:", error.message);
    }
  };

  const handleDowloadExcelGappoolhotel = async () => {
    try {
      await downloadExcel([], "gapoolhotel", "Reporte_de_Application");
    } catch (error) {
      console.error("Error al descargar el reporte:", error.message);
    }
  };

  const currentDate = new Date();
  const formattedDate = `${String(currentDate.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(currentDate.getDate()).padStart(
    2,
    "0"
  )}-${currentDate.getFullYear()} ${String(currentDate.getHours()).padStart(
    2,
    "0"
  )}:${String(currentDate.getMinutes()).padStart(2, "0")}`;

  return (
    <>
      <div className="pl-3 pb-4 pt-5  flex flex-row gap-3 items-center justify-between ">
        <div className="flex flex-row gap-2 items-center justify-between">
          <h1 className="md:pl-5 text-lg md:text-lg text-black font-bold">
            GAP Pool
          </h1>
        </div>
      </div>
      <TabGroup className="">
        <TabList className="flex flex-row items-center  justify-center bg-white ">
          <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 flex flex-col md:flex-row py-2 text-sm text-black items-center justify-center md:w-56 relative">
            GAP Pool List
          </Tab>
          <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 flex flex-col md:flex-row py-2 text-sm text-black items-center justify-center md:w-56 relative">
            All Database
          </Tab>
          <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 md:translate-y-0 h-15 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
            Report
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="">
            <div className="px-8 flex items-end justify-end">
              <Button
                // isProcessing={isLoading}
                color={"success"}
                onClick={handleDowloadExcelGappool}
              >
                Export to Excel
              </Button>
            </div>
            <section className="p-8 w-full h-full">
              <InstantSearch
                indexName="gappoolSearch"
                searchClient={searchClient}
              >
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="md:w-1/3">
                    <GapoolRefinements onFilters={(e) => setFilters(e)} />
                  </div>
                  <div className="container overflow-y-auto">
                    <div className="">
                      <GapoolSearchBox />
                      <CustomCurrentRefinements />
                    </div>
                    <Configure hitsPerPage={50} />
                    <GapoolInfiniteHits />
                  </div>
                </div>
              </InstantSearch>
            </section>
          </TabPanel>
          <TabPanel className="">
            <section className="p-8 w-full h-full">
              <InstantSearch
                indexName="globalSearch"
                searchClient={searchClient}
              >
                <span className="pr-10">mercante</span>
                <button
                  onClick={handleDowloadExcelGappoolmercante}
                  className="h-8 w-32 bg-green-700 text-center text-sm rounded-md text-white"
                >
                  Export to Excel
                </button>
                <span className="pr-10 pl-10">Hotel Staff</span>
                <button
                  onClick={handleDowloadExcelGappoolhotel}
                  className="h-8 w-32 bg-green-700 text-center text-sm rounded-md text-white"
                >
                  Export to Excel
                </button>
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="md:w-1/3">
                    <SeafarersRefinements onFilters={(e) => setFilters(e)} />
                  </div>
                  <div className="container overflow-y-auto">
                    <div className="">
                      <GapoolSearchBox />
                    </div>
                    <Configure hitsPerPage={50} filters={"logisticId != 0"} />
                    <CustomCurrentRefinements />
                    <GapoolInfiniteHits />
                  </div>
                </div>
              </InstantSearch>
            </section>
          </TabPanel>
          <TabPanel className="">
            <div className="pl-3 pb-4 pt-5  flex flex-col md:flex-row gap-3 items-center justify-between ">
              <div className="flex flex-row gap-2 items-center justify-between">
                <h1 className="md:pl-5 text-lg md:text-lg text-black font-bold">
                  GAP Pool Report
                </h1>
              </div>
            </div>
            <div className="pb-4 flex flex-col md:flex-row gap-3 items-center md:items-end justify-end ">
              <div>
                <SelectComponents
                  Text="All Departments"
                  data={selectValue}
                  idKey={"id"}
                  // initialValue={valueFilter.department || ""}
                  valueKey={"name"}
                  name="department"
                  name_valor={true}
                  onChange={(e) => handleSelectChange(e[0])}
                />
              </div>
              <button
                disabled={loadingVar}
                onClick={handleButtonClick}
                className="whitespace-nowrap border border-[#010064] bg-[#010064] text-white w-28 h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Print Report
              </button>
            </div>

            <section className="grid grid-cols-2 mt-4 gap-6 lg:grid-cols-3 justify-center lg:w-[80%] m-auto ">
              <div className="flex justify-between lg:w-[80%]">
                <p>GAP Pool</p>
                <p>{dataDashboard.total}</p>
              </div>
              <div className="flex justify-between lg:w-[80%]">
                <p>Available Applicants</p>
                <p>{dataDashboard.available}</p>
              </div>

              <div className="flex justify-between lg:w-[80%]">
                <p>Unavailable Applicants</p>
                <p>{dataDashboard.unavailable}</p>
              </div>

              <div className="flex justify-between lg:w-[80%]">
                <p>Average Profile</p>
                <p>{dataDashboard.averageProfile}</p>
              </div>

              <div className="flex justify-between lg:w-[80%]">
                <p>Available Applicants with experience on board</p>
                <p>{dataDashboard.availableExperienceboard}</p>
              </div>

              <div className="flex justify-between lg:w-[80%]">
                <p>Available Applicants with experience on land</p>
                <p>{dataDashboard.availableExperienceland}</p>
              </div>
              <div className="flex justify-between lg:w-[80%]">
                <p>Unavailable Applicants with experience on board</p>
                <p>{dataDashboard.unavailableExperienceboard}</p>
              </div>
              <div className="flex justify-between lg:w-[80%]">
                <p>Unavailable Applicants with experience on land</p>
                <p>{dataDashboard.unavailableExperienceland}</p>
              </div>
            </section>
            <section className="pt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="mt-6">
                <h1 className="text-lg font-medium">
                  Applicants By Department
                </h1>
                <div className="overflow-y-auto h-52">
                  <TableComponent
                    items={dataDashboard.applicantsbyDepartment}
                    headers={["Name", "Total"]}
                    buttonEditDelete={false}
                    enumaration={false}
                  />
                </div>
              </Card>
              <Card className="mt-6">
                <h1 className="text-lg font-medium">
                  Average Profile Rating By Department
                </h1>
                <div className="overflow-y-auto h-52">
                  <TableComponent
                    items={dataDashboard.averageProfilebyDepartment}
                    headers={["Name", "Total"]}
                    buttonEditDelete={false}
                    enumaration={false}
                  />
                </div>
              </Card>

              <Card className="mt-6">
                <h1 className="text-lg font-medium">Applicants By Position</h1>
                <div className="overflow-y-auto h-52">
                  <TableComponent
                    items={dataDashboard.applicantsbyPosition}
                    headers={["Name", "Total"]}
                    buttonEditDelete={false}
                    enumaration={false}
                  />
                </div>
              </Card>

              <Card className="mt-6">
                <h1 className="text-lg font-medium">
                  Applicants By Nationality
                </h1>
                <div className="overflow-y-auto h-52">
                  <TableComponent
                    items={dataDashboard.applicantsbyNationality}
                    headers={["Name", "Total"]}
                    buttonEditDelete={false}
                    enumaration={false}
                  />
                </div>
              </Card>
            </section>
          </TabPanel>
        </TabPanels>
      </TabGroup>

      {openForm ? (
        <PdfView closePdf={closePdf} title="GAP Pool Report">
          <GapolReport
            date={formattedDate}
            data={data}
            deptFilter={valueFilter.department}
          />
        </PdfView>
      ) : null}
    </>
  );
}

{
  /* <section>
              <section className="px-8">
                <div className="overflow-x-auto max-h-96">
                  <Table hoverable className="hidden md:block">
                    <Table.Head>
                      <Table.HeadCell className="whitespace-nowrap">
                        Logistic ID
                      </Table.HeadCell>
                      <Table.HeadCell>Name</Table.HeadCell>
                      <Table.HeadCell>Process Stage</Table.HeadCell>
                      <Table.HeadCell>Recruitment Dept.</Table.HeadCell>
                      <Table.HeadCell>Department</Table.HeadCell>
                      <Table.HeadCell>Position</Table.HeadCell>
                      <Table.HeadCell>Phone</Table.HeadCell>
                      <Table.HeadCell>Available</Table.HeadCell>
                      <Table.HeadCell>Application Date</Table.HeadCell>
                      <Table.HeadCell>Nationality</Table.HeadCell>
                      <Table.HeadCell>Residency</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y cursor-pointer">
                      {seafarers.map((seafarer, index) => (
                        <Table.Row
                          key={index}
                          className="bg-white dark:border-gray-700 dark:bg-gray-800"
                          onClick={() =>
                            handleProfileLink(seafarer.uid, seafarer)
                          }
                        >
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {seafarer?.logisticId || "--"}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            {seafarer.seafarerData?.seafarerProfile?.profile
                              ?.firstName ||
                            seafarer.seafarerData?.seafarerProfile?.profile
                              ?.lastName
                              ? `${seafarer.seafarerData?.seafarerProfile?.profile?.firstName} ${seafarer.seafarerData?.seafarerProfile?.profile?.lastName}`
                              : seafarer?.displayName
                              ? seafarer?.displayName
                              : "--"}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            {seafarer?.recruitmentStage
                              ? stageData[seafarer?.recruitmentStage - 1]
                                  .StageName
                              : "--"}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            {seafarer.seafarerData?.vesselType
                              ? seafarer.seafarerData?.vesselType[0]?.name
                              : "--"}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            {seafarer.seafarerData?.department
                              ? seafarer.seafarerData?.department[0]?.name
                              : "--"}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            {seafarer.seafarerData?.position
                              ? seafarer.seafarerData?.position[0]?.name
                              : "--"}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            {seafarer.seafarerData?.seafarerProfile?.profile
                              ?.phone.value || "--"}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            {seafarer.seafarerData?.available
                              ? seafarer.seafarerData?.available
                                ? "Yes"
                                : "No"
                              : "--"}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            {seafarer.seafarerData?.applicationDate
                              ? formatDate(
                                  seafarer.seafarerData?.applicationDate,
                                  "yyyy-mm-dd"
                                )
                              : "--"}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            {seafarer.seafarerData?.seafarerProfile?.profile
                              ?.countryBirth.CountryName || "--"}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            {seafarer.seafarerData?.seafarerProfile?.profile
                              ?.countryResidency.CountryName || "--"}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </div>
              </section>
              <div className="space-y-4 px-2 md:hidden">
                {seafarers.map((seafarer, index) => {
                  return (
                    <Card
                      key={index}
                      className="cursor-pointer"
                      onClick={() => handleProfileLink(seafarer.uid, seafarer)}
                    >
                      <section className="flex items-center">
                        <div className="mr-4 flex items-center  bg-primary">
                          <Avatar
                            className="text-primary-foreground"
                            rounded
                            // size="md"
                            img={seafarer?.photoURL}
                            placeholderInitials=""
                          />
                        </div>
                        <div className="flex-col flex-1 space-y-1">
                          <p className="text-sm font-semibold leading-none">
                            {seafarer.seafarerData?.seafarerProfile?.profile
                              ?.firstName ||
                            seafarer.seafarerData?.seafarerProfile?.profile
                              ?.lastName
                              ? `${seafarer.seafarerData?.seafarerProfile?.profile?.firstName} ${seafarer.seafarerData?.seafarerProfile?.profile?.lastName}`
                              : seafarer?.displayName
                              ? seafarer?.displayName
                              : "--"}
                          </p>
                          <p className="text-xs text-muted-foreground ">
                            {seafarer.seafarerData?.vesselType
                              ? seafarer.seafarerData?.vesselType[0]?.name
                              : "--"}
                          </p>
                          <p className="text-xs text-muted-foreground ">
                            {seafarer.seafarerData?.position
                              ? seafarer.seafarerData?.position[0]?.name
                              : "--"}
                          </p>
                          <p className="text-xs text-muted-foreground font-light">
                            {seafarer.seafarerData?.department
                              ? seafarer.seafarerData?.department[0]?.name
                              : "--"}
                          </p>
                          <section className="flex flex-cols-2 items-center">
                            <p className="text-xs text-muted-foreground font-medium">
                              {seafarer?.recruitmentStage
                                ? stageData[seafarer?.recruitmentStage - 1]
                                    .StageName
                                : "--"}
                            </p>
                            <p className="ml-auto font-light">
                              {seafarer.logisticId || "--"}
                            </p>
                          </section>
                        </div>
                      </section>
                    </Card>
                  );
                })}
              </div>

              <div className="flex overflow-x-auto justify-center mt-2">
                <Pagination
                  currentPage={currentPage}
                  totalPages={3}
                  // onPageChange={onPageChange}
                />
              </div>
            </section> */
}
