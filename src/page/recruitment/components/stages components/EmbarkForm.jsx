import React from "react";
import { useState } from "react";
import { useForm } from "../../../../hooks";
import { useEffect } from "react";
import {
  Badge,
  Button,
  Modal,
  Table,
  Textarea,
  TextInput,
  Tooltip,
} from "flowbite-react";
import { FaFloppyDisk } from "react-icons/fa6";
import {
  HiAdjustments,
  HiArrowSmDown,
  HiArrowSmUp,
  HiCheck,
  HiCloudDownload,
  HiOutlineCheckCircle,
  HiOutlineClipboardList,
  HiOutlineDocument,
  HiOutlineExclamationCircle,
  HiOutlineMenuAlt1,
  HiOutlinePlusSm,
  HiOutlineShieldCheck,
  HiOutlineShieldExclamation,
  HiOutlineXCircle,
  HiSave,
  HiUserCircle,
  HiXCircle,
} from "react-icons/hi";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { RiShipLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  DatepickerComponent,
  InputText,
  SelectComponents,
  Dropzone,
  YesNoInput,
} from "../../../../components/layoutComponents";
import {
  createSeafarerEmbark,
  deleteApplicantFile,
  getSeafarerHiringsById,
  updateSeafarerDataFirebase,
  updateSeafarerEmbark,
  updateSeafarerHiring,
  updateUsersData,
  uploadApplicantFile,
} from "../../../../store/userData";
import { MdOutlineAccessTime } from "react-icons/md";
// import vesselData from "../../../../assets/tables/json/Vessels.json";
import EmbarkStatus from "../../../../assets/tables/json/EmbarkStatus-static.json";
import signOffReasonData from "../../../../assets/tables/json/SignOffReasons.json";

import Stages from "../../../../assets/tables/json/RecruitmentStage-static.json";
import { FaBriefcaseMedical } from "react-icons/fa";
import {
  setCurrentEmbark,
  setEmbarks,
  setProfileView,
} from "../../../../store/currentViews/viewSlice";
import toast from "react-hot-toast";
import FormF_PMSSA20 from "./FormF_PMSSA20";
import { formatDate } from "../../../../util/helperFunctions";
import { useMemo } from "react";
import FormatsEmbark from "./FormatsEmbark";
import { getReasons, getVessels } from "../../../../util/services";

const formData = {
  position: "",
  status: "",
  vessel: "",
  returnDate: "",
  commenceDate: "",
  signOnDate: "",
  contractLength: "",
  signOffDate: "",
  signOffReason: {},
  elegibleToReturn: "",
  doa: "",
  fpmssa20: {},
  comment: "",
  embarkStatus: false,
  estimatedSignOffDate: "",
};

const formValidations = {
  status: [(value) => value?.id != 0, "This field is mandatory."],
  vessel: [(value) => value?.id != 0, "This field is mandatory."],
  signOffReason: [(value) => value?.id != 0, "This field is mandatory."],
};

// function calculateEstimatedSignOffDate(signOnDate, contractLength) {
//   // Convertir el signOnDate a un objeto Date
//   const signOn = new Date(signOnDate);

//   // Obtener el día, mes y año del signOnDate
//   const day = signOn.getDate();
//   const month = signOn.getMonth() + 1; // Los meses en JS son 0 indexados, es decir, 0 = Enero
//   const year = signOn.getFullYear();

//   // Calcular el nuevo mes y año, añadiendo los meses del contractLength
//   const newMonth = month + parseInt(contractLength);

//   // Crear la nueva fecha de estimatedSignOffDate
//   const estimatedSignOffDate = new Date(year, newMonth, day);

//   // Retornar la fecha calculada en formato YYYY-MM-DD
//   const estimatedSignOffDateFormatted = estimatedSignOffDate
//     .toISOString()
//     .split("T")[0];

//   return estimatedSignOffDateFormatted;
// }

// function calculateEstimatedSignOffDate(signOnDate, contractLength) {
//   // Convertir el signOnDate a un objeto Date
//   const signOn = new Date(signOnDate);

//   // Obtener el mes y año del signOnDate
//   let year = signOn.getFullYear();
//   let month = signOn.getMonth() + 1; // Mes actual (1-indexado)

//   // Sumar la duración del contrato en meses
//   month += parseInt(contractLength);

//   // Ajustar año y mes si los meses se desbordan
//   while (month > 12) {
//     month -= 12;
//     year += 1;
//   }

//   // Asegurarse de que el día no exceda el último día del mes calculado
//   const day = Math.min(signOn.getDate(), new Date(year, month, 0).getDate());

//   // Crear la nueva fecha de estimatedSignOffDate
//   const estimatedSignOffDate = new Date(year, month - 1, day);

//   // Retornar la fecha calculada en formato YYYY-MM-DD
//   return estimatedSignOffDate.toISOString().split("T")[0];
// }

function calculateEstimatedSignOffDate(signOnDate, contractLength) {
  // Asegurarse de que signOnDate esté en formato "yyyy-mm-dd"
  const [year, month, day] = signOnDate.split("-").map(Number);

  // Crear la fecha manualmente, teniendo en cuenta que los meses son 0 indexados en JavaScript
  const signOn = new Date(year, month - 1, day);

  // Sumar la duración del contrato (en meses)
  signOn.setMonth(signOn.getMonth() + parseInt(contractLength, 10));

  // Formatear la fecha resultante a "yyyy-mm-dd"
  const estimatedSignOffDateFormatted = signOn.toISOString().split("T")[0];

  return estimatedSignOffDateFormatted;
}

export const EmbarkForm = ({
  data,
  handleOpenModal = () => {},
  onDataChange = () => {},
  currentInterviewer,
  isModal = false,
  isNew = false,
}) => {
  const dispatch = useDispatch();
  // const [vesselData, setVesselData] = useState([]);
  const { isSaving, isLoading } = useSelector((state) => state.userData);
  const {
    profile,
    embarks,
    currentHiring,
    currentEmbark,
    interviewers,
    positions,
    departments,
  } = useSelector((state) => state.currentViews);
  const [openModalWarning, setOpenModalWarning] = useState(false);
  const [openModalEndEmbark, setOpenModalEndEmbark] = useState(false);
  const [openModalPromote, setOpenModalPromote] = useState(false);
  const [openModalDemote, setOpenModalDemote] = useState(false);
  const [openModalCancel, setOpenModalCancel] = useState(false);
  const embarkData = useMemo(() => data, []);
  const [isNewLocal, setIsNewLocal] = useState(isNew);
  const [vesselData, setVesselData] = useState([]);
  const [filteredPositions, setFilteredPositions] = useState([]);
  const [reasonsData, setReasonsData] = useState([]);
  const [filteredReasonsData, setFilteredReasonsData] = useState([]);
  const [seguimientoReason, setSeguimientoReason] = useState();

  // Hook para gestionar el formulario
  const {
    status,
    vessel,
    vesselValid,
    interviewer,
    returnDate,
    commenceDate,
    contractCompany,
    commenceDateValid,
    signOnDate,
    formatsDate,
    contractLength,
    signOffDate,
    signOffDateValid,
    signOffReason,
    signOffReasonValid,
    elegibleToReturn,
    elegibleToReturnValid,
    estimatedSignOffDate,
    signedContract,
    peme,
    joining,
    medReport,
    unfit,
    fit,
    evaluationsOnBoard,
    seaService,
    fwa,
    debriefing,
    doa,
    fpmssa20,
    comment,
    formState,
    unsavedChanges,
    onInputChange,
    onSelectChange,
  } = useForm(isNew ? formData : embarkData || formData, formValidations);

  const filterReasons = (all = true) => {
    if (!all) {
      if (reasonsData.length > 0) {
        const filter = reasonsData.filter((row) => {
          let stagesArray;

          try {
            stagesArray =
              typeof row.stages === "string"
                ? JSON.parse(row.stages)
                : row.stages;
          } catch (error) {
            console.error("Error parsing stages:", error);
            return false; // Excluir la fila si no es válida
          }
          return stagesArray.includes(1);
        });
        setFilteredReasonsData(filter);
      }
    } else {
      setFilteredReasonsData(reasonsData);
    }
  };

  useEffect(() => {
    filterReasons(false);
  }, [reasonsData]);

  useEffect(() => {
    if (!isNewLocal) {
      if (currentHiring?.id !== data?.contractId) {
        dispatch(getSeafarerHiringsById(data.contractId));
      }
    }
    const fetchData = async () => {
      try {
        const vessels = await getVessels();
        const reasons = await getReasons();
        setReasonsData(reasons);
        const companyId = Number(currentHiring.company?.id);
        const filteredVessels = vessels.filter(
          (vessel) => vessel.CompanyId === companyId
        );
        setVesselData(filteredVessels);
      } catch (error) {
        console.error("Error fetching vessels:", error);
      }
    };
    // if (vesselData.length < 1) {
    fetchData();
    // }
  }, []);

  const handleFormChange = (e) => {
    onInputChange({ target: { name: "fpmssa20", value: e } });
  };

  // Combinar formState y evaluations para pasar a onDataChange
  useEffect(() => {
    const combinedState = {
      ...formState,
    };
    if (unsavedChanges) {
      if (!isModal) {
        onDataChange(combinedState);
        /*   onDataChange(combinedState); */
      } else {
        // console.log(combinedState);
      }
      dispatch(setCurrentEmbark(combinedState));
    }
  }, [formState]);

  useEffect(() => {
    const vesselType = profile.seafarerData.vesselType?.[0]?.id;
    const dept = profile.seafarerData.department?.[0]?.id;
    if (positions && departments && vesselType && dept) {
      if (vesselType == 1) {
        const filter = positions.filter((pos) => pos.PassengerDeptID == dept);
        setFilteredPositions(filter);
      } else if (vesselType == 2) {
        const filter = positions.filter((pos) => pos.MerchantDeptID == dept);
        setFilteredPositions(filter);
      }
    }
  }, [departments, positions, profile]);

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return "warning";
      case 2:
        return "green";
      case 3:
        return "orange";
      case 4:
        return "green";
      case 5:
        return "red";
      case 6:
        return "red";
      case 7:
        return "blue";
      default:
        return "gray"; // Default color
    }
  };

  const save = (e) => {
    // e.preventDefault();

    const toUpdate = {
      ...formState,
      uid: profile.uid,
      contractId: currentHiring.id,
      contractCompany: currentHiring.company,
    };

    if (isNewLocal) {
      // Si es un nuevo registro, lo añadimos al arreglo y realizamos el dispatch
      toast.promise(dispatch(createSeafarerEmbark(toUpdate)), {
        loading: "Saving...",
        success: <b>Saved</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      });

      const newEmbarksList = [...embarks, toUpdate];
      dispatch(setEmbarks(newEmbarksList));
      setIsNewLocal(false);
    } else {
      // Si no es nuevo, buscamos el índice en el arreglo actual para actualizarlo
      const embarkIndex = embarks.findIndex(
        (embark) => embark.id === currentEmbark.id
      );

      if (embarkIndex !== -1) {
        const updatedEmbarks = [...embarks];
        updatedEmbarks[embarkIndex] = {
          ...updatedEmbarks[embarkIndex],
          ...formState,
        };
        // console.log(updatedEmbarks);

        // Primero actualizamos el arreglo local antes del dispatch
        dispatch(setEmbarks(updatedEmbarks));

        toast.promise(
          dispatch(updateSeafarerEmbark(currentEmbark.id, formState)),
          {
            loading: "Saving...",
            success: <b>Saved</b>,
            error: <b>Ups! Something went wrong. Try again</b>,
          }
        );
      }
    }
    dispatch(setCurrentEmbark(toUpdate));
  };

  const [boardingStageValid, setBoardingStageValid] = useState(true);
  const [preValid, setPreValid] = useState(true);
  const [isOnBoardValid, setIsOnBoardValid] = useState(true);
  const [endEmbarkValid, setEndEmbarkValid] = useState(true);
  const [medicalLeaveValid, setMedicalLeaveValid] = useState(true);
  // const fit = false;
  // const unfit = true;

  useEffect(() => {
    const isBoardingStageValid = !!(
      vessel &&
      returnDate &&
      commenceDate &&
      signOnDate &&
      contractLength
    );
    const isPreValid = !!(vessel && returnDate);
    const isOnBoardValid = !!(signOnDate && contractLength);
    const isEndEmbarkValid = !!(
      signOffDate &&
      signOffReason &&
      elegibleToReturn !== ""
    );

    if (status == 3) {
      const isMedicalValid = !!fit;
      setMedicalLeaveValid(isMedicalValid);
    }

    setBoardingStageValid(isBoardingStageValid);
    setPreValid(isPreValid);
    setIsOnBoardValid(isOnBoardValid);
    setEndEmbarkValid(isEndEmbarkValid);
  }, [formState]);

  const statusColor = getStatusColor(status || "");

  const disabled = false;
  const disabledStyle = "";

  const changeDocument = async (file, fileName, variableName) => {
    if (!vessel?.name) {
      toast.error("Please set a valid Vessel before uploading an attachment.");
    } else if (
      !profile?.seafarerData?.seafarerProfile?.profile?.firstName ||
      !profile?.seafarerData?.seafarerProfile?.profile?.lastName
    ) {
      toast.error(
        "This seafarer's name is undefined. Make sure to set a first and last name before uploading a file."
      );
    } else {
      if (file) {
        if (!file.url) {
          try {
            // Mostrar el toast mientras se sube el archivo
            const uploadedFile = await toast.promise(
              dispatch(
                uploadApplicantFile(
                  {
                    uid: profile?.uid,
                    firstName:
                      profile?.seafarerData?.seafarerProfile?.profile
                        ?.firstName,
                    lastName:
                      profile?.seafarerData?.seafarerProfile?.profile?.lastName,
                  },
                  file,
                  `embarks/${currentEmbark?.vessel.name}`,
                  fileName
                )
              ),
              {
                loading: `Uploading ${fileName}...`,
                success: <b>{fileName} uploaded successfully!</b>,
                error: <b>Failed to upload {fileName}. Please try again.</b>,
              }
            );

            // Actualizar los datos con el archivo subido
            onInputChange({
              target: {
                name: variableName,
                value: uploadedFile,
              },
            });
          } catch (error) {
            console.error(`Error uploading ${fileName}:`, error);
          }
        }
      } else {
        try {
          // Extraer el nombre del archivo a eliminar
          const fileExtension = formState[variableName].name
            .split(".")
            .pop()
            .toLowerCase();
          const { firstName, lastName } =
            profile?.seafarerData?.seafarerProfile?.profile;
          const displayName = `${firstName} ${lastName}`;
          const fileNameToDelete = `${displayName}-${fileName}.${fileExtension}`;

          // Mostrar el toast mientras se borra el archivo
          await toast.promise(
            dispatch(
              deleteApplicantFile(
                {
                  uid: profile?.uid,
                  firstName:
                    profile?.seafarerData?.seafarerProfile?.profile?.firstName,
                  lastName:
                    profile?.seafarerData?.seafarerProfile?.profile?.lastName,
                },
                fileNameToDelete,
                `embarks/${currentEmbark?.vessel.name}/`
              )
            ),
            {
              loading: `Deleting ${formState[variableName].name}...`,
              success: (
                <b>{formState[variableName].name} deleted successfully!</b>
              ),
              error: (
                <b>
                  Failed to delete {formState[variableName].name}. Please try
                  again.
                </b>
              ),
            }
          );

          onInputChange({
            target: { name: variableName, value: null },
          });
        } catch (error) {
          console.error(`Error deleting ${variableName?.name}:`, error);
        }
      }
    }
  };

  useEffect(() => {
    if (contractLength && signOnDate) {
      const estimatedSignOffDateCalc = calculateEstimatedSignOffDate(
        signOnDate,
        contractLength
      );
      console.log(estimatedSignOffDateCalc);
      onInputChange({
        target: {
          name: "estimatedSignOffDate",
          value: estimatedSignOffDateCalc,
        },
      });
    }
  }, [contractLength, signOnDate]);

  const handlePrembark = () => {
    const toUpdate = {
      ...formState,
      status: 1,
      uid: profile.uid,
      contractId: currentHiring.id,
      contractCompany: currentHiring.company,
      position: profile.seafarerData.position[0].id,
    };

    if (isNewLocal) {
      // Si es un nuevo registro
      const newEmbarksList = [...embarks, toUpdate];
      dispatch(setEmbarks(newEmbarksList));
      setIsNewLocal(false);
      const updatedProfile = { ...profile, recruitmentStage: Stages[5].Id };
      dispatch(setProfileView(updatedProfile));
      toast.promise(
        Promise.all([
          dispatch(createSeafarerEmbark(toUpdate)),
          dispatch(
            updateSeafarerDataFirebase(
              profile.uid,
              profile.seafarerData,
              Stages[5].Id
            )
          ),
        ]),
        {
          loading: "Saving...",
          success: <b>Saved</b>,
          error: <b>Ups! Something went wrong. Try again</b>,
        }
      );
    } else {
      // Si es un registro existente
      const embarkIndex = embarks.findIndex(
        (embark) => embark.id === currentEmbark.id
      );

      if (embarkIndex !== -1) {
        const updatedEmbarks = [...embarks];
        updatedEmbarks[embarkIndex] = {
          ...updatedEmbarks[embarkIndex],
          ...formState,
          status: 1,
          position: profile.seafarerData.position[0].id,
        };
        dispatch(setEmbarks(updatedEmbarks));
        const updatedProfile = { ...profile, recruitmentStage: Stages[5].Id };
        dispatch(setProfileView(updatedProfile));
        toast.promise(
          Promise.all([
            dispatch(
              updateSeafarerEmbark(currentEmbark.id, {
                ...formState,
                status: 1,
              })
            ),
            dispatch(
              updateSeafarerDataFirebase(
                profile.uid,
                profile.seafarerData,
                Stages[5].Id
              )
            ),
          ]),
          {
            loading: "Saving...",
            success: <b>Saved</b>,
            error: <b>Ups! Something went wrong. Try again</b>,
          }
        );
      }
    }
    onInputChange({
      target: { name: "status", value: 1 },
    });
    dispatch(setCurrentEmbark(toUpdate));
  };

  const handleOnboard = () => {
    const toUpdate = {
      ...formState,
      status: 2,
      uid: profile.uid,
      contractId: currentHiring.id,
      contractCompany: currentHiring.company,
      position: profile.seafarerData.position[0].id,
    };

    if (isNewLocal) {
      // Si es un nuevo registro
      const newEmbarksList = [...embarks, toUpdate];
      dispatch(setEmbarks(newEmbarksList));
      setIsNewLocal(false);
      const updatedProfile = { ...profile, recruitmentStage: Stages[18].Id };
      dispatch(setProfileView(updatedProfile));
      toast.promise(
        Promise.all([
          dispatch(createSeafarerEmbark(toUpdate)),
          dispatch(
            updateSeafarerDataFirebase(
              profile.uid,
              profile.seafarerData,
              Stages[18].Id
            )
          ),
        ]),
        {
          loading: "Saving...",
          success: <b>Saved</b>,
          error: <b>Ups! Something went wrong. Try again</b>,
        }
      );
    } else {
      // Si es un registro existente
      const embarkIndex = embarks.findIndex(
        (embark) => embark.id === currentEmbark.id
      );

      if (embarkIndex !== -1) {
        const updatedEmbarks = [...embarks];
        updatedEmbarks[embarkIndex] = {
          ...updatedEmbarks[embarkIndex],
          ...formState,
          status: 2,
          position: profile.seafarerData.position[0].id,
        };
        dispatch(setEmbarks(updatedEmbarks));
        const updatedProfile = { ...profile, recruitmentStage: Stages[18].Id };
        dispatch(setProfileView(updatedProfile));
        toast.promise(
          Promise.all([
            dispatch(
              updateSeafarerEmbark(currentEmbark.id, {
                ...formState,
                status: 2,
              })
            ),
            dispatch(
              updateSeafarerDataFirebase(
                profile.uid,
                profile.seafarerData,
                Stages[18].Id
              )
            ),
          ]),
          {
            loading: "Saving...",
            success: <b>Saved</b>,
            error: <b>Ups! Something went wrong. Try again</b>,
          }
        );
      }
    }
    onInputChange({
      target: { name: "status", value: 2 },
    });
    dispatch(setCurrentEmbark(toUpdate));
  };
  const handleMedical = () => {
    const toUpdate = {
      ...formState,
      status: 3,
      uid: profile.uid,
      contractId: currentHiring.id,
      contractCompany: currentHiring.company,
    };

    if (isNewLocal) {
      // Si es un nuevo registro
      const newEmbarksList = [...embarks, toUpdate];
      dispatch(setEmbarks(newEmbarksList));
      setIsNewLocal(false);
      const updatedProfile = { ...profile, recruitmentStage: Stages[20].Id };
      dispatch(setProfileView(updatedProfile));
      toast.promise(
        Promise.all([
          dispatch(createSeafarerEmbark(toUpdate)),
          dispatch(
            updateSeafarerDataFirebase(
              profile.uid,
              profile.seafarerData,
              Stages[20].Id
            )
          ),
        ]),
        {
          loading: "Saving...",
          success: <b>Saved</b>,
          error: <b>Ups! Something went wrong. Try again</b>,
        }
      );
    } else {
      // Si es un registro existente
      const embarkIndex = embarks.findIndex(
        (embark) => embark.id === currentEmbark.id
      );

      if (embarkIndex !== -1) {
        const updatedEmbarks = [...embarks];
        updatedEmbarks[embarkIndex] = {
          ...updatedEmbarks[embarkIndex],
          ...formState,
          status: 3,
        };
        dispatch(setEmbarks(updatedEmbarks));
        const updatedProfile = { ...profile, recruitmentStage: Stages[20].Id };
        dispatch(setProfileView(updatedProfile));
        toast.promise(
          Promise.all([
            dispatch(
              updateSeafarerEmbark(currentEmbark.id, {
                ...formState,
                status: 3,
              })
            ),
            dispatch(
              updateSeafarerDataFirebase(
                profile.uid,
                profile.seafarerData,
                Stages[18].Id
              )
            ),
          ]),
          {
            loading: "Saving...",
            success: <b>Saved</b>,
            error: <b>Ups! Something went wrong. Try again</b>,
          }
        );
      }
    }
    onInputChange({
      target: { name: "status", value: 3 },
    });
    dispatch(setCurrentEmbark(toUpdate));
  };

  const [selectedStage, setselectedStage] = useState();

  const onSelectStageChange = (e) => {
    const selectedValue = e[0];
    const { id } = selectedValue;
    setselectedStage(Number(id));
  };

  const handleEndEmbark = () => {
    const toUpdate = {
      ...formState,
      status: selectedStage == 24 ? 5 : 4,
      uid: profile.uid,
      contractId: currentHiring.id,
      contractCompany: currentHiring.company,
    };

    // Crear el nuevo registro para agregar a `skills.onboard`
    const newOnboardSkill = {
      companyName: currentHiring.company?.name, // Nombre de la compañía
      vesselName: vessel?.name, // Nombre del buque
      "imo#": String(vesselData[vessel?.id - 1]?.IMO), // IMO #
      "gt/hp":
        vesselData[vessel?.id - 1]?.["Gross Tonage"] +
        "/" +
        vesselData[vessel?.id - 1]?.["HP"], // GT/HP
      typeOfVessel: [
        {
          name: vesselData[vessel?.id - 1]?.["Vessel Type"],
          id: vesselData[vessel?.id - 1]?.Id,
        },
      ], // Tipo de buque
      "rank/position": profile.seafarerData.position[0].name, // Rango/posición
      dateOn: signOnDate, // Fecha de inicio
      dateOff: signOffDate, // Fecha de finalización
    };

    // Agregar el nuevo registro al arreglo `skills.onboard`
    const updatedSkills = {
      ...profile.seafarerData.skills,
      onboard: [...profile.seafarerData.skills.onboard, newOnboardSkill],
    };

    const updatedProfileData = {
      ...profile.seafarerData,
      skills: updatedSkills,
    };

    if (isNewLocal) {
      const newEmbarksList = [...embarks, toUpdate];
      dispatch(setEmbarks(newEmbarksList));
      setIsNewLocal(false);

      const updatedProfile = {
        ...profile,
        recruitmentStage: selectedStage,
        seafarerData: updatedProfileData,
      };

      dispatch(setProfileView(updatedProfile));

      toast.promise(
        Promise.all([
          dispatch(createSeafarerEmbark(toUpdate)),
          dispatch(
            updateSeafarerDataFirebase(
              profile.uid,
              updatedProfileData,
              selectedStage
            )
          ),
        ]),
        {
          loading: "Saving...",
          success: <b>Saved</b>,
          error: <b>Ups! Something went wrong. Try again</b>,
        }
      );
    } else {
      const embarkIndex = embarks.findIndex(
        (embark) => embark.id === currentEmbark.id
      );

      if (embarkIndex !== -1) {
        const updatedEmbarks = [...embarks];
        updatedEmbarks[embarkIndex] = {
          ...updatedEmbarks[embarkIndex],
          ...formState,
          status: selectedStage == 24 ? 5 : 4,
        };

        dispatch(setEmbarks(updatedEmbarks));

        const updatedProfile = {
          ...profile,
          recruitmentStage: selectedStage,
          seafarerData: updatedProfileData,
        };

        dispatch(setProfileView(updatedProfile));

        toast.promise(
          Promise.all([
            dispatch(
              updateSeafarerEmbark(currentEmbark.id, {
                ...formState,
                status: selectedStage == 24 ? 5 : 4,
              })
            ),
            dispatch(
              updateSeafarerDataFirebase(
                profile.uid,
                updatedProfileData,
                selectedStage
              )
            ),
          ]),
          {
            loading: "Saving...",
            success: <b>Saved</b>,
            error: <b>Ups! Something went wrong. Try again</b>,
          }
        );
      }
    }
    onInputChange({
      target: { name: "status", value: selectedStage == 24 ? 5 : 4 },
    });
    dispatch(setCurrentEmbark(toUpdate));
    setOpenModalEndEmbark(false);
  };

  const handleCancel = () => {
    const toUpdate = {
      ...formState,
      status: 6,
      uid: profile.uid,
      contractId: currentHiring.id,
      contractCompany: currentHiring.company,
    };

    if (isNewLocal) {
      const newEmbarksList = [...embarks, toUpdate];
      dispatch(setEmbarks(newEmbarksList));
      setIsNewLocal(false);

      const updatedProfile = {
        ...profile,
        recruitmentStage: 23,
        seguimientoReason: seguimientoReason,
        available: false,
      };

      const updatedContract = {
        ...currentHiring,
        status: {
          id: "2",
          name: "Inactive",
        },
      };

      dispatch(setProfileView(updatedProfile));

      toast.promise(
        Promise.all([
          dispatch(createSeafarerEmbark(toUpdate)),
          dispatch(updateUsersData(profile.uid, updatedProfile)),
          dispatch(updateSeafarerHiring(currentHiring.id, updatedContract)),
        ]),
        {
          loading: "Saving...",
          success: <b>Saved</b>,
          error: <b>Ups! Something went wrong. Try again</b>,
        }
      );
    } else {
      const embarkIndex = embarks.findIndex(
        (embark) => embark.id === currentEmbark.id
      );

      if (embarkIndex !== -1) {
        const updatedEmbarks = [...embarks];
        updatedEmbarks[embarkIndex] = {
          ...updatedEmbarks[embarkIndex],
          ...formState,
          status: 6,
        };

        dispatch(setEmbarks(updatedEmbarks));

        const updatedProfile = {
          ...profile,
          recruitmentStage: 23,
          seguimientoReason: seguimientoReason,
          available: false,
        };
        const updatedContract = {
          ...currentHiring,
          status: {
            id: "2",
            name: "Inactive",
          },
        };
        dispatch(setProfileView(updatedProfile));

        toast.promise(
          Promise.all([
            dispatch(
              updateSeafarerEmbark(currentEmbark.id, {
                ...formState,
                status: 6,
              })
            ),
            dispatch(updateUsersData(profile.uid, updatedProfile)),
            dispatch(updateSeafarerHiring(currentHiring.id, updatedContract)),
          ]),
          {
            loading: "Saving...",
            success: <b>Saved</b>,
            error: <b>Ups! Something went wrong. Try again</b>,
          }
        );
      }
    }
    onInputChange({
      target: { name: "status", value: 6 },
    });
    dispatch(setCurrentEmbark(toUpdate));
    setOpenModalEndEmbark(false);
  };

  const [positionSelected, setPositionSelected] = useState();

  const handlePromote = () => {
    const today = formatDate(new Date().toISOString(), "yyyy-mm-dd");

    const toUpdate = {
      ...formState,
      status: 7,
      uid: profile.uid,
      contractId: currentHiring.id,
      contractCompany: currentHiring.company,
      elegibleToReturn: true,
      signOffReason: { id: "12", name: "Promotion" },
      // signOffDate: today,
    };

    // Crear el nuevo registro para agregar a `skills.onboard`
    const newOnboardSkill = {
      companyName: currentHiring.company?.name, // Nombre de la compañía
      vesselName: vessel?.name, // Nombre del buque
      "imo#": String(vesselData[vessel?.id - 1]?.IMO), // IMO #
      "gt/hp":
        vesselData[vessel?.id - 1]?.["Gross Tonage"] +
        "/" +
        vesselData[vessel?.id - 1]?.["HP"], // GT/HP
      typeOfVessel: [
        {
          name: vesselData[vessel?.id - 1]?.["Vessel Type"],
          id: vesselData[vessel?.id - 1]?.Id,
        },
      ], // Tipo de buque
      "rank/position":
        currentEmbark.position &&
        positions &&
        positions.find((pos) => pos.Id == currentEmbark.position).PositionName, // Rango/posición
      dateOn: signOnDate, // Fecha de inicio
      dateOff: today, // Fecha de finalización
    };

    // Agregar el nuevo registro al arreglo `skills.onboard`
    const updatedSkills = {
      ...profile.seafarerData.skills,
      onboard: [...profile.seafarerData.skills.onboard, newOnboardSkill],
    };

    const updatedProfileData = {
      ...profile.seafarerData,
      skills: updatedSkills,
      position: positionSelected,
    };

    if (isNewLocal) {
      const newEmbarksList = [...embarks, toUpdate];
      dispatch(setEmbarks(newEmbarksList));
      setIsNewLocal(false);

      const updatedProfile = {
        ...profile,
        recruitmentStage: 19,
        seafarerData: updatedProfileData,
        promoted: new Date().toISOString(),
      };

      dispatch(setProfileView(updatedProfile));

      toast.promise(
        Promise.all([
          dispatch(createSeafarerEmbark(toUpdate)),
          dispatch(
            updateSeafarerDataFirebase(profile.uid, updatedProfileData, 19)
          ),
        ]),
        {
          loading: "Saving...",
          success: <b>Saved</b>,
          error: <b>Ups! Something went wrong. Try again</b>,
        }
      );
    } else {
      const embarkIndex = embarks.findIndex(
        (embark) => embark.id === currentEmbark.id
      );

      if (embarkIndex !== -1) {
        const updatedEmbarks = [...embarks];
        updatedEmbarks[embarkIndex] = {
          ...updatedEmbarks[embarkIndex],
          ...formState,
          status: 7,
          uid: profile.uid,
          contractId: currentHiring.id,
          contractCompany: currentHiring.company,
          elegibleToReturn: true,
          signOffReason: { id: "12", name: "Promotion" },
          // signOffDate: today,
        };

        dispatch(setEmbarks(updatedEmbarks));

        const updatedProfile = {
          ...profile,
          recruitmentStage: 19,
          seafarerData: updatedProfileData,
          promoted: new Date().toISOString(),
        };

        dispatch(setProfileView(updatedProfile));
        toast.promise(
          Promise.all([
            dispatch(
              updateSeafarerEmbark(currentEmbark.id, {
                ...formState,
                status: 7,
                uid: profile.uid,
                contractId: currentHiring.id,
                contractCompany: currentHiring.company,
                elegibleToReturn: true,
                signOffReason: { id: "12", name: "Promotion" },
                // signOffDate: today,
              })
            ),
            dispatch(
              updateSeafarerDataFirebase(profile.uid, updatedProfileData, 19)
            ),
          ]),
          {
            loading: "Saving...",
            success: <b>Saved</b>,
            error: <b>Ups! Something went wrong. Try again</b>,
          }
        );
      }
      // onInputChange({
      //   target: { name: "status", value: 7 },
      // });
      // onInputChange({
      //   target: { name: "elegibleToReturn", value: true },
      // });
    }
    dispatch(setCurrentEmbark(toUpdate));
    setOpenModalEndEmbark(false);
  };
  const handleDemote = () => {
    const today = formatDate(new Date().toISOString(), "yyyy-mm-dd");

    const toUpdate = {
      ...formState,
      status: 7,
      uid: profile.uid,
      contractId: currentHiring.id,
      contractCompany: currentHiring.company,
      elegibleToReturn: true,
      signOffReason: { id: "13", name: "Demotion" },
      // signOffDate: today,
    };

    // Crear el nuevo registro para agregar a `skills.onboard`
    const newOnboardSkill = {
      companyName: currentHiring.company?.name, // Nombre de la compañía
      vesselName: vessel?.name, // Nombre del buque
      "imo#": String(vesselData[vessel?.id - 1]?.IMO), // IMO #
      "gt/hp":
        vesselData[vessel?.id - 1]?.["Gross Tonage"] +
        "/" +
        vesselData[vessel?.id - 1]?.["HP"], // GT/HP
      typeOfVessel: [
        {
          name: vesselData[vessel?.id - 1]?.["Vessel Type"],
          id: vesselData[vessel?.id - 1]?.Id,
        },
      ], // Tipo de buque
      "rank/position":
        currentEmbark.position &&
        positions &&
        positions.find((pos) => pos.Id == currentEmbark.position).PositionName, // Rango/posición
      dateOn: signOnDate, // Fecha de inicio
      dateOff: today, // Fecha de finalización
    };

    // Agregar el nuevo registro al arreglo `skills.onboard`
    const updatedSkills = {
      ...profile.seafarerData.skills,
      onboard: [...profile.seafarerData.skills.onboard, newOnboardSkill],
    };

    const updatedProfileData = {
      ...profile.seafarerData,
      skills: updatedSkills,
      position: positionSelected,
    };

    if (isNewLocal) {
      const newEmbarksList = [...embarks, toUpdate];
      dispatch(setEmbarks(newEmbarksList));
      setIsNewLocal(false);

      const updatedProfile = {
        ...profile,
        recruitmentStage: 19,
        seafarerData: updatedProfileData,
        demoted: new Date().toISOString(),
      };

      dispatch(setProfileView(updatedProfile));

      toast.promise(
        Promise.all([
          dispatch(createSeafarerEmbark(toUpdate)),
          dispatch(
            updateSeafarerDataFirebase(profile.uid, updatedProfileData, 19)
          ),
        ]),
        {
          loading: "Saving...",
          success: <b>Saved</b>,
          error: <b>Ups! Something went wrong. Try again</b>,
        }
      );
    } else {
      const embarkIndex = embarks.findIndex(
        (embark) => embark.id === currentEmbark.id
      );

      if (embarkIndex !== -1) {
        const updatedEmbarks = [...embarks];
        updatedEmbarks[embarkIndex] = {
          ...updatedEmbarks[embarkIndex],
          ...formState,
          status: 7,
          uid: profile.uid,
          contractId: currentHiring.id,
          contractCompany: currentHiring.company,
          elegibleToReturn: true,
          signOffReason: { id: "13", name: "Demotion" },
          // signOffDate: today,
        };

        dispatch(setEmbarks(updatedEmbarks));

        const updatedProfile = {
          ...profile,
          recruitmentStage: 19,
          seafarerData: updatedProfileData,
          demoted: new Date().toISOString(),
        };

        dispatch(setProfileView(updatedProfile));
        toast.promise(
          Promise.all([
            dispatch(
              updateSeafarerEmbark(currentEmbark.id, {
                ...formState,
                status: 7,
                uid: profile.uid,
                contractId: currentHiring.id,
                contractCompany: currentHiring.company,
                elegibleToReturn: true,
                signOffReason: { id: "13", name: "Demotion" },
                // signOffDate: today,
              })
            ),
            dispatch(
              updateSeafarerDataFirebase(profile.uid, updatedProfileData, 19)
            ),
          ]),
          {
            loading: "Saving...",
            success: <b>Saved</b>,
            error: <b>Ups! Something went wrong. Try again</b>,
          }
        );
      }
      // onInputChange({
      //   target: { name: "status", value: 7 },
      // });
      // onInputChange({
      //   target: { name: "elegibleToReturn", value: true },
      // });
    }
    dispatch(setCurrentEmbark(toUpdate));
    setOpenModalEndEmbark(false);
  };

  const [modalText, setModalText] = useState("");
  const [modalConfirm, setModalConfirm] = useState(() => () => {});

  const handleInception = (type) => {
    if (type === "pre-embark") {
      setModalText(
        "Are you sure that you want to set the new pre-embarkation for this seafarer? This will set the new stage as Embarkation Process."
      );
      setModalConfirm(() => handlePrembark);
      setOpenModalWarning(true);
    } else if (type === "onboard") {
      setModalText(
        "Are you sure that you want to set the new pre-embarkation for this seafarer? This will set the new stage as On Board."
      );
      setModalConfirm(() => handleOnboard);
      setOpenModalWarning(true);
    } else if (type === "sign-off") {
      setModalText(
        "Are you sure that you want to end this embark? This will set the new stage as Vacation."
      );
      // setModalConfirm(() => handleStatusButton("sign-off"));
      setOpenModalEndEmbark(true);
    } else if (type === "medical") {
      setModalText(
        "Are you sure that you want to set the new stage as Medical Leave?"
      );
      setModalConfirm(() => handleMedical);
      setOpenModalWarning(true);
    } else if (type === "cancel") {
      setModalText("Are you sure that you want to cancel this embark?");
      setModalConfirm(() => handleCancel);
      setOpenModalCancel(true);
    } else if (type === "promote") {
      setModalText("Are you sure that you want to promote this seafarer?");
      setModalConfirm(() => handlePromote);
      setOpenModalPromote(true);
    } else if (type === "demote") {
      setModalText("Are you sure that you want to demote this seafarer?");
      setModalConfirm(() => handleDemote);
      setOpenModalDemote(true);
    }
  };

  useEffect(() => {
    // console.log(new Date(estimatedSignOffDate));
    console.log(formatDate(estimatedSignOffDate, "dddd, mmmm dd yyyy"));
  }, [estimatedSignOffDate]);

  return (
    <section>
      <section>
        {/*------------------------------------------ ESTATUS ACTUAL (invisible si es modal) */}
        <div className="flex flex-row justify-between items-center gap-2">
          <div
            className={`${
              isModal ? "hidden" : ""
            } font-bold flex flex-row items-center justify-start gap-2`}
          >
            Embark Status:
            <Badge color={statusColor} size={"sm"}>
              {/* {status.name} */}
              {currentEmbark.status
                ? EmbarkStatus[status - 1].StatusName
                : "Undefined"}
            </Badge>
          </div>

          {/*------------------------------------------ BOTONES DE CONTROL */}

          <div className={`flex justify-center md:justify-start gap-2 my-2`}>
            <Tooltip
              content="Make sure you filled all mandatory fields"
              style="light"
              className={"hidden"}
            >
              <button
                className={`${
                  isModal ? "" : "hidden"
                } border border-[#010064] bg-[#010064] text-white size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
                // disabled={
                //   isSaving || statusValid || !status || !company || companyValid
                // }
                onClick={save}
                title={isNewLocal ? "Save New" : "Save"}
              >
                <FaFloppyDisk className="h-4 w-4" />
                <span className="hidden md:block ">
                  {isNewLocal ? "Save New" : "Save"}
                </span>
              </button>
            </Tooltip>
            <Tooltip
              content="Cannot apply Pre-Embarkation Status."
              style="light"
              className={
                status == 1 ||
                status == 2 ||
                status == 3 ||
                status == 4 ||
                status == 7 ||
                !preValid
                  ? ""
                  : "hidden"
              }
            >
              <button
                className={`border border-yellow-300 bg-white text-yellow-600 size-10 md:w-48 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-yellow-50 disabled:opacity-30`}
                // disabled={status == 2 || status == 3 || status == 4}
                disabled={
                  status == 1 ||
                  status == 2 ||
                  status == 3 ||
                  status == 4 ||
                  status == 7 ||
                  !preValid
                }
                onClick={() => handleInception("pre-embark")}
                title={"Set Pre-Embarkation"}
              >
                <MdOutlineAccessTime className="h-4 w-4" />
                <span className="hidden md:block ">
                  {"Set Pre-Embarkation"}
                </span>
              </button>
            </Tooltip>
            <Tooltip
              content="Cannot apply On Board Status."
              style="light"
              className={
                status == 2 ||
                status == 4 ||
                status == 5 ||
                status == 6 ||
                status == 7 ||
                !isOnBoardValid
                  ? ""
                  : "hidden"
              }
            >
              <button
                className={`border border-green-300 bg-white text-green-600 size-10 md:w-36 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-green-50 disabled:opacity-30`}
                disabled={
                  status == 2 ||
                  status == 4 ||
                  status == 5 ||
                  status == 6 ||
                  status == 7 ||
                  !isOnBoardValid
                }
                onClick={() => handleInception("onboard")}
                title={"Set On Board"}
              >
                <HiCheck className="h-4 w-4" />
                <span className="hidden md:block ">{"Set On Board"}</span>
              </button>
            </Tooltip>

            <Tooltip
              content="Cannot End the Embark."
              style="light"
              className={
                (status !== 2 && status !== 3) || !endEmbarkValid
                  ? ""
                  : "hidden"
              }
            >
              <button
                className={`border border-red-300 bg-white text-red-600 size-10 md:w-36 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-red-50 disabled:opacity-30`}
                disabled={(status !== 2 && status !== 3) || !endEmbarkValid}
                onClick={() => handleInception("sign-off")}
                title={"End Embark"}
              >
                <HiSave className="h-4 w-4" />
                <span className="hidden md:block ">{"End Embark"}</span>
              </button>
            </Tooltip>
            <Tooltip
              content={
                signOffReason?.id !== 2 && !unfit && status == 2
                  ? "Set Medical Leave and upload an Unfit for duty before applying Medical Leave Status."
                  : "Cannot Apply Medical Leave Status."
              }
              style="light"
              className={
                (signOffReason?.id !== 2 && !unfit && status == 2) ||
                !unfit ||
                status !== 2
                  ? ""
                  : "hidden"
              }
            >
              <button
                className={` border border-orange-300 bg-white text-orange-600 size-10 md:w-36 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-red-50 disabled:opacity-30`}
                disabled={!unfit || status !== 2}
                onClick={() => handleInception("medical")}
                title={"Medical Leave"}
              >
                <FaBriefcaseMedical className="h-4 w-4" />

                <span className="hidden md:block ">{"Medical Leave"}</span>
              </button>
            </Tooltip>
          </div>
        </div>
        {status == 1 && (
          <div className="flex justify-end">
            <button
              className={` border border-red-300 bg-white text-red-600 size-10 md:w-36 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-red-50 disabled:opacity-30`}
              // disabled={!unfit || status !== 2}
              onClick={() => handleInception("cancel")}
              title={"Cancel Embark"}
            >
              <HiOutlineXCircle className="h-4 w-4" />

              <span className="hidden md:block ">{"Cancel Embark"}</span>
            </button>
          </div>
        )}
        {status == 2 && (
          <div className="flex justify-end gap-3">
            <button
              className={` border border-green-500 bg-green-500 text-white size-10 md:w-48 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-green-600`}
              // disabled={!unfit || status !== 2}
              onClick={() => handleInception("promote")}
              title={"Promote Seafarer"}
            >
              <HiOutlineShieldCheck className="h-4 w-4" />

              <span className="hidden md:block ">{"Promote Seafarer"}</span>
            </button>
            <button
              className={` border border-orange-500 bg-orange-500 text-white size-10 md:w-48 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-orange-600`}
              // disabled={!unfit || status !== 2}
              onClick={() => handleInception("demote")}
              title={"Demote Seafarer"}
            >
              <HiOutlineShieldExclamation className="h-4 w-4" />

              <span className="hidden md:block ">{"Demote Seafarer"}</span>
            </button>
          </div>
        )}

        <div className="my-5">
          <TabGroup>
            <TabList className=" flex flex-row  justify-center bg-white  ">
              <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
                <div className="relative flex items-center">
                  <HiArrowSmUp className="w-7 h-7 inline-block mr-1" />
                  {!boardingStageValid && (
                    <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                      !
                    </span>
                  )}
                </div>
                <span className="mt-2 md:mt-0 md:ml-2 text-xs md:text-sm">
                  Boarding Stage
                </span>
              </Tab>
              <Tab
                disabled={
                  currentEmbark.status == 1 || !currentEmbark.status
                    ? true
                    : false
                }
                className={`${
                  currentEmbark.status == 1 || !currentEmbark.status
                    ? "opacity-20"
                    : ""
                } data-[selected]:border-b-2 border-blue-500 px-2 flex flex-col md:flex-row py-2 text-sm text-black items-center justify-center md:w-56 relative`}
              >
                <div className="relative flex items-center">
                  <HiArrowSmDown className="w-7 h-7 inline-block mr-1" />
                  {!endEmbarkValid && currentEmbark.status > 1 && (
                    <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                      !
                    </span>
                  )}
                </div>
                <span className="mt-2 md:mt-0 md:ml-2 text-xs md:text-sm">
                  Dissembark Stage
                </span>
              </Tab>
              <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 flex flex-col md:flex-row py-2 text-sm text-black items-center justify-center md:w-56 relative">
                <div className=" relative flex items-center">
                  <RiShipLine className=" w-7 h-7 md:inline-block mr-1 flex " />
                </div>
                <span className="mt-2 md:mt-0 md:ml-2 text-xs md:text-sm">
                  F-PMSSA-20
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
                      <div className=" my-3 flex flex-col gap-4 justify-center md:flex-row md:justify-start">
                        <div className="w-full">
                          <Tooltip
                            content="This company has no vessels registered."
                            style="light"
                            className={`${
                              vesselData.length == 0 ? "" : "hidden"
                            } m-auto`}
                          >
                            <SelectComponents
                              name="vessel"
                              data={vesselData}
                              idKey={"Id"}
                              valueKey={"Vessel Name"}
                              name_valor={true}
                              initialValue={vessel?.id}
                              valueDefault="Vessel"
                              Text="Vessel"
                              isValid={vesselValid || !vessel ? false : true}
                              onChange={onSelectChange}
                              disabled={status?.id > 1 ? true : false}
                              // onChange={(e) => console.log(e)}
                            />
                          </Tooltip>
                        </div>
                        <div className="w-full">
                          <div className="flex flex-col gap-4 items-center">
                            <a
                              htmlFor=""
                              className={`text-sm text-gray-400  block`}
                            >
                              {"IMO Number:"}
                            </a>
                            <p>{vesselData[vessel?.id - 1]?.IMO || "--"}</p>
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="flex flex-col gap-4 items-center">
                            <a
                              htmlFor=""
                              className={`text-sm text-gray-400  block`}
                            >
                              {"Vessel Type:"}
                            </a>
                            <p>
                              {vesselData[vessel?.id - 1]?.["Vessel Type"] ||
                                "--"}
                            </p>
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="flex flex-col gap-4 items-center">
                            <a
                              htmlFor=""
                              className={`text-sm text-gray-400  block`}
                            >
                              {"Vessel Flag:"}
                            </a>
                            <p>{vesselData[vessel?.id - 1]?.Flag || "--"}</p>
                          </div>
                        </div>
                      </div>
                      <div className="m-auto grid grid-cols-1 gap-4 items-end sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
                        <SelectComponents
                          Text="Select Interviewer"
                          name={"interviewer"}
                          valueDefault="Interviewer"
                          data={interviewers}
                          name_valor={true}
                          idKey={"uid"}
                          valueKey={"displayName"}
                          initialValue={interviewer?.id ? interviewer?.id : ""}
                          onChange={(e) => onSelectChange(e, "interviewer")}
                        />
                        <DatepickerComponent
                          name="returnDate"
                          onChange={onInputChange}
                          label="Return Date"
                          datevalue={returnDate || ""}
                          isValid={returnDate}
                        />
                        <DatepickerComponent
                          name="commenceDate"
                          onChange={onInputChange}
                          label="Commence Date"
                          datevalue={commenceDate || ""}
                          isValid={commenceDate}
                        />
                        <DatepickerComponent
                          name="formatsDate"
                          onChange={onInputChange}
                          label="Forms Date"
                          datevalue={formatsDate || ""}
                          isValid={formatsDate}
                        />
                        <DatepickerComponent
                          name="signOnDate"
                          // onChange={onSignOnChange}
                          onChange={onInputChange}
                          label="Sign On Date"
                          datevalue={signOnDate || ""}
                          isValid={signOnDate}
                        />
                      </div>
                      <div className=" my-3 flex flex-col gap-4 justify-center items-end md:flex-row md:justify-start">
                        <InputText
                          value={contractLength || ""}
                          label="Contract Length (Months)"
                          name="contractLength"
                          // onChange={onLengthChange}
                          onChange={onInputChange}
                          isValid={contractLength}
                          type="number"
                        />
                        <div className="w-full">
                          <div className="flex flex-col gap-4 items-center">
                            <a
                              htmlFor=""
                              className={`text-sm text-gray-400  block`}
                            >
                              {"Estimated Sign Off:"}
                            </a>
                            <p>
                              {estimatedSignOffDate
                                ? formatDate(estimatedSignOffDate, "mm-dd-yyyy")
                                : "---"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="m-auto grid grid-cols-1 gap-4 items-end sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
                        <Dropzone
                          label="PEME + Medical"
                          labelText="PEME + Medical"
                          DataDocument={peme || null}
                          name={"peme"}
                          onFileChange={(e) =>
                            changeDocument(e, "PEME + Medical", "peme")
                          }
                        />
                        <Dropzone
                          label="Joining Documents"
                          labelText="Joining Documents"
                          DataDocument={joining || null}
                          name={"joining"}
                          onFileChange={(e) =>
                            changeDocument(e, "Joining Documents", "joining")
                          }
                        />
                        <Dropzone
                          label="Signed Contract"
                          labelText="Signed Contract"
                          DataDocument={signedContract || null}
                          name={"signedContract"}
                          onFileChange={(e) =>
                            changeDocument(
                              e,
                              "Signed Contract",
                              "signedContract"
                            )
                          }
                        />
                      </div>
                    </div>
                  </fieldset>
                </form>
              </TabPanel>
              <TabPanel>
                <section className="min-h-96 mt-4">
                  <div className="m-auto grid grid-cols-1 gap-4 items-end sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
                    <DatepickerComponent
                      name="signOffDate"
                      onChange={onInputChange}
                      label="Sign Off Date"
                      datevalue={signOffDate || ""}
                      isValid={signOffDate}
                    />
                  </div>
                  <div className="m-auto mt-5 mb-5 grid grid-cols-1 gap-4 items-end sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
                    <SelectComponents
                      name="signOffReason"
                      data={signOffReasonData}
                      idKey={"Id"}
                      valueKey={"Reason"}
                      name_valor={true}
                      initialValue={signOffReason?.id}
                      valueDefault="Sign Off Reason"
                      Text="Sign Off Reason"
                      isValid={!signOffReason?.id ? false : true}
                      onChange={onSelectChange}
                    />
                    <YesNoInput
                      text="Elegible to Return"
                      name="elegibleToReturn"
                      onChange={onInputChange}
                      defaultChecked={elegibleToReturn}
                      isValid={elegibleToReturn !== ""}
                    />
                    <DatepickerComponent
                      name="doa"
                      onChange={onInputChange}
                      label="DOA"
                      datevalue={doa || ""}
                      isValid={doa}
                    />
                  </div>
                  <div className="m-auto grid grid-cols-1 gap-4 items-end sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
                    {signOffReason?.id == "11" && status == 2 && (
                      <Dropzone
                        label="Unfit For Duty Report"
                        labelText="Unfit For Duty Report"
                        DataDocument={unfit || null}
                        name={"unfit"}
                        onFileChange={(e) =>
                          changeDocument(e, "Unfit For Duty Report", "unfit")
                        }
                      />
                    )}
                  </div>
                  <div
                    className={`${
                      status == 3 ? "" : "hidden"
                    } m-auto grid grid-cols-1 gap-4 items-end sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2`}
                  >
                    <Dropzone
                      label="Medical Follow Up Reports"
                      labelText="Medical Follow Up Reports"
                      DataDocument={medReport || null}
                      name={"medReport"}
                      onFileChange={(e) =>
                        changeDocument(
                          e,
                          "Medical Follow Up Reports",
                          "medReport"
                        )
                      }
                    />
                    <Dropzone
                      label="Medical Fit For Duty Report"
                      labelText="Medical Fit For Duty Report"
                      DataDocument={fit || null}
                      name={"fit"}
                      onFileChange={(e) =>
                        changeDocument(e, "Medical Fit For Duty Report", "fit")
                      }
                    />
                  </div>
                  <div className="m-auto grid grid-cols-1 gap-4 items-end sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
                    <Dropzone
                      label="Evaluations On Board"
                      labelText="Evaluations On Board"
                      DataDocument={evaluationsOnBoard || null}
                      name={"evaluationsOnBoard"}
                      onFileChange={(e) =>
                        changeDocument(
                          e,
                          "Evaluations On Board",
                          "evaluationsOnBoard"
                        )
                      }
                    />
                    <Dropzone
                      label="Sea Service Certificate"
                      labelText="Sea Service Certificate"
                      DataDocument={seaService || null}
                      name={"seaService"}
                      onFileChange={(e) =>
                        changeDocument(
                          e,
                          "Sea Service Certificate",
                          "seaService"
                        )
                      }
                    />
                    <Dropzone
                      label="Final Wage Account"
                      labelText="Final Wage Account"
                      DataDocument={fwa || null}
                      name={"fwa"}
                      onFileChange={(e) =>
                        changeDocument(e, "Final Wage Account", "fwa")
                      }
                    />
                    <Dropzone
                      label="Debriefing"
                      labelText="Debriefing"
                      DataDocument={debriefing || null}
                      name={"debriefing"}
                      onFileChange={(e) =>
                        changeDocument(e, "Debriefing", "debriefing")
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="comment"
                      className="text-sm text-gray-400 font-sans"
                    >
                      Embark Comment
                    </label>
                    <Textarea
                      id="comment"
                      name="comment"
                      value={comment}
                      placeholder="Embark Comment..."
                      required
                      rows={4}
                      color="blue"
                      onChange={onInputChange}
                    />
                  </div>
                </section>
              </TabPanel>
              <TabPanel>
                <section className="min-h-96">
                  <FormF_PMSSA20
                    formData={fpmssa20}
                    onDataChange={handleFormChange}
                  />
                </section>
              </TabPanel>
              <TabPanel>
                <section className="min-h-96">
                  <FormatsEmbark />
                </section>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </section>
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
              {modalText}
            </h3>

            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={() => setOpenModalWarning(false)}>
                Cancel
              </Button>
              <Button
                color="failure"
                onClick={() => {
                  modalConfirm();
                  setOpenModalWarning(false);
                }}
              >
                Set new stage
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={openModalEndEmbark}
        size="md"
        onClose={() => setOpenModalEndEmbark(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center space-y-3">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {
                "Please select the final Status for this Seafarer once the Embark is completed."
              }
            </h3>
            <SelectComponents
              name="recruitmentStage"
              data={[
                { id: 20, value: "Vacation" },
                { id: 24, value: "Contract Revoked" },
                { id: 4, value: "GAP Pool" },
              ]}
              idKey={"id"}
              valueKey={"value"}
              name_valor={true}
              initialValue={""}
              valueDefault="Recruitment Stage"
              Text="Recruitment Stage"
              isValid={selectedStage}
              onChange={onSelectStageChange}
            />
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={() => setOpenModalEndEmbark(false)}>
                Cancel
              </Button>
              <Button
                color="failure"
                disabled={!selectedStage}
                onClick={() => handleEndEmbark()}
              >
                Set new stage
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={openModalPromote}
        size="md"
        onClose={() => setOpenModalPromote(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {modalText}
            </h3>
            <div className="flex flex-col gap-5 my-6">
              <span>Select the new position for this seafarer:</span>
              <SelectComponents
                id="position"
                valueDefault={"Position"}
                // data={positions}
                data={filteredPositions}
                name_valor={true}
                idKey="Id"
                valueKey="PositionName"
                name="positionSelected"
                Text="Select a Position"
                initialValue={profile?.seafarerData.position[0]?.id}
                onChange={(value) => setPositionSelected(value)}
              />
            </div>
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={() => setOpenModalPromote(false)}>
                Cancel
              </Button>
              <Button
                color="success"
                disabled={
                  positionSelected == profile?.seafarerData.position[0]?.id ||
                  !positionSelected
                }
                onClick={() => {
                  handlePromote();
                }}
              >
                Promote Seafarer
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={openModalDemote}
        size="md"
        onClose={() => setOpenModalDemote(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {modalText}
            </h3>
            <div className="flex flex-col gap-5 my-6">
              <span>Select the new position for this seafarer:</span>
              <SelectComponents
                id="position"
                valueDefault={"Position"}
                // data={positions}
                data={filteredPositions}
                name_valor={true}
                idKey="Id"
                valueKey="PositionName"
                name="positionSelected"
                Text="Select a Position"
                initialValue={profile?.seafarerData.position[0]?.id}
                onChange={(value) => setPositionSelected(value)}
              />
            </div>
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={() => setOpenModalDemote(false)}>
                Cancel
              </Button>
              <Button
                color="success"
                disabled={
                  positionSelected == profile?.seafarerData.position[0]?.id ||
                  !positionSelected
                }
                onClick={() => {
                  handleDemote();
                }}
              >
                Demote Seafarer
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={openModalCancel}
        size="md"
        onClose={() => setOpenModalCancel(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {modalText}
            </h3>
            <div className="flex flex-col gap-5 my-6">
              <span>Select a reason for this embark's cancellation:</span>
              <div className="flex flex-row gap-5 items-end">
                <SelectComponents
                  id="seguimientoReason"
                  valueDefault="Reject Reason"
                  Text="Select a Reject Reason"
                  data={filteredReasonsData}
                  name_valor={false}
                  idKey="id"
                  valueKey="reason"
                  name="seguimientoReason"
                  // initialValue={application?.seguimientoReason}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    // console.log(selectedValue);
                    setSeguimientoReason(selectedValue);
                  }}
                />
                <button
                  className={`border border-red-600 bg-red-600 text-white size-10 md:w-28 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed`}
                  onClick={() => filterReasons(true)}
                >
                  <HiXCircle className="h-4 w-4" />
                  <span className="hidden md:block ">Override Reasons</span>
                </button>{" "}
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={() => setOpenModalCancel(false)}>
                Cancel
              </Button>
              <Button
                color="failure"
                // disabled={
                //   positionSelected == profile?.seafarerData.position[0]?.id ||
                //   !positionSelected
                // }
                onClick={() => {
                  handleCancel();
                }}
              >
                Cancel Embark
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default EmbarkForm;
