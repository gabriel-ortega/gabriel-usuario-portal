import { useState } from "react";
import { useForm } from "../../../../hooks";
import { useEffect } from "react";
import {
  Badge,
  Button,
  Modal,
  Rating,
  Table,
  Textarea,
  TextInput,
  Tooltip,
} from "flowbite-react";
import { FaFloppyDisk } from "react-icons/fa6";
import { RiShipLine } from "react-icons/ri";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import {
  HiOutlineClipboardList,
  HiOutlineDocument,
  HiOutlineExclamationCircle,
  HiOutlineMenuAlt1,
  HiOutlinePlusSm,
} from "react-icons/hi";
import {
  DatepickerComponent,
  InputText,
  SelectComponents,
  Dropzone,
  ModalYesNo,
} from "../../../../components/layoutComponents";
import companiesData from "../../../../assets/tables/json/Companies.json";
import { FPMSSA09form } from "./FPMSSA09form";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  createSeafarerHiring,
  getSeafarerEmbarksByContract,
  getSeafarerEmbarksBySeafarer,
  updateSeafarerDataFirebase,
  updateSeafarerHiring,
} from "../../../../store/userData";
import { useDispatch } from "react-redux";
import { LoadingState } from "../../../../components/skeleton/LoadingState";
import {
  setCurrentEmbark,
  setCurrentHiring,
  setHirings,
  updateSeafarerStage,
} from "../../../../store/currentViews/viewSlice";
import { lazy } from "react";
import { Suspense } from "react";
import EmbarkStatus from "../../../../assets/tables/json/EmbarkStatus-static.json";
import FormatsHiring from "./FormatsHiring";
import { useMemo } from "react";
import FormatsEmbark from "./FormatsEmbark";
const EmbarkForm = lazy(() => import("./EmbarkForm"));

const formData = {
  status: "",
  company: "",
  interviewer: "",
  contractDate: "",
  employeeNumber: "",
  comment: "",
};

const formValidations = {
  status: [(value) => value?.id != 0, "This field is mandatory."],
  company: [(value) => value?.id != 0, "This field is mandatory."],
};

// Componente de evaluación reutilizable

export const HiringForm = ({
  data,
  handleOpenModal = () => {},
  onDataChange = () => {},
  interviewers,
  currentInterviewer,
  isModal = false,
  isNew = false,
}) => {
  const dispatch = useDispatch();
  const { isSaving, isLoading } = useSelector((state) => state.userData);
  const {
    profile,
    hirings,
    embarks,
    currentEmbark: currentEmbarkState,
    currentHiring,
  } = useSelector((state) => state.currentViews);
  const [isOpen, setIsOpen] = useState(false);

  const [isNewVariable, setIsNewVariable] = useState(false);

  const [currentInterviewerData, setCurrentInterviewerData] =
    useState(currentInterviewer);

  const [openModalWarning, setOpenModalWarning] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleOpen = (index) => {
    dispatch(setCurrentEmbark(embarks[index]));
    setIsNewVariable(false);
    setIsOpen(true);
  };

  /* FUNCION PARA CERRAR EL, MODAL */
  const closeModal = () => {
    setIsOpen(false);
    // setEditData(null);
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getSeafarerEmbarksByContract(data?.id));
    }
  }, []);

  const hiringData = useMemo(() => data, []);

  // Hook para gestionar el formulario
  const {
    status,
    statusValid,
    company,
    companyValid,
    interviewer,
    contractDate,
    employeeNumber,
    salary,
    comment,
    fpmssa09,
    formState,
    unsavedChanges,
    onInputChange,
    onSelectChange,
  } = useForm(
    hiringData || {
      status: "",
      company: "",
      interviewer: currentInterviewerData,
      contractDate: "",
      employeeNumber: "",
      comment: "",
    },
    formValidations
  );

  const handleFormChange = (e) => {
    console.log(e);
    onInputChange({ target: { name: "fpmssa09", value: e } });
  };

  // Combinar formState y evaluations para pasar a onDataChange
  useEffect(() => {
    let combinedState = {
      ...formState,
    };
    if (!formState.interviewer) {
      combinedState = {
        ...formState,
        interviewer: {
          id: currentInterviewerData,
          name: interviewers.find(
            (current) => current.uid === currentInterviewerData
          ).displayName,
        },
      };
      dispatch(setCurrentHiring(combinedState));
    }
    if (unsavedChanges) {
      if (!isModal) {
        onDataChange(combinedState);
      }
      dispatch(setCurrentHiring(combinedState));
    }
  }, [formState]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "green";
      case "Inactive":
        return "red";
      default:
        return "gray"; // Default color
    }
  };

  // const save = (e) => {
  //   e.preventDefault();

  //   // Verificación para nuevo registro
  //   if (isNew) {
  //     // Comprobación si status.name es 1 y ya existe un hiring activo
  //     if (formState.status.id === "1") {
  //       const existingActiveHiring = hirings.find(
  //         (hiring) => hiring.status.id === "1"
  //       );

  //       if (existingActiveHiring) {
  //         toast.error(
  //           `There is already an active hiring with ${existingActiveHiring.company.name}. You cannot add another.`
  //         );
  //         return; // Evita la creación si ya existe uno activo
  //       }
  //     }

  //     // Comprobación si ya existe otro hiring con la misma compañía
  //     const existingSameCompanyHiring = hirings.find(
  //       (hiring) => hiring.company.id === formState.company.id
  //     );

  //     if (existingSameCompanyHiring) {
  //       toast.error(
  //         `There is already a hiring with the company ${existingSameCompanyHiring.company.name}. Please use a different company.`
  //       );
  //       return; // Evita la creación si ya existe una contratación con la misma compañía
  //     }

  //     // Si pasa las verificaciones, se guarda el nuevo registro
  //     const data = { ...formState, uid: profile.uid };
  //     toast.promise(dispatch(createSeafarerHiring(data)), {
  //       loading: "Saving...",
  //       success: <b>Saved</b>,
  //       error: <b>Ups! Something went wrong. Try again</b>,
  //     });
  //   } else {
  //     // Guardar un hiring existente
  //     toast.promise(dispatch(updateSeafarerHiring(data.id, formState)), {
  //       loading: "Saving...",
  //       success: <b>Saved</b>,
  //       error: <b>Ups! Something went wrong. Try again</b>,
  //     });
  //   }
  // };

  const save = (e) => {
    // e.preventDefault();

    // Comprobación si status.name es 1 y ya existe un hiring activo
    if (formState.status.id === "1") {
      const existingActiveHiring = hirings.find(
        (hiring) => hiring.status.id === "1" && hiring.id !== formState.id // Evita validar contra sí mismo en edición
      );

      if (existingActiveHiring) {
        toast.error(
          `There is already an active hiring with ${existingActiveHiring?.company?.name}. You cannot add another.`
        );
        return; // Evita la creación/actualización si ya existe uno activo
      }
    }

    // Comprobación si ya existe otro hiring con la misma compañía
    const existingSameCompanyHiring = hirings.find(
      (hiring) =>
        hiring.company.id === formState.company.id && hiring.id !== formState.id // Evita validar contra sí mismo en edición
    );

    if (existingSameCompanyHiring) {
      toast.error(
        `There is already a hiring with the company ${existingSameCompanyHiring?.company?.name}. Please use a different company.`
      );
      return; // Evita la creación/actualización si ya existe una contratación con la misma compañía
    }

    // Si pasa las verificaciones, proceder con el guardado
    const data = { ...formState, uid: profile.uid };

    // Clone the hirings array to avoid mutating the original array
    const updatedArray = [...hirings];
    const currentIndex = updatedArray.findIndex((item) => item.id === data.id);

    //update de current interview
    updatedArray[currentIndex] = data;

    // dispatch(setHirings(updatedArray));

    if (isNew) {
      if (profile.recruitmentStage !== 5 && formState.status.id === "1") {
        setOpenModalWarning(true);
      } else {
        // Crear un nuevo registro de hiring
        toast.promise(dispatch(createSeafarerHiring(data, hirings)), {
          loading: "Saving...",
          success: <b>Saved</b>,
          error: <b>Ups! Something went wrong. Try again</b>,
        });
      }
    } else {
      dispatch(setHirings(updatedArray));
      // Actualizar un registro de hiring existente
      toast.promise(dispatch(updateSeafarerHiring(formState.id, formState)), {
        loading: "Saving...",
        success: <b>Saved</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      });
    }
  };

  const createNewNoStage = () => {
    const data = { ...formState, uid: profile.uid };
    toast.promise(dispatch(createSeafarerHiring(data, hirings)), {
      loading: "Saving...",
      success: <b>Saved</b>,
      error: <b>Ups! Something went wrong. Try again</b>,
    });
    setOpenModalWarning(false);
  };

  const createNewStage = () => {
    const data = { ...formState, uid: profile.uid };
    dispatch(updateSeafarerStage(5));
    dispatch(updateSeafarerDataFirebase(profile.uid, profile.seafarerData, 5));
    toast.promise(dispatch(createSeafarerHiring(data, hirings)), {
      loading: "Saving...",
      success: <b>Saved</b>,
      error: <b>Ups! Something went wrong. Try again</b>,
    });
    setOpenModalWarning(false);
  };

  const statusColor = getStatusColor(status?.name || "");

  const disabled = false;
  const disabledStyle = "";

  const handleNew = () => {
    dispatch(setCurrentEmbark({}));
    setIsNewVariable(true);
    setIsOpen(true);
  };

  return (
    <section>
      <section>
        <div className="flex flex-row justify-between items-center gap-2">
          <div
            className={`${
              isModal ? "hidden" : ""
            } font-bold flex flex-row items-center justify-start gap-2`}
          >
            Contract Status:
            <Badge color={statusColor} size={"sm"}>
              {status?.name || "--"}
            </Badge>
          </div>
          <div className={`flex justify-center md:justify-start gap-2 my-2`}>
            <Tooltip
              content="Make sure you filled all mandatory fields"
              style="light"
              className={
                isSaving || statusValid || !status || !company || companyValid
                  ? ""
                  : "hidden"
              }
            >
              <button
                className={`${
                  isModal ? "" : "hidden"
                } border border-[#010064] bg-[#010064] text-white size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
                disabled={
                  isSaving || statusValid || !status || !company || companyValid
                }
                onClick={() => save()}
                title={isNew ? "Save New" : "Save"}
              >
                <FaFloppyDisk className="h-4 w-4" />
                <span className="hidden md:block ">
                  {isNew ? "Save New" : "Save"}
                </span>
              </button>
            </Tooltip>
            <Tooltip
              content="Make sure you filled all mandatory fields before adding a new embark"
              style="light"
              className={
                isSaving || statusValid || !status || !company || companyValid
                  ? ""
                  : "hidden"
              }
            >
              <button
                className={`border border-blue-300 bg-white text-blue-600 size-10 md:w-48 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50 ${
                  isSaving || statusValid || !status || !company || companyValid
                    ? "opacity-30 "
                    : ""
                } `}
                onClick={() => handleNew()}
                disabled={
                  isSaving || statusValid || !status || !company || companyValid
                }
                title="Create new Embark"
              >
                <HiOutlinePlusSm className="h-4 w-4" />
                <span className="hidden md:block ">Create new Embark</span>
              </button>
            </Tooltip>
          </div>
        </div>

        <div className="my-5">
          <TabGroup>
            <TabList className=" flex flex-row  justify-center bg-white  ">
              <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 flex flex-col md:flex-row py-2 text-sm text-black items-center justify-center md:w-56 relative">
                <div className=" relative flex items-center">
                  <HiOutlineMenuAlt1 className=" w-7 h-7 md:inline-block mr-1 flex " />
                </div>
                <span className="mt-2 md:mt-0 md:ml-2 text-xs md:text-sm">
                  Details
                </span>
              </Tab>
              <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 flex flex-col md:flex-row py-2 text-sm text-black items-center justify-center md:w-56 relative">
                <div className=" relative flex items-center">
                  <RiShipLine className=" w-7 h-7 md:inline-block mr-1 flex " />
                </div>
                <span className="mt-2 md:mt-0 md:ml-2 text-xs md:text-sm">
                  Embarks
                </span>
              </Tab>
              <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 md:translate-y-0 h-15 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
                <div className="relative flex items-center">
                  <HiOutlineClipboardList className="w-7 h-7 inline-block mr-1" />
                </div>
                <span className="mt-2 md:mt-0 md:ml-2 text-xs md:text-sm">
                  F-PMSSA-09
                </span>
              </Tab>
              <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
                <div className="relative flex items-center">
                  <HiOutlineDocument className="w-7 h-7 inline-block mr-1" />
                </div>
                <span className="mt-2 md:mt-0 md:ml-2 text-xs md:text-sm">
                  Operational Forms
                </span>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <form className={disabledStyle}>
                  <fieldset disabled={disabled}>
                    <div className=" my-4 min-h-96">
                      <div className=" my-3 flex flex-col gap-4 justify-center md:flex-row md:justify-start md:w-1/2">
                        <Tooltip
                          content="Cannot edit the company of an active contract."
                          style="light"
                          className={data.status?.id == "1" ? "" : "hidden"}
                        >
                          <SelectComponents
                            disabled={data.status?.id == "1" ? true : false}
                            name="company"
                            data={companiesData}
                            idKey={"Id"}
                            valueKey={"CompanyName"}
                            name_valor={true}
                            initialValue={company?.id}
                            valueDefault="Company"
                            Text="Company"
                            isValid={companyValid || !company ? false : true}
                            onChange={onSelectChange}
                          />
                        </Tooltip>
                      </div>
                      <div className="m-auto grid grid-cols-1 gap-4 items-end sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
                        <Tooltip
                          content="Edit the contract status in the seafarer's profile."
                          style="light"
                          className={!isModal ? "" : "hidden"}
                        >
                          <SelectComponents
                            name="status"
                            data={[
                              { id: "1", name: "Active" },
                              { id: "2", name: "Inactive" },
                            ]}
                            idKey={"id"}
                            valueKey={"name"}
                            initialValue={status?.id}
                            name_valor={true}
                            disabled={!isModal}
                            valueDefault="Status"
                            Text="Status"
                            isValid={statusValid || !status ? false : true}
                            onChange={onSelectChange}
                          />
                        </Tooltip>
                        <DatepickerComponent
                          name="contractDate"
                          onChange={onInputChange}
                          label="Contract Date"
                          datevalue={contractDate || ""}
                        />
                        {/* <SelectComponents
                          name="interviewer"
                          onChange={onSelectChange}
                          valueDefault="Interviewer"
                          Text="Interviewer"
                        /> */}
                        <SelectComponents
                          Text="Select Interviewer"
                          name={"interviewer"}
                          valueDefault="Interviewer"
                          data={interviewers}
                          name_valor={true}
                          idKey={"uid"}
                          valueKey={"displayName"}
                          initialValue={
                            interviewer?.id
                              ? interviewer?.id
                              : currentInterviewerData
                          }
                          onChange={(e) => onSelectChange(e, "interviewer")}
                        />
                        <InputText
                          value={employeeNumber || ""}
                          label="Employee Number"
                          name="employeeNumber"
                          onChange={onInputChange}
                        />
                        <InputText
                          value={salary || ""}
                          label="Agreed Salary"
                          name="salary"
                          onChange={onInputChange}
                        />
                      </div>

                      <div className="mt-6">
                        <label
                          htmlFor="comment"
                          className="text-sm text-gray-400 font-sans"
                        >
                          Contract Comment
                        </label>
                        <Textarea
                          id="comment"
                          name="comment"
                          value={comment}
                          placeholder="Contract Comment..."
                          required
                          rows={4}
                          color="blue"
                          onChange={onInputChange}
                        />
                      </div>
                    </div>
                  </fieldset>
                </form>
              </TabPanel>
              <TabPanel>
                <section className="my-4 min-h-96">
                  <section className="overflow-x-auto">
                    <Table hoverable>
                      <Table.Head>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Vessel</Table.HeadCell>
                        <Table.HeadCell>Return Date</Table.HeadCell>
                        <Table.HeadCell>Commence Date</Table.HeadCell>
                        <Table.HeadCell>Sign On Date</Table.HeadCell>
                        <Table.HeadCell>
                          Contract Length (Months)
                        </Table.HeadCell>
                        <Table.HeadCell>Estimated Sign Off Date</Table.HeadCell>
                        <Table.HeadCell>Sign Off Date</Table.HeadCell>
                      </Table.Head>
                      <Table.Body className="divide-y cursor-pointer">
                        {embarks.length < 1 ? (
                          <Table.Row>
                            <Table.Cell className="whitespace-nowrap">
                              {"--"}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap">
                              {"--"}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap">
                              {"--"}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap">
                              {"--"}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap">
                              {"--"}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap">
                              {"--"}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap">
                              {"--"}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap">
                              {"--"}
                            </Table.Cell>
                          </Table.Row>
                        ) : (
                          embarks.map((embark, index) => (
                            <Table.Row
                              key={index}
                              onClick={() => handleOpen(index)}
                            >
                              {/* <Table.Cell className="whitespace-nowrap">
                                {index + 1 || "--"}
                              </Table.Cell> */}
                              <Table.Cell className="whitespace-nowrap">
                                {EmbarkStatus[embark?.status - 1]?.StatusName ||
                                  "--"}
                              </Table.Cell>
                              {/* <Table.Cell className="whitespace-nowrap">
                                {embark.contractCompany?.name || "--"}
                              </Table.Cell> */}
                              <Table.Cell className="whitespace-nowrap">
                                {embark.vessel?.name || "--"}
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap">
                                {embark.returnDate || "--"}
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap">
                                {embark.commenceDate || "--"}
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap">
                                {embark.signOnDate || "--"}
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap">
                                {embark.contractLength || "--"}
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap">
                                {embark.estimatedSignOffDate || "--"}
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap">
                                {embark.signOffDate || "--"}
                              </Table.Cell>
                            </Table.Row>
                          ))
                        )}
                      </Table.Body>
                    </Table>
                  </section>
                </section>
              </TabPanel>
              <TabPanel>
                <FPMSSA09form
                  data={fpmssa09}
                  onDataChange={(e) => handleFormChange(e)}
                />
              </TabPanel>
              <TabPanel>
                <FormatsHiring />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </section>
      <ModalYesNo
        size="4xl"
        text={
          <div>
            <div className="flex flex-row justify-center mb-2">
              <span>
                {profile.seafarerData?.seafarerProfile?.profile?.firstName ||
                profile.seafarerData?.seafarerProfile?.profile?.lastName
                  ? `${profile.seafarerData?.seafarerProfile?.profile?.firstName} ${profile.seafarerData?.seafarerProfile?.profile?.lastName}`
                  : profile?.displayName
                  ? profile?.displayName
                  : "--"}{" "}
                Embark:
              </span>
            </div>
            <div className="font-bold flex flex-row items-center justify-start gap-2">
              Company:
              <span className="text-gray-500 font-normal">
                {currentHiring.company?.name}
              </span>
            </div>
            <div className="font-bold flex flex-row items-center justify-start gap-2">
              Embark Status:
              <Badge color="red" size={"sm"}>
                {isNewVariable
                  ? ""
                  : EmbarkStatus[currentEmbarkState?.status - 1]?.StatusName}
              </Badge>
            </div>
          </div>
        }
        disableButtonConfirm={true}
        disableButtonCancel={true}
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <Suspense fallback={<LoadingState />}>
          <EmbarkForm isNew={isNewVariable} isModal data={currentEmbarkState} />
        </Suspense>
      </ModalYesNo>
      <Modal
        show={openModalWarning}
        size="md"
        onClose={() => setOpenModalWarning(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Adding a new active contract will set this seafarer's stage as
              "Hiring Process". Do you want to continue?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={() => createNewNoStage()}>
                Dont set the new stage
              </Button>
              <Button color="failure" onClick={() => createNewStage()}>
                Set new stage
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default HiringForm;
