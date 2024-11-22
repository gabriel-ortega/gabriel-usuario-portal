
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import AgendaForm from './AgendaForm';
import TemplateInterview from './TemplateInterview';
import EditDates from './EditDates';

export default function Interview() {


    return (
        <>
         <TabGroup className="">
          <TabList className="flex flex-row items-center  justify-center bg-white ">
            <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 flex flex-col md:flex-row py-2 text-sm text-black items-center justify-center md:w-56 relative">
        PROGRAMACION
            </Tab>
            <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 md:translate-y-0 h-15 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
        PLANTILLA
            </Tab>
            <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
        EDITAR PROGRAMACION
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel className="">
         <AgendaForm/>
            </TabPanel>
            <TabPanel className="">
             <TemplateInterview/>
            </TabPanel>
            <TabPanel>
              <EditDates/>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      
      
      </>
    );
}
