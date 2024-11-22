import { Label } from "flowbite-react";
import React from "react";
import toast from "react-hot-toast";
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineUser,
} from "react-icons/hi";
import { MdOutlineAnchor } from "react-icons/md";
import { RiShipLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  deleteApplicantFile,
  updateSeafarerEmbark,
  uploadApplicantFile,
} from "../../../../store/userData";
import { Dropzone } from "../../../../components/layoutComponents";
import { useForm } from "../../../../hooks";
import { formatDate } from "../../../../util/helperFunctions";
import { FaFloppyDisk } from "react-icons/fa6";
import { useState } from "react";
import { setEmbarks } from "../../../../store/currentViews/viewSlice";

export const ApplicantEmbarkForm = () => {
  const dispatch = useDispatch();
  const { userData, isSaving } = useSelector((state) => state.userData);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const { currentEmbark, currentHiring, profile, embarks } = useSelector(
    (state) => state.currentViews
  );
  const {
    vessel,

    signedContract,
    peme,
    joining,
    evaluationsOnBoard,
    seaService,
    debriefing,
    formState,
    // unsavedChanges,
    onInputChange,
  } = useForm(currentEmbark);

  const save = (e) => {
    // e.preventDefault();

    const toUpdate = {
      ...formState,
      uid: profile.uid,
      contractId: currentHiring.id,
      contractCompany: currentHiring.company,
    };

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
    setUnsavedChanges(false);
  };

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
            setUnsavedChanges(true);
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
          setUnsavedChanges(true);
        } catch (error) {
          console.error(`Error deleting ${variableName?.name}:`, error);
        }
      }
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        <div className="flex items-center space-x-4">
          <HiOutlineCalendar className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium leading-none">Sign-on Date</p>
            <p className="text-sm text-muted-foreground">
              {formatDate(currentEmbark.signOnDate, "dddd, mmmm dd yyyy")}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <HiOutlineClock className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium leading-none">Contract Length</p>
            <p className="text-sm text-muted-foreground">
              {currentEmbark.contractLength} months
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <MdOutlineAnchor className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium leading-none">Sign-off Date</p>
            <p className="text-sm text-muted-foreground">
              {formatDate(currentEmbark.signOffDate, "dddd, mmmm dd yyyy")}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <RiShipLine className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium leading-none">Vessel</p>
            <p className="text-sm text-muted-foreground">
              {currentEmbark.vessel.name}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t pt-4 mt-4">
        <div className="flex flex-row justify-between">
          <h3 className="text-lg font-semibold mb-2">Documentation</h3>
          <button
            className={`${
              unsavedChanges ? "" : "hidden"
            } border border-[#010064] bg-[#010064] text-white size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30`}
            onClick={save}
            title={"Save"}
          >
            <FaFloppyDisk className="h-4 w-4" />
            <span className="hidden md:block ">{"Save"}</span>
          </button>
        </div>
        <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
          <Dropzone
            label="PEME + Medical"
            labelText="PEME + Medical"
            DataDocument={peme || null}
            name={"peme"}
            onFileChange={(e) => changeDocument(e, "PEME + Medical", "peme")}
            disableDelte
          />
          <Dropzone
            label="Joining Documents"
            labelText="Joining Documents"
            DataDocument={joining || null}
            name={"joining"}
            onFileChange={(e) =>
              changeDocument(e, "Joining Documents", "joining")
            }
            disableDelte
          />
          <Dropzone
            label="Signed Contract"
            labelText="Signed Contract"
            DataDocument={signedContract || null}
            name={"signedContract"}
            onFileChange={(e) =>
              changeDocument(e, "Signed Contract", "signedContract")
            }
            disableDelte
          />
          <Dropzone
            label="Evaluations On Board"
            labelText="Evaluations On Board"
            DataDocument={evaluationsOnBoard || null}
            name={"evaluationsOnBoard"}
            onFileChange={(e) =>
              changeDocument(e, "Evaluations On Board", "evaluationsOnBoard")
            }
            disableDelte
          />
          <Dropzone
            label="Sea Service Certificate"
            labelText="Sea Service Certificate"
            DataDocument={seaService || null}
            name={"seaService"}
            onFileChange={(e) =>
              changeDocument(e, "Sea Service Certificate", "seaService")
            }
            disableDelte
          />
          <Dropzone
            label="Debriefing"
            labelText="Debriefing"
            DataDocument={debriefing || null}
            name={"debriefing"}
            onFileChange={(e) => changeDocument(e, "Debriefing", "debriefing")}
            disableDelte
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicantEmbarkForm;
