import { Alert, Card } from "flowbite-react";
import { ButtonIcon } from "./ButtonIcon";
import { LoadingState } from "../skeleton/LoadingState";
import { HiInformationCircle, HiOutlineChevronRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import stagesData from "../../assets/tables/json/RecruitmentStage-static.json";

export const RecruitmentCard = () => {
  const { userData, applicationStage } = useSelector((state) => state.userData);
  const stageText = {
    1: "Creating Application: Desired Position",
    2: "Creating Application: Profile",
    3: "Creating Application: Documents",
    4: "Creating Application: Certificates",
    5: "Creating Application: Experience",
    6: "Creating Application: Ready to Submit",
    7: "Application Submitted",
    8: "Correcting Application",
  };
  const stageColors = {
    1: "bg-yellow-300",
    2: "bg-yellow-300",
    3: "bg-yellow-300",
    4: "bg-yellow-300",
    5: "bg-yellow-300",
    6: "bg-yellow-300",
    7: "bg-green-500",
    8: "bg-yellow-300",
  };
  return (
    <Card className="w-full max-w-sm">
      <p className="text-lg font-semibold">Recruitment Process</p>
      <hr className="border-gray-300" />

      {userData ? (
        applicationStage < 2 ? (
          <>
            <Alert color={"warning"} rounded icon={HiInformationCircle}>
              <span className="font-medium">
                You have not yet started your Application Process.
              </span>
            </Alert>
            <div className="flex justify-end">
              <ButtonIcon
                icon={<HiOutlineChevronRight className="h-5 w-5" />}
                classnamebtn="bg-[#010064]"
                label={"Start a Recruitment Process"}
                link={"/application"}
              />
            </div>
          </>
        ) : (
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">
                  Recruitment Department
                </div>
                <div className="font-medium">
                  {userData.applicationData.startApplication.vesselType[0]
                    .name || "--"}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Position</div>
                <div className="font-medium">
                  {userData.applicationData.startApplication.position[0].name ||
                    "--"}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Status</div>
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-2 w-2 rounded-full ${
                      stageColors[applicationStage] || "bg-gray-500"
                    }`}
                  />
                  <div className="font-medium">
                    {userData.recruitmentStage !== 1
                      ? stagesData[userData.recruitmentStage - 1]?.StageName
                      : stageText[applicationStage] || "--"}
                  </div>
                </div>
              </div>
              {userData.recruitmentStage == 1 && (
                <div>
                  <div className="text-sm text-muted-foreground">Next Step</div>
                  <div className="font-medium">
                    {applicationStage > 6
                      ? "--"
                      : stageText[applicationStage + 1]}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end ">
              <ButtonIcon
                icon={<HiOutlineChevronRight className="h-5 w-5" />}
                classnamebtn="bg-[#010064]"
                label={
                  userData.recruitmentStage !== 1
                    ? "View Progress"
                    : applicationStage > 7
                    ? "View Details"
                    : "Continue"
                }
                link={"/application"}
              />
            </div>
          </div>
        )
      ) : (
        <LoadingState />
      )}
    </Card>
  );
};
