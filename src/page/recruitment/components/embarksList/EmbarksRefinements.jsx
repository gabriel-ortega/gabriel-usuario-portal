import { useRefinementList } from "react-instantsearch";
import { useSelector } from "react-redux";
import { LoadingState } from "../../../../components/skeleton/LoadingState";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import countries from "../../../../assets/tables/json/Countries.json";
import stageData from "../../../../assets/tables/json/RecruitmentStage-static.json";
import embarkStatus from "../../../../assets/tables/json/EmbarkStatus-static.json";
import { useEffect } from "react";
import { useClearRefinements } from "react-instantsearch";
import { useToggleRefinement } from "react-instantsearch";
import { HiXCircle } from "react-icons/hi";

// Componente genérico de Custom Refinement List
const CustomRefinementList = ({
  attribute,
  label,
  selector,
  tableValue,
  tableName,
  onRefinementChange,
}) => {
  const {
    items,
    count,
    refine,
    searchForItems,
    canToggleShowMore,
    isShowingMore,
    toggleShowMore,
  } = useRefinementList({ attribute, limit: 5, showMore: true });
  const [isVisible, setIsVisible] = useState(false);
  const [parent] = useAutoAnimate();
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Obtener datos del store de Redux
  const {
    positions,
    departments,
    vesselTypes,
    companies,
    vessels,
    signOffReasons,
  } = useSelector((state) => state.currentViews);

  let currentArray = [];

  if (tableName == "positions") {
    currentArray = positions;
  } else if (tableName == "departments") {
    currentArray = departments;
  } else if (tableName == "vesselTypes") {
    currentArray = vesselTypes;
  } else if (tableName == "countries") {
    currentArray = countries;
  } else if (tableName == "stageData") {
    currentArray = stageData;
  } else if (tableName == "companies") {
    currentArray = companies;
  } else if (tableName == "vessels") {
    currentArray = vessels;
  } else if (tableName == "status") {
    currentArray = embarkStatus;
  } else if (tableName == "signOffReasons") {
    currentArray = signOffReasons;
  }

  // Mapear IDs a nombres
  const getName = (id) => {
    if (
      (tableName === "positions" && id == 1) ||
      (tableName === "departments" && id == 1)
    ) {
      return "N/A";
    }

    const item = currentArray.find((entry) => entry.Id == id);
    return item
      ? item.PositionName ||
          item.Reason ||
          item.StatusName ||
          item["Vessel Name"] ||
          item.CompanyName ||
          item.Name ||
          item.DepartmentName ||
          item.CountryName ||
          item.Id ||
          id
      : id;
  };

  const handleChange = (value) => {
    refine(value); // Cambia el refinamiento
  };

  // Usa useEffect para capturar los elementos refinados después de que cambien
  useEffect(() => {
    const refinedItems = items
      .filter((item) => item.isRefined)
      .map((item) => item.label);
    onRefinementChange(refinedItems); // Llama con los valores actualizados
  }, [items]);

  return (
    <div className="mb-5 border rounded-md p-3">
      <div className="flex flex-row gap-3 items-center mb-2">
        <h3 className="font-semibold ">{label}</h3>
        <button
          onClick={toggleVisibility}
          className=" text-blue-500 text-sm hover:underline"
        >
          {isVisible ? "Hide" : "Show"}
        </button>
      </div>
      <div ref={parent}>
        {isVisible && (
          <ul>
            {items.map((item) => (
              <li key={item.label} className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={item.isRefined}
                    // onChange={() => refine(item.value)}
                    onChange={() => handleChange(item.value)}
                    className="mr-2"
                  />
                  {currentArray ? (
                    <span>{getName(item.label)}</span>
                  ) : (
                    <LoadingState />
                  )}

                  {/* <span>{item.label}</span> */}
                  <span className="ml-2 text-gray-600">({item.count})</span>
                </label>
                <hr />
              </li>
            ))}
          </ul>
        )}
      </div>
      {canToggleShowMore && isVisible && (
        <button
          onClick={toggleShowMore}
          className="mt-2 text-blue-500 hover:underline"
        >
          {isShowingMore ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};

// Componente principal con múltiples filtros
export const EmbarksRefinements = ({ onFilters = () => {} }) => {
  const { canRefine, refine } = useClearRefinements();
  const [selectedRefinements, setSelectedRefinements] = useState({
    recruitmentStage: [],
    position: [],
    department: [],
    vesselType: [],
    nationality: [],
    residency: [],
    company: [],
  });

  const handleRefinementChange = (attribute, values) => {
    setSelectedRefinements((prev) => ({
      ...prev,
      [attribute]: values,
    }));
  };

  useEffect(() => {
    onFilters(selectedRefinements);
  }, [selectedRefinements]);

  const hasSelectedRefinements = Object.values(selectedRefinements).some(
    (array) => array.length > 0
  );

  return (
    <section>
      {/* {hasSelectedRefinements && (
        <div className="my-3">
          <button
            className={`border border-red-600 bg-red-600 text-white size-10 md:w-28 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-red-700`}
            onClick={refine}
          >
            <HiXCircle className="h-4 w-4" />
            <span className="hidden md:block ">Clear Filters</span>
          </button>
        </div>
      )} */}

      <CustomRefinementList
        attribute="status"
        label="Embark Status"
        selector={(state) => state.currentViews} // Ajusta según el store
        tableName={"status"}
        tableValue={"Name"}
        onRefinementChange={(values) =>
          handleRefinementChange("status", values)
        }
      />
      <CustomRefinementList
        attribute="position"
        label="Position"
        selector={(state) => state.currentViews} // Ajusta según el store
        tableName={"positions"}
        tableValue={"PositionName"}
        onRefinementChange={(values) =>
          handleRefinementChange("position", values)
        }
      />
      <CustomRefinementList
        attribute="department"
        label="Department"
        selector={(state) => state.currentViews} // Ajusta según el store
        tableName={"departments"}
        tableValue={"DepartmentName"}
        onRefinementChange={(values) =>
          handleRefinementChange("department", values)
        }
      />
      <CustomRefinementList
        attribute="vesselType"
        label="Vessel Type"
        selector={(state) => state.currentViews} // Ajusta según el store
        tableName={"vesselTypes"}
        tableValue={"Name"}
        onRefinementChange={(values) =>
          handleRefinementChange("vesselType", values)
        }
      />
      <CustomRefinementList
        attribute="vessel"
        label="Vessel"
        selector={(state) => state.currentViews} // Ajusta según el store
        tableName={"vessels"}
        tableValue={"VesselName"}
        onRefinementChange={(values) =>
          handleRefinementChange("vessel", values)
        }
      />
      <CustomRefinementList
        attribute="company"
        label="Company"
        selector={(state) => state.currentViews} // Ajusta según el store
        tableName={"companies"}
        tableValue={"companyName"}
        onRefinementChange={(values) =>
          handleRefinementChange("company", values)
        }
      />
      <CustomRefinementList
        attribute="nationality"
        label="Nationality"
        selector={(state) => state.currentViews} // Ajusta según el store
        tableName={"countries"}
        tableValue={"Name"}
        onRefinementChange={(values) =>
          handleRefinementChange("nationality", values)
        }
      />
      <CustomRefinementList
        attribute="residency"
        label="Residency"
        selector={(state) => state.currentViews} // Ajusta según el store
        tableName={"countries"}
        tableValue={"Name"}
        onRefinementChange={(values) =>
          handleRefinementChange("residency", values)
        }
      />
      <CustomRefinementList
        attribute="signOffReason"
        label="Sign Off Reason"
        selector={(state) => state.currentViews} // Ajusta según el store
        tableName={"signOffReasons"}
        tableValue={"ReasonName"}
        onRefinementChange={(values) =>
          handleRefinementChange("signOffReason", values)
        }
      />
    </section>
  );
};
