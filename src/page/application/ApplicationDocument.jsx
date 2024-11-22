import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import {
  ButtonIcon,
  CardDocument,
  ModalYesNo,
} from "../../components/layoutComponents";
import autoAnimate from "@formkit/auto-animate";
import { getDocument, getPositions } from "../../util/services";
import Cookies from "js-cookie";
import {
  HiOutlineArrowSmRight,
  HiOutlineArrowSmLeft,
  HiOutlineQuestionMarkCircle,
  HiOutlinePlusSm,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { LoadingState } from "../../components/skeleton/LoadingState";
import {
  updateApplicationDocument,
  updateApplicationDocumentAdditional,
  updateApplicationFirestore,
} from "../../store/userData";
import toast from "react-hot-toast";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
  Button,
} from "flowbite-react";
import { FormPrompt } from "../../hooks/FormPrompt";
import { AddSomethingTable } from "./applicationProfile/components/AddSomethingTable";
import { AdditionalVaccineForm } from "./applicationProfile/components/AdditionalVaccineForm";
import { AdditionalDocumentsForm } from "./applicationProfile/components/AdditionalDocumentsForm";
import { GoPlusCircle } from "react-icons/go";

export function ApplicationDocument({ disabled = false }) {
  const dispatch = useDispatch();
  const { userData, isSaving } = useSelector((state) => state.userData);

  const [formData, setFormData] = useState(
    userData.applicationData.applicationDocument
  );
  const [document, setDocument] = useState([]);
  const [valueDocument, setValueDocument] = useState([]);
  const [visibleDocuments, setVisibleDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState("");
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);
  const parentRef = useRef(null);
  const cardRefs = useRef({});
  const fieldConfig = [
    { type: "inputText", label: "Document Number", name: "documentNumber" },
    { type: "inputText", label: "Place of Issue", name: "placeIssue" },
    { type: "select", label: "Country", name: "country" },
    { type: "datePicker", label: "Issue Date", name: "issueDate" },
    { type: "datePicker", label: "Expiration Date", name: "expirationDate" },
  ];
  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);

  const handleConfirm = () => {
    if (areAllFieldsFilled) {
      toast.promise(
        dispatch(
          updateApplicationFirestore(
            userData.uid,
            userData.applicationData,
            true,
            4
          )
        ),
        {
          loading: "Saving...",
          success: <b>Progress Saved!</b>,
          error: <b>Ups! Something went wrong. Try again</b>,
        }
      );
      setUnsavedChanges(false);
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  const handleBack = () => {
    toast.promise(
      dispatch(
        updateApplicationFirestore(
          userData.uid,
          userData.applicationData,
          true,
          2
        )
      ),
      {
        loading: "Saving...",
        success: <b>Progress Saved!</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
    setUnsavedChanges(false);
  };

  const areAllFieldsFilled = (data) => {
    return Object.values(data).every((value) => value !== null && value !== "");
  };

  // const hasAnyFieldFilled = (data) => {
  //   return Object.values(data).some((value) => value !== null && value !== "");
  // };
  const hasAnyFieldFilled = (data) => {
    return Object.keys(data)
      .filter((key) => key !== "documentName") // Filtrar el campo que quieres ignorar
      .some((key) => data[key] !== null && data[key] !== "");
  };

  const areAllMandatoryFieldsFilled = (documents, formData) => {
    // Verificar que todos los documentos obligatorios estén llenos
    const allMandatoryFilled = documents
      .filter((document) => document.documentMandatory)
      .every((document) => {
        const formDataEntry = formData.find((item) => item.id === document.Id);
        return formDataEntry ? areAllFieldsFilled(formDataEntry.data) : false;
      });

    // Verificar que todos los documentos no obligatorios con algún campo lleno estén completamente llenos
    const allNonMandatoryFilledIfStarted = documents
      .filter((document) => !document.documentMandatory)
      .every((document) => {
        const formDataEntry = formData.find((item) => item.id === document.Id);
        if (formDataEntry) {
          const anyFieldFilled = hasAnyFieldFilled(formDataEntry.data);
          const allFieldsFilled = areAllFieldsFilled(formDataEntry.data);
          return !anyFieldFilled || (anyFieldFilled && allFieldsFilled);
        }
        return true;
      });

    return allMandatoryFilled && allNonMandatoryFilledIfStarted;
  };

  const loadResults = async () => {
    try {
      // para tomar del store
      // userData.applicationData.applicationDocument
      // para mandar a guardar en el store
      //dispatch(updateApplicationDocument(formData));
      const document = await getDocument();
      const dataposition = await getPositions();
      // console.log(document);
      // console.log(dataposition);
      setDocument(document);
      const position = dataposition.filter(
        (item) =>
          item.Id == userData.applicationData.startApplication.position[0].id
      );
      const defaultDocumentIds = position[0].DefaultDocuments.replace(
        /[{}]/g,
        ""
      ).split(",");
      const DocumentMandatory = position[0].MandatoryDocuments.replace(
        /[{}]/g,
        ""
      ).split(",");
      const modifiedDocuments = document.map((doc) => {
        let visible = defaultDocumentIds.includes(String(doc.Id));
        // console.log(visible);
        // if (formData) {
        //   const cartaData = formData.find((item) => item.id === doc.Id);
        //   if (cartaData) {
        //     const hasData = Object.entries(cartaData.data).some(
        //       ([key, value]) => {
        //         // Ignora el campo 'DataDocument' y solo considera campos diferentes de null y no vacíos
        //         return key !== "DataDocument" && value !== null && value !== "";
        //       }
        //     );
        //     visible = hasData;
        //   }
        // }
        const visibleDefault = visible;
        // const mandatory = DocumentMandatory.includes(doc.Id);
        const mandatory = DocumentMandatory.some((id) => id == doc.Id);
        return {
          Id: doc.Id,
          name: doc.DocumentName,
          visible,
          visibleDefault,
          documentMandatory: mandatory,
        };
      });
      setValueDocument(modifiedDocuments);
      setVisibleDocuments(
        modifiedDocuments.filter((doc) => doc.visibleDefault)
      );
      if (formData.length === 0) {
        setFormData(
          modifiedDocuments.map((doc) => ({
            id: doc.Id,
            documentName: {
              name: doc.name,
              id: doc.Id,
            },
            data: {
              documentName: {
                name: doc.name,
                id: doc.Id,
              },
              documentNumber: "",
              placeIssue: "",
              country: "",
              issueDate: "",
              expirationDate: "",
              // documentAttach: null,
            },
          }))
        );
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  useEffect(() => {
    loadResults();
  }, []);

  const handleDataChange = (id, updatedData) => {
    const dataupdated = formData.map((item) =>
      item.id === id
        ? { ...item, data: { ...item.data, ...updatedData } }
        : item
    );
    setFormData(dataupdated);
    dispatch(updateApplicationDocument(dataupdated));
    setUnsavedChanges(true);
  };

  const handleSubmit = () => {
    // console.log(formData);
    // console.log(visibleDocuments);
  };

  const enviar = (event) => {
    event.preventDefault();
    toast.promise(
      dispatch(
        updateApplicationFirestore(
          userData.uid,
          userData.applicationData,
          false,
          userData.applicationStage + 1
        )
      ),
      {
        loading: "Saving...",
        success: <b>Saved!</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
    setUnsavedChanges(false);
  };

  const handleSelectChange = (event) => {
    setSelectedDocument(event.target.value);
  };

  const handleAddDocument = (e) => {
    e.preventDefault();
    const documentToAdd = valueDocument.find(
      (doc) => doc.Id === selectedDocument
    );
    if (
      documentToAdd &&
      !visibleDocuments.some((doc) => doc.Id === documentToAdd.Id)
    ) {
      setVisibleDocuments((prevDocs) => [...prevDocs, documentToAdd]);
      setValueDocument((prevDocs) =>
        prevDocs.map((doc) =>
          doc.Id === selectedDocument ? { ...doc, visibleDefault: true } : doc
        )
      );
      setTimeout(() => {
        cardRefs.current[documentToAdd.Id].scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
    setUnsavedChanges(true);
  };

  const handleRemoveDocument = (id) => {
    setVisibleDocuments((prevDocs) => prevDocs.filter((doc) => doc.Id !== id));
    setValueDocument((prevDocs) =>
      prevDocs.map((doc) =>
        doc.Id === id ? { ...doc, visibleDefault: false } : doc
      )
    );
    setFormData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              data: {
                documentName: {},
                documentNumber: "",
                placeIssue: "",
                Country: "",
                issueDate: "",
                expirationDate: "",
                documentAttach: null,
              },
            }
          : item
      )
    );
    setUnsavedChanges(true);
  };

  const handleAdditionalDocuments = (e) => {
    dispatch(updateApplicationDocumentAdditional(e));
  };

  const disabledStyle = disabled ? "opacity-50" : "";

  return (
    <>
      <form className={disabledStyle}>
        {/* <fieldset disabled={disabled}> */}
        <FormPrompt hasUnsavedChanges={unsavedChanges} />

        <div className="m-auto flex  flex-col md:flex-row  items-center pt-5 md:pt-8">
          <p className="text-center pr-3 font-normal">Additional Documents</p>
          <div className="flex justify-end">
            <select
              value={selectedDocument}
              onChange={handleSelectChange}
              className="p-2 border rounded"
            >
              <option value="">Select a document</option>
              {valueDocument
                .filter((doc) => !doc.visibleDefault)
                .map((doc) => (
                  <option key={doc.Id} value={doc.Id}>
                    {doc.name}
                  </option>
                ))}
            </select>
            <button
              onClick={handleAddDocument}
              className="ml-2 p-2 bg-blue-500 text-white rounded flex flex-row items-center gap-2"
            >
              {/* <HiOutlinePlusSm /> */}
              <GoPlusCircle className=" size-5" />
              <p className="hidden md:whitespace-nowrap md:block">Add New</p>
            </button>
          </div>
        </div>

        <section
          ref={parentRef}
          className="pt-8 md:pl-3 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10"
        >
          {visibleDocuments.length > 0
            ? visibleDocuments.map((item, index) => (
                <div
                  key={item.Id}
                  ref={(el) => (cardRefs.current[item.Id] = el)}
                  className=""
                >
                  <CardDocument
                    mandatory={item.documentMandatory}
                    name={item.name}
                    fieldConfig={fieldConfig}
                    id={item.Id}
                    titulo={item.name}
                    onDataChange={handleDataChange}
                    handleRemoveDocument={handleRemoveDocument}
                    buttonDelete={item.visible}
                    Datacard={formData.find((f) => f.id === item.Id)}
                    type={"documents"}
                  />
                </div>
              ))
            : // Renderizar 2 LoadingState si no hay documentos visibles
              Array.from({ length: 2 }).map((_, index) => (
                <LoadingState key={index} />
              ))}
        </section>
        <section className="mt-7">
          <AddSomethingTable
            title="Unlisted Documents"
            formTitle={
              "Add any other non-listed documents (not including certificates)."
            }
            newFormData={userData.applicationData.additionalDocuments || []}
            headers={[
              "Document Name",
              "Document Date",
              "Document Expiration",
              "Document Country",
              "Document Attach",
            ]}
            childrenForm={<AdditionalDocumentsForm userData={userData} />}
            onDataChange={handleAdditionalDocuments}
          />
        </section>
        {userData.role === 3 && userData.applicationStage < 7 && (
          <div className="flex items-center justify-center  pt-7 pb-7 gap-8">
            <ButtonIcon
              icon={<HiOutlineArrowSmLeft className="mr-2 h-5 w-5 " />}
              classnamebtn="bg-[#1976d2]  items-center text-center"
              label="Back"
              left={true}
              onClick={handleBack}
            />

            <ButtonIcon
              icon={<HiOutlineArrowSmRight className=" h-5 w-5" />}
              classnamebtn="bg-[#1976d2]"
              label="Continue"
              onClick={(e) => openModal(e)}
            />
          </div>
        )}

        <ModalYesNo
          text={
            areAllMandatoryFieldsFilled(visibleDocuments, formData)
              ? "Are you sure that you don't need to add additional documents?"
              : "Are you sure that you want to save this data?"
          }
          textyes="Save"
          disableButtonConfirm={
            !areAllMandatoryFieldsFilled(visibleDocuments, formData)
          }
          textno="Edit"
          icon={<HiOutlineQuestionMarkCircle className="w-9 h-9 m-auto" />}
          isOpen={isOpen}
          closeModal={closeModal}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          classmodal=""
          size="5xl"
        >
          <>
            {(visibleDocuments.some((document) => document.documentMandatory) ||
              formData.some((item) => hasAnyFieldFilled(item.data))) && (
              <>
                <p>❓: There is missing data</p>
                <p>✔: All data is correct</p>
              </>
            )}
            {visibleDocuments.some(
              (document) =>
                document.documentMandatory &&
                formData.find((item) => item.id === document.Id)
            ) && (
              <div className="">
                <p className="text-black font-bold underline pb-2">
                  Mandatory Documents
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-3 w-11/12  m-auto ">
                  {visibleDocuments
                    .filter((document) => document.documentMandatory) // Filtrar documentos con mandatory true
                    .map((document, index) => {
                      const formDataEntry = formData.find(
                        (item) => item.id === document.Id
                      );
                      const allFieldsFilled = formDataEntry
                        ? areAllFieldsFilled(formDataEntry.data)
                        : false;
                      return (
                        <li key={index}>
                          <label>
                            {!allFieldsFilled ? (
                              <span>❓</span>
                            ) : (
                              <span>✔</span>
                            )}
                            {document.name}
                          </label>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}

            {visibleDocuments.some(
              (document) =>
                !document.documentMandatory &&
                formData.find(
                  (item) =>
                    item.id === document.Id && hasAnyFieldFilled(item.data)
                )
            ) && (
              <div className="mt-4">
                <p className="text-black font-bold underline pb-2">
                  Manually added documents
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-3 w-11/12 m-auto">
                  {visibleDocuments
                    .filter((document) => !document.documentMandatory) // Filtrar documentos con mandatory false
                    .filter((document) => {
                      const formDataEntry = formData.find(
                        (item) => item.id === document.Id
                      );
                      return formDataEntry
                        ? hasAnyFieldFilled(formDataEntry.data)
                        : false;
                    }) // Filtrar documentos que tengan al menos un campo lleno
                    .map((document, index) => {
                      const formDataEntry = formData.find(
                        (item) => item.id === document.Id
                      );
                      const allFieldsFilled = formDataEntry
                        ? areAllFieldsFilled(formDataEntry.data)
                        : false;

                      return (
                        <li key={index}>
                          <label>
                            {allFieldsFilled ? <span>✔</span> : <span>❓</span>}
                            {document.name}
                          </label>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}
          </>
        </ModalYesNo>
        {/* </fieldset> */}
      </form>
    </>
  );
}
