import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect } from "react";
import { useState } from "react";
import {
  getApplicationsource,
  getDepartments,
  getHarvester,
  getPositions,
  getVesselType,
} from "../../../../util/services";
import {
  ButtonIcon,
  DatepickerComponent,
  InputText,
  SelectComponentCountry,
  SelectComponents,
  YesNoInput,
} from "../../../../components/layoutComponents";
import { MdFilterAlt, MdFilterAltOff, MdOutlineSearch } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { updateApplicationFilters } from "../../../../store/filters/filterSlice";
import statusData from "../../../../assets/tables/json/ApplicationStatus-static.json";
import { formatTitleCase } from "../../../../util/helperFunctions";
import { HiXCircle } from "react-icons/hi";

export const ApplicationFilters = ({ onSearch, onClear }) => {
  const dispatch = useDispatch();
  const { applicationFilters } = useSelector((state) => state.filters);
  const [value, setValue] = useState(applicationFilters || {});
  const [filterSummary, setFilterSummary] = useState("");
  const [data, setData] = useState({
    department: [],
    position: [],
    recruitmentdepartment: [],
    harvester: [],
    applicationsource: [],
  });
  const [isVisible, setIsVisible] = useState(false);
  const [parent] = useAutoAnimate();

  // const [dataFilter, setDataFilter] = useState();

  const search = (e) => {
    e.preventDefault();
    onSearch();
  };
  const loadResults = async () => {
    try {
      const applicationsource = await getApplicationsource();
      const harvester = await getHarvester();
      const recruitmentdepartment = await getVesselType();
      const department = await getDepartments();
      const position = await getPositions();
      setData({
        department: department,
        position: position,
        recruitmentdepartment: recruitmentdepartment,
        harvester: harvester,
        applicationsource: applicationsource,
      });
      //   setDataFilter(applicationsData);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  useEffect(() => {
    loadResults();
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const changeData = (e, name) => {
    const newValue = e?.target ? e?.target?.value : e;
    const fieldName = name ? name : e?.target?.name;

    // Actualiza los filtros en el estado `value`
    const updatedValue = {
      ...value,
      [fieldName]: newValue,
    };

    setValue(updatedValue);

    // Ejecuta el dispatch para actualizar el store
    dispatch(updateApplicationFilters(updatedValue));

    // Crear el resumen de filtro
  };

  const clearFilters = () => {
    setValue({});

    // Ejecuta el dispatch para actualizar el store
    dispatch(updateApplicationFilters({}));
    onClear();
  };

  return (
    <section>
      <div className="flex flex-row gap-3 items-end">
        <button
          className="ml-5 border border-blue-300 bg-white text-blue-600 size-10 md:w-24 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50"
          onClick={toggleVisibility}
          title="Filters"
        >
          {isVisible ? (
            <MdFilterAltOff className="w-6 h-5 " />
          ) : (
            <MdFilterAlt className="w-6 h-5" />
          )}
          <span className="hidden md:block ">Filters</span>
        </button>
        <span
          className={`font-light italic text-zinc-600 text-sm ${
            !isVisible && applicationFilters !== null ? "" : "hidden"
          }`}
        >
          {filterSummary}
        </span>
      </div>
      <div ref={parent} className="pb-5">
        {isVisible && (
          <section className="  p-5  m-auto ">
            <form
              action=""
              className=" m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-5 gap-4 items-end"
            >
              <YesNoInput
                text="Read"
                name="read"
                onChange={changeData}
                defaultChecked={applicationFilters.read}
              />
              <SelectComponents
                data={data.department || ""}
                name="department"
                idKey="Id"
                valueKey="DepartmentName"
                className=""
                valueDefault="Department"
                id="department"
                classelect=""
                name_valor={true}
                onChange={(e) => changeData(e[0], "department")}
                initialValue={applicationFilters.department?.id}
              />
              <SelectComponents
                data={data.position || ""}
                idKey="Id"
                name="position"
                valueKey="PositionName"
                className=""
                valueDefault="Position"
                id="position"
                name_valor={true}
                onChange={(e) => changeData(e[0], "position")}
                initialValue={applicationFilters.position?.id}
              />

              <SelectComponentCountry
                text="Nationality"
                name="nationality"
                initialValue={applicationFilters.nationality || ""}
                value={applicationFilters.nationality || ""}
                onChange={(e) => changeData(e, "nationality")}
              />

              <SelectComponents
                data={statusData}
                idKey="Id"
                name="status"
                valueKey="statusName"
                className=""
                valueDefault="Status"
                id="status"
                name_valor={true}
                onChange={(e) => changeData(e[0], "status")}
                initialValue={applicationFilters.status?.id}
              />

              <SelectComponents
                data={data.recruitmentdepartment}
                idKey="Id"
                valueKey="Name"
                className=""
                name="recruitmentDepartment"
                valueDefault="Recruitment Department"
                id="recruitmentDepartment"
                name_valor={true}
                onChange={(e) => changeData(e[0], "recruitmentDepartment")}
                initialValue={applicationFilters.recruitmentDepartment?.id}
              />
              <DatepickerComponent
                datevalue={applicationFilters.applicationDateStart || ""}
                onChange={changeData}
                label="Application Date Start"
                name="applicationDateStart"
              />
              <DatepickerComponent
                datevalue={applicationFilters.applicationDateEnd || ""}
                onChange={changeData}
                label="Application Date End"
                name="applicationDateEnd"
              />
            </form>
            <div className=" mt-4 flex flex-row items-end justify-center gap-3">
              <button
                // onClick={search}
                onClick={(e) => search(e)}
                className="whitespace-nowrap border border-[#010064] bg-[#010064] text-white w-10 md:w-28 h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30"
              >
                <MdOutlineSearch className="w-6 h-5 " />
                <span className="hidden md:block ">Search</span>
              </button>
              <button
                className={`border border-red-600 bg-red-600 text-white size-10 md:w-28 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-red-700`}
                onClick={() => clearFilters()}
              >
                <HiXCircle className="h-4 w-4" />
                <span className="hidden md:block ">Clear Filters</span>
              </button>
            </div>
          </section>
        )}
      </div>
    </section>
  );
};
