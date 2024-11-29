import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
  Checkbox,
  Label,
  Textarea,
} from "flowbite-react";
import { updateApplicationReview } from "../../../store/userData";
import { useTransition } from "react";
import { useId } from "react";

function formatHeader(str) {
  return str
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/([a-z])([A-Z])/g, "$1 $2");
}

export const ReviewForm = ({ disabled, reviewData }) => {
  const [isPending, startTransition] = useTransition();
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userData);
  const [isLoaded, setIsLoaded] = useState(false);

  const profileContacts =
    userData.applicationData.applicationProfile.contacts?.contact || [];

  const covidData =
    userData.applicationData.applicationProfile.vaccines?.covid?.cards || [];

  const yellowData =
    userData.applicationData.applicationProfile.vaccines?.yellowFever?.cards ||
    [];

  const additionalVac =
    userData.applicationData.applicationProfile.vaccines?.additionalVaccines ||
    [];

  const profileLang = userData.applicationData.applicationProfile.lang || [];

  const profileFields = {
    ...userData.applicationData.applicationProfile.profile,
    profilePicture: "",
  };

  const documents = userData.applicationData.applicationDocument || [];

  const additionalDocuments =
    userData.applicationData.additionalDocuments || [];

  const certificates = userData.applicationData.applicationCertificates || [];

  const additionalCertificates =
    userData.applicationData.additionalCertificates || [];

  const skills = userData.applicationData.skills || [];

  const review = userData.applicationData?.review;

  const [comment, setComment] = useState(review?.comment);

  const handleCommentChange = (e) => {
    const field = "comment";
    const subField = "";
    const value = e.target.value;
    setUnsavedChanges(true);
    setComment(e.target.value);
    startTransition(() => {
      setApplicationReview((applicationReview) => {
        let updatedApplicationReview = { ...applicationReview };

        if (value === false) {
          if (subField !== undefined && subField !== "") {
            if (updatedApplicationReview[field]) {
              // Crear un nuevo objeto sin la propiedad subField
              const { [subField]: removedSubField, ...remainingSubFields } =
                updatedApplicationReview[field];
              updatedApplicationReview[field] = remainingSubFields;

              // Si el objeto resultante no tiene más subfields, eliminar field
              if (Object.keys(updatedApplicationReview[field]).length === 0) {
                const { [field]: removedField, ...remainingFields } =
                  updatedApplicationReview;
                updatedApplicationReview = remainingFields;
              }
            }
          } else {
            // Eliminar la propiedad field sin usar delete
            const { [field]: removedField, ...remainingFields } =
              updatedApplicationReview;
            updatedApplicationReview = remainingFields;
          }
        } else {
          if (subField !== undefined && subField !== "") {
            updatedApplicationReview[field] = {
              ...updatedApplicationReview[field],
              [subField]: value,
            };
          } else {
            updatedApplicationReview[field] = value;
          }
        }

        return updatedApplicationReview;
      });
    });
  };

  const [applicationReview, setApplicationReview] = useState(review);

  useEffect(() => {
    setApplicationReview(review || {});
    setComment(review?.comment);
  }, [review]);

  const handleReviewChange = (field, subField, value) => {
    setUnsavedChanges(true);
    setApplicationReview((applicationReview) => {
      let updatedApplicationReview = { ...applicationReview };

      if (value === false) {
        if (subField !== undefined && subField !== "") {
          if (updatedApplicationReview[field]) {
            // Crear un nuevo objeto sin la propiedad subField
            const { [subField]: removedSubField, ...remainingSubFields } =
              updatedApplicationReview[field];
            updatedApplicationReview[field] = remainingSubFields;

            // Si el objeto resultante no tiene más subfields, eliminar field
            if (Object.keys(updatedApplicationReview[field]).length === 0) {
              const { [field]: removedField, ...remainingFields } =
                updatedApplicationReview;
              updatedApplicationReview = remainingFields;
            }
          }
        } else {
          // Eliminar la propiedad field sin usar delete
          const { [field]: removedField, ...remainingFields } =
            updatedApplicationReview;
          updatedApplicationReview = remainingFields;
        }
      } else {
        if (subField !== undefined && subField !== "") {
          updatedApplicationReview[field] = {
            ...updatedApplicationReview[field],
            [subField]: value,
          };
        } else {
          updatedApplicationReview[field] = value;
        }
      }

      return updatedApplicationReview;
    });
  };

  const handleReviewClear = () => {
    setApplicationReview({});
  };

  useEffect(() => {
    dispatch(updateApplicationReview(applicationReview));
  }, [applicationReview]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const disabledStyle = disabled ? "opacity-50" : "";

  const elementId1 = useId();
  const elementId2 = useId();
  const elementId3 = useId();
  const elementId4 = useId();
  const elementId5 = useId();
  const elementId6 = useId();
  const elementId7 = useId();
  const elementId8 = useId();
  const elementId9 = useId();
  const elementId10 = useId();
  const elementId11 = useId();

  return (
    <>
      {/* <FormPrompt hasUnsavedChanges={false} /> */}
      <div className="mt-3 mb-5">
        <label htmlFor="comment" className="text-sm text-gray-400 font-sans">
          Version Comment
        </label>
        <Textarea
          id="comment"
          placeholder="Leave a comment..."
          disabled={disabled}
          value={comment}
          required
          rows={4}
          color={"blue"}
          onChange={handleCommentChange}
        />
      </div>
      <div className="mb-2 flex flex-row justify-between items-center">
        <Label className="text-gray-400">Select any incorrect field.</Label>
        <button
          className="text-red-400 text-sm font-sans hover:text-red-500 disabled:hidden"
          onClick={() => handleReviewClear()}
          disabled={disabled}
        >
          Clear All
        </button>
      </div>
      <Accordion collapseAll>
        <AccordionPanel>
          <AccordionTitle className="h-4">Profile</AccordionTitle>
          <AccordionContent>
            <form className={disabledStyle}>
              <fieldset disabled={disabled}>
                <div className="mb-3">
                  <span className="text-sm tracking-tight text-gray-500">
                    Profile
                  </span>
                  <hr />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
                  {profileFields &&
                    Object.entries(profileFields).map(([key, value]) => {
                      return (
                        <div key={key} className="flex items-center gap-2">
                          <Checkbox
                            id={key + elementId1}
                            color={"blue"}
                            value={applicationReview?.profile?.[key] || false}
                            checked={applicationReview?.profile?.[key] || false}
                            onChange={(e) =>
                              handleReviewChange(
                                "profile",
                                key,
                                e.target.checked
                              )
                            }
                          />
                          <Label htmlFor={key + elementId1}>
                            {formatHeader(key)}
                          </Label>
                        </div>
                      );
                    })}
                </div>

                <div className="my-3">
                  <span className="text-sm tracking-tight text-gray-500">
                    Emergency Contacts
                  </span>
                  <hr />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
                  {profileContacts.length > 0 &&
                    profileContacts.map((field, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Checkbox
                          id={index + elementId2}
                          color={"blue"}
                          value={
                            applicationReview?.emergencyContacts?.[index] ||
                            false
                          }
                          checked={
                            applicationReview?.emergencyContacts?.[index] ||
                            false
                          }
                          onChange={(e) =>
                            handleReviewChange(
                              "emergencyContacts",
                              index,
                              e.target.checked
                            )
                          }
                        />
                        <Label htmlFor={index + elementId2}>
                          {field.relationship ||
                            field.firstNames + " " + field.lastNames}
                        </Label>
                      </div>
                    ))}
                </div>
                <div className="my-3">
                  <span className="text-sm tracking-tight text-gray-500">
                    Vaccines
                  </span>
                  <hr />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
                  {covidData.length > 0 &&
                    covidData.map((field, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Checkbox
                          id={index + elementId3}
                          color={"blue"}
                          value={
                            applicationReview?.vaccineCovid?.[index] || false
                          }
                          checked={
                            applicationReview?.vaccineCovid?.[index] || false
                          }
                          onChange={(e) =>
                            handleReviewChange(
                              "vaccineCovid",
                              index,
                              e.target.checked
                            )
                          }
                        />
                        <Label htmlFor={index + elementId3}>
                          {"Covid: " + field.Doze}
                        </Label>
                      </div>
                    ))}
                  {yellowData.length > 0 &&
                    yellowData.map((field, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Checkbox
                          id={index + elementId4}
                          color={"blue"}
                          value={
                            applicationReview?.vaccineYellowFever?.[index] ||
                            false
                          }
                          checked={
                            applicationReview?.vaccineYellowFever?.[index] ||
                            false
                          }
                          onChange={(e) =>
                            handleReviewChange(
                              "vaccineYellowFever",
                              index,
                              e.target.checked
                            )
                          }
                        />
                        <Label htmlFor={index + elementId4}>
                          {"Yellow Fever: " + field.Doze}
                        </Label>
                      </div>
                    ))}
                  {additionalVac.length > 0 &&
                    additionalVac.map((field, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Checkbox
                          id={index + elementId5}
                          color={"blue"}
                          value={
                            applicationReview?.AdditionalVaccine?.[index] ||
                            false
                          }
                          checked={
                            applicationReview?.AdditionalVaccine?.[index] ||
                            false
                          }
                          onChange={(e) =>
                            handleReviewChange(
                              "AdditionalVaccine",
                              index,
                              e.target.checked
                            )
                          }
                        />
                        <Label htmlFor={index + elementId5}>
                          {"Additional: " + field.vaccineName}
                        </Label>
                      </div>
                    ))}
                </div>
                <div className="my-3">
                  <span className="text-sm tracking-tight text-gray-500">
                    Languages
                  </span>
                  <hr />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={"spanish"}
                      color={"blue"}
                      value={applicationReview?.language?.spanish || false}
                      checked={applicationReview?.language?.spanish || false}
                      onChange={(e) =>
                        handleReviewChange(
                          "language",
                          "spanish",
                          e.target.checked
                        )
                      }
                    />
                    <Label htmlFor={"spanish"}>{"Spanish"}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={"english"}
                      color={"blue"}
                      value={applicationReview?.language?.english || false}
                      checked={applicationReview?.language?.english || false}
                      onChange={(e) =>
                        handleReviewChange(
                          "language",
                          "english",
                          e.target.checked
                        )
                      }
                    />
                    <Label htmlFor={"english"}>{"English"}</Label>
                  </div>
                  {profileLang?.other?.length > 0 &&
                    profileLang.other.map((field, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Checkbox
                          id={index + elementId6}
                          color={"blue"}
                          value={applicationReview?.language?.[index] || false}
                          checked={
                            applicationReview?.language?.[index] || false
                          }
                          onChange={(e) =>
                            handleReviewChange(
                              "language",
                              index,
                              e.target.checked
                            )
                          }
                        />
                        <Label htmlFor={index + elementId6}>
                          {"Additional: " + field.Language}
                        </Label>
                      </div>
                    ))}
                </div>
              </fieldset>
            </form>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle className="h-4">Documents</AccordionTitle>
          <AccordionContent>
            <form className={disabledStyle}>
              <fieldset disabled={disabled}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
                  {documents.length > 0 &&
                    documents.map((field, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Checkbox
                          id={index + elementId7}
                          color={"blue"}
                          value={applicationReview?.documents?.[index] || false}
                          checked={
                            applicationReview?.documents?.[
                              field.documentName.name
                            ] || false
                          }
                          onChange={(e) =>
                            handleReviewChange(
                              "documents",
                              field.documentName.name,
                              e.target.checked
                            )
                          }
                        />
                        <Label htmlFor={index + elementId7}>
                          {field.documentName.name || field.id}
                        </Label>
                      </div>
                    ))}
                </div>
                <div className="my-3">
                  <span className="text-sm tracking-tight text-gray-500">
                    Additional Documents
                  </span>
                  <hr />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
                  {additionalDocuments?.length > 0 &&
                    additionalDocuments.map((field, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Checkbox
                          id={index + elementId8}
                          color={"blue"}
                          value={
                            applicationReview?.additionalDocuments?.[index] ||
                            false
                          }
                          checked={
                            applicationReview?.additionalDocuments?.[
                              field.documentName
                            ] || false
                          }
                          onChange={(e) =>
                            handleReviewChange(
                              "additionalDocuments",
                              field.documentName,
                              e.target.checked
                            )
                          }
                        />
                        <Label htmlFor={index + elementId8}>
                          {field.documentName}
                        </Label>
                      </div>
                    ))}
                </div>
              </fieldset>
            </form>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle className="h-4">Certificates</AccordionTitle>
          <AccordionContent>
            <form className={disabledStyle}>
              <fieldset disabled={disabled}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
                  {certificates?.length > 0 &&
                    certificates.map((field, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Checkbox
                          id={index + elementId9}
                          color={"blue"}
                          value={
                            applicationReview?.certificates?.[index] || false
                          }
                          checked={
                            applicationReview?.certificates?.[
                              field.documentName.name
                            ] || false
                          }
                          onChange={(e) =>
                            handleReviewChange(
                              "certificates",
                              field.documentName.name,
                              e.target.checked
                            )
                          }
                        />
                        <Label htmlFor={index + elementId9}>
                          {field.documentName.name || field.id}
                        </Label>
                      </div>
                    ))}
                </div>
                <div className="my-3">
                  <span className="text-sm tracking-tight text-gray-500">
                    Additional Certificates
                  </span>
                  <hr />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
                  {additionalCertificates.length > 0 &&
                    additionalCertificates.map((field, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Checkbox
                          id={index + elementId10}
                          color={"blue"}
                          value={
                            applicationReview?.additionalCertificates?.[
                              index
                            ] || false
                          }
                          checked={
                            applicationReview?.additionalCertificates?.[
                              field.certificateName
                            ] || false
                          }
                          onChange={(e) =>
                            handleReviewChange(
                              "additionalCertificates",
                              field.certificateName,
                              e.target.checked
                            )
                          }
                        />
                        <Label htmlFor={index + elementId10}>
                          {field.certificateName}
                        </Label>
                      </div>
                    ))}
                </div>
              </fieldset>
            </form>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle className="h-4">Experience & Skills</AccordionTitle>
          <AccordionContent>
            <form className={disabledStyle}>
              <fieldset disabled={disabled}>
                <div className="mb-3">
                  <span className="text-sm tracking-tight text-gray-500">
                    On Board
                  </span>
                  <hr />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
                  {skills?.onboard?.length > 0 &&
                    skills.onboard.map((field, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Checkbox
                          id={index + elementId10}
                          color={"blue"}
                          value={applicationReview?.onBoard?.[index] || false}
                          checked={applicationReview?.onBoard?.[index] || false}
                          onChange={(e) =>
                            handleReviewChange(
                              "onBoard",
                              index,
                              e.target.checked
                            )
                          }
                        />
                        <Label htmlFor={index + elementId10}>
                          {field.vesselName}
                        </Label>
                      </div>
                    ))}
                </div>
                <div className="my-3">
                  <span className="text-sm tracking-tight text-gray-500">
                    On Land
                  </span>
                  <hr />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
                  {skills?.onland?.length > 0 &&
                    skills.onland.map((field, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Checkbox
                          id={index + elementId11}
                          color={"blue"}
                          value={applicationReview?.onLand?.[index] || false}
                          checked={applicationReview?.onLand?.[index] || false}
                          onChange={(e) =>
                            handleReviewChange(
                              "onLand",
                              index,
                              e.target.checked
                            )
                          }
                        />
                        <Label htmlFor={index + elementId11}>
                          {field.companyName}
                        </Label>
                      </div>
                    ))}
                </div>
                <div className="my-3">
                  <span className="text-sm tracking-tight text-gray-500">
                    Skills
                  </span>
                  <hr />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={"skills"}
                      color={"blue"}
                      value={applicationReview?.skills || false}
                      checked={applicationReview?.skills || false}
                      onChange={(e) =>
                        handleReviewChange("skills", "", e.target.checked)
                      }
                    />
                    <Label htmlFor={"skills"}>{"Skills"}</Label>
                  </div>
                </div>
              </fieldset>
            </form>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </>
  );
};
