import { Button } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useSelector } from "react-redux";
import { LoadingState } from "../../components/skeleton/LoadingState";
import { ApplicationProfile } from "../application/applicationProfile/ApplicationProfile";
import { ApplicationDocument } from "../application/ApplicationDocument";
import ApplicationCertificates from "../application/ApplicationCertificates";
import { ApplicationSkill } from "../application/applicationSkill/ApplicationSkill";
import { SelectComponents } from "../../components/layoutComponents";

const [tabs, setTabs] = useState([
  {
    Id: 1,
    value: "Profile",
  },
  {
    Id: 2,
    value: "Documents",
  },
  {
    Id: 3,
    value: "Certificates",
  },
  {
    Id: 4,
    value: "Experience & Skills",
  },
]);

export const PreviewApplication = () => {
  const { userData } = useSelector((state) => state.userData);
  const [currentTab, setCurrentTab] = useState("1");
  return (
    <div>
      {" "}
      <section className="">
        <button
          className="flex flex-auto items-center text-[#1976d2] text-sm font-style: italic hover:bg-blue-50 my-3"
          //   onClick={handleBackClick}
          //   disabled={isSaving}
        >
          <HiArrowLeft className="h-4 w-4 mr-2 mb-2" />
          Back to Applications
        </button>

        <>
          <div className="hidden md:flex flex-col items-center mt-3">
            <Button.Group>
              <Button
                className={`${
                  currentTab === "1" &&
                  "bg-[#1976d2] text-white focus:text-white"
                }`}
                color="gray"
                onClick={() => setCurrentTab("1")}
              >
                {/* <HiUserCircle className="mr-3 h-4 w-4" /> */}
                {tabs[0].value}
              </Button>
              <Button
                className={`${
                  currentTab === "2" &&
                  "bg-[#1976d2] text-white focus:text-white"
                }`}
                color="gray"
                onClick={() => setCurrentTab("2")}
              >
                {/* <HiAdjustments className="mr-3 h-4 w-4" /> */}
                {tabs[1].value}
              </Button>
              <Button
                className={`${
                  currentTab === "3" &&
                  "bg-[#1976d2] text-white focus:text-white"
                }`}
                color="gray"
                onClick={() => setCurrentTab("3")}
              >
                {/* <HiCloudDownload className="mr-3 h-4 w-4" /> */}
                {tabs[2].value}
              </Button>
              <Button
                className={`${
                  currentTab === "4" &&
                  "bg-[#1976d2] text-white focus:text-white"
                }`}
                color="gray"
                onClick={() => setCurrentTab("4")}
              >
                {/* <HiCloudDownload className="mr-3 h-4 w-4" /> */}
                {tabs[3].value}
              </Button>
            </Button.Group>
          </div>
          <SelectComponents
            name={"tab"}
            Text="Select an application section"
            className={"md:hidden"}
            data={tabs}
            idKey="Id"
            valueKey="value"
            onChange={(e) => setCurrentTab(e[0].id)}
            name_valor={true}
            initialValue={tabs[0]}
          />
        </>
        {!userData ? (
          <LoadingState />
        ) : !currentTab ? (
          <LoadingState />
        ) : currentTab === "1" ? (
          <ApplicationProfile />
        ) : currentTab === "2" ? (
          <ApplicationDocument />
        ) : currentTab === "3" ? (
          <ApplicationCertificates />
        ) : (
          <ApplicationSkill />
        )}
      </section>
    </div>
  );
};
