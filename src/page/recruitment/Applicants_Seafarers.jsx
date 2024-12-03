import { useState, useEffect } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Modal,
  Pagination,
  Table,
} from "flowbite-react";
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
import NewApplicant from "./NewApplicant";

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
  // const { isLoading } = useSelector((state) => state.userData);
  const [isLoading, setIsLoading] = useState(false);
  const { seafarerFilters } = useSelector((state) => state.filters);
  const [errorMessage, setErrorMessage] = useState("");
  const [openModalWarning, setOpenModalWarning] = useState(false);

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
    setIsLoading(true);
    try {
      await downloadExcel([], "gapoolseguimiento", "Reporte_de_Seguimiento");
      setIsLoading(false);
    } catch (error) {
      console.error("Error al descargar el reporte:", error.message);
      setIsLoading(false);
    }
  };

  const handleDowloadExcelAllApplicant = async () => {
    setIsLoading(true);
    try {
      await downloadExcel(
        [],
        "gapoolcontract",
        "Reporte_de_AllAplicant&Seafarer"
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
            All Applicants & Seafarers
          </h1>
          <span className="italic font-light text-sm">
            {"Total: " + seafarerCount}
          </span>
        </div>
        {/* <button
          onClick={() => {
            setOpenModalWarning(true);
          }}
          className="border border-blue-300 bg-white text-blue-600 size-10 md:w-32 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50"
        >
          Add Applicant
        </button> */}
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
            <div className="flex justify-end">
              <Button
                isProcessing={isLoading}
                color={"success"}
                onClick={handleDowloadExcelAllApplicant}
              >
                Export to Excel
              </Button>
            </div>

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
            <div className="flex justify-end">
              <Button
                isProcessing={isLoading}
                color={"success"}
                onClick={sendArrayToBackend}
              >
                Export to Excel
              </Button>
            </div>
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
                        "recruitmentStage:7 OR recruitmentStage:8 OR recruitmentStage:9 OR recruitmentStage:10 OR recruitmentStage:11 OR recruitmentStage:12 OR recruitmentStage:14 OR recruitmentStage:15 OR recruitmentStage:16 OR recruitmentStage:17 OR recruitmentStage:18 OR recruitmentStage:22 OR recruitmentStage:23 OR recruitmentStage:24 OR recruitmentStage:25 OR recruitmentStage:26 OR recruitmentStage:27"
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
      <Modal
        show={openModalWarning}
        size="xxl"
        onClose={() => setOpenModalWarning(false)}
        popup
      >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <NewApplicant isModal />
        </Modal.Body>
      </Modal>
    </>
  );
}
