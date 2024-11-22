import { Avatar, Popover } from "flowbite-react";
import { HiOutlineLogout, HiOutlineMenu } from "react-icons/hi";
import avatarimg from "./avatar.jpg";
import logoblanco from "../../assets/imagenes/LOGO-LOGISTIC-MOBILE.webp";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PushNotificationButton from "./NotificationsButton";
import { formatDate } from "../../util/helperFunctions";
import { startLogout } from "../../store/auth";
import { useDispatch } from "react-redux";
import { CustomSearchBox } from "../searchBar/CustomSearchBox";
import { useState } from "react";
import { CustomHits } from "../searchBar/CustomHits";
import { MdOutlineSearch } from "react-icons/md";

export default function Navbar1({ toggleSidebar, setSearchValue = () => {} }) {
  const handleInputChange = (value) => {
    setSearchValue(value); // Actualiza el valor en el padre
  };
  const dispatch = useDispatch();
  const { displayName: accountName } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.userData);
  const displayNameUser =
    userData.seafarerData?.seafarerProfile?.profile.firstName &&
    userData.seafarerData?.seafarerProfile?.profile.lastName
      ? `${userData.seafarerData?.seafarerProfile?.profile.firstName} ${userData.seafarerData?.seafarerProfile?.profile.lastName}`
      : accountName;
  const firstAndLastAdmin =
    userData.firstName && userData.lastName
      ? `${userData.firstName} ${userData.lastName}`
      : accountName;
  const { photoURL } = userData;

  const onLogout = () => {
    dispatch(startLogout());
  };

  return (
    <>
      {/* <InstantSearch searchClient={searchClient} indexName="allData"> */}
      <nav className=" h-14 p-4 flex items-center justify-between bg-[#1976d2]">
        <div className="block md:hidden flex flex-row gap-5  justify-between items-end ">
          <HiOutlineMenu
            className=" text-white w-8 h-8"
            onClick={toggleSidebar}
          />
          {userData.role == 1 ||
            (userData.role == 2 && (
              <Link to={"/globalsearch"}>
                <button className={` text-white cursor-pointer`}>
                  <MdOutlineSearch className={`w-5 h-5 `} />
                </button>
              </Link>
            ))}
        </div>
        {userData.role == 1 || userData.role == 2 ? (
          <div className="hidden md:block">
            <CustomSearchBox isNav={true} onInputChange={handleInputChange} />
          </div>
        ) : (
          // <div />
          <h1 className="hidden md:block  text-center text-white text-xs text-balance md:font-medium md:text-lg">
            LOGISTIC INTERNATIONAL SERVICES CORPORATION
          </h1>
        )}

        {/* <input /> */}
        <Link to={"/"}>
          <img src={logoblanco} className="block md:hidden h-11"></img>
        </Link>
        <PushNotificationButton />
        <Popover
          trigger="click"
          arrow={false}
          content={
            <div className="md:w-96 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md text-gray-500 dark:text-gray-400">
              <div className="flex flex-row items-center justify-between gap-4">
                {/* Profile Picture */}
                <Avatar
                  img={photoURL ? photoURL : ""}
                  size="xl"
                  className="rounded-full"
                />

                {/* Account Details */}
                <div className="flex flex-col space-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {userData.role == 1 || userData.role == 4
                      ? firstAndLastAdmin
                      : displayNameUser || "User Name"}
                  </h3>
                  <p className="text-sm">
                    {userData?.email || "user@example.com"}
                  </p>
                  <p className="text-xs text-gray-400">
                    Created on:{" "}
                    {userData?.createdOn
                      ? formatDate(userData?.createdOn, "dd-mm-yyyy")
                      : "N/A"}
                  </p>
                  <button
                    className="text-xs bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-all"
                    // onClick={handleEdit}
                  >
                    Edit
                  </button>
                  <button
                    className={`m-auto bg-transparent rounded-md text-red-700 size-10 w-full flex gap-2 justify-center items-center text-xs hover:bg-zinc-100 disabled:opacity-30`}
                    onClick={onLogout}
                    title={"Sign Out"}
                  >
                    <HiOutlineLogout className="h-4 w-4" />
                    <span className="">{"Sign Out"}</span>
                  </button>
                </div>
                {/* Edit Button */}
              </div>
            </div>
          }
        >
          <div className="flex items-center hover:cursor-pointer">
            <p className=" hidden  text-xs text-white md:block md:p-1 md:text-sm mr-1">
              {userData.role == 1 || userData.role == 4
                ? firstAndLastAdmin
                : displayNameUser || "User Name"}
            </p>
            <Avatar img={photoURL ? photoURL : ""} size="md" rounded />
          </div>
        </Popover>
      </nav>
      {/* </InstantSearch> */}
    </>
  );
}
