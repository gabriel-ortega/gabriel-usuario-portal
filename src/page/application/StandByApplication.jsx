import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getApplication,
  setApplicationData,
  updateApplicationStage,
} from "../../store/userData";
import { useEffect } from "react";
import { LoadingState } from "../../components/skeleton/LoadingState";
import { Alert, Card } from "flowbite-react";
import { formatDate, formatTitleCase } from "../../util/helperFunctions";
import {
  HiInformationCircle,
  HiOutlineChevronRight,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi";
import { ButtonIcon, ModalYesNo } from "../../components/layoutComponents";
import statusData from "../../assets/tables/json/ApplicationStatus-static.json";

export const StandByApplication = () => {
  const { userData, myApplication } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const [versions, setVersions] = useState([{ id: 0, name: "v1" }]);
  const [latestVersion, setLatestVersion] = useState(0);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const colorBorder = (id_status) => {
    const style = "border-2 border-opacity-75 shadow-md";
    if (id_status == 1) {
      return `border-red-500 ${style}`;
    }
    if (id_status == 2) {
      return `border-purple-500 ${style}`;
    }
    if (id_status == 3) {
      return `border-green-500 ${style}`;
    }
    return "";
  };

  const closeModal = () => setIsOpenModal(false);

  useEffect(() => {
    if (myApplication?.versions) {
      setVersions(
        myApplication.versions?.map((version, index) => ({
          id: index.toString(),
          name: `v${index + 1}`,
        }))
      );
      setLatestVersion(myApplication.versions.length - 1);
    }
  }, [myApplication]);

  useEffect(() => {
    if (userData?.uid) {
      dispatch(getApplication(userData.uid));
    }
  }, [dispatch, userData?.uid]);

  const correctionFields = myApplication?.versions[latestVersion].review || {};
  const handleViewProfile = () => {
    dispatch(setApplicationData(myApplication.versions[latestVersion]));
    dispatch(updateApplicationStage(8));
  };

  const modalConfirm = () => {
    dispatch(setApplicationData(myApplication.versions[latestVersion]));
    dispatch(updateApplicationStage(8));
  };

  return (
    <div>
      {myApplication ? (
        <section className="w-full max-w-4xl mx-auto py-12 md:py-16 lg:py-20">
          <div className=" md:px-6 lg:px-8">
            <div className="grid gap-6 md:gap-8 lg:gap-10">
              {userData.recruitmentStage !== 1 ||
                (userData.recruitmentStage !== 13 && (
                  <div className="flex flex-row justify-end">
                    <button
                      onClick={handleViewProfile}
                      className="whitespace-nowrap border border-blue-300 bg-white text-blue-600 w-28 h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      View Profile
                    </button>
                  </div>
                ))}

              <div className="grid gap-6 md:grid-cols-3">
                <Card className={`${colorBorder(myApplication.status)}`}>
                  <div>Position</div>

                  <div className="space-y-2">
                    <p className="text-lg font-medium">
                      {myApplication?.versions[latestVersion].startApplication
                        ?.position[0].name || "--"}
                    </p>
                    <p className="text-muted-foreground">
                      {myApplication?.versions[latestVersion].startApplication
                        ?.department[0].name || "--"}
                    </p>
                  </div>
                </Card>
                <Card className={` ${colorBorder(myApplication.status)}`}>
                  <p className="text-l">Status</p>
                  <div className="space-y-2">
                    <p className="text-lg font-medium">
                      {myApplication.status
                        ? statusData[myApplication.status - 1].statusName
                        : "Undefined"}
                    </p>
                  </div>
                </Card>
                <Card className={`${colorBorder(myApplication.status)}`}>
                  <p className="text-l">Submission Date</p>
                  <div className="space-y-2">
                    <p className="text-lg font-medium">
                      {formatDate(myApplication.createdOn, "dd-mm-yyyy") || ""}
                      {/* {formattedDate} */}
                    </p>
                    {/* <p className="text-muted-foreground">
                      Application submitted 2 weeks ago
                    </p> */}
                  </div>
                </Card>
              </div>

              <section
                className={`${
                  myApplication.status == "3" ? "text-center" : "hidden"
                }`}
              ></section>

              <section
                className={`${myApplication.status == "2" ? "" : "hidden"}`}
              >
                <Alert color="warning" icon={HiInformationCircle}>
                  Your application has been evaluated and requires some
                  corrections.
                  <br />
                  <br />
                  <span className="font-medium">
                    The recruiting agent assigned to your application has left
                    the following comments regarding your application and the
                    necessary fields to be corrected.
                  </span>
                </Alert>
                <div className="grid gap-6 md:grid-cols-2 my-10">
                  <Card>
                    <div>Comments</div>
                    <div className="space-y-2">
                      {myApplication.versions[latestVersion].review?.comment}
                    </div>
                  </Card>
                  <Card>
                    <div>Fields</div>
                    <div className="space-y-2">
                      {Object.entries(correctionFields).map(
                        ([section, fields]) => {
                          // Filter the fields that need correction
                          const fieldsToCorrect = Object.entries(fields).filter(
                            ([fieldName, needsCorrection]) =>
                              needsCorrection === true
                          );

                          if (fieldsToCorrect.length > 0) {
                            return (
                              <div key={section}>
                                <div className="font-medium">
                                  {formatTitleCase(section)}
                                </div>
                                <ul className="list-disc pl-4">
                                  {fieldsToCorrect.map(([fieldName]) => (
                                    <li
                                      key={fieldName}
                                      className="list-inside list-disc"
                                    >
                                      {formatTitleCase(fieldName)}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          } else {
                            return null; // Skip sections with no fields to correct
                          }
                        }
                      )}
                    </div>
                  </Card>
                </div>
                <div className="flex flex-row justify-center">
                  <ButtonIcon
                    icon={<HiOutlineChevronRight className="h-5 w-5" />}
                    classnamebtn="bg-green-700 items-center mx-1 h-14 w-64"
                    label="Correction"
                    onClick={openModal}
                  />
                </div>
              </section>
            </div>
          </div>
        </section>
      ) : (
        <LoadingState />
      )}
      <ModalYesNo
        text={
          "You will now start filling your application again. Once you start this process you will need to finish it before the recruitment agent can continue reviewing your application."
        }
        textyes={"Continue"}
        disableButtonConfirm={false}
        textno={"Cancel"}
        icon={<HiOutlineQuestionMarkCircle className="w-9 h-9 m-auto" />}
        isOpen={isOpenModal}
        closeModal={closeModal}
        onConfirm={modalConfirm}
        onCancel={closeModal}
        classmodal="pt-[50%] md:pt-0"
      />
    </div>
  );
};
