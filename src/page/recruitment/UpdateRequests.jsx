import { Badge, Table } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../util/helperFunctions";
import { LoadingState } from "../../components/skeleton/LoadingState";
import { fetchProfileUpdatesBatch } from "../../util/services";
import { useEffect } from "react";
import applicationStatusData from "../../assets/tables/json/ApplicationStatus-static.json";
import { setProfileUpdateData } from "../../store/currentViews/viewSlice";
import { getSeafarerData } from "../../store/userData";

export const UpdateRequests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [valueFilter, setValueFilter] = useState({
    department: "",
  });
  const [applications, setApplications] = useState([]);
  const [loadingVar, setLoadingVar] = useState(true);

  const [dataPagination, setDataPagination] = useState();

  const handleProfileLink = (updateData, id) => {
    dispatch(setProfileUpdateData(updateData));
    dispatch(getSeafarerData(updateData.uid));
    navigate("/reviewupdate/" + id);
  };

  const loadResults = async () => {
    try {
      const applicationsData = await fetchProfileUpdatesBatch();
      setApplications(applicationsData.data);
      setLoadingVar(false);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };
  useEffect(() => {
    setLoadingVar(true);
    loadResults();
  }, []);
  return (
    <div>
      <h1 className=" pl-3 md:pl-5 pt-5 text-lg md:text-lg pb-4 text-black font-bold">
        Profile Update Requests
      </h1>
      <div className="px-8">
        <div className="overflow-x-auto ">
          {loadingVar ? (
            <LoadingState />
          ) : (
            <Table hoverable className="hidden md:block">
              <Table.Head>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Submission Date</Table.HeadCell>
                <Table.HeadCell>Recruitment Dept.</Table.HeadCell>
                <Table.HeadCell>Department</Table.HeadCell>
                <Table.HeadCell>Position</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y cursor-pointer">
                {applications.map((application, index) => {
                  return (
                    <Table.Row
                      key={index}
                      className={`${
                        application.isRead ? "bg-white" : "bg-yellow-100"
                      } dark:border-gray-700 dark:bg-gray-800`}
                      onClick={() =>
                        handleProfileLink(application, application.id)
                      }
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {application?.status ? (
                          <Badge
                            color={
                              application?.status === 1
                                ? "warning"
                                : application?.status === 3
                                ? "success"
                                : application?.status === 4
                                ? "failure"
                                : application?.status === 2
                                ? "purple"
                                : "info"
                            }
                          >
                            {application?.status
                              ? applicationStatusData[application?.status - 1]
                                  .statusName
                              : "--"}
                          </Badge>
                        ) : (
                          "--"
                        )}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {application.seafarerData?.seafarerProfile?.profile
                          .firstName || "--"}{" "}
                        {application.seafarerData?.seafarerProfile?.profile
                          .lastName || "--"}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {formatDate(application.createdOn, "yyyy-mm-dd") ||
                          "--"}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {application.seafarerData?.vesselType[0]?.name || "--"}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {application.seafarerData?.department[0]?.name || "--"}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {application.seafarerData?.position[0]?.name || "--"}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateRequests;
