import React from "react";
import { Highlight, Hits, InfiniteHits, useHits } from "react-instantsearch";
import stageData from "../../assets/tables/json/RecruitmentStage-static.json";
import { Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingState } from "../skeleton/LoadingState";

// Componente Hit
function Hit({ hit, toggleHits }) {
  const { positions, departments, vesselTypes } = useSelector(
    (state) => state.currentViews
  );
  const navigate = useNavigate();

  const handleProfileLink = (uid) => {
    toggleHits();
    navigate("/profile/" + uid);
  };
  let currentArray = [];

  //get tables values
  const getPositionName = (id) => {
    if (id == 1) return "N/A";
    const item = positions.find((entry) => entry.Id == id);
    return item ? item.PositionName || item.Id || id : id; // Ajustar clave según tu estructura
  };
  const getDepartmentName = (id) => {
    if (id == 1) return "N/A";
    const item = departments.find((entry) => entry.Id == id);
    return item ? item.DepartmentName || item.Id || id : id; // Ajustar clave según tu estructura
  };
  const getVesselTypeName = (id) => {
    const item = vesselTypes.find((entry) => entry.Id == id);
    return item ? item.Name || item.Id || id : id; // Ajustar clave según tu estructura
  };

  return (
    <>
      {!positions && !departments && !vesselTypes ? (
        <LoadingState />
      ) : (
        <article
          title={hit.uid}
          className="border rounded-lg p-4 shadow-md bg-white hover:bg-blue-50 hover:cursor-pointer transition duration-200"
          onClick={() => handleProfileLink(hit.uid)}
        >
          <section className="flex items-center">
            <div className="mr-4 flex items-center bg-primary">
              <Avatar
                className="text-primary-foreground"
                rounded
                img={hit?.photoURL}
                placeholderInitials=""
              />
            </div>
            <div className="flex-col flex-1 space-y-1">
              <div className="flex flex-row gap-3 items-center">
                <p className="text-sm font-semibold leading-none">
                  {hit?.firstName || hit?.lastName
                    ? `${hit?.firstName} ${hit?.lastName}`.toUpperCase()
                    : hit?.displayName
                    ? hit?.displayName.toUpperCase()
                    : "--".toUpperCase()}
                </p>
                <p className="ml-auto font-light text-sm">{`LOGISTIC ID: ${
                  hit.logisticId || "--"
                }`}</p>
              </div>

              <p className="text-xs text-muted-foreground ">
                {vesselTypes && hit?.vesselType
                  ? getVesselTypeName(hit?.vesselType)
                  : "--"}
                {/* {hit?.vesselType ? hit?.vesselType : "--"} */}
              </p>
              <p className="text-xs text-muted-foreground ">
                {positions && hit?.position
                  ? getPositionName(hit?.position)
                  : "--"}
                {/* {hit?.position ? hit?.position : "--"} */}
              </p>
              <p className="text-xs text-muted-foreground font-light">
                {departments && hit?.department
                  ? getDepartmentName(hit?.department)
                  : "--"}
                {/* {hit?.department ? hit?.department : "--"} */}
              </p>
              <section className="flex flex-cols-2 items-center">
                <p className="text-xs text-muted-foreground font-medium">
                  {hit?.recruitmentStage
                    ? stageData.find(
                        (stage) => stage.Id == hit?.recruitmentStage
                      )?.StageName
                    : "--"}
                </p>
              </section>
              <p className="sm:hidden md:block text-gray-600 font-light italic">
                {hit.email}
              </p>
            </div>
          </section>
        </article>
      )}
    </>
  );
}

// Componente CustomHits
export const CustomHits = ({ toggleHits, usableData }) => {
  // const { positions, departments, typeOfVessel } = usableData;
  return (
    <InfiniteHits
      hitComponent={(props) => (
        <Hit
          {...props}
          toggleHits={toggleHits}
          // positions={positions}
          // departments={departments}
          // typeOfVessel={typeOfVessel}
        />
      )}
      classNames={{
        root: "p-4 bg-gray-100 rounded-md shadow-md",
        list: "space-y-2 text-sm",
      }}
    />
  );
};
