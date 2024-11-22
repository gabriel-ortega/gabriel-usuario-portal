import React, { useEffect, useRef } from "react";
import { useInfiniteHits } from "react-instantsearch";
import { useNavigate } from "react-router-dom";
import { LoadingState } from "../../../../components/skeleton/LoadingState";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "flowbite-react";
import applicationStatusData from "../../../../assets/tables/json/ApplicationStatus-static.json";
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
  const { positions, departments, vesselTypes } = useSelector(
    (state) => state.currentViews
  );
  const navigate = useNavigate();

  const handleProfileLink = (uid) => {
    navigate("/reviewapplication/" + uid);
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

  return (
    <>
      <article
        title={hit.uid}
        className={`${
          hit.isRead ? "bg-white" : "bg-yellow-100"
        } border rounded-lg p-4 shadow-md bg-white hover:bg-blue-50 hover:cursor-pointer transition duration-200 max-h-56`}
        onClick={() => handleProfileLink(hit.uid)}
      >
        <section className="flex flex-row items-center gap-4">
          <div className="">
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

                {/* <div className="md:flex items-center space-x-2 hidden">
                  <HiOutlineMail className="w-4 h-4 text-muted-foreground text-zinc-400" />
                  <span className="text-sm font-light">{hit.email}</span>
                </div> */}
              </div>
              <p className="flex items-center space-x-2">
                {/* <HiOutlineUser className="w-4 h-4 text-muted-foreground text-zinc-400" /> */}
                <span className="font-bold">{hit.version || "--"}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* <Badge color="info">{hit?.isRead ? "Read" : "Not Read"}</Badge> */}
              <Badge
                color={
                  hit.status === 1
                    ? "warning"
                    : hit.status === 3
                    ? "success"
                    : hit.status === 4
                    ? "failure"
                    : hit.status === 2
                    ? "purple"
                    : "info"
                }
              >
                {hit.status
                  ? applicationStatusData[hit.status - 1].statusName
                  : "--"}
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
                    <HiOutlineIdentification className="w-4 h-4 text-muted-foreground text-zinc-400" />
                    <span className="text-sm">
                      {hit.identification
                        ? `${hit.identification}`.toUpperCase()
                        : "--"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 ">
                    <HiOutlinePhone className="w-4 h-4 text-muted-foreground text-zinc-400" />
                    <span className="text-sm">{hit.phone || "--"}</span>
                  </div>

                  {hit.secondaryPhone && (
                    <div className="flex items-center space-x-2 ">
                      <HiOutlinePhone className="w-4 h-4 text-muted-foreground text-zinc-400" />
                      <span className="text-sm">
                        {hit.secondaryPhone || "--"}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center space-x-2  ">
                    <HiOutlineCalendar className="w-4 h-4 text-muted-foreground text-zinc-400" />
                    <span className="text-sm">
                      {hit.applicationDate
                        ? formatDate(
                            unixToYyyyMmDd(hit.applicationDate),
                            "mm-dd-yyyy"
                          )
                        : "--"}
                    </span>
                  </div>
                </div>
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

export function ApplicationsInfiniteHits({ ...props }) {
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
