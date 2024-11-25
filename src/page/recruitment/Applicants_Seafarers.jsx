import { useState, useEffect } from "react";
import { Avatar, Badge, Button, Card, Pagination, Table } from "flowbite-react";
import { countSeafarersData, downloadExcel } from "../../util/services";
import { useNavigate } from "react-router-dom";
import { formatDate, formatTitleCase } from "../../util/helperFunctions";
import { useDispatch } from "react-redux";
import { setProfileView } from "../../store/currentViews/viewSlice";
import { setLoading } from "../../store/userData";
import { useSelector } from "react-redux";

import { InstantSearch } from "react-instantsearch";
import { GapoolSearchBox } from "./components/gappoolList/GapoolSearchBox";
import { algoliasearch } from "algoliasearch";
import { SeafarersRefinements } from "./components/seafarersList/SeafarersRefinements";
import { Configure } from "react-instantsearch";
import { GapoolInfiniteHits } from "./components/gappoolList/GapoolInfiniteHits";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_ID,
  import.meta.env.VITE_ALGOLIA_KEY
);

export default function Applicants_Seafarers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [seafarers, setSeafarers] = useState([]);
  const [lastVisibleDocs, setLastVisibleDocs] = useState([]); // Guardar documentos para cada página
  const [seafarerCount, setSeafarerCount] = useState(0);
  const { isLoading } = useSelector((state) => state.userData);
  const { seafarerFilters } = useSelector((state) => state.filters);
  const [errorMessage, setErrorMessage] = useState("");

  const handleProfileLink = (uid, seafarerData) => {
    dispatch(setProfileView(seafarerData));
    navigate("/profile/" + uid);
  };

  useEffect(() => {
    const load = async () => {
      const seafarersDataCount = await countSeafarersData();
      setSeafarerCount(seafarersDataCount);
      dispatch(setLoading(false));
    };
    dispatch(setLoading(true));
    load();
    // loadInitialData();
  }, []);

  const [filters, setFilters] = useState({});

  const sendArrayToBackend = async () => {
    try {
      dispatch(setLoading(true));
      await downloadExcel([], "gapoolseguimiento", "Reporte_de_Seguimiento");
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error al descargar el reporte:", error.message);
      dispatch(setLoading(false));
    }
  };

  const handleDowloadExcelAllApplicant = async () => {
    try {
      await downloadExcel(
        [],
        "gapoolcontract",
        "Reporte_de_AllAplicant&Seafarer"
      );
    } catch (error) {
      console.error("Error al descargar el reporte:", error.message);
    }
  };

  return (
    <>
      <div className="pl-3 pb-4 pt-5  flex flex-row gap-3 items-center justify-between ">
        <div className="flex flex-row gap-2 items-center justify-between">
          <h1 className="md:pl-5 text-lg md:text-lg text-black font-bold">
            ALL APPLICANTS & SEAFARERS
          </h1>
          <span className="italic font-light text-sm">
            {"Total: " + seafarerCount}
          </span>
        </div>
        <button
          // onClick={sendArrayToBackend}
          className="border border-blue-300 bg-white text-blue-600 size-10 md:w-32 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50"
        >
          Add Applicant
        </button>
      </div>
      <TabGroup className="py-5">
        <TabList className="flex flex-row items-center  justify-center bg-white ">
          <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 flex flex-col md:flex-row py-2 text-sm text-black items-center justify-center md:w-56 relative">
            All Applicants List
          </Tab>
          <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 md:translate-y-0 h-15 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
            Follow Up List
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="">
            <button
              onClick={handleDowloadExcelAllApplicant}
              className="md:w-32 md:h-10 bg-green-700 text-center text-sm rounded-md text-white"
            >
              Export to Excel
            </button>

            <section className="p-8 w-full h-full">
              <InstantSearch
                indexName="globalSearch"
                searchClient={searchClient}
              >
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="md:w-1/3">
                    <SeafarersRefinements onFilters={(e) => setFilters(e)} />
                  </div>
                  <div className="container overflow-y-auto">
                    <div className="">
                      <GapoolSearchBox />
                    </div>
                    <Configure hitsPerPage={50} />
                    <GapoolInfiniteHits />
                  </div>
                </div>
              </InstantSearch>
            </section>
          </TabPanel>
          <TabPanel className="">
            {/* <button
              onClick={sendArrayToBackend}
              className="md:w-32 md:h-10 bg-green-700 text-center text-sm rounded-md text-white"
            >
              Export to Excel
            </button> */}
            <Button
              isProcessing={isLoading}
              color={"success"}
              onClick={sendArrayToBackend}
            >
              Export to Excel
            </Button>
            <section className="p-8 w-full h-full">
              <InstantSearch
                indexName="globalSearch"
                searchClient={searchClient}
              >
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="md:w-1/3">
                    <SeafarersRefinements onFilters={(e) => setFilters(e)} />
                  </div>
                  <div className="container overflow-y-auto">
                    <div className="">
                      <GapoolSearchBox />
                    </div>
                    <Configure
                      hitsPerPage={50}
                      filters={
                        "recruitmentStage:7 OR recruitmentStage:8 OR recruitmentStage:9 OR recruitmentStage:10 OR recruitmentStage:11 OR recruitmentStage:12 OR recruitmentStage:14 OR recruitmentStage:15 OR recruitmentStage:16 OR recruitmentStage:17 OR recruitmentStage:18"
                      }
                    />
                    <GapoolInfiniteHits />
                  </div>
                </div>
              </InstantSearch>
            </section>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
}

{
  /* <div className="">
{errorMessage && (
  <div className="max-w-full m-10">
    <span className="font-light text-red-500 break-words">
      {errorMessage}
    </span>
  </div>
)}
<SeafarersFilters
  onSearch={() => loadMoreData(1)}
  onClear={() => loadMoreData(1, true)}
  // onSearch={() => console.log(applicationFilters)}
/>
</div>

<section>
<section className="px-8 ">
  <div className="flex justify-end mb-4">
    <button
      onClick={sendArrayToBackend}
      className="h-8 w-32 bg-green-700 text-center text-sm rounded-md text-white"
    >
      Export to Excel
    </button>
  </div>
  <div className="overflow-x-auto max-h-96">
    {isLoading === true ? (
      <LoadingState />
    ) : (
      <Table hoverable className="hidden md:block">
        <Table.Head>
          <Table.HeadCell className="">No.</Table.HeadCell>
          <Table.HeadCell className="whitespace-nowrap hover:cursor-pointer">
            Logistic ID
          </Table.HeadCell>
          <Table.HeadCell className="hover:cursor-pointer">
            Name
          </Table.HeadCell>
          <Table.HeadCell className="hover:cursor-pointer">
            Process Stage
          </Table.HeadCell>
          <Table.HeadCell className="hover:cursor-pointer">
            Recruitment Dept.
          </Table.HeadCell>
          <Table.HeadCell className="hover:cursor-pointer">
            Department
          </Table.HeadCell>
          <Table.HeadCell className="hover:cursor-pointer">
            Position
          </Table.HeadCell>
          <Table.HeadCell className="hover:cursor-pointer">
            Phone
          </Table.HeadCell>
          <Table.HeadCell className="hover:cursor-pointer">
            Available
          </Table.HeadCell>
          <Table.HeadCell className="hover:cursor-pointer">
            Application Date
          </Table.HeadCell>
          <Table.HeadCell className="hover:cursor-pointer">
            Nationality
          </Table.HeadCell>
          <Table.HeadCell className="hover:cursor-pointer">
            Residency
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y cursor-pointer">
          {seafarers.map((seafarer, index) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              onClick={() => handleProfileLink(seafarer.uid, seafarer)}
              title={seafarer.uid}
            >
              <Table.Cell className="whitespace-nowrap font-light">
                {index + 1 + (currentPage - 1) * 50}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {seafarer.logisticId || "--"}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap">
                {seafarer.seafarerData?.seafarerProfile?.profile
                  ?.firstName ||
                seafarer.seafarerData?.seafarerProfile?.profile
                  ?.lastName
                  ? `${seafarer.seafarerData?.seafarerProfile?.profile?.firstName} ${seafarer.seafarerData?.seafarerProfile?.profile?.lastName}`.toUpperCase()
                  : seafarer?.displayName
                  ? seafarer?.displayName.toUpperCase()
                  : "--".toUpperCase()}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap">
                {seafarer?.recruitmentStage !== 0
                  ? stageData[seafarer?.recruitmentStage - 1].StageName
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
                {seafarer.seafarerData?.seafarerProfile?.profile?.phone
                  .value || "--"}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap">
                {seafarer.available == true ? "Yes" : "No"}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap">
                {seafarer.seafarerData?.applicationDate
                  ? formatDate(
                      seafarer.seafarerData?.applicationDate,
                      "mm-dd-yyyy"
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
    )}
  </div>
</section>
{isLoading === true ? (
  <div className="hidden md:block">
    <LoadingState />
  </div>
) : (
  <div className="space-y-4 px-2 md:hidden">
    {seafarers.map((seafarer, index) => {
      return (
        <Card
          key={index}
          className="cursor-pointer"
          onClick={() => handleProfileLink(seafarer.uid, seafarer)}
          title={seafarer.uid}
        >
          <section className="flex items-center">
            <div className="mr-4 flex items-center  bg-primary">
              <Avatar
                className="text-primary-foreground"
                rounded
                // size="md"
                img={seafarer?.seafarerData.photoURL}
                placeholderInitials=""
              />
            </div>
            <div className="flex-col flex-1 space-y-1">
              <p className="text-sm font-semibold leading-none">
                {seafarer.seafarerData?.seafarerProfile?.profile
                  ?.firstName ||
                seafarer.seafarerData?.seafarerProfile?.profile
                  ?.lastName
                  ? `${seafarer.seafarerData?.seafarerProfile?.profile?.firstName} ${seafarer.seafarerData?.seafarerProfile?.profile?.lastName}`.toUpperCase()
                  : seafarer?.displayName
                  ? seafarer?.displayName.toUpperCase()
                  : "--".toUpperCase()}
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
                  {seafarer?.recruitmentStage}
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
)}

<div className="flex overflow-x-auto justify-center my-5">
  <Pagination
    layout="navigation"
    showIcons
    currentPage={currentPage}
    totalPages={seafarerCount}
    onPageChange={onPageChange}
  />
</div>
</section> */
}
