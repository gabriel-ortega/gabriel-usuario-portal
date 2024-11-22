import { useState, useEffect } from "react";
import { Button, Textarea } from "flowbite-react";
import {
  DatepickerComponent,
  InputText,
  Dropzone,
} from "../../../../components/layoutComponents";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteApplicantFile,
  uploadApplicantFile,
} from "../../../../store/userData";

export function FormsOnLand({ onDataChange, editData, userData }) {
  // const { userData } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    companyName: "",
    dutiesOrResponsibilities: "",
    nameOfContactPersonAndTelephoneNumber: "",
    reasonForLeaving: "",
    // typeOfVessel: [{ id: "", value: "" }],
    "rank/position": "",
    dateOn: "",
    dateOff: "",
    attach: null,
  });
  const changeData = (e) => {
    const updatedData = {
      ...data,
      [e.target.name]:
        e.target.name == "Typeofvessel"
          ? [{ id: e.target.selectedOptions[0].id, value: e.target.value }]
          : e.target.value,
    };
    setData(updatedData);
  };

  useEffect(() => {
    if (editData !== null) {
      setData(editData.data);
    }
  }, []);
  const submitData = (e) => {
    e.preventDefault();
    let accion = "";
    editData != null ? (accion = 1) : (accion = 0);
    onDataChange(accion, data);
  };

  const changeDocument = async (file) => {
    if (!data.companyName) {
      alert("Please set a valid Company Name before uploading an attachment.");
    } else {
      let tituloalt;
      tituloalt = `${data.companyName} Attach`.replace(/\//g, "");

      if (file) {
        if (!file.url) {
          try {
            // Mostrar el toast mientras se sube el archivo
            const uploadedFile = await toast.promise(
              dispatch(
                uploadApplicantFile(
                  userData,
                  file,
                  "onLandAttachments",
                  tituloalt
                )
              ),
              {
                loading: `Uploading ${tituloalt}...`,
                success: <b>{tituloalt} uploaded successfully!</b>,
                error: <b>Failed to upload {tituloalt}. Please try again.</b>,
              }
            );

            // Actualizar los datos con el archivo subido
            const updatedData = {
              ...data,
              attach: uploadedFile,
            };
            setData(updatedData);
          } catch (error) {
            console.error(`Error uploading ${tituloalt}:`, error);
          }
        }
      } else {
        try {
          // Extraer el nombre del archivo a eliminar
          const fileExtension = data.attach.name.split(".").pop().toLowerCase();
          const { firstName, lastName } = userData;
          const displayName = `${firstName} ${lastName}`;
          const fileNameToDelete = `${displayName}-${tituloalt}.${fileExtension}`;

          // Mostrar el toast mientras se borra el archivo
          await toast.promise(
            dispatch(
              deleteApplicantFile(
                userData,
                fileNameToDelete,
                `${"onLandAttachments"}/`
              )
            ),
            {
              loading: `Deleting ${data.attach.name}...`,
              success: <b>{data.attach.name} deleted successfully!</b>,
              error: (
                <b>Failed to delete {data.attach.name}. Please try again.</b>
              ),
            }
          );

          // Limpiar los datos
          //   const updatedData = {
          //     ...data,
          //     DataDocument: null,
          //   };
          const updatedData = {
            ...data,
            attach: null,
          };
          setData(updatedData);
          //   onDataChange(id, updatedData);
        } catch (error) {
          console.error(`Error deleting ${data.attach.name}:`, error);
        }
      }
    }
  };

  return (
    <>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-9">
        <DatepickerComponent
          label="Date on"
          datevalue={data?.dateOn || ""}
          name="dateOn"
          onChange={changeData}
        />
        <DatepickerComponent
          label="Date off"
          datevalue={data?.dateOff || ""}
          name="dateOff"
          onChange={changeData}
        />
        <InputText
          label="Company Name"
          name="companyName"
          value={data?.companyName || ""}
          onChange={changeData}
        />
        <InputText
          label="Contact person telephone"
          name="nameOfContactPersonAndTelephoneNumber"
          value={data?.nameOfContactPersonAndTelephoneNumber || ""}
          onChange={changeData}
        />
        {/* <InputText
          label="Duties or responsibilities"
          name="dutiesOrResponsibilities"
          value={data?.dutiesOrResponsibilities || ""}
          onChange={changeData}
        /> */}
        <InputText
          label="Rank/Position"
          name="rank/position"
          value={data?.["rank/position"] || ""}
          onChange={changeData}
        />
        <InputText
          label="Reason for leaving"
          name="reasonForLeaving"
          value={data?.reasonForLeaving || ""}
          onChange={changeData}
        />
      </form>
      <div className="mt-4">
        <label
          htmlFor="dutiesOrResponsibilities"
          className="text-sm text-gray-400 font-sans"
        >
          Duties or responsibilities
        </label>
        <Textarea
          id="dutiesOrResponsibilities"
          name="dutiesOrResponsibilities"
          value={data?.dutiesOrResponsibilities || ""}
          placeholder="Duties or responsibilities"
          required
          rows={4}
          color="blue"
          onChange={changeData}
        />
      </div>
      <section className="pt-5">
        <Dropzone
          labelText="Add Attachment (Contract/Reference Letter)"
          onFileChange={changeDocument}
          DataDocument={data?.attach}
        />
      </section>
      <Button
        className="bg-[#1976d2] m-auto w-[50%] md:w-[20%] mt-5"
        type="submit"
        onClick={submitData}
      >
        {editData != null ? "Update" : "Add"}
      </Button>
    </>
  );
}
