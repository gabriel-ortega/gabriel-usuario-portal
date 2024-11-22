import { useSelector } from "react-redux";
import { LayoutDefault } from "../components/layoutDefault";
import {
  StartApplicantion,
  ApplicationDocument,
  ApplicationProfile,
  ApplicationSkill,
  SendApplication,
  StandByApplication,
  CorrectApplication,
} from "./application";
import {
  BannerComponent,
  ModalYesNo,
  ProgressBar,
} from "../components/layoutComponents";
import { LoadingState } from "../components/skeleton/LoadingState";
import { useDispatch } from "react-redux";
import {
  getApplication,
  updateApplicationFirestore,
  updateApplicationStage,
} from "../store/userData";
import ApplicationCertificates from "./application/ApplicationCertificates";
import { Button } from "flowbite-react";
import toast from "react-hot-toast";
import incorrect1 from "../assets/imagenes/document-incorrect-1.png";
import incorrect2 from "../assets/imagenes/document-incorrect-2.png";
import correct from "../assets/imagenes/document-correct.png";
import { useState } from "react";
import { useEffect } from "react";
import { ApplicantProcessView } from "./recruitment/ApplicantProcessView";

export default function ApplicantApplication() {
  const dispatch = useDispatch();

  const { applicationStage, isLoading, userData, isSaving } = useSelector(
    (state) => state.userData
  );

  const [isOpen, setIsOpen] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  const titles = {
    1: "START AN APPLICATION PROCESS",
    2: "FIRST, LET'S MAKE SURE YOUR PROFILE IS COMPLETE",
    3: "NOW, FILL THE INFORMATION ON YOUR PERSONAL DOCUMENTATION",
    4: "NOW, FILL THE INFORMATION ON THE CERTIFICATES THAT YOU CURRENTLY HAVE",
    5: "LET´S SEE ABOUT YOUR EXPERIENCE AND SKILLS",
    6: "YOU ARE ALL SET!",
    7: "APPLICATION SENT",
    // Add more phases as needed
  };

  const subtitles = {
    1: `Once you get to the "Start Process", your application process will begin with the selected position. Please note that the information required in your application will vary drastically depending on the position selected.`,
    2: "Fill all the fields to complete your profile with personal data.",
    3: "Mandatory documents will depend on the position you´re applying for. If none appear as mandatory you can go to the next step.",
    4: "Mandatory certificates will depend on the position you´re applying for. If none appear as mandatory you can go to the next step.",
    5: "Depending on the position you're applying, you'll need to meet a minimum experience in a category of experience (On board or On land experience).",
    6: `Once you click the "Submit Data" button a recruitment agent will evaluate your submitted data. You can submit your application or review and fix any of your previously submitted information.`,
    7: "Your application has been submitted. A recruiting agent will evaluate the information provided and will contact you if your attention is required in the process.",
    // Add more subtitles as needed
  };

  const handleOnClick = (stage) => {
    dispatch(updateApplicationStage(stage));
  };

  const enviar = (event) => {
    event.preventDefault();
    toast.promise(
      dispatch(
        updateApplicationFirestore(
          userData.uid,
          userData.applicationData,
          false,
          userData.applicationStage
        )
      ),
      {
        loading: "Saving...",
        success: <b>Saved!</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
  };

  useEffect(() => {
    if (applicationStage == 3 || applicationStage == 4) {
      setIsOpen(true);
    }

    return () => {
      setIsOpen(false);
    };
  }, [applicationStage]);

  const images = [
    {
      src: incorrect1,
      text: "Make sure there aren't any objects interfering with the document.",
    },
    {
      src: incorrect2,
      text: "The document has to be aligned, fully visible and legible in the pdf file.",
    },
    {
      src: correct,
      text: "If you are going to use a picture as a scan take a close picture and lit well the document.",
    },
  ];

  return (
    <div className="md:w-11/12 md:m-auto">
      <BannerComponent />
      {userData.recruitmentStage !== 1 ? (
        <ApplicantProcessView />
      ) : (
        <>
          {applicationStage < 7 && (
            <>
              <ProgressBar
                progress={
                  applicationStage === 1 || applicationStage === undefined
                    ? "0"
                    : applicationStage === 2
                    ? "25"
                    : applicationStage === 3
                    ? "50"
                    : applicationStage === 4
                    ? "75"
                    : "100"
                }
                label="Application Progress"
                className=""
              />
            </>
          )}

          {applicationStage < 8 && (
            <section className="pt-5">
              <h2 className="text-black text-center font-bold text-xl md:text-2xl">
                {titles[applicationStage]}
              </h2>
              <p className="text-black text-base md:text-lg pt-5">
                {subtitles[applicationStage]}
              </p>
            </section>
          )}

          {applicationStage > 1 && applicationStage < 7 && (
            <section className="flex items-end justify-end pt-5">
              <Button
                className="h-10 w-25 bg-[#010064]"
                isProcessing={isSaving}
                onClick={enviar}
              >
                Save Changes
              </Button>
            </section>
          )}

          <section className="w-full overflow-x-auto">
            {applicationStage === null || isLoading ? (
              <LoadingState />
            ) : applicationStage === 1 || applicationStage === undefined ? (
              <StartApplicantion />
            ) : applicationStage === 2 ? (
              <ApplicationProfile />
            ) : applicationStage === 3 ? (
              <ApplicationDocument />
            ) : applicationStage === 4 ? (
              <ApplicationCertificates />
            ) : applicationStage === 5 ? (
              <ApplicationSkill />
            ) : applicationStage === 6 ? (
              <SendApplication />
            ) : applicationStage === 7 ? (
              <StandByApplication />
            ) : applicationStage === 8 ? (
              <CorrectApplication />
            ) : (
              <LoadingState />
            )}
          </section>

          <ModalYesNo
            size="2xl"
            text={
              <section>
                <p className="font-bold">
                  Make sure your document attachments follow these rules:
                </p>
                <div className="flex flex-col items-center">
                  {images.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center mb-4"
                    >
                      <img
                        src={item.src}
                        alt={`Image ${index + 1}`}
                        className="size-72 mb-1"
                      />
                      <p>{item.text}</p>
                      {index < images.length - 1 && (
                        <div className="w-full h-px bg-gray-300 my-4" />
                      )}
                    </div>
                  ))}
                </div>
              </section>
            }
            textyes={"Continue"}
            disableButtonConfirm={false}
            disableButtonCancel={true}
            isOpen={isOpen}
            closeModal={closeModal}
            onConfirm={closeModal}
            onCancel={closeModal}
          />
        </>
      )}
    </div>
  );
}
