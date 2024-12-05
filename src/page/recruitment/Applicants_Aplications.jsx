import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Avatar, Badge, Button, Card, Pagination, Table } from "flowbite-react";
import {
  countApplicationsData,
  downloadExcel,
  exportApplicationsExcel,
  fetchApplicationsData,
  fetchApplicationsReport,
} from "../../util/services";
import {
  setApplicationData,
  setLoading,
  updateApplicationSent,
} from "../../store/userData";
import { setApplicationView } from "../../store/currentViews/viewSlice";
import { formatDate } from "../../util/helperFunctions";
import applicationStatusData from "../../assets/tables/json/ApplicationStatus-static.json";
import { LoadingState } from "../../components/skeleton/LoadingState";
import { useSelector } from "react-redux";
import TableDashboard from "../../components/ComponentsGraphics/TableDashboard";
import PdfView from "../../components/layoutComponents/PdfView";
import ApplicationsReport from "../../reports/ApplicationsReport";
import {
  DatepickerComponent,
  SelectComponents,
  TableComponent,
} from "../../components/layoutComponents";
import { InstantSearch } from "react-instantsearch";
import { algoliasearch } from "algoliasearch";
import { GapoolSearchBox } from "./components/gappoolList/GapoolSearchBox";
import { ApplicationsInfiniteHits } from "./components/applicationsList/ApplicationsInfiniteHits";
import { ApplicationsRefinements } from "./components/applicationsList/ApplicationsRefinements";
import { Configure } from "react-instantsearch";

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_ID,
  import.meta.env.VITE_ALGOLIA_KEY
);

export default function Applicants_Aplications() {
  const [data, setData] = useState({
    generalApplications: {
      name: "Department",
      generalPosition: [
        {
          name: "Able Seaman",
          count: 13,
        },
        {
          name: "Able Seaman",
          count: 13,
        },
        {
          name: "Able Seaman",
          count: 13,
        },
        {
          name: "Able Seaman",
          count: 13,
        },
      ],
      generalNationality: [
        {
          name: "Panama",
          count: 13,
        },
      ],
      generalDepartment: [
        {
          name: "Deck Department",
          count: 12,
        },
      ],
      generalSource: [
        {
          name: "Whatsapp",
          count: 12,
        },
      ],
      generalCaptador: [
        {
          name: "Whatsapp",
          count: 12,
        },
      ],
      generalHarvester: [
        {
          name: "Whatsapp",
          count: 12,
        },
      ],
      recieved: 13,
      evaluation: 15,
      pendingCorrection: 54,
      approved: 12,
      dissaproved: 12,
      firstFolderDone: 122,
    },
    recruimentApplications: {
      cruiseDepartment: {
        name: "Cruise Department",
        generalPosition: [
          {
            name: "Able Seaman",
            count: 13,
          },
        ],
        generalNationality: [
          {
            name: "Panama",
            count: 13,
          },
        ],
        generalDepartment: [
          {
            name: "Deck Department",
            count: 12,
          },
        ],
        generalSource: [
          {
            name: "Whatsapp",
            count: 12,
          },
        ],
        generalCaptador: [
          {
            name: "Whatsapp",
            count: 12,
          },
        ],
        generalHarvester: [
          {
            name: "Whatsapp",
            count: 12,
          },
        ],
        recieved: 13,
        evaluation: 15,
        pendingCorrection: 54,
        approved: 12,
        dissaproved: 12,
        firstFolderDone: 122,
      },
      MerchantDepartment: {
        name: "Merchant Department",
        generalPosition: [
          {
            name: "Able Seaman",
            count: 13,
          },
        ],
        generalNationality: [
          {
            name: "Panama",
            count: 13,
          },
        ],
        generalDepartment: [
          {
            name: "Deck Department",
            count: 12,
          },
        ],
        generalSource: [
          {
            name: "Whatsapp",
            count: 12,
          },
        ],
        generalCaptador: [
          {
            name: "Whatsapp",
            count: 12,
          },
        ],
        generalHarvester: [
          {
            name: "Whatsapp",
            count: 12,
          },
        ],
        recieved: 13,
        evaluation: 15,
        pendingCorrection: 54,
        approved: 12,
        dissaproved: 12,
        firstFolderDone: 122,
      },
    },
    applicantsEvaluated: [
      {
        name: "Abner Murillo",
        nationality: "Panama",
        position: "N/A",
      },
    ],
    applicantsFirstInterview: [
      {
        name: "Abner Murillo",
        nationality: "Panama",
        position: "N/A",
      },
      {
        name: "Abner Murillo",
        nationality: "Panama",
        position: "N/A",
      },
    ],
    followUpApplicants: [
      {
        name: "retired in Application",
        applicants: "10",
      },
    ],
    followUpList: [
      {
        id: "1232",
        name: "Oscar Camacho",
        processStage: "Retired in Evaluation",
        dismissDate: "10-12-2024",
        nationality: "Panama",
        phone: "65786543",
        email: "carlslsos@gmail.com",
        department: "Medical Department",
        position: "Nurse",
      },
      {
        id: "1232",
        name: "Oscar Camacho",
        processStage: "Retired in Evaluation",
        dismissDate: "10-12-2024",
        nationality: "Panama",
        phone: "65786543",
        email: "carlslsos@gmail.com",
        department: "Medical Department",
        position: "Nurse",
      },
      {
        id: "1232",
        name: "Oscar Camacho",
        processStage: "Retired in Evaluation",
        dismissDate: "10-12-2024",
        nationality: "Panama",
        phone: "65786543",
        email: "carlslsos@gmail.com",
        department: "Medical Department",
        position: "Nurse",
      },
      {
        id: "1232",
        name: "Oscar Camacho",
        processStage: "Retired in Evaluation",
        dismissDate: "10-12-2024",
        nationality: "Panama",
        phone: "65786543",
        email: "carlslsos@gmail.com",
        department: "Medical Department",
        position: "Nurse",
      },
      {
        id: "1232",
        name: "Oscar Camacho",
        processStage: "Retired in Evaluation",
        dismissDate: "10-12-2024",
        nationality: "Panama",
        phone: "65786543",
        email: "carlslsos@gmail.com",
        department: "Medical Department",
        position: "Nurse",
      },
      {
        id: "1232",
        name: "Oscar Camacho",
        processStage: "Retired in Evaluation",
        dismissDate: "10-12-2024",
        nationality: "Panama",
        phone: "65786543",
        email: "carlslsos@gmail.com",
        department: "Medical Department",
        position: "Nurse",
      },
      {
        id: "1232",
        name: "Oscar Camacho",
        processStage: "Retired in Evaluation",
        dismissDate: "10-12-2024",
        nationality: "Panama",
        phone: "65786543",
        email: "carlslsos@gmail.com",
        department: "Medical Department",
        position: "Nurse",
      },
      {
        id: "1232",
        name: "Oscar Camacho",
        processStage: "Retired in Evaluation",
        dismissDate: "10-12-2024",
        nationality: "Panama",
        phone: "65786543",
        email: "carlslsos@gmail.com",
        department: "Medical Department",
        position: "Nurse",
      },
      {
        id: "1232",
        name: "Oscar Camacho",
        processStage: "Retired in Evaluation",
        dismissDate: "10-12-2024",
        nationality: "Panama",
        phone: "65786543",
        email: "carlslsos@gmail.com",
        department: "Medical Department",
        position: "Nurse",
      },
    ],
  });
  const [dataDashboard, setDataDashboard] = useState({
    generalApplications: {
      name: "Department",
      generalPosition: [],
      generalNationality: [],
      generalDepartment: [],
      generalSource: [],
      generalCaptador: [],
      generalHarvester: [],
      recieved: 13,
      evaluation: 15,
      pendingCorrection: 54,
      approved: 12,
      dissaproved: 12,
      firstFolderDone: 122,
    },
    recruimentApplications: {
      cruiseDepartment: {
        name: "Cruise Department",
        generalPosition: [],
        generalNationality: [],
        generalDepartment: [],
        generalSource: [],
        generalCaptador: [],
        generalHarvester: [],
        recieved: 13,
        evaluation: 15,
        pendingCorrection: 54,
        approved: 12,
        dissaproved: 12,
        firstFolderDone: 122,
      },
      MerchantDepartment: {
        name: "Merchant Department",
        generalPosition: [],
        generalNationality: [],
        generalDepartment: [],
        generalSource: [],
        generalCaptador: [],
        generalHarvester: [],
        recieved: 13,
        evaluation: 15,
        pendingCorrection: 54,
        approved: 12,
        dissaproved: 12,
        firstFolderDone: 122,
      },
    },
    applicantsEvaluated: [],
    applicantsFirstInterview: [],
    followUpApplicants: [],
    followUpList: [],
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { isLoading } = useSelector((state) => state.userData);
  const [isLoading, setIsLoading] = useState(false);
  const { applicationFilters } = useSelector((state) => state.filters);
  const [openForm, setOpenForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [valueFilter, setValueFilter] = useState({
    department: "",
  });
  const [dateFilter, setDateFilter] = useState({ startDate: "", endDate: "" });
  const [selectValue, setSelectedValue] = useState({});
  const [applications, setApplications] = useState([]);
  const [loadingVar, setLoadingVar] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [lastVisible, setLastVisible] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [lastVisibleDocs, setLastVisibleDocs] = useState([]);
  const closePdf = () => {
    setOpenForm(false); // Detiene la carga al cerrar el PDF
  };

  const handleButtonClick = () => {
    setOpenForm(!openForm);
  };

  const handleProfileLink = (applicationData, applicationDataLatest, uid) => {
    const vesselTypeUpdate =
      applicationDataLatest.startApplication.vesselType[0].id;
    const departmentUpdate =
      applicationDataLatest.startApplication.department[0].id;
    const positionUpdate =
      applicationDataLatest.startApplication.position[0].id;

    const vesselTypeData = {
      vesselType: vesselTypeUpdate,
      department: departmentUpdate,
      position: positionUpdate,
    };
    if (!applicationData.isRead) {
      const updatedApplication = { ...applicationData, isRead: true };
      dispatch(updateApplicationSent(uid, updatedApplication, vesselTypeData));
      dispatch(setApplicationView(updatedApplication));
      dispatch(setApplicationData(applicationDataLatest));
      navigate("/reviewapplication/" + uid);
    } else {
      dispatch(setApplicationView(applicationData));
      dispatch(setApplicationData(applicationDataLatest));
      navigate("/reviewapplication/" + uid);
    }
  };

  const loadReportData = async (dateFilters) => {
    const applicationsReportData = await fetchApplicationsReport(dateFilters);
    setData(applicationsReportData);

    const { recruimentApplications } = applicationsReportData; // Extrae recruimentDepartment de tu estado data

    const selectValue = Object.keys(recruimentApplications).map(
      (key, index) => {
        return {
          id: index + 1, // El índice será el id, sumando 1 para empezar desde 1
          name: recruimentApplications[key].name, // Toma el campo name de cada departamento
        };
      }
    );
    setSelectedValue(selectValue);
    if (valueFilter.department === "") {
      // Si el valor es vacío, guarda recruimentDepartmentTotal
      setDataDashboard(applicationsReportData.generalApplications);
    } else {
      // Busca el departamento cuyo 'name' coincida con el valor del select
      const selectedDepartment = Object.values(
        applicationsReportData.recruimentApplications
      ).find((department) => department.name === selectValue.name);

      if (selectedDepartment) {
        setDataDashboard(selectedDepartment);
      }
    }

    setLoadingVar(false);
  };

  const loadInitialData = async () => {
    // dispatch(setLoading(true));
    const result = await fetchApplicationsData(applicationFilters);
    console.log(result);
    setApplications(result.seafarersData);
    setLastVisible(result.lastVisible);
    await loadReportData();
    if (applicationsCount < 1) {
      const applicationsDataCount = await countApplicationsData();
      setApplicationsCount(applicationsDataCount);
    }
    // dispatch(setLoading(false));
  };

  // const loadMoreData = async (filters) => {
  //   // if (!lastVisible || isLoading) return; // Evitar cargar más si no hay más datos o si ya está cargando
  //   const filtersData = filters == 2 ? {} : applicationFilters;

  //   if (isLoading) return; // Evitar cargar más si no hay más datos o si ya está cargando
  //   dispatch(setLoading(true));
  //   const result = await fetchApplicationsData(
  //     filtersData,
  //     100,
  //     filters == 1 || filters == 2 ? 0 : lastVisible
  //   );
  //   setApplications(result.seafarersData);
  //   setLastVisible(result.lastVisible); // Actualizar el último visible para la siguiente paginación
  //   dispatch(setLoading(false));
  // };

  // const loadMoreData = async (pageNumber, noFilters = false) => {
  //   if (isLoading) return; // Evitar carga adicional si ya está cargando

  //   // Obtener el último documento visible de la página anterior
  //   const startDoc = lastVisibleDocs[pageNumber - 2] || null;

  //   dispatch(setLoading(true));

  //   // Determinar los filtros a usar: vacío si `noFilters` es true, de lo contrario usa `applicationFilters`
  //   const filtersData = noFilters ? {} : applicationFilters;

  //   // Consultar la página siguiente
  //   const result = await fetchApplicationsData(filtersData, 100, startDoc);

  //   if (result?.error) {
  //     setErrorMessage(
  //       `Please send the following error to IT: ${result?.error?.message}` || ""
  //     );
  //   } else {
  //     // Actualizar la lista de aplicaciones
  //     setApplications(result.seafarersData);

  //     // Actualizar lastVisibleDocs con el último documento de la nueva página
  //     setLastVisibleDocs((prevDocs) => {
  //       const updatedDocs = [...prevDocs];
  //       updatedDocs[pageNumber - 1] = result.lastVisible;
  //       return updatedDocs;
  //     });
  //   }

  //   dispatch(setLoading(false));
  // };

  const loadResults = async () => {
    try {
      // const applicationsData = await fetchApplicationsData();
      // setApplications(applicationsData);
      await loadInitialData();
      await loadReportData();
      if (applicationsCount < 1) {
        const applicationsDataCount = await countApplicationsData();
        setApplicationsCount(applicationsDataCount);
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  useEffect(() => {
    dispatch(setLoading(true));
    setLoadingVar(true);
    loadResults();
  }, []);

  const onPageChange = async (pageNumber) => {
    console.log(pageNumber);
    if (pageNumber == 1) {
      await loadInitialData();
    } else {
      // Avanzar a la siguiente página
      await loadMoreData(pageNumber);
    }

    setCurrentPage(pageNumber);
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

  const handleSelectChange = (selectedName) => {
    setValueFilter((prevState) => ({
      ...prevState,
      department: selectedName.name,
    }));
    if (selectedName.id === "") {
      // Si el valor es vacío, guarda recruimentDepartmentTotal
      setDataDashboard(data.generalApplications);
    } else {
      // Busca el departamento cuyo 'name' coincida con el valor del select
      const selectedDepartment = Object.values(
        data.recruimentApplications
      ).find((department) => department.name === selectedName.name);

      if (selectedDepartment) {
        setDataDashboard(selectedDepartment);
      }
    }
  };

  const handleFilter = (e) => {
    const target = e.target || {}; // Asegura que siempre haya un objeto
    const name = target.name; // Si no hay name, usa "department"
    const value = target.value || ""; // Si no hay value, usa e

    setDateFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearchFilter = () => {
    if (
      dateFilter.startDate && dateFilter.endDate
        ? new Date(dateFilter.endDate) > new Date(dateFilter.startDate)
        : true
    ) {
      setLoadingVar(true);
      loadReportData(dateFilter);
    }
  };

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

  // const sendArrayToBackend = async () => {
  //   try {
  //     await exportApplicationsExcel(applicationFilters);
  //   } catch (error) {
  //     console.log("Error exporting applicants excel.");
  //   }
  // };

  const [filters, setFilters] = useState({});

  const handleDowloadExcel = async () => {
    setIsLoading(true);
    try {
      await downloadExcel([], "application", "Reporte_de_Application");
      setIsLoading(false);
    } catch (error) {
      console.error("Error al descargar el reporte:", error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="pl-3 md:pl-5 pt-5 pb-4 flex flex-row gap-2 items-center ">
        <h1 className="  text-lg md:text-lg  text-black font-bold">
          Recruitment Applications
        </h1>
        <span className="italic font-light text-sm">
          {"Total: " + applicationsCount}
        </span>
      </div>
      <TabGroup className="">
        <TabList className="flex flex-row items-center  justify-center bg-white ">
          <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 flex flex-col md:flex-row py-2 text-sm text-black items-center justify-center md:w-56 relative">
            Applications List
          </Tab>
          <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 md:translate-y-0 h-15 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
            Report
          </Tab>
          <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 md:translate-y-0 h-15 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
            WhatsApp Report
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="">
            <div className="px-8 flex items-end justify-end">
              <Button
                isProcessing={isLoading}
                color={"success"}
                onClick={handleDowloadExcel}
              >
                Export to Excel
              </Button>
            </div>
            <section className="p-8 w-full h-full">
              <InstantSearch
                indexName="applicationsIndex"
                searchClient={searchClient}
              >
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="md:w-1/3">
                    <ApplicationsRefinements onFilters={(e) => setFilters(e)} />
                  </div>
                  <div className="container overflow-y-auto">
                    <div className="">
                      <GapoolSearchBox />
                    </div>
                    <Configure hitsPerPage={50} />
                    <ApplicationsInfiniteHits />
                  </div>
                </div>
              </InstantSearch>
            </section>
          </TabPanel>
          <TabPanel className="">
            <div className="pl-3 pb-4 pt-5  flex flex-col md:flex-row gap-3 items-center justify-between ">
              <div className="flex flex-row gap-2 items-center justify-between">
                <h1 className="md:pl-5 text-lg md:text-lg text-black font-bold">
                  Applications Report
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
                      : false
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
                disabled={
                  dateFilter.startDate && dateFilter.endDate
                    ? new Date(dateFilter.endDate) <
                      new Date(dateFilter.startDate)
                    : false
                }
                onClick={handleButtonClick}
                className="whitespace-nowrap border border-[#010064] bg-[#010064] text-white w-28 h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30"
              >
                Print Report
              </button>
            </div>
            {loadingVar ? (
              <LoadingState />
            ) : (
              <section>
                <section className="grid grid-cols-2 mt-4 gap-6 justify-center lg:w-3/4 m-auto ">
                  <div className="flex justify-between lg:w-3/4">
                    <p>Applications Recieved</p>
                    <p>{dataDashboard.recieved || ""}</p>
                  </div>
                  <div className="flex justify-between lg:w-3/4">
                    <p>Approved</p>
                    <p>{dataDashboard.approved}</p>
                  </div>

                  <div className="flex justify-between lg:w-3/4">
                    <p>Applications in Evaluation</p>
                    <p>{dataDashboard.evaluation}</p>
                  </div>

                  <div className="flex justify-between lg:w-3/4">
                    <p>Applications Dissaproved</p>
                    <p>{dataDashboard.dissaproved}</p>
                  </div>

                  <div className="flex justify-between lg:w-3/4">
                    <p>Applications pending correction</p>
                    <p>{dataDashboard.pendingCorrection}</p>
                  </div>

                  {/* <div className="flex justify-between lg:w-3/4">
                <p>First Folder Done</p>
                <p>{data.generalApplications.firstFolderDone}</p>
              </div> */}
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-2 pt-10 gap-10">
                  <Card>
                    <div className="w-full">
                      <h1 className="text-lg font-medium mb-4">
                        Applications By Position
                      </h1>
                      <div className="overflow-y-auto h-40">
                        <TableDashboard
                          data={dataDashboard.generalPosition}
                          encabezado1="Position"
                          encabezado2="Applications Count"
                        />
                      </div>
                    </div>
                  </Card>
                  <Card>
                    <div className="w-full ">
                      <h1 className="text-lg font-medium mb-4">
                        Applications By Department
                      </h1>
                      <div className="overflow-y-auto h-52">
                        <TableDashboard
                          data={dataDashboard.generalDepartment}
                          encabezado1="Department"
                          encabezado2="Applications Count"
                        />
                      </div>
                    </div>
                  </Card>
                  <Card>
                    <div className="w-full ">
                      <h1 className="text-lg font-medium mb-4">
                        Applications By Nationality
                      </h1>
                      <div className="overflow-y-auto h-52">
                        <TableDashboard
                          data={dataDashboard.generalNationality}
                          encabezado1="Nationality"
                          encabezado2="Applications Count"
                        />
                      </div>
                    </div>
                  </Card>
                  <Card>
                    <div className="w-full ">
                      <h1 className="text-lg font-medium mb-4">
                        Applications By Source
                      </h1>
                      <div className="overflow-y-auto h-52">
                        <TableDashboard
                          data={dataDashboard.generalSource}
                          encabezado1="Source"
                          encabezado2="Applications Count"
                        />
                      </div>
                    </div>
                  </Card>
                  <Card>
                    <div className="w-full ">
                      <h1 className="text-lg font-medium mb-4">
                        Applications By Harvester
                      </h1>
                      <div className="overflow-y-auto h-52">
                        <TableDashboard
                          data={dataDashboard.generalHarvester}
                          encabezado1="Harvester"
                          encabezado2="Applications Count"
                        />
                      </div>
                    </div>
                  </Card>
                  <Card>
                    <div className="w-full ">
                      <h1 className="text-lg font-medium mb-4">
                        Applications By Captador
                      </h1>
                      <div className="overflow-y-auto h-52">
                        <TableDashboard
                          data={dataDashboard.generalCaptador}
                          encabezado1="Captador"
                          encabezado2="Applications Count"
                        />
                      </div>
                    </div>
                  </Card>
                </section>
              </section>
            )}
            {/* <Card>
                <div className="w-full ">
                  <h1 className="text-lg font-medium mb-4">
                    Applicants Being Evaluated
                  </h1>
                  <div className="overflow-y-auto h-52">
                    <TableComponent
                      items={data.applicantsEvaluated}
                      headers={["Name", "Nationality", "Position"]}
                      buttonEditDelete={false}
                    />
                  </div>
                </div>
              </Card>
              <Card>
                <div className="w-full ">
                  <h1 className="text-lg font-medium mb-4">
                    Applicants Approved for First Interview
                  </h1>
                  <div className="overflow-y-auto h-52">
                    <TableComponent
                      items={data.applicantsFirstInterview}
                      headers={["Name", "Nationality", "Position"]}
                      buttonEditDelete={false}
                    />
                  </div>
                </div>
              </Card> */}
            {/* <Card>
                <div className="w-full ">
                  <h1 className="text-lg font-medium mb-4">
                    Follow Up Applicants
                  </h1>
                  <div className="overflow-y-auto h-52">
                    <TableComponent
                      items={data.followUpApplicants}
                      headers={["Name", "Applicants"]}
                      buttonEditDelete={false}
                    />
                  </div>
                </div>
              </Card> */}

            {/* <Card>
              <div className="w-full ">
                <h1 className="text-lg font-medium mb-4">Follow Up List</h1>
                <div className="overflow-y-auto h-52">
                  <TableComponent
                    items={data.followUpList}
                    headers={[
                      "Name",
                      "Process Stage",
                      "Dismiss Date",
                      "Nationality",
                      "Phone",
                      "Email",
                      "Department",
                      "Position",
                    ]}
                    buttonEditDelete={false}
                  />
                </div>
              </div>
            </Card> */}

            {openForm ? (
              <PdfView closePdf={closePdf} title="reporte de applications">
                <ApplicationsReport
                  data={data}
                  date={formattedDate}
                  datefilter={filterText}
                  deptFilter={valueFilter.department}
                />
              </PdfView>
            ) : null}
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
}
