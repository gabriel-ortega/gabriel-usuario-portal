import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "../../../../hooks";
import { ageCalc, ageCalcNumber } from "../../../../util/helperFunctions";
import { Avatar, FileInput } from "flowbite-react";
import { HiOutlineCamera } from "react-icons/hi";
import {
  DatepickerComponent,
  HeightComponent,
  InputText,
  ModalYesNo,
  SelectComponentCountry,
  SelectComponenteCountryCode,
  SelectComponents,
  WeightComponent,
  YesNoInput,
  Dropzone,
} from "../../../../components/layoutComponents";
import {
  getHarvester,
  getGender,
  getMaterialStatus,
  getEducation,
  getApplicationsource,
  getProvincias,
  getCorregimientoPanama,
  getDistritoPanama,
} from "../../../../util/services";
import {
  deleteApplicantFile,
  deleteSeafarerPhoto,
  deleteSeafarerSignature,
  uploadApplicantFile,
  uploadSeafarerUserPhoto,
  uploadSeafarerUserSignature,
} from "../../../../store/userData";
import {
  updateProfileData,
  updateSeafarerData,
  updateSeafarerSignature,
} from "../../../../store/currentViews/viewSlice";
import toast from "react-hot-toast";
import { GoPlusCircle } from "react-icons/go";
import { LoadingState } from "../../../../components/skeleton/LoadingState";

const formData = {
  firstName: "",
  lastName: "",
  identification: "",
  dateBirth: "",
  phone: "",
  countryBirth: "",
  countryResidency: "",
  province: "",
  district: "",
  corregimiento: "",
  address: "",
  airport: "",
  gender: "",
  maritalStatus: "",
  education: "",
  knowAboutUs: "",
  weight: "",
  height: "",
  deported: false,
};

const formValidations = {
  firstName: [(value) => value?.length >= 1, "This field is mandatory."],
  lastName: [(value) => value?.length >= 1, "This field is mandatory."],
  identification: [(value) => value?.length >= 1, "This field is mandatory."],
  dateBirth: [
    (datevalue) => datevalue && ageCalc(datevalue),
    "You must be +18 to create an account.",
  ],
  countryBirth: [(value) => value?.Id >= 1, "This field is mandatory."],
  countryResidency: [(value) => value?.Id >= 1, "This field is mandatory."],
  phone: [
    (value) => value?.value?.length >= 5,
    "Please enter a valid phone number.",
  ],
  address: [(value) => value?.length >= 1, "This field is mandatory."],
  airport: [(value) => value?.length >= 1, "This field is mandatory."],
  gender: [(value) => value?.id != 0, "This field is mandatory."],
  maritalStatus: [(value) => value?.id != 0, "This field is mandatory."],
  education: [(value) => value?.id != 0, "This field is mandatory."],
  knowAboutUs: [(value) => value?.id != 0, "This field is mandatory."],
  deported: [(value) => value != null, "This field is mandatory."],
};

const bmiCalc = (weight, height) => {
  const peso = weight;
  const altura = height * height;
  const bmi = peso / altura;
  return parseFloat(bmi.toFixed(2));
};

export const SeafarerProfile = ({
  // userData,
  formValid = () => {},
  onChange = () => {},
}) => {
  const { profile } = useSelector((state) => state.currentViews);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  // const { photoURL } = profile.seafarerData.photoURL;

  const [selectedFile, setSelectedFile] = useState();
  const [formSubmitted, setFormSubmitted] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [maritalStatusData, setMaritalStatusData] = useState({});
  const [genderData, setGender] = useState({});
  const [educationData, setEducationData] = useState({});
  const [provinciasData, setProvinciasData] = useState({});
  const [distritosData, setDistritosData] = useState({});
  const [corregimientosData, setCorregimientosData] = useState({});
  const [appSourceData, setappSourceData] = useState({});
  const [harvesterData, setHarvesterData] = useState({});
  const [valueBMI, setValueBMI] = useState("");

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredCorregimientos, setFilteredCorregimientos] = useState([]);
  const {
    firstName = "",
    // firstNameValid,
    lastName = "",
    // lastNameValid,
    // identification = "",
    // identificationValid,
    dateBirth = "",
    // dateBirthValid,
    phone = "",
    secondaryPhone = "",
    // phoneValid,
    countryBirth = "",
    // countryBirthValid,
    countryResidency = "",
    // countryResidencyValid,
    province = "",
    district = "",
    corregimiento = "",
    address = "",
    // addressValid,
    airport = "",
    // airportValid,
    gender = "",
    // genderValid,
    maritalStatus = "",
    // maritalStatusValid,
    education = "",
    // educationValid,
    knowAboutUs = "",
    // knowAboutUsValid,
    deported,
    // deportedValid,
    harvester,
    weight,
    height,
    bmi,
    // harvesterValid,
    formState,
    unsavedChanges,
    // isFormValid,
    onInputChange,
    onSelectCountryChange,
    onSelectPhoneChange,
    onSelectChange,
  } = useForm(profile?.seafarerData?.seafarerProfile?.profile || formData);

  const loadResults = async () => {
    try {
      const gender = await getGender();
      const maritalStatus = await getMaterialStatus();
      const education = await getEducation();
      const appSource = await getApplicationsource();
      const provincias = await getProvincias();
      const distritos = await getDistritoPanama();
      const corregimientos = await getCorregimientoPanama();
      const harvester = await getHarvester();
      setGender(gender);
      setMaritalStatusData(maritalStatus);
      setEducationData(education);
      setappSourceData(appSource);
      setProvinciasData(provincias);
      setCorregimientosData(corregimientos);
      setDistritosData(distritos);

      if (province) {
        const newDistricts = distritos.filter(
          (district) => district.id_provincia == province.id
        );
        setFilteredDistricts(newDistricts);
      }

      if (district) {
        const newCorregimientos = corregimientos.filter(
          (corregimiento) => corregimiento.id_distrito == district.id
        );
        setFilteredCorregimientos(newCorregimientos);
      }
      setHarvesterData(harvester);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  useEffect(() => {
    loadResults();
  }, []);

  const onSelectAddressChange = (value, name) => {
    if (name === "province") {
      const provinceId = value[0].id;
      setSelectedProvince(value);

      // Filter districts based on selected province
      const newDistricts = distritosData.filter(
        (district) => district.id_provincia == provinceId
      );
      setFilteredDistricts(newDistricts);
      setFilteredCorregimientos([]); // Reset corregimientos on province change
      setSelectedDistrict(null); // Reset selected district
    } else if (name === "district") {
      const districtId = value[0].id;
      setSelectedDistrict(value);

      // Filter corregimientos based on selected district
      const newCorregimientos = corregimientosData.filter(
        (corregimiento) => corregimiento.id_distrito == districtId
      );
      setFilteredCorregimientos(newCorregimientos);
    }
    onSelectChange(value, name);
  };

  const changeDocument = async (file) => {
    const userData = {
      firstName: firstName,
      lastName: lastName,
      uid: profile.uid,
    };
    if (file) {
      if (!file.url) {
        try {
          // Mostrar el toast mientras se sube el archivo
          const uploadedFile = await toast.promise(
            dispatch(uploadApplicantFile(userData, file, "", "Signature")),
            {
              loading: `Uploading Signature...`,
              success: <b>Signature uploaded successfully!</b>,
              error: <b>Failed to upload signature. Please try again.</b>,
            }
          );

          // Actualizar los datos con el archivo subido
          dispatch(updateSeafarerSignature(uploadedFile));
        } catch (error) {
          console.error(`Error uploading signature:`, error);
        }
      }
    } else {
      try {
        const fileExtension = profile.signature.name
          .split(".")
          .pop()
          .toLowerCase();
        const { firstName, lastName } = userData;
        const displayName =
          !firstName || !lastName
            ? `${userData.applicationData?.applicationProfile?.profile.firstName} ${userData.applicationData?.applicationProfile?.profile.lastName}`
            : `${firstName} ${lastName}`;
        const fileNameToDelete = `${displayName}-${"Signature"}.${fileExtension}`;
        const fileDeleted = await toast.promise(
          dispatch(deleteApplicantFile(userData, fileNameToDelete, ``)),
          {
            loading: `Deleting Signature...`,
            success: <b>Signature deleted successfully!</b>,
            error: <b>Failed to delete signature. Please try again.</b>,
          }
        );

        // Limpiar los datos si el archivo fue eliminado o no existía
        // if (fileDeleted !== false) {
        dispatch(updateSeafarerSignature(null));
        // }
      } catch (error) {
        console.error(`Error deleting signature:`, error);
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      dispatch(uploadSeafarerUserPhoto(file, profile.uid));
    }
  };

  /* FUNCION PARA CONFIRMAR EL SUBIR LA IMAGEN DE PERFIL  */
  const handleConfirm = () => {
    document.getElementById("fileInput").click();
  };

  /* FUNCION PARA EL MODAL CANCELAR EN LA SELECCION DE LA IMAGEN */
  const handleCancel = () => {
    dispatch(deleteSeafarerPhoto(profile.uid));
    setImagePreviewUrl("");
  };

  // CARGAR CAMPOS al store en vivo
  useEffect(() => {
    if (isLoaded && unsavedChanges) {
      // onChange(formState);
      // console.log(formState);
      // const newSeafarerData = profile.seafarerData;
      dispatch(updateProfileData(formState));
    }
  }, [formState]);

  /* VARIABLE PARA LA FUNCION DEL MODAL*/
  const [isOpen, setIsOpen] = useState(false);

  /* VARIABLES DE LA FUNCION PARA guarar el url de la imagen */
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    profile?.seafarerData?.photoURL || ""
  );

  /* FUNCION PARA ABRIR EL MODAL */
  const openModal = () => setIsOpen(true);

  /* FUNCION PARA CERRAR EL, MODAL */
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    setValueBMI(bmiCalc(weight.kg, height.m));
    onInputChange({
      target: { name: "bmi", value: bmiCalc(weight.kg, height.m) },
    });
  }, [weight, height]);

  // useEffect(() => {
  //   setIsLoaded(true);
  // }, []);

  return (
    <>
      {!isLoaded ? (
        <LoadingState />
      ) : (
        <>
          <section className="pt-6 w-full h-full flex items-center justify-center">
            <div className="relative">
              {/* FOTO DE PERFIL */}
              <Avatar img={imagePreviewUrl} size="xl" rounded />

              {/* ICONO DE CAMARA PARA CAMBIAR LA FOTO DE PERFIL */}
              <div className="absolute bottom-1 right-2 text-center text-white text-lg bg-[#1976d2] rounded-full w-9 h-9 md:w-9 md:h-9 lg:w-9 lg:h-9 cursor-pointer shadow-md flex flex-auto items-center justify-center">
                <HiOutlineCamera onClick={openModal} />
              </div>
              {/* ABRIR LOS ARCHIVOS Y SELECCIONAR LA IMAGEN */}
              <FileInput
                id="fileInput"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              {/* MODAL PARA CAMBIAR LA FOTO DE PERFIL DEL MARINO */}
              <ModalYesNo
                text="¿Quieres actualizar tu foto de perfil?"
                textyes="Actualizar"
                textno="Eliminar"
                icon={<Avatar img={imagePreviewUrl} size="xl" rounded />}
                isOpen={isOpen}
                closeModal={closeModal}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            </div>
          </section>
          <section className="m-auto grid grid-cols-1 gap-6 items-end sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 pt-6">
            {/* INPUT DE NOMBRES */}
            <InputText
              label="First Name*"
              helpertext=""
              value={firstName}
              name="firstName"
              onChange={onInputChange}
              classname="text-gray-400"
              // isValid={firstNameValid ? false : true}
            />
            {/* INPUT DE APELLIDOS */}
            <InputText
              label="Last Name*"
              helpertext=""
              value={lastName}
              name="lastName"
              onChange={onInputChange}
              classname="text-gray-400 w-full"
              // isValid={lastNameValid ? false : true}
            />

            {/* INPUT DE IDENTIFICACION/PASAPORTE */}
            {/* <InputText
          label="Identification or Passport*"
          value={identification}
          name="identification"
            onChange={onInputChange}
          className=""
          isValid={identificationValid ? false : true}
        /> */}

            {/* INPUT DE FECHA DE NACIMIENTO */}
            <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center">
              <DatepickerComponent
                name="dateBirth"
                label="Date of birth*"
                datevalue={dateBirth}
                // datevalue={""}
                onChange={onInputChange}
                classnamedate="px-0 ps-0.5 md:ps-1 w-full h-full"
                // isValid={dateBirthValid ? false : true}
              />
              <div className="w-full">
                <div className="flex flex-col gap-4 items-center">
                  <a
                    htmlFor=""
                    className={`text-sm
            text-gray-400  block`}
                  >
                    {"Age:"}
                  </a>
                  <p>{dateBirth ? ageCalcNumber(dateBirth) : "--"}</p>
                </div>
              </div>
            </div>

            {/* COMPONENTE DE TELEFONO */}
            <SelectComponenteCountryCode
              classNamePhone="w-full block inset-0 "
              label="Phone number"
              text="Select your contry code and write phone"
              value={phone}
              data={phone.value}
              initialCountry={phone.data?.countryCode}
              onChange={onSelectPhoneChange}
            />
            <SelectComponenteCountryCode
              classNamePhone="w-full block inset-0 "
              label="Secondary Phone number"
              text="Select your contry code and write phone"
              value={secondaryPhone}
              data={secondaryPhone.value}
              Text=""
              initialCountry={secondaryPhone.data?.countryCode}
              onChange={(e) => onSelectPhoneChange(e, "secondaryPhone")}
            />

            {/* COMPONENTE DE COUNTRY OF BIRTH*/}
            <SelectComponentCountry
              name="countryBirth"
              classNameSelect="relative mt-1 h-full inset-0  w-full "
              text="Country of Birth"
              value={countryBirth}
              initialValue={countryBirth}
              // isValid={countryBirthValid ? false : true}
              //   helperText={countryValid}

              onChange={(e, name) => onSelectCountryChange(e, name)}
            />

            {/* COMPONENTE DE COUNTRY OF RESIDENCY */}
            <SelectComponentCountry
              name="countryResidency"
              classNameSelect="relative mt-1 h-full inset-0 w-full"
              text="Country of Residency"
              Text=""
              value={countryResidency}
              initialValue={countryResidency}
              // isValid={countryResidencyValid ? false : true}
              //   helperText={countryValid}

              onChange={(e, name) => onSelectCountryChange(e, name)}
            />

            {/* SELECT DE PROVINCIA */}
            <SelectComponents
              id="province"
              valueDefault="Provincia"
              data={provinciasData}
              name_valor={true}
              idKey="Id"
              valueKey="Provincia"
              name="province"
              Text=""
              initialValue={province?.id}
              onChange={(e) => onSelectAddressChange(e, "province")}
            />

            {/* SELECT DE DISTRITO */}
            <SelectComponents
              id="district"
              valueDefault="Distrito"
              data={filteredDistricts} // Use filtered list
              // data={distritosData} // Use filtered list
              name_valor={true}
              idKey="Id"
              valueKey="Distrito"
              name="district"
              Text=""
              initialValue={district?.id}
              onChange={onSelectAddressChange}
            />

            {/* SELECT DE CORREGIMIENTO */}
            <SelectComponents
              id="corregimiento"
              valueDefault="Corregimiento"
              data={filteredCorregimientos} // Use filtered list
              name_valor={true}
              idKey="Id"
              valueKey="Corregimiento"
              name="corregimiento"
              Text=""
              initialValue={corregimiento?.id}
              onChange={onSelectAddressChange}
            />
            {/* INPUT DE DIRECCION */}
            {/* <section className="mb-5"> */}
            <InputText
              label="Address"
              value={address}
              name="address"
              onChange={onInputChange}
              className=""
              // isValid={addressValid ? false : true}
            />
            {/* </section> */}

            {/* INPUT DE AEROPUERTO */}
            {/* <section className="mb-5"> */}
            <InputText
              label="Nearest Airport"
              value={airport}
              name="airport"
              onChange={onInputChange}
              className=""
              // isValid={airportValid ? false : true}
            />
            {/* </section> */}

            {/* COMPONENTE DE GENERO */}
            <SelectComponents
              // className="text-zinc-400"
              id="gender"
              valueDefault="Gender"
              data={genderData}
              name_valor={true}
              idKey="Id"
              valueKey="GenderName"
              name="gender"
              Text=""
              initialValue={gender?.id}
              onChange={onSelectChange}
              // isValid={genderValid ? false : true}
            />

            {/* COMPONENTE DE ESTADO CIVIL */}
            <SelectComponents
              // className="text-zinc-400"
              valueDefault="Marital Status"
              name_valor={true}
              data={maritalStatusData}
              valueKey="CivilStatusName"
              idKey="Id"
              name="maritalStatus"
              Text=""
              initialValue={maritalStatus?.id}
              onChange={onSelectChange}
              // isValid={maritalStatusValid ? false : true}
            />

            {/* COMPONENTE DE EDUCACION */}
            <SelectComponents
              // className="text-zinc-400"
              valueDefault="Higher Education Level"
              data={educationData}
              valueKey="EducationName"
              idKey="Id"
              name="education"
              name_valor={true}
              Text=""
              initialValue={education?.id}
              onChange={onSelectChange}
              // isValid={educationValid ? false : true}
            />

            {/* COMPONENTE DE COMO SE ENTERO DE LOGISTIC */}
            <SelectComponents
              name="knowAboutUs"
              valueDefault="Application Source"
              data={appSourceData}
              idKey="Id"
              valueKey="ApplicationSourceName"
              name_valor={true}
              Text=""
              initialValue={knowAboutUs?.id}
              // className="text-gray-400"
              onChange={onSelectChange}
              // isValid={knowAboutUsValid ? false : true}
            />
            <SelectComponents
              name="harvester"
              valueDefault="Harvester"
              data={harvesterData}
              idKey="Id"
              valueKey="HarvesterName"
              name_valor={true}
              Text=""
              // classelect={"text-gray-600"}
              initialValue={harvester?.id}
              // className="text-gray-400"
              onChange={onSelectChange}
              // isValid={knowAboutUsValid ? false : true}
            />
            <WeightComponent
              initialWeight={weight}
              onWeightChange={(e) => {
                onInputChange({ target: { name: "weight", value: e } });
              }}
            />
            <HeightComponent
              initialHeight={height}
              onHeightChange={(e) => {
                onInputChange({ target: { name: "height", value: e } });
              }}
            />

            <div className="w-full">
              <div className="flex flex-col gap-4 items-center">
                <a htmlFor="" className={`text-sm text-gray-400  block`}>
                  {"BMI:"}
                </a>
                <p>{valueBMI || "--"}</p>
              </div>
            </div>
            {/* COMPONENTE SOBRE SI FUE DEPORTADO */}
            <YesNoInput
              text="Have you ever been deported"
              name="deported"
              onChange={onInputChange}
              defaultChecked={deported}
              // isValid={!!deportedValid}
            />
            {/* <Dropzone
          label="Signature"
          labelText="Signature"
          DataDocument={profile.signature}
          name={"signature"}
          onFileChange={handleSignatureChange}
        /> */}
            {/* <div className="relative">
              <img src={profile.signature?.url} className="w-64 h-32" />

              <div className="absolute bottom-1 right-2 text-center text-white text-lg bg-[#1976d2] rounded-full w-9 h-9 md:w-9 md:h-9 lg:w-9 lg:h-9 cursor-pointer shadow-md flex flex-auto items-center justify-center">
                <GoPlusCircle
                  // onClick={openModal}
                  title="Change Signature"
                />
              </div>
              <FileInput
                id="fileInput"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div> */}

            <Dropzone
              label="Signature"
              labelText="Signature"
              DataDocument={profile.signature}
              name={"signature"}
              onFileChange={(e) => changeDocument(e)}
              admitImage={true}
            />
          </section>
        </>
      )}
    </>
  );
};
