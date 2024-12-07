import { Table } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getApplicationByUid,
  setApplicationData,
} from "../../../../store/userData";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { setApplicationView } from "../../../../store/currentViews/viewSlice";
import { formatDate } from "../../../../util/helperFunctions";
import { useNavigate } from "react-router-dom";
import applicationStatus from "../../../../assets/tables/json/ApplicationStatus-static.json";

export const ApplicationsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { application } = useSelector((state) => state.currentViews);
  const [hasApp, SethasApp] = useState(false);

  const load = async () => {
    const applicantions = await dispatch(getApplicationByUid(id, true));
    SethasApp(applicantions);
  };

  useEffect(() => {
    if (application?.uid !== id || !application?.uid) {
      dispatch(setApplicationView({}));
      load();
    } else {
      SethasApp(true);
    }
  }, []);

  const handleApplicationLink = (selectedData) => {
    // dispatch(setApplicationData(selectedData));
    navigate("/reviewapplication/" + application.id);
  };

  return (
    <section className="">
      <div className="mb-3 flex flex-col gap-2 text-gray-500 sm:flex-row sm:space-x-4 text-sm">
        <span>
          Submitted on:{" "}
          <span className="font-bold">
            {application?.createdOn
              ? formatDate(application?.createdOn, "dd-mm-yyyy")
              : "--"}
          </span>
        </span>
        <span>
          Last modified:{" "}
          <span className="font-bold">
            {application?.modifiedDate
              ? formatDate(application?.modifiedDate, "dd-mm-yyyy")
              : "--"}
          </span>
        </span>
        <span>
          Status:{" "}
          <span className="font-bold">
            {application?.status
              ? applicationStatus[application?.status - 1].statusName
              : "--"}
          </span>
        </span>
      </div>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Version</Table.HeadCell>
            <Table.HeadCell>Recruitment Department</Table.HeadCell>
            <Table.HeadCell>Department</Table.HeadCell>
            <Table.HeadCell>Position</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y cursor-pointer">
            {!hasApp ? (
              <Table.Row>
                <Table.Cell className="whitespace-nowrap">{"--"}</Table.Cell>
                <Table.Cell className="whitespace-nowrap">{"--"}</Table.Cell>
                <Table.Cell className="whitespace-nowrap">{"--"}</Table.Cell>
                <Table.Cell className="whitespace-nowrap">{"--"}</Table.Cell>
              </Table.Row>
            ) : (
              application.versions.map((version, index) => {
                return (
                  <Table.Row
                    key={index}
                    onClick={() => handleApplicationLink(version)}
                  >
                    <Table.Cell className="whitespace-nowrap">
                      {index + 1 || "--"}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {version.startApplication?.vesselType?.[0]?.name || "--"}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {version.startApplication?.department?.[0]?.name || "--"}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {version.startApplication?.position?.[0]?.name || "--"}
                    </Table.Cell>
                  </Table.Row>
                );
              })
            )}
          </Table.Body>
        </Table>
      </div>
    </section>
  );
};

export default ApplicationsView;
