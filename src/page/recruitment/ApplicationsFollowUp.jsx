import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingState } from "../../components/skeleton/LoadingState";
import { Badge, Table } from "flowbite-react";
import { formatDate } from "../../util/helperFunctions";
import { applicationsFollowUp } from "../../util/services";
import { useEffect } from "react";

const applicationStages = [
  { id: 1, name: "Position/Department selection" },
  { id: 2, name: "Profile Data" },
  { id: 3, name: "Documents" },
  { id: 4, name: "Certificates" },
  { id: 5, name: "Experience & Skills" },
  { id: 6, name: "Review" },
];

export const ApplicationsFollowUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loadingVar, setLoadingVar] = useState(false);

  const loadResults = async () => {
    try {
      const applicationsData = await applicationsFollowUp();
      setApplications(applicationsData);
      //   console.log(applicationsData);
      setLoadingVar(false);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  const handleProfileLink = (updateData, id) => {
    // dispatch(setProfileUpdateData({}));
    // dispatch(setProfileView({}));
    // navigate("/reviewupdate/" + id);
  };

  useEffect(() => {
    setLoadingVar(true);
    loadResults();
  }, []);
  return (
    <section>
      <div className="px-8 py-4">
        <div className="overflow-x-auto ">
          {loadingVar ? (
            <LoadingState />
          ) : (
            <Table hoverable className="">
              <Table.Head>
                {/* <Table.HeadCell>Actions</Table.HeadCell> */}
                <Table.HeadCell>Application Status</Table.HeadCell>
                <Table.HeadCell>Application Stage</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Creation Date</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y cursor-pointer">
                {applications
                  .filter((application) => application.role == 3)
                  .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
                  .map((application, index) => {
                    return (
                      <Table.Row
                        key={index}
                        className={``}
                        onClick={() =>
                          handleProfileLink(application, application.id)
                        }
                        title={application.id}
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          <Badge color={"info"}>{"Not submitted"}</Badge>
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          {applicationStages.find(
                            (item) => item.id == application.applicationStage
                          )?.name || "--"}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          {application.firstName ||
                            application.applicationData?.applicationProfile
                              ?.profile?.firstName ||
                            "--"}{" "}
                          {application.lastName ||
                            application.applicationData?.applicationProfile
                              ?.profile?.lastName ||
                            "--"}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          {formatDate(application.createdOn, "mm-dd-yyyy") ||
                            "--"}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          {application.email || "--"}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          {application.id || "--"}
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
              </Table.Body>
            </Table>
          )}
        </div>
      </div>
    </section>
  );
};
