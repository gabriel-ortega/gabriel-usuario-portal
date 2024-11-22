import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AddSomethingTable } from "../../application/applicationProfile/components/AddSomethingTable";
import { CertificatesForms } from "./profile components/CertificatesForms";
import { AdditionalCertificatesForm } from "../../application/applicationProfile/components/AdditionalCertificatesForm";
import { getCertificates } from "../../../util/services";
import {
  updateSeafarerAdditionalCertificates,
  updateSeafarerCertificates,
} from "../../../store/currentViews/viewSlice";

const RecruitmentCertificates = ({
  certificatesData,
  additionalData,
  seafarerData,
  onChange,
  disabled = false,
}) => {
  const [certificateNames, setCertificateNames] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const loadResults = async () => {
      try {
        const certificates = await getCertificates();
        setCertificateNames(certificates);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    loadResults();
  }, []);

  // Memoized handlers for dispatching certificate updates
  const handleCertificatesChange = useCallback(
    (e) => {
      onChange(true); // Trigger external change handler
      dispatch(updateSeafarerCertificates(e));
    },
    [dispatch, onChange]
  );

  const handleAdditionalCertificatesChange = useCallback(
    (e) => {
      onChange(true); // Trigger external change handler
      dispatch(updateSeafarerAdditionalCertificates(e));
    },
    [dispatch, onChange]
  );

  return (
    <section className="mt-5 mx-6">
      {/* Seafarer Certificates */}
      <AddSomethingTable
        title="Seafarer Certificates"
        sorting={true}
        headers={[
          "Document Name",
          "Certificate Number",
          "Country",
          "Issue Date",
          "Expiration Date",
          "Document Attach",
        ]}
        disabled={disabled}
        bgClassName=""
        newFormData={certificatesData || []}
        childrenForm={
          <CertificatesForms
            certificateNames={certificateNames}
            userData={seafarerData}
          />
        }
        onDataChange={(e) => {
          if (e !== certificatesData) {
            handleCertificatesChange(e);
          }
        }}
        profileComponent={true}
      />

      {/* Additional Seafarer Certificates */}
      <AddSomethingTable
        title="Additional Seafarer Certificates"
        sorting={true}
        bgClassName=""
        headers={[
          "Education Institution",
          "Certificate Name",
          "Start Date",
          "End Date",
          "Certificate Country",
          "Certificate Attach",
        ]}
        disabled={disabled}
        newFormData={additionalData || []}
        childrenForm={<AdditionalCertificatesForm userData={seafarerData} />}
        onDataChange={(e) => {
          if (e !== additionalData) {
            handleAdditionalCertificatesChange(e);
          }
        }}
      />
    </section>
  );
};

// Named export to prevent Fast Refresh issues
export default React.memo(RecruitmentCertificates);
