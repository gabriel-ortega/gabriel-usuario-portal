import { Avatar } from 'flowbite-react';
import logo from '../../assets/imagenes/LOGO-LOGISTIC.webp';
import logoblanco from '../../assets/imagenes/LOGO-LOGISTIC-MOBILE.webp'
import { Sidebar } from "flowbite-react";
import { HiOutlineMenu } from "react-icons/hi";
export const CheckingAuth = () => {

  return (
    
 <>
    <div className="grid grid-rows-layout grid-cols-1 md:grid-cols-layout h-screen">
      <div className='hidden md:block bg-gray-200 w-full  h-full'>
      <Sidebar className="w-full  "  aria-label="Sidebar with multi-level dropdown example">
      <img src={logo} alt="" className="-translate-x-4  h-11 m-auto hidden md:block" />
            <Sidebar.ItemGroup className='pt-4'>
            <Sidebar.Item className="text-sm md:text-base "  >
            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-200 max-w mb-3"></div>
              </Sidebar.Item>
              <Sidebar.Item className="text-sm md:text-base "  >
            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-200 max-w-screen mb-3"></div>
              </Sidebar.Item>
              <Sidebar.Item className="text-sm md:text-base "  >
            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-200 max-w-screen mb-3"></div>
              </Sidebar.Item>
              <Sidebar.Item className="text-sm md:text-base"  >
            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-200 max-w-screen mb-3"></div>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            </Sidebar>
            </div>
      <header className="row-start-1 col-start-1 col-span-1 md:col-start-2 md:col-span-1">
    
      <nav className=" h-14 p-4 flex items-center justify-between bg-[#1976d2]">
      <HiOutlineMenu className="block md:hidden text-white w-8 h-8" />
      <h1 className='hidden md:block  text-center text-white text-xs text-balance md:font-medium md:text-lg'>LOGISTIC INTERNATIONAL SERVICES CORPORATION</h1>
      <img src={logoblanco} className='block md:hidden h-11'></img>
      <div className="flex items-center justify-end ">
        <div className="hidden md:block w-20 h-2 bg-gray-300 rounded-full dark:bg-gray-700 me-3"></div>
        <Avatar size="md" rounded/>
    </div>
    </nav>
      

      <main className="md:m-10 m-5 md:p-0  items-center justify-center  col-span-1 md:col-start-2 md:col-span-1 overflow-y-auto max-h-screen">
      
      <div  className="space-y-2 animate-pulse mb-5 d:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
      
      <div className="w-full items-center justify-center ">
          <div className="h-20 h:50 md:5 bg-gray-200 rounded-lg dark:bg-gray-700  mb-4"></div>
      </div> 
      </div>

      <div  className="space-y-2 animate-pulse mb-5 md:space-x-8 rtl:space-x-reverse flex md:items-center">
      <div className="w-80 items-center justify-center ">
          <div className="md:h-10 h-5 bg-gray-200 rounded-lg dark:bg-gray-700 w-60 md:max-w-full  mb-2"></div>
      </div> 
      </div>


        <div  className="flex space-x-2 space-y-2 animate-pulse mb-5 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
       
        <div className="flex items-center w-full">
        <div className="h-96 md:h-80 bg-gray-200 rounded-lg dark:bg-gray-700 md:w-full w-40"></div>
        <div className="h-96 md:h-80 ms-2 bg-gray-200 rounded-lg dark:bg-gray-600 md:w-full w-40"></div>
    </div>
        </div>

      
    
      </main>
      </header>
   </div>  

      
      
 
      </>
  );


}
