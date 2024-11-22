import { Button } from "flowbite-react";
import {
  InputText,
  DatepickerComponent,
  SelectComponents,
  Dropzone,
} from "../../../../components/layoutComponents";
import { useState, useEffect } from "react";
import { getVesselTypeName } from "../../../../util/services";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteApplicantFile,
  uploadApplicantFile,
} from "../../../../store/userData";
import toast from "react-hot-toast";

export function FormsOnBoard({ onDataChange, editData, userData, validate }) {
  // const { userData } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    companyName: "",
    vesselName: "",
    "imo#": "",
    "gt/hp": "",
    typeOfVessel: [{ id: "", value: "" }],
    "rank/position": "",
    dateOn: "",
    dateOff: "",
    attach: null,
  });

  const [vesselTypeName, setVesselTypeName] = useState([]);

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

  const changeSelect = (e, name) => {
    const updatedData = {
      ...data,
      [name]: e,
    };
    setData(updatedData);
  };

  useEffect(() => {
    if (editData !== null) {
      setData(editData.data);
    }
    loadResults();
  }, []);

  const submitData = (e) => {
    e.preventDefault();
    let accion = "";
    editData != null ? (accion = 1) : (accion = 0);
    onDataChange(accion, data);
  };

  const loadResults = async () => {
    try {
      const vessel = await getVesselTypeName();
      setVesselTypeName(vessel);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  const changeDocument = async (file) => {
    if (!data.companyName && !data.vesselName) {
      alert(
        "Please set a valid Company Name and Vessel Name before uploading an attachment."
      );
    } else {
      let tituloalt;
      tituloalt = `${data.companyName}-${data.vesselName} Attach`.replace(
        /\//g,
        ""
      );

      if (file) {
        if (!file.url) {
          try {
            // Mostrar el toast mientras se sube el archivo
            const uploadedFile = await toast.promise(
              dispatch(
                uploadApplicantFile(
                  userData,
                  file,
                  "onBoardAttachments",
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
                `${"onBoardAttachments"}/`
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
      <form className="m-auto grid grid-cols-1 gap-4 items-end sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
        <DatepickerComponent
          label="Date on"
          datevalue={data?.dateOn || ""}
          name="dateOn"
          onChange={changeData}
          isValid={validate && data.dateOn}
        />
        <DatepickerComponent
          label="Date off"
          datevalue={data?.dateOff || ""}
          name="dateOff"
          onChange={changeData}
          isValid={validate && data.dateOff}
        />
        <InputText
          label="Company Name"
          name="companyName"
          value={data?.companyName || ""}
          onChange={changeData}
          isValid={validate && data.companyName}
        />
        <InputText
          label="Vessel Name"
          name="vesselName"
          value={data?.vesselName || ""}
          onChange={changeData}
          isValid={validate && data.vesselName}
        />
        <InputText
          label="IMO #"
          name="imo#"
          value={data?.["imo#"] || ""}
          onChange={changeData}
          isValid={validate && data["imo#"]}
        />
        <InputText
          label="GT/HP"
          name="gt/hp"
          value={data?.["gt/hp"] || ""}
          onChange={changeData}
          // isValid={data["gt/hp"]}
        />
        <SelectComponents
          // Text={
          //   data.typeOfVessel[0].value === ""
          //     ? "Seleccione type vessel"
          //     : data.typeOfVessel[0].value
          // }
          Text="Select a type of vessel"
          id="typeOfVessel"
          valueDefault="Type of Vessel"
          initialValue={data?.typeOfVessel[0]?.id}
          data={vesselTypeName}
          name_valor={true}
          name="typeOfVessel"
          idKey="Id"
          valueKey="vessel_name"
          onChange={(e, name) => changeSelect(e, name)}
          isValid={validate && data.typeOfVessel[0]?.id}
        />
        <InputText
          label="Rank Position"
          name="rank/position"
          value={data?.["rank/position"] || ""}
          onChange={changeData}
          isValid={validate && data["rank/position"]}
        />
      </form>
      <section className="pt-5">
        <Dropzone
          labelText="Add Attachment (Contract/Sea Service/Reference Letter/Discharge Letter)"
          onFileChange={changeDocument}
          DataDocument={data?.attach}
        />
      </section>
      <Button
        className="bg-[#1976d2] m-auto w-[50%] md:w-[20%] mt-5"
        type="submit"
        onClick={submitData}
        disabled={
          validate &&
          (!data.dateOn ||
            !data.dateOff ||
            !data.companyName ||
            !data.vesselName ||
            !data["imo#"] ||
            !data.typeOfVessel[0]?.id ||
            !data["rank/position"])
        }
      >
        {editData != null ? "Update" : "Add"}
      </Button>
    </>
  );
}
