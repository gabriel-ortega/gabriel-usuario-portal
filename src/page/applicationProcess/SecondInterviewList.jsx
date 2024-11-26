import { useState, useEffect } from "react";
import { Avatar, Badge, Button, Card, Pagination, Table } from "flowbite-react";
import {
  downloadExcel,
  fetchFirstInterviewsCompleted,
  fetchFirstInterviewsPending,
  fetchSecondInterviewsCompleted,
  fetchSecondInterviewsPending,
  fetchSecondInterviewsReport,
} from "../../util/services";
import { useNavigate } from "react-router-dom";
import { formatDate, formatTitleCase } from "../../util/helperFunctions";
import { useDispatch } from "react-redux";
import { setProfileView } from "../../store/currentViews/viewSlice";
import {
  DatepickerComponent,
  SelectComponents,
  TableComponent,
} from "../../components/layoutComponents";
import {
  createFirstInterviews,
  getFirstInterviews,
  getSecondInterviews,
} from "../../store/userData";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { LoadingState } from "../../components/skeleton/LoadingState";
import PdfView from "../../components/layoutComponents/PdfView";
import InterviewsOverviewReport from "../../reports/InterviewsOverviewReport";
import { InstantSearch } from "react-instantsearch";
import { InterviewsRefinements } from "../recruitment/components/interviewLists/InterviewsRefinements";
import { GapoolSearchBox } from "../recruitment/components/gappoolList/GapoolSearchBox";
import { CustomCurrentRefinements } from "../recruitment/components/gappoolList/CustomCurrentRefinements";
import { Configure } from "react-instantsearch";
import { InterviewsInfiniteHits } from "../recruitment/components/interviewLists/InterviewsInfiniteHits";
import { algoliasearch } from "algoliasearch";

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_ID,
  import.meta.env.VITE_ALGOLIA_KEY
);

export const SecondInterviewList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hasData, setHasData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [interviews, setInterviews] = useState([]);
  const [interviewsCompleted, setInterviewsCompleted] = useState([]);
  const [dataPagination, setDataPagination] = useState();
  const [dataFilter, setDataFilter] = useState();
  const [mobileView, setMobileView] = useState("1");
  const [dataDashboard, setDataDashboard] = useState({});
  const [valueFilter, setValueFilter] = useState({
    department: "",
  });
  const [dateFilter, setDateFilter] = useState({ startDate: "", endDate: "" });
  const [loadingVar, setLoadingVar] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [selectValue, setSelectedValue] = useState({});
  const [openForm, setOpenForm] = useState(false);
  const closePdf = () => {
    setOpenForm(false); // Detiene la carga al cerrar el PDF
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

  const handleButtonClick = () => {
    setOpenForm(!openForm);
  };

  const [data, setData] = useState({
    recruimentDepartmentTotal: {
      interviewsDone: 2,
      interviewsReview: 3,
      RetiredApplicants: 4,
      approved: 4,
      foldersPending: 12,
      dissaproved: 0,
      foldersDone: 2,
      interviewsByInterviewer: [],
      interviewsByPosition: [],
      interviewsByNationality: [],
      interviewsByDepartment: [],
      firstInterviewCountry: [
        {
          nationality: "panama",
          amountofinterview: "2",
        },
      ],
      firstInterviewPosition: [
        {
          position: "panama",
          amountofinterview: "2",
        },
      ],
      pendingFolder: [
        {
          name: "panama",
          firstinterviewstatus: "2",
        },
      ],
      doneFolders: [
        {
          name: "panama",
          firstinterviewstatus: "2",
        },
      ],
      listDone: [
        {
          name: "CARLOS ANTONIO MENDOZA TROYA",
          position: "Asistant stateroom attendant",
          nationality: "Mexican",
          status: "Approved",
          date: "2024-10-10",
        },
      ],
      pendingInterview: 12,
      appointedInterview: 10,
      pendingList: [
        {
          name: "JUSTO AZAEL MARIN RAMOS",
          position: "Analyst",
          nationality: "Chilean",
        },
      ],
    },
    recruimentDepartment: {
      merchantDepartment: {
        name: "Merchant Department",
        interviewsDone: 23,
        interviewsReview: 3,
        RetiredApplicants: 4,
        approved: 4,
        foldersPending: 12,
        dissaproved: 0,
        foldersDone: 2,
        interviewsByInterviewer: [],
        interviewsByPosition: [],
        interviewsByNationality: [],
        interviewsByDepartment: [],
        listDone: [
          {
            name: "JUSTO AZAEL MARIN RAMOS",
            position: "2nd purser administrator",
            nationality: "Colombian",
            status: "Approved",
            date: "2024-10-11",
          },
        ],
        pendingInterview: 12,
        appointedInterview: 10,
        pendingList: [
          {
            name: "CARLOS ANTONIO MENDOZA TROYA",
            position: "Tester",
            nationality: "Peruvian",
          },
          {
            name: "CARLOS ANTONIO MENDOZA TROYA",
            position: "Tester",
            nationality: "Peruvian",
          },
        ],
      },
      cruiseDepartment: {
        name: "Cruise Department",
        interviewsDone: 24,
        interviewsReview: 3,
        RetiredApplicants: 4,
        approved: 4,
        foldersPending: 12,
        dissaproved: 0,
        foldersDone: 2,
        interviewsByInterviewer: [],
        interviewsByPosition: [],
        interviewsByNationality: [],
        interviewsByDepartment: [],
        listDone: [
          {
            name: "CARLOS ANTONIO MENDOZA TROYA",
            position: "Asistant stateroom attendant",
            nationality: "Mexican",
            status: "Approved",
            date: "2024-10-10",
          },
        ],
        pendingInterview: 12,
        appointedInterview: 10,
        pendingList: [
          {
            name: "CARLOS ANTONIO MENDOZA TROYA",
            position: "Tester",
            nationality: "Peruvian",
          },
        ],
      },
    },
  });

  const handleViewChange = (e) => {
    setMobileView(e.id);
  };

  const handleProfileLink = (uid, seafarerData) => {
    dispatch(getSecondInterviews(uid));
    dispatch(setProfileView(seafarerData));
    navigate("/interview-second/" + uid);
  };

  const loadReportData = async (dateFilters) => {
    const interviewsReportData = await fetchSecondInterviewsReport(dateFilters);
    setData(interviewsReportData);

    const { recruimentDepartment } = interviewsReportData; // Extrae recruimentDepartment de tu estado data

    const selectValue = Object.keys(recruimentDepartment).map((key, index) => {
      return {
        id: index + 1, // El índice será el id, sumando 1 para empezar desde 1
        name: recruimentDepartment[key].name, // Toma el campo name de cada departamento
      };
    });
    setSelectedValue(selectValue);
    if (valueFilter.department === "") {
      // Si el valor es vacío, guarda recruimentDepartmentTotal
      setDataDashboard(interviewsReportData.recruitmentDepartmentTotal);
    } else {
      // Busca el departamento cuyo 'name' coincida con el valor del select
      const selectedDepartment = Object.values(
        interviewsReportData.recruimentDepartment
      ).find((department) => department.name === selectValue.name);

      if (selectedDepartment) {
        setDataDashboard(selectedDepartment);
      }
    }

    setLoadingVar(false);
  };

  const loadResults = async () => {
    try {
      const pending = await fetchSecondInterviewsPending();
      const completed = await fetchSecondInterviewsCompleted();
      setInterviewsCompleted(completed);
      setInterviews(pending);
      // await loadReportData();
      //   setDataFilter(seafarersData);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  useEffect(() => {
    setLoadingVar(true);
    loadResults();
  }, []);

  const handleSelectChange = (selectedName) => {
    setValueFilter((prevState) => ({
      ...prevState,
      department: selectedName.name,
    }));
    if (selectedName.id === "") {
      // Si el valor es vacío, guarda recruimentDepartmentTotal
      setDataDashboard(data.recruitmentDepartmentTotal);
    } else {
      // Busca el departamento cuyo 'name' coincida con el valor del select
      const selectedDepartment = Object.values(data.recruimentDepartment).find(
        (department) => department.name === selectedName.name
      );

      if (selectedDepartment) {
        setDataDashboard(selectedDepartment);
      }
    }
  };

  useEffect(() => {
    if (dataFilter) {
      let pagination = paginate(dataFilter, 1, currentPage);
      setDataPagination(pagination.paginatedItems);
    }
  }, [dataFilter, currentPage]);

  const handleFilter = (e) => {
    const target = e.target || {}; // Asegura que siempre haya un objeto
    const name = target.name; // Si no hay name, usa "department"
    const value = target.value || ""; // Si no hay value, usa e

    setDateFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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

  useEffect(() => {
    const today = formatDate(new Date(), "dddd, mmmm dd yyyy");
    if (dateFilter.startDate && !dateFilter.endDate) {
      setFilterText(
        `from: ${formatDate(
          dateFilter.startDate,
          "dddd, mmmm dd yyyy"
        )} to: ${today}`
      );
    }
    if (dateFilter.startDate == dateFilter.endDate) {
      setFilterText(`${today}`);
    }
    if (dateFilter.startDate && dateFilter.endDate) {
      setFilterText(
        `from: ${formatDate(
          dateFilter.startDate,
          "dddd, mmmm dd yyyy"
        )} to: ${formatDate(dateFilter.endDate, "dddd, mmmm dd yyyy")}`
      );
    }
    if (!dateFilter.startDate && !dateFilter.endDate) {
      setFilterText(`All Data`);
    }
  }, [dateFilter]);

  const handleSearchFilter = () => {
    if (
      dateFilter.startDate && dateFilter.endDate
        ? new Date(dateFilter.endDate) > new Date(dateFilter.startDate)
        : true
    ) {
      setHasData(true);
      setLoadingVar(true);
      loadReportData(dateFilter);
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleDowloadExcelCompleted = async () => {
    setIsLoading(true);
    try {
      await downloadExcel([], "secondinterviewcompleted", "second");
      setIsLoading(false);
    } catch (error) {
      console.error("Error al descargar el reporte:", error.message);
      setIsLoading(false);
    }
  };

  const handleDowloadExcelPending = async () => {
    setIsLoading(true);
    try {
      await downloadExcel(
        [],
        "secondinterviewpending",
        "second_interview_pending"
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Error al descargar el reporte:", error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="pl-3 pb-4 pt-5  flex flex-row gap-3 items-center justify-between ">
        <div className="flex flex-row gap-2 items-center justify-between">
          <h1 className="md:pl-5 text-lg md:text-lg text-black font-bold">
            Second Interviews
          </h1>
          <span className="italic font-light text-sm">{"Total: "}</span>
        </div>
      </div>
      <TabGroup className="">
        <TabList className="flex flex-row items-center  justify-center bg-white ">
          <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 flex flex-col md:flex-row py-2 text-sm text-black items-center justify-center md:w-56 relative">
            Pending / Appointed Interviews
          </Tab>
          <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 flex flex-col md:flex-row py-2 text-sm text-black items-center justify-center md:w-56 relative">
            Completed Interviews
          </Tab>
          <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 md:translate-y-0 h-15 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
            Report
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="">
            <div className="px-8 flex items-end justify-end">
              <Button
                isProcessing={isLoading}
                color={"success"}
                onClick={() => handleDowloadExcelPending()}
              >
                Export to Excel
              </Button>
            </div>
            <section className="p-8 w-full h-full">
              <InstantSearch
                indexName="secondInterviewIndex"
                searchClient={searchClient}
              >
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="md:w-1/3">
                    <InterviewsRefinements
                    // onFilters={(e) => setFilters(e)}
                    />
                  </div>
                  <div className="container overflow-y-auto">
                    <div className="flex flex-col items-start md:flex-row">
                      <GapoolSearchBox />
                      <CustomCurrentRefinements />
                    </div>
                    <Configure
                      hitsPerPage={50}
                      filters={`status: "Pending" OR status: "Appointed"`}
                    />
                    <InterviewsInfiniteHits type={"second"} />
                  </div>
                </div>
              </InstantSearch>
            </section>
          </TabPanel>
          <TabPanel className="">
            <div className="px-8 flex items-end justify-end">
              <Button
                isProcessing={isLoading}
                color={"success"}
                onClick={() => handleDowloadExcelCompleted()}
              >
                Export to Excel
              </Button>
            </div>
            <section className="p-8 w-full h-full">
              <InstantSearch
                indexName="secondInterviewIndex"
                searchClient={searchClient}
              >
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="md:w-1/3">
                    <InterviewsRefinements
                    // onFilters={(e) => setFilters(e)}
                    />
                  </div>
                  <div className="container overflow-y-auto">
                    <div className="flex flex-col items-start md:flex-row">
                      <GapoolSearchBox />
                      <CustomCurrentRefinements />
                    </div>
                    <Configure
                      hitsPerPage={50}
                      filters={`status: "Approved" OR status: "Disapproved" OR status: "Reviewing" OR status: "Retired"`}
                    />

                    <InterviewsInfiniteHits type={"second"} />
                  </div>
                </div>
              </InstantSearch>
            </section>
          </TabPanel>
          <TabPanel className="">
            <div className="pl-3 pb-4 pt-5  flex flex-col md:flex-row gap-3 items-center justify-between ">
              <div className="flex flex-row gap-2 items-center justify-between">
                <h1 className="md:pl-5 text-lg md:text-lg text-black font-bold">
                  Second Interviews Report
                </h1>
              </div>
            </div>
            <div className="pl-3 pb-4 flex flex-col md:flex-row gap-3 items-center md:items-end justify-between ">
              <div className="w-auto flex flex-col md:flex-row gap-3 items-center md:items-end justify-center">
                <DatepickerComponent
                  name="startDate"
                  label={"Start Date"}
                  onChange={handleFilter}
                  isValid={
                    dateFilter.startDate && dateFilter.endDate
                      ? new Date(dateFilter.endDate) >
                        new Date(dateFilter.startDate)
                      : true
                  }
                  datevalue={dateFilter.startDate || ""}
                />
                <DatepickerComponent
                  name="endDate"
                  label={"End Date"}
                  onChange={handleFilter}
                  isValid={
                    dateFilter.startDate && dateFilter.endDate
                      ? new Date(dateFilter.endDate) >
                        new Date(dateFilter.startDate)
                      : true
                  }
                  datevalue={dateFilter.endDate || ""}
                />
                <button
                  disabled={
                    dateFilter.startDate && dateFilter.endDate
                      ? new Date(dateFilter.endDate) <
                        new Date(dateFilter.startDate)
                      : false || (hasData && loadingVar)
                  }
                  onClick={handleSearchFilter}
                  className="whitespace-nowrap border border-blue-300 bg-white text-blue-600 w-28 h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Filter
                </button>
              </div>
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
                // disabled={
                //   dateFilter.startDate && dateFilter.endDate
                //     ? new Date(dateFilter.endDate) <
                //       new Date(dateFilter.startDate)
                //     : false || loadingVar
                // }
                disabled={!hasData || loadingVar}
                onClick={handleButtonClick}
                className="whitespace-nowrap border border-[#010064] bg-[#010064] text-white w-28 h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Print Report
              </button>
            </div>
            {!hasData ? (
              <span className="flex flex-row items-center justify-center my-16">
                Select a filter.
              </span>
            ) : loadingVar ? (
              <LoadingState />
            ) : (
              <>
                <section className="grid grid-cols-2 mt-4 gap-6 lg:grid-cols-3 justify-center lg:w-[80%] m-auto ">
                  <div className="flex justify-between lg:w-[80%]">
                    <p>Interviews Done</p>
                    <p>{dataDashboard.interviewsDone}</p>
                  </div>
                  <div className="flex justify-between lg:w-[80%]">
                    <p>Approved</p>
                    <p>{dataDashboard.approved}</p>
                  </div>

                  <div className="flex justify-between lg:w-[80%]">
                    <p>Dissaproved</p>
                    <p>{dataDashboard.dissaproved}</p>
                  </div>

                  <div className="flex justify-between lg:w-[80%]">
                    <p>Interviews in Review</p>
                    <p>{dataDashboard.interviewsReview}</p>
                  </div>

                  <div className="flex justify-between lg:w-[80%]">
                    <p>Folders Pending</p>
                    <p>{dataDashboard.foldersPending}</p>
                  </div>

                  <div className="flex justify-between lg:w-[80%]">
                    <p>Folders Done</p>
                    <p>{dataDashboard.foldersDone}</p>
                  </div>
                  <div className="flex justify-between lg:w-[80%]">
                    <p>Retired Applicants</p>
                    <p>{dataDashboard.RetiredApplicants}</p>
                  </div>
                </section>
                <section className="pt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="mt-6">
                    <div className="overflow-y-auto h-52">
                      <h1 className="text-lg font-medium mb-4">
                        Second Interviews By Country
                      </h1>
                      <TableComponent
                        items={dataDashboard.interviewsByNationality}
                        headers={["Name", "Count"]}
                        buttonEditDelete={false}
                        enumaration={false}
                      />
                    </div>
                  </Card>

                  <Card className="mt-6">
                    <div className="overflow-y-auto h-52">
                      <h1 className="text-lg font-medium mb-4">
                        Second Interviews By Position
                      </h1>
                      <TableComponent
                        items={dataDashboard.interviewsByPosition}
                        headers={["Name", "Count"]}
                        buttonEditDelete={false}
                        enumaration={false}
                      />
                    </div>
                  </Card>

                  <Card className="mt-6">
                    <div className="overflow-y-auto h-52">
                      <h1 className="text-lg font-medium mb-4">
                        Pending Folder
                      </h1>
                      <TableComponent
                        items={dataDashboard.pendingFolder}
                        headers={["Name", "Interview Date"]}
                        buttonEditDelete={false}
                        enumaration={false}
                      />
                    </div>
                  </Card>
                  <Card className="mt-6">
                    <div className="overflow-y-auto h-52">
                      <h1 className="text-lg font-medium mb-4">Done Folders</h1>
                      <TableComponent
                        items={dataDashboard.doneFolder}
                        headers={["Name", "Interview Date"]}
                        buttonEditDelete={false}
                        enumaration={false}
                      />
                    </div>
                  </Card>
                </section>
              </>
            )}
          </TabPanel>
        </TabPanels>
      </TabGroup>

      {openForm ? (
        <PdfView
          closePdf={closePdf}
          title={`Second Interview Report - ${filterText}`}
        >
          <InterviewsOverviewReport
            date={formattedDate}
            datefilter={filterText}
            data={data}
            deptFilter={valueFilter.department}
            title="Second"
          />
        </PdfView>
      ) : null}
    </>
  );
};
export default SecondInterviewList;
