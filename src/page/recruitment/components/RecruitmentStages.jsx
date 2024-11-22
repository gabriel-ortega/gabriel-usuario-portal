import { Card, Sidebar } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { SelectComponents } from "../../../components/layoutComponents";
import { lazy } from "react";
import { Suspense } from "react";
import { LoadingState } from "../../../components/skeleton/LoadingState";
import { useEffect } from "react";
import { getInterviewers } from "../../../util/services";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setInterviewers } from "../../../store/currentViews/viewSlice";
import notFound from "../../../assets/imagenes/notFound.gif";
const ApplicationsView = lazy(() =>
  import("./stages components/ApplicationsView")
);
const FirstInterviewView = lazy(() =>
  import("./stages components/FirstInterviewView")
);
const SecondInterviewView = lazy(() =>
  import("./stages components/SecondInterviewView")
);
const SeafarerHiring = lazy(() => import("./stages components/SeafarerHiring"));
const SeafarerEmbarks = lazy(() =>
  import("./stages components/SeafarerEmbarks")
);

const applicationStages = [
  { id: "application", name: "Applications" },
  { id: "first-interview", name: "First Interview" },
  { id: "second-interview", name: "Second Interview" },
  { id: "hiring", name: "Hiring Contracts" },
  { id: "onboarding", name: "Embarks" },
];

export const RecruitmentStages = () => {
  const dispatch = useDispatch();
  const { interviewers } = useSelector((state) => state.currentViews);
  const [activeStage, setActiveStage] = useState("");

  const load = async () => {
    const data = await getInterviewers();
    dispatch(setInterviewers(data));
  };

  useEffect(() => {
    if (interviewers.length < 1) {
      load();
    }
  }, []);

  return (
    <section>
      <section className="hidden md:block  overflow-hidden my-3 ">
        {/* <Card className="hidden md:block border border-gray-200 rounded-lg overflow-hidden my-3 "> */}
        <div className="flex">
          {/* Sidebar */}
          <Sidebar aria-label="Application Stages">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                {applicationStages.map((stage) => (
                  <Sidebar.Item
                    className={`cursor-pointer ${
                      activeStage === stage.id &&
                      "bg-[#1976d2] text-white focus:text-white hover:text-black"
                    }`}
                    key={stage.id}
                    onClick={() => setActiveStage(stage.id)}
                  >
                    {stage.name}
                  </Sidebar.Item>
                ))}
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
          <Card className="ml-2 w-screen h-full overflow-x-auto">
            {/* Main Content Area */}
            <div className="flex-1 p-6">
              <h2 className="text-2xl font-bold mb-4">
                {
                  applicationStages.find((stage) => stage.id === activeStage)
                    ?.name
                }
              </h2>
              {/* Content for each stage */}
              {activeStage === "application" && (
                <Suspense fallback={<LoadingState />}>
                  <div>
                    <ApplicationsView />
                  </div>
                </Suspense>
              )}
              {activeStage === "first-interview" && (
                <Suspense fallback={<LoadingState />}>
                  <FirstInterviewView />
                </Suspense>
              )}
              {activeStage === "second-interview" && (
                <Suspense fallback={<LoadingState />}>
                  <SecondInterviewView />
                </Suspense>
              )}
              {activeStage === "hiring" && (
                <Suspense fallback={<LoadingState />}>
                  <SeafarerHiring />
                </Suspense>
              )}
              {activeStage === "onboarding" && (
                <Suspense fallback={<LoadingState />}>
                  <SeafarerEmbarks />
                </Suspense>
              )}
              {activeStage === "" && (
                <div className="flex flex-col items-center justify-center h-full">
                  <img
                    src={notFound}
                    alt={"Application Not Found"}
                    className="size-36"
                  />
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <span>Select an application Stage</span>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
        {/* </Card> */}
      </section>
      <Card className="md:hidden my-3">
        <div>
          <SelectComponents
            name={"stage"}
            Text="Select an application stage"
            className={""}
            data={applicationStages}
            idKey="id"
            valueKey="name"
            onChange={(e) => setActiveStage(e[0].id)}
            // onChange={(e) => console.log(e[0].id)}
            name_valor={true}
            initialValue={applicationStages[0]}
          />
        </div>

        <div className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">
            {applicationStages.find((stage) => stage.id === activeStage)?.name}
          </h2>
          {/* Content for each stage */}
          {activeStage === "application" && (
            <Suspense fallback={<LoadingState />}>
              <ApplicationsView />
            </Suspense>
          )}
          {activeStage === "first-interview" && (
            <Suspense fallback={<LoadingState />}>
              <FirstInterviewView />
            </Suspense>
          )}
          {activeStage === "second-interview" && (
            <Suspense fallback={<LoadingState />}>
              <SecondInterviewView />
            </Suspense>
          )}
          {activeStage === "hiring" && (
            <Suspense fallback={<LoadingState />}>
              <SeafarerHiring />
            </Suspense>
          )}
          {activeStage === "onboarding" && (
            <Suspense fallback={<LoadingState />}>
              <SeafarerEmbarks />
            </Suspense>
          )}
          {activeStage === "" && (
            <div className="flex flex-col items-center justify-center h-1/2">
              <img
                src={notFound}
                alt={"Application Not Found"}
                className="size-36"
              />
              <div className="flex flex-col gap-2 items-center justify-center">
                <span>Select an application Stage</span>
              </div>
            </div>
          )}
        </div>
      </Card>
    </section>
  );
};

export default RecruitmentStages;
