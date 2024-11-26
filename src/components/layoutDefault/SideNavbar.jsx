import { Sidebar } from "flowbite-react";
import {
  HiOutlineChevronLeft,
  HiOutlineLogout,
  HiOutlineHome,
  HiOutlineFolderOpen,
  HiOutlineClipboardCopy,
  HiOutlineClipboardList,
  HiCog,
  HiOutlineCog,
  HiOutlineUser,
  HiOutlineDocumentText,
} from "react-icons/hi";
import logo from "../../assets/imagenes/LOGO-LOGISTIC.webp";
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { truncateText } from "../../util/helperFunctions";
import { useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FirebaseDB } from "../../config/firebase/config";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiShipLine } from "react-icons/ri";

export function SideNavbar({ toggleSidebar }) {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userData);
  const { role } = userData;
  const [unReadCount, setUnReadCount] = useState(0);
  const [profileUpdatesCount, setProfileUpdatesCount] = useState(0);

  const onLogout = () => {
    dispatch(startLogout());
  };

  const [disableProfile, setDisableProfile] = useState(
    1 === userData.recruitmentStage ||
      7 === userData.recruitmentStage ||
      8 === userData.recruitmentStage ||
      9 === userData.recruitmentStage ||
      10 === userData.recruitmentStage ||
      11 === userData.recruitmentStage ||
      12 === userData.recruitmentStage ||
      13 === userData.recruitmentStage ||
      14 === userData.recruitmentStage ||
      15 === userData.recruitmentStage ||
      16 === userData.recruitmentStage ||
      17 === userData.recruitmentStage ||
      18 === userData.recruitmentStage
      ? true
      : false
  );

  const [disableHiring, setDisableHiring] = useState(
    1 === userData.recruitmentStage ||
      2 === userData.recruitmentStage ||
      3 === userData.recruitmentStage ||
      7 === userData.recruitmentStage ||
      8 === userData.recruitmentStage ||
      9 === userData.recruitmentStage ||
      10 === userData.recruitmentStage ||
      11 === userData.recruitmentStage ||
      12 === userData.recruitmentStage ||
      13 === userData.recruitmentStage ||
      14 === userData.recruitmentStage ||
      15 === userData.recruitmentStage ||
      16 === userData.recruitmentStage ||
      17 === userData.recruitmentStage ||
      18 === userData.recruitmentStage
      ? true
      : false
  );

  const [disableEmbark, setDisableEmbark] = useState(
    1 === userData.recruitmentStage ||
      2 === userData.recruitmentStage ||
      3 === userData.recruitmentStage ||
      7 === userData.recruitmentStage ||
      8 === userData.recruitmentStage ||
      9 === userData.recruitmentStage ||
      10 === userData.recruitmentStage ||
      11 === userData.recruitmentStage ||
      12 === userData.recruitmentStage ||
      13 === userData.recruitmentStage ||
      14 === userData.recruitmentStage ||
      15 === userData.recruitmentStage ||
      16 === userData.recruitmentStage ||
      17 === userData.recruitmentStage ||
      18 === userData.recruitmentStage
      ? true
      : false
  );

  useEffect(() => {
    // Función que crea la suscripción en tiempo real para documentos sin leer en "applications"
    const subscribeToUnreadApplications = () => {
      const collectionRef = collection(FirebaseDB, "applications");
      const q = query(collectionRef, where("isRead", "==", false));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const unreadDocs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUnReadCount(unreadDocs.length);
        if (userData.role !== 3) {
          if (unreadDocs.length > 0) {
            toast.success("New application received.", {
              position: "bottom-right",
              duration: 3500,
            });
          }
        }
      });

      return unsubscribe;
    };

    // Función que crea la suscripción en tiempo real para "profileUpdates"
    const subscribeToProfileUpdates = () => {
      const collectionRef = collection(FirebaseDB, "profileUpdates");
      const q = query(collectionRef, where("isReviewed", "==", false)); // Filtra por "isReviewed" o tu condición deseada

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const updatesDocs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Actualiza el estado o maneja las notificaciones para `profileUpdates`
        setProfileUpdatesCount(updatesDocs.length);
        if (userData.role !== 3) {
          if (updatesDocs.length > 0) {
            toast.success("New profile update received.", {
              position: "bottom-right",
              duration: 3500,
            });
          }
        }
      });

      return unsubscribe;
    };

    // Llamar a ambas funciones para iniciar las suscripciones
    const unsubscribeApplications = subscribeToUnreadApplications();
    const unsubscribeProfileUpdates = subscribeToProfileUpdates();

    // Limpiar las suscripciones cuando el componente se desmonte
    return () => {
      unsubscribeApplications();
      unsubscribeProfileUpdates();
    };
  }, [userData.role.Id]);

  return (
    <div className="flex flex-col justify-between h-full">
      <Sidebar
        className="bg-gray-50 dark:bg-gray-800"
        aria-label="Sidebar with multi-level dropdown example"
      >
        <HiOutlineChevronLeft
          className="block md:hidden w-8 h-8 ml-auto"
          onClick={toggleSidebar}
        />

        <Link to={"/"}>
          <img
            src={logo}
            alt="logo Logistic Internation Services Corporation"
            className="h-11 m-auto hidden md:block"
          />
        </Link>
        <Sidebar.Items className="pt-4">
          <Sidebar.ItemGroup>
            {role === 3 && (
              <>
                <Link to={"/"}>
                  <Sidebar.Item
                    title="Home"
                    className="text-sm md:text-base"
                    icon={HiOutlineHome}
                    as="div"
                  >
                    Home
                  </Sidebar.Item>
                </Link>
                <Sidebar.Collapse
                  icon={HiOutlineClipboardList}
                  className="text-sm md:text-base"
                  label="Recruitment Process"
                >
                  <Link to={"/application"}>
                    <Sidebar.Item
                      title="My Application"
                      icon={HiOutlineClipboardCopy}
                      className="text-sm md:text-base"
                      as="div"
                    >
                      My Application
                    </Sidebar.Item>
                  </Link>
                  <Link to={`${!disableProfile ? "/myprofile" : "/"}`}>
                    <Sidebar.Item
                      title="My Profile"
                      icon={HiOutlineUser}
                      className={`text-sm md:text-base ${
                        disableProfile ? "opacity-30 " : ""
                      }`}
                      as="div"
                    >
                      My Profile
                    </Sidebar.Item>
                  </Link>
                  <Link to={`${!disableHiring ? "/myhiring" : "/"}`}>
                    <Sidebar.Item
                      title="My Contracts"
                      icon={HiOutlineDocumentText}
                      className={`text-sm md:text-base ${
                        disableHiring ? "opacity-30 " : ""
                      }`}
                      as="div"
                    >
                      My Contracts
                    </Sidebar.Item>
                  </Link>
                  <Link to={`${!disableEmbark ? "/myembarks" : "/"}`}>
                    <Sidebar.Item
                      title="My Embarks"
                      icon={RiShipLine}
                      className={`text-sm md:text-base ${
                        disableEmbark ? "opacity-30 " : ""
                      }`}
                      as="div"
                    >
                      My Embarks
                    </Sidebar.Item>
                  </Link>
                </Sidebar.Collapse>
              </>
            )}

            {(role === 2 || role === 1) && (
              <>
                <Link to={"/"}>
                  <Sidebar.Item
                    title="Dashboard"
                    className="text-sm md:text-base"
                    icon={HiOutlineHome}
                    as="div"
                  >
                    Dashboard
                  </Sidebar.Item>
                </Link>

                <Sidebar.Collapse
                  icon={HiOutlineClipboardList}
                  className="text-sm md:text-base"
                  label="Recruitment"
                >
                  <Link to={"/shortnotice"}>
                    <Sidebar.Item
                      title="Short Notice/Add Applicant"
                      className="text-sm md:text-base"
                      as="div"
                    >
                      {truncateText("Short Notice/Add Applicant", 18)}
                    </Sidebar.Item>
                  </Link>
                  <Link to={"/seafarers"}>
                    <Sidebar.Item
                      title="All Applicants/Seafarers"
                      className="text-sm md:text-base"
                      as="div"
                    >
                      {truncateText("All Applicants/Seafarers", 18)}
                    </Sidebar.Item>
                  </Link>
                  <Link to={"/submissions"}>
                    <Sidebar.Item
                      title="Applications"
                      className="text-sm md:text-base"
                      as="div"
                      label={unReadCount || ""}
                      labelColor="warning"
                    >
                      {truncateText("Applications", 18)}
                    </Sidebar.Item>
                  </Link>
                  <Link to={"/firstinterviews"}>
                    <Sidebar.Item
                      title="First Interviews"
                      className="text-sm md:text-base"
                      as="div"
                    >
                      {truncateText("First Interviews", 18)}
                    </Sidebar.Item>
                  </Link>
                  <Link to={"/secondinterviews"}>
                    <Sidebar.Item
                      title="Second Interviews"
                      className="text-sm md:text-base"
                      as="div"
                    >
                      {truncateText("Second Interviews", 18)}
                    </Sidebar.Item>
                  </Link>
                  <Link to={"/gappool"}>
                    <Sidebar.Item
                      title="GAP Pool"
                      className="text-sm md:text-base"
                      as="div"
                    >
                      {truncateText("GAP Pool", 18)}
                    </Sidebar.Item>
                  </Link>
                  <Link to={"/hirings"}>
                    <Sidebar.Item
                      title="Hirings"
                      className="text-sm md:text-base"
                      as="div"
                    >
                      {truncateText("Hirings", 18)}
                    </Sidebar.Item>
                  </Link>
                  <Link to={"/embarks"}>
                    <Sidebar.Item
                      title="Embarks"
                      className="text-sm md:text-base"
                      as="div"
                    >
                      {truncateText("Embarks", 18)}
                    </Sidebar.Item>
                  </Link>

                  <Link to={"/expired"}>
                    <Sidebar.Item
                      title="Expired Documents"
                      className="text-sm md:text-base"
                      as="div"
                    >
                      {truncateText("Expired Documents", 18)}
                    </Sidebar.Item>
                  </Link>
                  <Link to={"/updaterequests"}>
                    <Sidebar.Item
                      title="Update Requests"
                      className="text-sm md:text-base"
                      label={profileUpdatesCount || ""}
                      labelColor="warning"
                      as="div"
                    >
                      {truncateText("Profile Update Requests", 18)}
                    </Sidebar.Item>
                  </Link>
                  <Link to={"/retirerequests"}>
                    <Sidebar.Item
                      title="Retirement Request"
                      className="text-sm md:text-base"
                      // label={profileUpdatesCount || ""}
                      // labelColor="warning"
                      as="div"
                    >
                      {truncateText("Retirement Request", 18)}
                    </Sidebar.Item>
                  </Link>
                </Sidebar.Collapse>
                <Sidebar.Collapse
                  icon={HiOutlineFolderOpen}
                  className="text-sm md:text-base"
                  label="Interview"
                >
                  <Link to={"/interview"}>
                    <Sidebar.Item
                      icon={HiOutlineClipboardCopy}
                      className="text-sm md:text-base"
                      as="div"
                    >
                      Programacion
                    </Sidebar.Item>
                  </Link>
                  <Link to={"/interviewschedule"}>
                    <Sidebar.Item
                      icon={HiOutlineClipboardCopy}
                      className="text-sm md:text-base"
                      as="div"
                    >
                      Interview Schedule
                    </Sidebar.Item>
                  </Link>
                </Sidebar.Collapse>
                <Sidebar.Collapse
                  icon={HiOutlineCog}
                  className="text-sm md:text-base"
                  label="Settings"
                >
                  <Link to={"/test"}>
                    <Sidebar.Item
                      icon={HiOutlineClipboardCopy}
                      className="text-sm md:text-base"
                      as="div"
                    >
                      Test
                    </Sidebar.Item>
                  </Link>
                </Sidebar.Collapse>
              </>
            )}

            {(role.Id === 1 || role.Id === 4) && (
              <Sidebar.Collapse
                icon={HiOutlineFolderOpen}
                className="text-sm md:text-base"
                label={truncateText("Documentation Process", 10)}
              ></Sidebar.Collapse>
            )}
            {/* 
            <Sidebar.Item
              onClick={onLogout}
              href="/auth"
              className="text-sm md:text-base"
              icon={HiOutlineLogout}
              as="div"
            >
              Sign Out
            </Sidebar.Item> */}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      {/* <button
        className={`m-auto bg-gray-50 text-red-700 size-10 w-full flex gap-2 justify-center items-center text-md hover:bg-zinc-100 disabled:opacity-30`}
        onClick={onLogout}
        title={"Sign Out"}
      >
        <HiOutlineLogout className="h-4 w-4" />
        <span className=" ">{"Sign Out"}</span>
      </button> */}
    </div>
  );
}
