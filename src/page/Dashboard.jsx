import { Card } from "flowbite-react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsPersonExclamation } from "react-icons/bs";
import { MdOutlinePersonSearch } from "react-icons/md";
import { LiaFileContractSolid } from "react-icons/lia";
import { LuShip } from "react-icons/lu";
import { TbCheckupList } from "react-icons/tb";
import GraphicsMonth from "../components/ComponentsGraphics/GraphicsMonth";
import GraphicsRecruitmentDep from "../components/ComponentsGraphics/GraphicsRecruitmentDep";
import GraphicsStage from "../components/ComponentsGraphics/GraphicsStage";
import GraphicsSource from "../components/ComponentsGraphics/GraphicsSource";
import PositionDashboard from "../components/ComponentsGraphics/PositionDashboard";
import DepartmentDashboard from "../components/ComponentsGraphics/DepartmentDashboard";
import HarvesterDashboard from "../components/ComponentsGraphics/HarvesterDashboard";
import CountryDashboard from "../components/ComponentsGraphics/CountryDashboard";

export default function Dashboard() {
  return (
    <>
      <Card className="w-auto overflow-hidden">
        <h1 className="text-lg md:text-lg text-black font-bold mb-4">
          Recruitment Dashboard
        </h1>
        <>
          <div className="flex flex-wrap flex-auto gap-3 items-center justify-center">
            <Card className="flex flex-col gap-2 items-center justify-center text-xs w-40 h-44 relative">
              <div className="absolute top-5 left-2">
                <BsPersonExclamation className="text-3xl" />
              </div>
              <span className="font-bold text-gray-500 text-center">
                Applications
              </span>
              <span className="font-bold text-gray-500 text-center text-4xl">
                1200
              </span>
            </Card>

            <Card className="flex flex-col gap-2 items-center justify-center text-xs w-40 h-44 relative">
              <div className="absolute top-5 left-2">
                <MdOutlinePersonSearch className="text-3xl" />
              </div>
              <span className="font-bold text-gray-500 text-center">
                Evaluations
              </span>
              <span className="font-bold text-gray-500 text-center text-4xl">
                1200
              </span>
              <section className="flex justify-center">
                <div className="grid grid-cols-2 gap-3  ">
                  <span className="text-center">929</span>
                  <span className="text-center">929</span>
                  <span className="text-center">In review</span>
                  <span className="text-center">Revised</span>
                </div>
              </section>
            </Card>

            <Card className="flex flex-col gap-2 items-center justify-center text-xs w-40 h-44 relative">
              <div className="absolute top-5 left-2">
                <TbCheckupList className="text-3xl" />
              </div>
              <span className="font-bold text-gray-500 text-center">
                First Interview
              </span>
              <span className="font-bold text-gray-500 text-center text-4xl">
                1200
              </span>
              <section className="flex justify-center">
                <div className="grid grid-cols-2 gap-5">
                  <span className="text-center">929</span>
                  <span className="text-center">929</span>
                  <span className=" ">Approved</span>
                  <span className=" ">Rejected</span>
                </div>
              </section>
            </Card>

            <Card className="flex flex-col gap-2 items-center justify-center text-xs w-40 h-44 relative">
              <div className="absolute top-5 left-0">
                <TbCheckupList className="text-3xl " />
              </div>
              <span className="font-bold text-gray-500 text-center">
                Second Interview
              </span>
              <span className="font-bold text-gray-500 text-center text-4xl">
                1200
              </span>
              <section className="flex justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <span className="text-center">929</span>
                  <span className="text-center">929</span>
                  <span className="text-start">Approved</span>
                  <span className="text-center">Rejected</span>
                </div>
              </section>
            </Card>

            <Card className="flex flex-col gap-2 items-center justify-center text-xs w-40 h-44 relative">
              <div className="absolute top-5 left-2">
                <HiOutlineUserGroup className="text-3xl" />
              </div>
              <span className="font-bold text-gray-500 text-center">
                Gap Pool
              </span>
              <span className="font-bold text-gray-500 text-center text-4xl">
                1200
              </span>
              <section className="flex justify-center">
                <div className="grid grid-cols-2 gap-3  ">
                  <span className="text-center">929</span>
                  <span className="text-center">929</span>
                  <span className="text-center">Available</span>
                  <span className="text-center">Unavailable</span>
                </div>
              </section>
            </Card>

            <Card className="flex flex-col gap-2 items-center justify-center text-xs w-40 h-44 relative">
              <div className="absolute top-5 left-2">
                <LiaFileContractSolid className="text-3xl" />
              </div>
              <span className="font-bold text-gray-500 text-center">
                Hiring
              </span>
              <span className="font-bold text-gray-500 text-center text-4xl">
                1200
              </span>
              <section className="flex justify-center">
                <div className="grid grid-cols-2 gap-3  ">
                  <span className="text-center">929</span>
                  <span className="text-center">929</span>
                  <span className="text-center">Active</span>
                  <span className="text-center">Inactive</span>
                </div>
              </section>
            </Card>

            <Card className="flex flex-col gap-2 items-center justify-center text-xs w-44 h-44 relative">
              <div className="absolute top-5 left-2">
                <LuShip className="text-3xl" />
              </div>
              <span className="font-bold text-gray-500 text-center">
                Embarkation
              </span>
              <span className="font-bold text-gray-500 text-center text-4xl">
                1200
              </span>
              <section className="flex justify-center">
                <div className="grid grid-cols-2 gap-4  ">
                  <span className="text-center p-0 m-0">929</span>
                  <span className="text-center p-0 m-0">929</span>
                  <span className="text-center p-0 m-0">Completed</span>
                  <span className="text-center p-0 m-0">Dismissed</span>
                </div>
              </section>
            </Card>
          </div>

          <section className="grid lg:grid-cols-2  grid-cols-1   gap-4 mt-5 items-center justify-center text-center">
            <Card>
              {" "}
              <GraphicsMonth className="w-full" />
            </Card>
            <Card>
              {" "}
              <GraphicsRecruitmentDep className="w-full" />{" "}
            </Card>
            <Card>
              {" "}
              <GraphicsSource className="w-full " />{" "}
            </Card>
            <Card>
              {" "}
              <GraphicsStage className="w-full " />{" "}
            </Card>
          </section>
        </>
        <div className="grid lg:grid-cols-2  grid-cols-1 gap-4 mt-5 items-center justify-center text-center">
          <Card>
            <PositionDashboard className=" " />{" "}
          </Card>
          <Card>
            {" "}
            <DepartmentDashboard className=" " />{" "}
          </Card>
          <Card>
            {" "}
            <HarvesterDashboard className=" " />{" "}
          </Card>
          <Card>
            {" "}
            <CountryDashboard className=" " />{" "}
          </Card>
        </div>
      </Card>
    </>
  );
}
