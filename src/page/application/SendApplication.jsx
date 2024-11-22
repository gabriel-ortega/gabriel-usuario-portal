import React from "react";
import { LayoutDefault } from "../../components/layoutDefault";
import { ButtonIcon, ModalYesNo } from "../../components/layoutComponents";
import { useSelector, useDispatch } from "react-redux";
import {
  HiOutlineBookOpen,
  HiInformationCircle,
  HiOutlineAcademicCap,
  HiOutlineChevronRight,
  HiOutlineUserGroup,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi";
import { Alert } from "flowbite-react";
import {
  createApplication,
  updateApplicationFirestore,
  updateApplicationStage,
} from "../../store/userData";
import { useState } from "react";
import toast from "react-hot-toast";

export function SendApplication() {
  const dispatch = useDispatch();
  const { applicationStage, isLoading, isSaving, userData } = useSelector(
    (state) => state.userData
  );

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const handleConfirm = async () => {
    try {
      toast.loading("Submitting Application...");
      const documentWithId23 =
        userData.applicationData.applicationDocument.find(
          (doc) => doc.documentName?.id === 23
        )?.data.documentNumber;

      // Si se encuentra el documentNumber, quitar espacios y caracteres especiales
      const cleanedDocumentNumber = documentWithId23
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase();

      const dataToCreate = {
        ...userData,
        identification: cleanedDocumentNumber,
      };

      // First promise: updateApplicationFirestore
      await dispatch(
        updateApplicationFirestore(
          userData.uid,
          userData.applicationData,
          true,
          7
        )
      );

      // Second promise: createApplication
      // await dispatch(createApplication(userData));
      await dispatch(createApplication(dataToCreate));

      toast.dismiss();
      toast.success(<b>Application Submitted!</b>);
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error(<b>Ups! Something went wrong. Try again</b>);
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  const handleOnClick = (stage) => {
    dispatch(updateApplicationStage(stage));
  };

  return (
    <>
      <section className="flex flex-col  p-3">
        <section className="mb-2 p-2 font-bold">
          <Alert color="success" icon={HiInformationCircle} rounded>
            <span className="font-medium">
              By touching the button on the desired phase you can verify or edit
              the information provided.
            </span>
            <br></br>
          </Alert>
        </section>

        <section className="flex flex-col  text-base justify-center items-center mb-0 p-2">
          <section className="flex flex-wrap mb-5 md:mb-5 items-center justify-center ">
            <ButtonIcon
              icon={
                <HiOutlineChevronRight className="translate-y-2 h-5 w-5 items-center justify-center" />
              }
              classnamebtn="bg-[#1976d2] justify-center items-center mx-1 h-14 w-64 mb-5 md:mb-2"
              label="POSITION/DEPARTMENT REGISTRATION"
              onClick={() => handleOnClick(1)}
            />
            <div className="hidden md:block border-l border-gray-400 h-12 mx-1"></div>
            <ButtonIcon
              icon={<HiOutlineChevronRight className="h-5 w-5" />}
              classnamebtn="bg-[#1976d2] items-center mx-1 h-14 w-64 mb-5 md:mb-2"
              label="PROFILE CREATION"
              onClick={() => handleOnClick(2)}
            />
            <div className="hidden md:block border-l border-gray-400 h-12 mx-1"></div>
            <ButtonIcon
              icon={<HiOutlineChevronRight className="h-5 w-5" />}
              classnamebtn="bg-[#1976d2] items-center mx-1 h-14 w-64 mb-2"
              label="DOCUMENTS REGISTRATION"
              onClick={() => handleOnClick(3)}
            />
          </section>

          <section className="flex flex-wrap mb-5 items-center justify-center ">
            <ButtonIcon
              icon={<HiOutlineChevronRight className="h-5 w-5" />}
              classnamebtn="bg-[#1976d2] items-center mx-1 h-14 w-64 mb-5 md:mb-2"
              label="CERTIFICATES REGISTRATION"
              onClick={() => handleOnClick(4)}
            />
            <div className="hidden md:block border-l border-gray-400 h-12 mx-1"></div>
            <ButtonIcon
              icon={<HiOutlineChevronRight className="h-5 w-5" />}
              classnamebtn="bg-[#1976d2] items-center mx-1 h-14 w-64"
              label="EXPERIENCE AND SKILLS"
              onClick={() => handleOnClick(5)}
            />
          </section>
        </section>

        <section className="mb-2 p-2 font-bold">
          <Alert color="warning" icon={HiInformationCircle} rounded>
            <span className="font-medium">
              If you are sure of the information provided, click on the “SUBMIT
              DATA” button to submit your application.{" "}
            </span>
            <br></br>
          </Alert>
        </section>

        <section className="flex items-center justify-center">
          <ButtonIcon
            icon={<HiOutlineChevronRight className="h-5 w-5" />}
            classnamebtn="bg-green-700 items-center mx-1 h-14 w-64"
            label="SUBMIT DATA"
            onClick={openModal}
          />
        </section>
        <ModalYesNo
          text={"Are you sure that you want to submit your application?"}
          textyes={"Submit"}
          disableButtonConfirm={false}
          textno={"Cancel"}
          icon={<HiOutlineQuestionMarkCircle className="w-9 h-9 m-auto" />}
          isOpen={isOpen}
          closeModal={closeModal}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          classmodal="pt-[50%] md:pt-0"
        />
      </section>
    </>
  );
}
