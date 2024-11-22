import { HiOutlineDocumentText } from "react-icons/hi";
import { Dropzone } from "../../../../components/layoutComponents";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  deleteApplicantFile,
  uploadApplicantFile,
} from "../../../../store/userData";
import { useRef } from "react";

export const VaccineAttach = ({
  onAttachChange,
  disabled = false,
  userData,
  vaccineAttachData = { covidData: null, yellowData: null },
}) => {
  const dispatch = useDispatch();

  const handleCovid = async (file) => {
    if (file) {
      if (!file.url) {
        try {
          // Mostrar el toast mientras se sube el archivo
          const uploadedFile = await toast.promise(
            dispatch(
              uploadApplicantFile(userData, file, "", "Covid Vaccine Card")
            ),
            {
              loading: "Uploading Covid Vaccine Card...",
              success: <b>Vaccine Card uploaded successfully!</b>,
              error: (
                <b>Failed to upload the Vaccine Card. Please try again.</b>
              ),
            }
          );

          // onAttachChange({ yellow: { ...yellowData }, covid: uploadedFile });
          onAttachChange({
            yellow: vaccineAttachData.yellowData || null,
            covid: uploadedFile,
          });
        } catch (error) {
          console.error("Error uploading the document:", error);
        }
      }
    } else {
      try {
        // Extraer el nombre del archivo a eliminar desde el estado actual
        const { firstName, lastName } = userData;
        const displayName = `${firstName} ${lastName}`;
        const fileExtension = vaccineAttachData.covidData?.name
          .split(".")
          .pop()
          .toLowerCase();
        const fileNameToDelete = `${displayName}-Covid Vaccine Card.${fileExtension}`;

        // Mostrar el toast mientras se borra el archivo
        await toast.promise(
          dispatch(deleteApplicantFile(userData, fileNameToDelete)),
          {
            loading: "Deleting Covid Vaccine Card...",
            success: <b>Vaccine Card deleted successfully!</b>,
            error: <b>Failed to delete the Vaccine Card. Please try again.</b>,
          }
        );

        onAttachChange({ yellow: vaccineAttachData.yellowData, covid: null });
      } catch (error) {
        console.error("Error deleting the document:", error);
      }
    }
  };

  const handleYellow = async (file) => {
    if (file) {
      if (!file.url) {
        try {
          // Mostrar el toast mientras se sube el archivo
          const uploadedFile = await toast.promise(
            dispatch(
              uploadApplicantFile(userData, file, "", "Yellow Fever Card")
            ),
            {
              loading: "Uploading Yellow Fever Card...",
              success: <b>Certificate uploaded successfully!</b>,
              error: <b>Failed to upload the certificate. Please try again.</b>,
            }
          );

          onAttachChange({
            covid: vaccineAttachData?.covidData || null,
            yellow: uploadedFile,
          });
        } catch (error) {
          console.error("Error uploading the document:", error);
        }
      }
    } else {
      try {
        // Extraer el nombre del archivo a eliminar desde el estado actual
        const { firstName, lastName } = userData;
        const displayName = `${firstName} ${lastName}`;

        const fileExtension = vaccineAttachData.yellowData?.name
          .split(".")
          .pop()
          .toLowerCase();
        const fileNameToDelete = `${displayName}-Yellow Fever Card.${fileExtension}`;

        // Mostrar el toast mientras se borra el archivo
        await toast.promise(
          dispatch(deleteApplicantFile(userData, fileNameToDelete)),
          {
            loading: "Deleting Yellow Fever Card...",
            success: <b>Certificate deleted successfully!</b>,
            error: <b>Failed to delete the certificate. Please try again.</b>,
          }
        );

        onAttachChange({ yellow: null, covid: vaccineAttachData.covidData });
      } catch (error) {
        console.error("Error deleting the document:", error);
      }
    }
  };

  return (
    <section className="border border-gray-200 bg-gray-100 dark:border-gray-600 dark:bg-gray-700 mt-5 p-4 rounded-lg divide-y divide-[#A9ADB3]">
      <section className="flex items-center justify-between pb-4 border-b border-black border-b-3">
        <section className="flex items-center space-x-2 pl-2">
          <HiOutlineDocumentText className="w-6 h-6" />
          <h3 className="font-bold">ADD ATTACHMENT FOR YOUR VACCINES:</h3>
          <p>
            Please make sure the cover of the card and the information is
            legible.
          </p>
        </section>
      </section>
      <section className="flex flex-col py-5 items-center justify-center sm:gap-2 md:flex-row">
        <section className="w-full">
          <p className="text-base md:pb-5 pt-2">Attach Covid Book</p>
          <Dropzone
            label={false}
            DataDocument={vaccineAttachData.covidData}
            onFileChange={(e) => handleCovid(e)}
            disabled={disabled}
            name={"covidBook"}
          />
        </section>
        <section className="w-full">
          <p className="text-base md:pb-5 pt-2">Attach Yellow Fever Card</p>
          <Dropzone
            label={false}
            DataDocument={vaccineAttachData.yellowData}
            onFileChange={(e) => handleYellow(e)}
            disabled={disabled}
            name={"yellowFever"}
          />
        </section>
      </section>
    </section>
  );
};
