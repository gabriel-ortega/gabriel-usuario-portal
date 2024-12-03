import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import AgendaForm from "./AgendaForm";
import TemplateInterview from "./TemplateInterview";
import EditDates from "./EditDates";
import { useState } from "react";
import { FormPrompt } from "../../hooks/FormPrompt";

export default function Interview() {
  return (
    <>
      <div className="pl-3 pb-4 pt-5  flex flex-row gap-3 items-center justify-between ">
        <div className="flex flex-row gap-2 items-center justify-between">
          <h1 className="md:pl-5 text-lg md:text-lg text-black font-bold">
            Interview Appointments Schedule
          </h1>
        </div>
      </div>
      <TabGroup className="">
        <TabList className="flex flex-row items-center  justify-center bg-white ">
          <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 flex flex-col md:flex-row py-2 text-sm text-black items-center justify-center md:w-56 relative">
            Schedule
          </Tab>
          {/*  <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 md:translate-y-0 h-15 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
        PLANTILLA
            </Tab> */}
          <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
            All Appointments
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="">
            <AgendaForm />
          </TabPanel>
          {/* <TabPanel className="">
             <TemplateInterview/>
            </TabPanel> */}
          <TabPanel>
            <EditDates />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
}
