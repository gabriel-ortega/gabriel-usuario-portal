import { useState } from "react";
import Navbar1 from "./Navbar1";
import { SideNavbar } from "./SideNavbar";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CustomHits } from "../searchBar/CustomHits";
import {
  getCompanies,
  getDepartments,
  getPositions,
  getSignReasons,
  getVessels,
  getVesselType,
} from "../../util/services";
import { useDispatch } from "react-redux";
import {
  setCompanies,
  setDepartments,
  setPositions,
  setSignOffReasons,
  setVessels,
  setVesselTypes,
} from "../../store/currentViews/viewSlice";
import { useSelector } from "react-redux";

export function LayoutDefault({ children }) {
  const { positions, departments, vesselTypes } = useSelector(
    (state) => state.currentViews
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const [toggleHits, setToggleHits] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const positionsData = await getPositions();
      const departmentsData = await getDepartments();
      const typeOfVesselData = await getVesselType();
      const companiesData = await getCompanies();
      const vesselsData = await getVessels();
      const reasonsData = await getSignReasons();

      dispatch(setSignOffReasons(reasonsData));
      dispatch(setVessels(vesselsData));
      dispatch(setCompanies(companiesData));
      dispatch(setPositions(positionsData));
      dispatch(setDepartments(departmentsData));
      dispatch(setVesselTypes(typeOfVesselData));
    };
    fetchData();
  }, []);

  const handleInputChange = (value) => {
    setSearchValue(value); // Actualiza el valor en el padre
  };
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (showSidebar) {
      setShowSidebar(!showSidebar);
    }
  }, [location]);

  useEffect(() => {
    if (searchValue) {
      setToggleHits(true);
    }

    return () => {
      setToggleHits(false);
    };
  }, [searchValue]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <div className="grid grid-rows-layout grid-cols-1 sm:grid-cols-1 md:grid-cols-layout h-screen">
        <header className="row-start-1 col-start-1 col-span-1 md:col-start-2 md:col-span-1">
          <Navbar1
            toggleSidebar={toggleSidebar}
            setSearchValue={setSearchValue}
          />
        </header>

        <aside
          className={`${
            showSidebar ? "fixed inset-0 z-20" : "hidden"
          } md:block row-start-1 row-span-3 md:row-start-1 md:col-start-1 border-none`}
        >
          <SideNavbar toggleSidebar={toggleSidebar} />
        </aside>

        <main className="row-start-2 col-start-1 p-4 col-span-1 md:col-start-2 md:col-span-1 overflow-y-auto max-h-screen">
          {toggleHits && (
            <div className="absolute z-10 w-1/2 h-1/2 bg-white bg-opacity-90 overflow-y-auto shadow-md border-b border-gray-200">
              <CustomHits
                toggleHits={() => setToggleHits(false)}
                // usableData={{ positions, departments, typeOfVessel }}
              />
            </div>
          )}
          {children}
        </main>
      </div>
    </>
  );
}
