import React, { useEffect, useRef } from "react";
import { useInfiniteHits } from "react-instantsearch";
import { useNavigate } from "react-router-dom";
import { LoadingState } from "../../../../components/skeleton/LoadingState";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "flowbite-react";
import stageData from "../../../../assets/tables/json/RecruitmentStage-static.json";
import countries from "../../../../assets/tables/json/Countries.json";
import avatar from "../../../../assets/imagenes/avatar.webp";
import {
  HiBriefcase,
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineFlag,
  HiOutlineIdentification,
  HiOutlineMail,
  HiOutlineMap,
  HiOutlineOfficeBuilding,
  HiOutlinePhone,
  HiOutlineUser,
} from "react-icons/hi";
import { formatDate } from "../../../../util/helperFunctions";
import { RiShipLine } from "react-icons/ri";

function unixToYyyyMmDd(unixTimestamp) {
  // Crear un objeto Date desde el Unix timestamp
  const date = new Date(unixTimestamp * 1000); // Multiplicar por 1000 para convertir a milisegundos
  // Formatear la fecha a yyyy-mm-dd
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Mes es 0 indexado
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function Hit({ hit, toggleHits }) {
  const { positions, departments, vesselTypes, companies } = useSelector(
    (state) => state.currentViews
  );
  const navigate = useNavigate();

  const handleContractLink = (id) => {
    // Dispatch con el objeto modificado
    // const cleanUid = id.replace("hiringsIndex/", "");
    // // console.log(id);
    navigate("/contract/" + id);
  };
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
  const getCompanyName = (id) => {
    const item = companies.find((entry) => entry.Id == id);
    return item ? item.CompanyName || item.Id || id : id; // Ajustar clave según tu estructura
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 4:
        return "info";
      case 5:
        return "warning";
      case 6:
        return "warning";
      case 19:
        return "green";
      case 20:
        return "info";
      case 21:
        return "pink";
      case 22:
        return "red";
      case 23:
        return "red";
      case 24:
        return "red";
      case 25:
        return "red";
      case 26:
        return "red";
      default:
        return "red"; // Default color
    }
  };

  return (
    <>
      <article
        title={hit.uid}
        className="border rounded-lg p-4 shadow-md bg-white hover:bg-blue-50 hover:cursor-pointer transition duration-200 max-h-56"
        onClick={() => handleContractLink(hit.id)}
      >
        <section className="flex flex-row items-center gap-4">
          <div className="min-w-36">
            {/* <img
              src={hit?.photoURL }
              className="hidden md:block size-32 rounded-lg object-cover"
            /> */}
            <Avatar
              img={hit?.photoURL}
              size={"xl"}
              className="hidden md:block rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-row gap-3 items-center justify-between">
              <div className="flex gap-3 items-center">
                <p className="text-sm font-bold leading-none">
                  {hit?.firstName || hit?.lastName
                    ? `${hit?.firstName} ${hit?.lastName}`.toUpperCase()
                    : hit?.displayName
                    ? hit?.displayName.toUpperCase()
                    : "--".toUpperCase()}
                </p>

                <div className="md:flex items-center space-x-2 hidden">
                  <RiShipLine className="w-4 h-4 text-muted-foreground text-zinc-400" />
                  <span className="text-sm font-light">
                    {companies && hit?.company
                      ? getCompanyName(hit?.company)
                      : "--"}
                  </span>
                  <span className="text-sm font-light">
                    {hit?.employeeNumber || "--"}
                  </span>
                </div>
              </div>
              <p className="flex items-center space-x-2">
                {/* <span className="font-light">LOGISTIC ID: </span> */}
                <HiOutlineUser className="w-4 h-4 text-muted-foreground text-zinc-400" />
                <span className="font-bold">{hit.logisticId || "--"}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge color={getStatusColor(hit?.recruitmentStage)}>
                {hit?.recruitmentStage
                  ? stageData[hit.recruitmentStage - 1]?.StageName
                  : "--"}
              </Badge>
              <Badge color={hit?.status == 1 ? "green" : "red"}>
                {hit?.status == 1 ? "Active" : "Inactive"}
              </Badge>
            </div>
            <div className="flex flex-row justify-between p-2">
              {/* Grid para la posicion */}
              <div className="flex flex-col gap-2 ">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold">
                    {vesselTypes && hit?.vesselType
                      ? getVesselTypeName(hit?.vesselType)
                      : "--"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-zinc-500">
                    {positions && hit?.position
                      ? getPositionName(hit?.position)
                      : "--"}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-zinc-500">
                  <span className="text-sm">
                    {positions && hit?.department
                      ? getDepartmentName(hit?.department)
                      : "--"}
                  </span>
                </div>
              </div>

              {/* Grid para los campos */}
              <div className="hidden md:flex md:flex-row gap-5">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center space-x-2 ">
                    <HiOutlineFlag className="w-4 h-4 text-muted-foreground text-zinc-400" />
                    <span className="text-sm">
                      {countries.find((entry) => entry.Id == hit.nationality)
                        ?.CountryName || "--"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 ">
                    <HiOutlineMap className="w-4 h-4 text-muted-foreground text-zinc-400" />
                    <span className="text-sm">
                      {countries.find((entry) => entry.Id == hit.residency)
                        ?.CountryName || "--"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}

export function HiringsInfiniteHits({ ...props }) {
  const { hits, isLastPage, showMore } = useInfiniteHits(props);
  const sentinelRef = useRef(null);
  const { positions, departments, vesselTypes } = useSelector(
    (state) => state.currentViews
  );

  useEffect(() => {
    if (sentinelRef.current !== null) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLastPage) {
            showMore();
          }
        });
      });

      observer.observe(sentinelRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [isLastPage, showMore]);

  return (
    <div className="ais-InfiniteHits">
      <ul className="ais-InfiniteHits-list">
        {!positions && !departments && !vesselTypes ? (
          <LoadingState />
        ) : (
          <>
            {hits.map((hit) => (
              <li key={hit.objectID} className="ais-InfiniteHits-item my-3">
                <Hit hit={hit} />
              </li>
            ))}
            <li
              className="ais-InfiniteHits-sentinel"
              ref={sentinelRef}
              aria-hidden="true"
            />
          </>
        )}
      </ul>
    </div>
  );
}
