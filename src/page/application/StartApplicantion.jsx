import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SelectComponents,
  ButtonIcon,
  ModalYesNo,
} from "../../components/layoutComponents";
import {
  getVesselType,
  getDepartments,
  getPositions,
} from "../../util/services";
import {
  HiOutlineArrowSmRight,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi";
import {
  setLoading,
  updateApplicationFirestore,
  updateApplicationStage,
  updateApplicationStart,
} from "../../store/userData";
import toast from "react-hot-toast";
import { FormPrompt } from "../../hooks/FormPrompt";

const dataFix = {
  startApplication: {
    vesselType: [{ id: "" }],
    department: [{ id: "" }],
    position: [{ name: "" }],
  },
  applicationProfile: {
    firstName: "",
    lastName: "",
    dateBirth: "",
    codePhone: " ",
    phone: "",
    codeWhats: "",
    whats: "",
    countryBirth: "",
    countryResidency: "",
    address: "",
    airport: "",
    identification: "",
    gender: "",
    materialStatus: "",
    education: "",
    abouthUS: "",
    englishLevel: "",
    selectedValues: { materialStatus: {}, education: {} },
  },
  applicationDocument: {},
  skills: {},
};

export function StartApplicantion() {
  const dispatch = useDispatch();
  const { userData, isLoading } = useSelector((state) => state.userData);
  const { uid } = useSelector((state) => state.auth);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const [data, setData] = useState({
    Vessel: {},
    Departament: {},
    Position: {},
  });
  const [datafilter, setDataFilter] = useState({
    Departament: {},
    Position: {},
  });
  const [selectedValues, setSelectedValues] = useState({
    vesselType: [{ id: "" }],
    department: [{ id: "" }],
    position: [{ name: "" }],
  });
  const [disableSelect, setDisableSelect] = useState({
    Vessel: false,
    Departament: true,
    Position: true,
  });
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
    // setUnsavedChanges(false);
  };
  const closeModal = () => setIsOpen(false);
  const [clean, setClean] = useState();

  // Manejo del boton de continuar
  const handleConfirm = () => {
    if (selectedValues.position[0].id > 0 && disableSelect.Position == false) {
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
    } else {
      alert("te faltan datos");
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  const loadResults = async () => {
    try {
      const vessel = await getVesselType();
      const department = await getDepartments();
      const position = await getPositions();
      setData({ Vessel: vessel, Departament: department, Position: position });
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  useEffect(() => {
    if (userData.applicationData.startApplication) {
      setSelectedValues(userData.applicationData.startApplication);
    }
    loadResults();
  }, []);

  useEffect(() => {
    if (
      Object.keys(data.Vessel).length !== 0 &&
      Object.keys(data.Departament).length !== 0 &&
      Object.keys(data.Position).length !== 0
    ) {
      setDisableSelect((prevState) => ({
        ...prevState,
        Departament: selectedValues.vesselType[0].id.length > 0 ? false : true,
        Position:
          selectedValues.vesselType[0].id.length > 0 &&
          selectedValues.department[0].id.length > 0
            ? false
            : true,
      }));
      if (!disableSelect.Vessel) {
        setDataFilter((prevState) => ({
          ...prevState,
          Departament: data.Departament.filter((item) => {
            const filterdepartament = item.TypeOfVessel.replace(
              /[{}]/g,
              ""
            ).split(",");
            return filterdepartament.includes(selectedValues.vesselType[0].id);
          }),
          Position: data.Position.filter((dept) =>
            selectedValues.vesselType[0].id === "1"
              ? dept.PassengerDeptID == selectedValues.department[0].id
              : dept.MerchantDeptID == selectedValues.department[0].id
          ),
        }));
      }
      dispatch(updateApplicationStart(selectedValues));
    }
  }, [clean, data]);

  // TODO: arreglar la primera vez que se crea la aplicacion.
  // useEffect(() =>{
  //      if(selectedValues.vesselType[0].id == "" && disableSelect.Departament==true ){
  //       setSelectedValues((prevState) => ({
  //         ...prevState,
  //         department:[{id:"",name:""}]
  //       }))
  //     }

  //     if(selectedValues.department[0].id == "" && disableSelect.Position==true || selectedValues.vesselType[0].id == "" ){
  //       setSelectedValues((prevState) => ({
  //         ...prevState,
  //         position:[{id:"",name:""}]
  //       }))
  //     }
  //   },[disableSelect])

  const handleSelectChange = (value, name) => {
    if (
      selectedValues.vesselType[0].id == "" &&
      disableSelect.Departament == true
    ) {
      setSelectedValues((prevState) => ({
        ...prevState,
        department: [{ id: "", name: "" }],
      }));
    }

    if (
      (selectedValues.department[0].id == "" &&
        disableSelect.Position == true) ||
      selectedValues.vesselType[0].id == ""
    ) {
      setSelectedValues((prevState) => ({
        ...prevState,
        position: [{ id: "", name: "" }],
      }));
    }
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setClean(clean == false ? true : false);

    setUnsavedChanges(true);
  };

  const mostrar = () => {
    console.log(data.Position.find((pos) => pos.Id == "2"));
  };

  return (
    <>
      {/* <FormPrompt hasUnsavedChanges={unsavedChanges} /> */}
      {/* <button onClick={mostrar}>hola</button> */}
      <section className="md:flex pt-6 text-center items-center justify-between ">
        <SelectComponents
          data={data.Vessel}
          name="vesselType"
          idKey="Id"
          valueKey="Name"
          className="flex-grow md:pr-4"
          valueDefault="Recruitment Department"
          id="vesselType"
          classnamediv=""
          classelect="w-60 truncate overflow-ellipsis m-auto"
          onChange={(value) => handleSelectChange(value, "vesselType")}
          disabled={disableSelect.Vessel}
          name_valor={true}
          initialValue={selectedValues.vesselType[0].id}
        />
        <SelectComponents
          data={datafilter.Departament}
          name="department"
          idKey="Id"
          valueKey="DepartmentName"
          className="flex-grow pt-7 md:pr-4 md:pt-0 "
          valueDefault="Department"
          id="Department"
          classnamediv=""
          classelect="w-60 truncate overflow-ellipsis m-auto"
          onChange={(value) => handleSelectChange(value, "department")}
          disabled={disableSelect.Departament}
          name_valor={true}
          initialValue={selectedValues.department[0].id}
        />
        <SelectComponents
          data={datafilter.Position}
          name="position"
          idKey="Id"
          valueKey="PositionName"
          className="flex-grow pt-7 md:pt-0 "
          valueDefault="Position"
          id="Position"
          classelect="w-60 truncate overflow-ellipsis m-auto"
          classnamediv=""
          name_valor={true}
          onChange={(value) => handleSelectChange(value, "position")}
          disabled={disableSelect.Position}
          initialValue={selectedValues.position[0].id}
        />
      </section>
      <ButtonIcon
        onClick={openModal}
        classnamebtn="bg-[#1976d2]"
        classname={`flex justify-center pt-7 pb-7 ${
          userData.role !== 3 && "hidden"
        }`}
        label="Start Process"
        icon={<HiOutlineArrowSmRight className=" ml-2 h-5 w-5" />}
      />

      <ModalYesNo
        text={
          selectedValues.position[0].id > 0 && disableSelect.Position == false
            ? "Are you sure you want to start your application process with the selected position?"
            : "You need to select a position."
        }
        textyes="Start"
        disableButtonConfirm={
          selectedValues.position[0].id > 0 && disableSelect.Position == false
            ? false
            : true
        }
        textno={
          selectedValues.position[0].id > 0 && disableSelect.Position == false
            ? "Edit"
            : "OK"
        }
        icon={<HiOutlineQuestionMarkCircle className="w-9 h-9 m-auto" />}
        isOpen={isOpen}
        closeModal={closeModal}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        classmodal="pt-[50%] md:pt-0"
      />
    </>
  );
}
