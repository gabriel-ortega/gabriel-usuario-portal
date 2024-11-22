import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Avatar, Badge, Card, Pagination, Table } from "flowbite-react";
import { fetchApplicationsData } from "../../util/services";
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

export default function ProfileUpdateRequest() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.userData);

  const [currentPage, setCurrentPage] = useState(1);
  const [applications, setApplications] = useState([]);

  const [dataPagination, setDataPagination] = useState();

  const [dataFilter, setDataFilter] = useState();

  const handleProfileLink = (applicationData, applicationDataLatest, uid) => {
    if (!applicationData.isRead) {
      const updatedApplication = { ...applicationData, isRead: true };
      dispatch(updateApplicationSent(uid, updatedApplication));
      dispatch(setApplicationView(updatedApplication));
      dispatch(setApplicationData(applicationDataLatest));
      navigate("/reviewapplication/" + uid);
    } else {
      dispatch(setApplicationView(applicationData));
      dispatch(setApplicationData(applicationDataLatest));
      navigate("/reviewapplication/" + uid);
    }
  };

  const loadResults = async () => {
    try {
      const applicationsData = await fetchApplicationsData();
      console.log(applicationsData);
      setApplications(applicationsData);
      setDataFilter(applicationsData);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  useEffect(() => {
    dispatch(setLoading(true));
    loadResults();
    dispatch(setLoading(false));
  }, []);

  useEffect(() => {
    if (dataFilter) {
      let pagination = paginate(dataFilter, 1, currentPage);
      setDataPagination(pagination.paginatedItems);
      // console.log(`Total de páginas: ${pagination.totalPages}`);
    }
  }, [dataFilter, currentPage]);

  const onPageChange = (page) => setCurrentPage(page);

  function paginate(array, itemsPerPage, currentPage) {
    const totalPages = Math.ceil(array.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = array.slice(startIndex, endIndex);

    return {
      currentPage,
      totalPages,
      paginatedItems,
    };
  }

  return (
    <>
      <h1 className=" pl-3 md:pl-5 pt-5 text-lg md:text-lg pb-4 text-black font-bold">
        Profile Update Resquest
      </h1>
      <section className="">
        <div className="px-8">
          <div className="overflow-x-auto ">
            {isLoading === true ? (
              <LoadingState />
            ) : (
              <Table hoverable className="hidden md:block">
                <Table.Head>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Version</Table.HeadCell>
                  <Table.HeadCell>Submission Date</Table.HeadCell>
                  <Table.HeadCell>Modified Date</Table.HeadCell>
                  <Table.HeadCell>Recruitment Dept.</Table.HeadCell>
                  <Table.HeadCell>Department</Table.HeadCell>
                  <Table.HeadCell>Position</Table.HeadCell>
                  <Table.HeadCell>Phone</Table.HeadCell>
                  <Table.HeadCell>Nationality</Table.HeadCell>
                  <Table.HeadCell>Residency</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y cursor-pointer">
                  {applications.map((application, index) => {
                    const latestVersion =
                      application.applicationData.versions.length - 1;
                    return (
                      <Table.Row
                        key={index}
                        className={`${
                          application.applicationData?.isRead
                            ? "bg-white"
                            : "bg-yellow-100"
                        } dark:border-gray-700 dark:bg-gray-800`}
                        onClick={() =>
                          handleProfileLink(
                            application.applicationData,
                            application.applicationData.versions[latestVersion],
                            application.applicationData.uid
                          )
                        }
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {application?.applicationData.status ? (
                            <Badge
                              color={
                                application?.applicationData.status === 1
                                  ? "warning"
                                  : application?.applicationData.status === 3
                                  ? "success"
                                  : application?.applicationData.status === 4
                                  ? "failure"
                                  : application?.applicationData.status === 2
                                  ? "purple"
                                  : "info"
                              }
                            >
                              {application?.applicationData.status
                                ? applicationStatusData[
                                    application?.applicationData.status - 1
                                  ].statusName
                                : "--"}
                            </Badge>
                          ) : (
                            "--"
                          )}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          {application.applicationData.versions[latestVersion]
                            ?.applicationProfile.profile.firstName || "--"}{" "}
                          {application.applicationData.versions[latestVersion]
                            ?.applicationProfile.profile.lastName || "--"}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {`v${latestVersion + 1}` || "--"}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          {formatDate(
                            application.applicationData.createdOn,
                            "yyyy-mm-dd"
                          ) || "--"}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          {application.applicationData.modifiedDate
                            ? formatDate(
                                application.applicationData.modifiedDate,
                                "yyyy-mm-dd"
                              )
                            : "--" || "--"}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          {application.applicationData.versions[latestVersion]
                            ?.startApplication.vesselType[0].name || "--"}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          {application.applicationData.versions[latestVersion]
                            ?.startApplication.department[0].name || "--"}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          {application.applicationData.versions[latestVersion]
                            ?.startApplication.position[0].name || "--"}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          {application.applicationData.versions[latestVersion]
                            ?.applicationProfile.profile.phone.value || "--"}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          {application.applicationData.versions[latestVersion]
                            ?.applicationProfile.profile.countryBirth
                            .CountryName || "--"}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          {application.applicationData.versions[latestVersion]
                            ?.applicationProfile.profile.countryResidency
                            .CountryName || "--"}
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            )}
          </div>
        </div>
        <div className="space-y-4 px-2 md:hidden">
          {applications.map((application, index) => {
            const latestVersion =
              application?.applicationData?.versions?.length - 1;
            return (
              <Card
                key={index}
                className={`${
                  application.applicationData?.isRead
                    ? "bg-white"
                    : "bg-yellow-100"
                } dark:border-gray-700 dark:bg-gray-800 cursor-pointer`}
                onClick={() =>
                  handleProfileLink(
                    application.applicationData,
                    application.applicationData.versions[latestVersion],
                    application.applicationData.uid
                  )
                }
              >
                <section className="flex items-center">
                  <div className="mr-4 flex items-center  bg-primary">
                    <Avatar
                      className="text-primary-foreground"
                      rounded
                      // size="md"
                      img={
                        application.applicationData.versions[latestVersion]
                          ?.photoURL
                      }
                    />
                  </div>
                  <div className="flex-col flex-1 space-y-1">
                    <p className="text-sm font-semibold leading-none">
                      {application.applicationData.versions[latestVersion]
                        ?.applicationProfile.profile.firstName || "--"}{" "}
                      {application.applicationData.versions[latestVersion]
                        ?.applicationProfile.profile.lastName || "--"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {application.applicationData.versions[latestVersion]
                        ?.startApplication.vesselType[0].name || "--"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {application.applicationData.versions[latestVersion]
                        ?.startApplication.position[0].name || "--"}
                    </p>
                    <section className="flex flex-cols-2 items-center">
                      <p className="text-sm font-medium">
                        {application?.applicationData.status ? (
                          <Badge
                            color={
                              application?.applicationData.status === 1
                                ? "warning"
                                : application?.applicationData.status === 3
                                ? "success"
                                : application?.applicationData.status === 4
                                ? "failure"
                                : application?.applicationData.status === 2
                                ? "purple"
                                : "info"
                            }
                          >
                            {application?.applicationData.status
                              ? applicationStatusData[
                                  application?.applicationData.status - 1
                                ].statusName
                              : "--"}
                          </Badge>
                        ) : (
                          "--"
                        )}
                      </p>
                      <p className="ml-auto font-light">
                        {`v${latestVersion + 1}` || "--"}
                      </p>
                    </section>
                  </div>
                </section>
              </Card>
            );
          })}
        </div>
        <div className="flex overflow-x-auto justify-center mt-2">
          <Pagination
            currentPage={currentPage}
            totalPages={3}
            // onPageChange={onPageChange}
          />
        </div>
      </section>
    </>
  );
}
