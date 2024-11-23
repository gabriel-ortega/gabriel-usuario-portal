import React from "react";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import {
  HiArrowNarrowRight,
  HiCalendar,
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getSeafarerData } from "../../store/userData";
import { Button, Modal, Progress, Timeline } from "flowbite-react";
import stagesData from "../../assets/tables/json/RecruitmentStage-static.json";
import { formatDate } from "../../util/helperFunctions";
import { LoadingState } from "../../components/skeleton/LoadingState";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ApplicantProcessView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData, isSaving } = useSelector((state) => state.userData);
  const [isLoading, setIsLoading] = useState(true);
  const { hirings, profile, currentHiring, currentEmbark, embarks } =
    useSelector((state) => state.currentViews);
  const [openModalWarning, setOpenModalWarning] = useState(false);
  useEffect(() => {
    dispatch(getSeafarerData(userData.uid));
    setIsLoading(false);
  }, []);

  const getStageIcon = (status) => {
    if (status == true)
      return <FaCheckCircle className="h-5 w-5 text-green-500" />;
    if (status == false)
      return <HiOutlineClock className="h-5 w-5 text-yellow-500" />;
    return <IoAlertCircleOutline className="h-5 w-5 text-gray-400" />;
  };

  const getDocumentStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "verified":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "not submitted":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="w-full mx-auto px-4 py-8">
      <div className="">
        {/* Left Column */}
        <div className="space-y-8 p-6 ">
          <div className="flex justify-end mb-2">
            <Button
              color="failure"
              onClick={() => {
                setOpenModalWarning(true);
              }}
            >
              Retire from the Application Process
            </Button>
          </div>
          <div>
            <h3 className="text-black text-center font-bold text-2xl mb-4">
              Application Details
            </h3>
            <div className="flex items-center gap-2 justify-center">
              <HiOutlineClipboardList className="h-5 w-5 text-gray-500" />
              <span className="text-base font-medium">
                <span className="text-zinc-400 font-light">
                  Current Stage:{" "}
                </span>
                {profile.recruitmentStage
                  ? stagesData.find(
                      (item) => item.Id == profile.recruitmentStage
                    )?.StageName
                  : "--"}
              </span>
            </div>
          </div>
          {isLoading ? (
            <LoadingState />
          ) : (
            <>
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Recruitment Progress
                </h3>
                <Progress
                  progress={
                    profile.recruitmentStage === 2 ||
                    profile.recruitmentStage === undefined
                      ? "0"
                      : profile.recruitmentStage === 3
                      ? "25"
                      : profile.recruitmentStage === 4
                      ? "50"
                      : profile.recruitmentStage === 5
                      ? "75"
                      : "100"
                  }
                  label="Application Progress"
                  className="w-full mb-4"
                />
                <div className="space-y-5">
                  <Timeline>
                    <Timeline.Item>
                      <Timeline.Point />
                      <Timeline.Content>
                        <Timeline.Time>
                          Applied On:{" "}
                          {formatDate(
                            profile?.seafarerData?.applicationDate || "",
                            "dddd, mmmm dd yyyy"
                          )}
                        </Timeline.Time>
                        <Timeline.Title className="flex flex-row gap-3 items-center">
                          <span>{getStageIcon(true)}</span>
                          Application
                        </Timeline.Title>
                        <Timeline.Body>
                          This is where your journey begins! In this stage,
                          you'll submit your application and initial documents
                          for the position you're interested in. It’s your
                          chance to make a great first impression.
                        </Timeline.Body>
                      </Timeline.Content>
                    </Timeline.Item>
                    <Timeline.Item>
                      <Timeline.Point />
                      <Timeline.Content>
                        <Timeline.Time>
                          {profile.firstInterview
                            ? `${
                                profile.firstInterview.date
                                  ? formatDate(
                                      profile.firstInterview.date,
                                      "dddd, mmmm dd yyyy"
                                    )
                                  : "No date available"
                              } - ${
                                profile.firstInterview.status || "No status"
                              }`
                            : ""}
                        </Timeline.Time>
                        <Timeline.Title className="flex flex-row gap-3 items-center">
                          <span>
                            {getStageIcon(
                              userData.recruitmentStage == 2 ||
                                userData.recruitmentStage > 2
                            )}
                          </span>
                          First Interveiew
                        </Timeline.Title>
                        <Timeline.Body>
                          If your application is selected, you'll move on to a
                          pre-screening interview. During this step, we’ll
                          discuss your background, basic skills, and overall fit
                          for the role.
                        </Timeline.Body>
                        {profile.firstInterview?.status == "Pending" && (
                          <Button color="gray">
                            Book an Interview
                            <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                          </Button>
                        )}
                      </Timeline.Content>
                    </Timeline.Item>
                    <Timeline.Item>
                      <Timeline.Point />
                      <Timeline.Content>
                        <Timeline.Time>
                          {" "}
                          {profile.secondInterview
                            ? `${
                                profile.firstInterview.date
                                  ? formatDate(
                                      profile.secondInterview.date,
                                      "dddd, mmmm dd yyyy"
                                    )
                                  : "No date available"
                              } - ${
                                profile.secondInterview.status || "No status"
                              }`
                            : ""}
                        </Timeline.Time>
                        <Timeline.Title className="flex flex-row gap-3 items-center">
                          <span>
                            {getStageIcon(
                              userData.recruitmentStage == 3 ||
                                userData.recruitmentStage > 3
                            )}
                          </span>
                          Second Interview
                        </Timeline.Title>
                        <Timeline.Body>
                          Congratulations on making it this far! In this phase,
                          we’ll dive deeper into your technical knowledge and
                          specific skills. You might answer job-specific
                          questions or complete practical assessments.
                        </Timeline.Body>
                        {profile.secondInterview?.status == "Pending" && (
                          <Button color="gray">
                            Book an Interview
                            <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                          </Button>
                        )}
                      </Timeline.Content>
                    </Timeline.Item>
                    <Timeline.Item>
                      <Timeline.Point />
                      <Timeline.Content>
                        <Timeline.Time></Timeline.Time>
                        <Timeline.Title className="flex flex-row gap-3 items-center">
                          <span>
                            {getStageIcon(
                              userData.recruitmentStage == 5 ||
                                userData.recruitmentStage == 6 ||
                                userData.recruitmentStage == 17 ||
                                userData.recruitmentStage == 20 ||
                                userData.recruitmentStage == 21
                            )}
                          </span>
                          Hiring Contract
                        </Timeline.Title>
                        <Timeline.Body>
                          Once you've been selected, you'll sign a formal
                          contract with the company. This document outlines all
                          the terms and conditions of your employment. You’re
                          almost there!
                        </Timeline.Body>
                        <Button
                          color="gray"
                          onClick={() => navigate("/myhiring")}
                        >
                          See my contracts
                          <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </Timeline.Content>
                    </Timeline.Item>
                    <Timeline.Item>
                      <Timeline.Point />
                      <Timeline.Content>
                        <Timeline.Time></Timeline.Time>
                        <Timeline.Title className="flex flex-row gap-3 items-center">
                          <span>
                            {getStageIcon(
                              userData.recruitmentStage == 5 ||
                                userData.recruitmentStage == 6 ||
                                userData.recruitmentStage == 17 ||
                                userData.recruitmentStage == 20 ||
                                userData.recruitmentStage == 21
                                ? true
                                : null
                            )}
                          </span>
                          Embarkation
                        </Timeline.Title>
                        <Timeline.Body>
                          This is the final stage where you officially join the
                          team! We’ll take care of all the necessary steps to
                          get you started in your new role, including onboarding
                          and logistical preparations. Welcome aboard!
                        </Timeline.Body>
                        <Button
                          color="gray"
                          onClick={() => navigate("/myembarks")}
                        >
                          See my embarks
                          <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </Timeline.Content>
                    </Timeline.Item>
                  </Timeline>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Recruiter Notes</h3>
                {/* <p className="text-sm text-gray-500">{profile.notes}</p> */}
              </div>
            </>
          )}
        </div>
      </div>
      <Modal
        show={openModalWarning}
        size="md"
        onClose={() => setOpenModalWarning(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {
                "Are you sure that you want to Retire from the Application Process?"
              }
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={() => setOpenModalWarning(false)}>
                Cancel
              </Button>
              <Button
                color="failure"
                onClick={() => {
                  setOpenModalWarning(false);
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
