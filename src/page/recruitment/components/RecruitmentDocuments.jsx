import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  updateSeafarerAdditionalDocuments,
  updateSeafarerDocuments,
  updateSeafarerIdentification,
} from "../../../store/currentViews/viewSlice";
import { AddSomethingTable } from "../../application/applicationProfile/components/AddSomethingTable";
import { DocumentsForm } from "./profile components/DocumentsForm";
import { AdditionalDocumentsForm } from "../../application/applicationProfile/components/AdditionalDocumentsForm";
import { getDocument } from "../../../util/services";
import { useSelector } from "react-redux";
import { SelectComponents } from "../../../components/layoutComponents";

export const RecruitmentDocuments = ({
  documentsData,
  additionalData,
  seafarerData,
  onChange = () => {},
  disabled = false,
}) => {
  const [documentNames, setDocumentNames] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const loadResults = async () => {
      try {
        const document = await getDocument(); // Fetching document names
        setDocumentNames(document);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    loadResults();
  }, []); // Runs only once when the component mounts

  // Memoize document change handlers using useCallback
  const handleDocumentsChange = useCallback(
    (e) => {
      const documentWithId23 = e.find((doc) => doc.documentName?.id === "23")
        ?.data.documentNumber;

      // Si se encuentra el documentNumber, quitar espacios y caracteres especiales
      if (documentWithId23) {
        const cleanedDocumentNumber = documentWithId23
          .replace(/[^a-zA-Z0-9]/g, "")
          .toLowerCase();
        dispatch(updateSeafarerIdentification(cleanedDocumentNumber));
        // Aquí puedes usar cleanedDocumentNumber como lo necesites
      }

      onChange(true); // Trigger external change handler
      dispatch(updateSeafarerDocuments(e));
    },
    [dispatch, onChange]
  );

  const handleAdditionalDocumentsChange = useCallback(
    (e) => {
      onChange(true); // Trigger external change handler
      dispatch(updateSeafarerAdditionalDocuments(e));
    },
    [dispatch, onChange]
  );

  return (
    <section className="mt-5 mx-6">
      {/* <section>
        <span className="font-light text-sm text-gray-500 mb-5">
          Filter Documents
        </span>
        <div className="w-1/2">
          <SelectComponents
            valueDefault="Document Name"
            Text=""
            name_valor={true}
            data={documentNames}
            valueKey="DocumentName"
            idKey="Id"
            name="documentName"
            //  initialValue={documentName?.id}
            //  onChange={onSelectChange}
            //  isValid={documentName?.id ? true : false}
          />
        </div>
      </section> */}

      {/* Seafarer Documents */}
      <AddSomethingTable
        title="Seafarer Documents"
        formTitle="Seafarer Document"
        bgClassName=""
        sorting={true}
        headers={[
          "Document Name",
          "Document Number",
          "Place Issue",
          "Country",
          "Issue Date",
          "Expiration Date",
          "Document Attach",
        ]}
        disabled={disabled}
        newFormData={documentsData || []}
        childrenForm={
          <DocumentsForm
            documentNames={documentNames}
            userData={seafarerData}
          />
        }
        onDataChange={(e) => {
          if (e !== documentsData) {
            handleDocumentsChange(e);
          }
        }}
        profileComponent={true}
      />

      {/* Additional Seafarer Documents */}
      <AddSomethingTable
        title="Seafarer Additional Documents"
        formTitle="Seafarer Additional Document"
        sorting={true}
        bgClassName=""
        headers={[
          "Document Name",
          "Document Date",
          "Document Expiration",
          "Document Country",
          "Document Attach",
        ]}
        newFormData={additionalData || []} // Default to empty array if null/undefined
        childrenForm={<AdditionalDocumentsForm userData={seafarerData} />}
        disabled={disabled}
        onDataChange={(e) => {
          if (e !== additionalData) {
            handleAdditionalDocumentsChange(e);
          }
        }}
      />
    </section>
  );
};

export default React.memo(RecruitmentDocuments);
