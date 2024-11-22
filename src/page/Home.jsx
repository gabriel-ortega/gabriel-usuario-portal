import { useState } from "react";
import { useSelector } from "react-redux";
import Faqs from "../components/layoutComponents/Faqs";
import CarruselCard from "../components/layoutComponents/CarruselCard";
import recruitment from "../assets/imagenes/recruitment.webp";
import job from "../assets/imagenes/job.webp";
import course from "../assets/imagenes/course.webp";
import documentation from "../assets/imagenes/documentation.webp";
import { RecruitmentCard } from "../components/layoutComponents/RecruitmentCard";

export default function Home() {
  const { displayName: accountName } = useSelector((state) => state.auth);
  const { displayName: userDisplayName, userData } = useSelector(
    (state) => state.userData
  );

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenProcessModal, setIsOpenProcessModal] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const openProcessModal = () => setIsOpenProcessModal(true);
  const closeModal = () => {
    setIsOpenModal(false);
    setIsOpenProcessModal(false);
  };

  const infoData = [
    {
      image: recruitment,
      title: "Recruitment Process",
      link: "https://panamamarinelogistic.com.pa/services/recruitment-process/",
    },
    {
      image: job,
      title: "Position On Board",
      link: "https://panamamarinelogistic.com.pa/services/onboard-job-positions/",
    },
    {
      image: course,
      title: "STCW Courses",
      onClick: openModal,
    },
    {
      image: documentation,
      title: "Documentation Process",
      onClick: openProcessModal,
    },
  ];

  const faqs = [
    {
      question: "What positions do we have available?",
      answer:
        "At Logistic Int. Services Corp. we have over 20 departments.Among others (Entertainment and Cruise Programs Department, Kitchen Housekeeping Department, Guest Relations Department, Casino Department, Deck Department, Security Department, etc).  ",
    },
    {
      question:
        "What is the required level of English for a position on board?",
      answer:
        "Currently, the companies we work with require all applicants to have a high level of the language in question. All applicants should have at least 60% on English.",
    },
    {
      question: "What are the requirements to apply?",
      answer:
        "If you are interested in applying with us, you will need to full fill the fallowing requirements: 21 years of age minimum, Fluent English (Knowledge of any other additional language will also act a plus, etc).",
    },
    {
      question: "What documents do you need to apply?",
      answer:
        "If you are interest in applying with us for any of the difference positions, that we currently offer, you will need to have the fallowing documents: passport, seamans book, COVID vaccination card (3 doses), yellow fever card, STW certificates, among other documents for boarding. However, if you do not have them, this is NOT an impediment to apply to us.",
    },
    {
      question: "What courses are mandatory for working on board?",
      answer:
        "At least the 4 BST are mandatory for anyone who wants to board offshore vessels for more than 72 hours. Many companies require them even for short boarding periods and other special courses according to the type of vessel.",
    },
    {
      question: "How long does the process take?",
      answer:
        "There are no really an estimated time for the entire process; it could take around six to eight months, and potentially longer if the desired position is not open. After receiving the approval letter, the date of ship assignment may not be immediate, but you will be notified and provided with a joining date, which will allow you to plan your departure to the port where you will board the ship more effectively.",
    },
  ];

  return (
    <section className=" p-2">
      {/* SECCION DEL ESTADO DEL APLICANTE */}
      <h1 className="flex items-start justify-start text-start font-bold text-black md:block  text-xl mr-1 mb-4 ">
        Welcome, {userDisplayName ? userDisplayName : accountName}
      </h1>
      <section>
        <section className="flex flex-col  mb-12">
          <RecruitmentCard />
        </section>
        <section className="mb-14">
          <CarruselCard info={infoData} />
        </section>
      </section>

      <section className="mb-2 p-4">
        {/* Preguntas frecuentes */}
        <Faqs faqs={faqs} />
      </section>
    </section>
  );
}
