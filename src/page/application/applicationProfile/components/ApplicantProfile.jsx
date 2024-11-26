import { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Button, FileInput } from "flowbite-react";
import { HiOutlineCamera } from "react-icons/hi";
import {
  getGender,
  getMaterialStatus,
  getEducation,
  getApplicationsource,
  getProvincias,
  getCorregimientoPanama,
  getDistritoPanama,
} from "../../../../util/services.js";
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
} from "../../../../components/layoutComponents";
import { useForm } from "../../../../hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  deleteApplicationPhoto,
  updateApplicationProfileProfile,
  uploadApplicationUserPhoto,
} from "../../../../store/userData";
import { ageCalc, ageCalcNumber } from "../../../../util/helperFunctions";
import { LoadingState } from "../../../../components/skeleton/LoadingState.jsx";

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
    (value) => value?.value?.length > value?.data?.dialCode.length,
    "Please enter a valid phone number.",
  ],
  address: [(value) => value?.length >= 1, "This field is mandatory."],
  airport: [(value) => value?.length >= 1, "This field is mandatory."],
  gender: [(value) => value?.id != 0, "This field is mandatory."],
  maritalStatus: [(value) => value?.id != 0, "This field is mandatory."],
  education: [(value) => value?.id != 0, "This field is mandatory."],
  knowAboutUs: [(value) => value?.id != 0, "This field is mandatory."],
  deported: [(value) => value != null, "This field is mandatory."],
  visaDenied: [(value) => value != null, "This field is mandatory."],
  visaCancelled: [(value) => value != null, "This field is mandatory."],
  candina: [(value) => value != null, "This field is mandatory."],
};

const bmiCalc = (weight, height) => {
  const peso = weight;
  const altura = height * height;
  const bmi = peso / altura;
  return parseFloat(bmi.toFixed(2));
};

export const ApplicantProfile = ({
  onUnsavedChange,
  formValid,
  disabledStyle,
  disabled,
}) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userData);
  const { application } = useSelector((state) => state.currentViews);
  const { photoURL } = userData.applicationData;
  const [selectedFile, setSelectedFile] = useState();
  const [formSubmitted, setFormSubmitted] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [maritalStatusData, setMaritalStatusData] = useState({});
  const [genderData, setGender] = useState({});
  const [educationData, setEducationData] = useState({});
  const [provinciasData, setProvinciasData] = useState([]);
  const [distritosData, setDistritosData] = useState([]);
  const [corregimientosData, setCorregimientosData] = useState([]);
  const [appSourceData, setappSourceData] = useState({});
  const [valueBMI, setValueBMI] = useState("");
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredCorregimientos, setFilteredCorregimientos] = useState([]);

  const onSelectAddressChange = (value, name) => {
    onSelectChange(value, name);
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
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      dispatch(
        uploadApplicationUserPhoto(
          file,
          userData.role.Id == 3 ? userData.uid : application.uid
        )
      );
    }
  };

  /* FUNCION PARA CONFIRMAR EL SUBIR LA IMAGEN DE PERFIL  */
  const handleConfirm = () => {
    document.getElementById("fileInput").click();
  };

  /* FUNCION PARA EL MODAL CANCELAR EN LA SELECCION DE LA IMAGEN */
  const handleCancel = () => {
    dispatch(deleteApplicationPhoto(userData));
    setImagePreviewUrl("");
  };
  const loadResults = async () => {
    try {
      const gender = await getGender();
      const maritalStatus = await getMaterialStatus();
      const education = await getEducation();
      const appSource = await getApplicationsource();
      const provincias = await getProvincias();
      const distrito = await getDistritoPanama();
      const corregimiento = await getCorregimientoPanama();
      setGender(gender);
      setMaritalStatusData(maritalStatus);
      setEducationData(education);
      setappSourceData(appSource);
      setProvinciasData(provincias);
      setCorregimientosData(corregimiento);
      setDistritosData(distrito);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };
  useEffect(() => {
    loadResults();
  }, []);

  const {
    firstName = "",
    firstNameValid,
    lastName = "",
    lastNameValid,
    identification = "",
    identificationValid,
    dateBirth = "",
    dateBirthValid,
    phone = "",
    secondaryPhone = "",
    phoneValid,
    countryBirth = "",
    countryBirthValid,
    countryResidency = "",
    countryResidencyValid,
    province = "",
    district = "",
    corregimiento = "",
    address = "",
    addressValid,
    airport = "",
    airportValid,
    gender = "",
    genderValid,
    maritalStatus = "",
    maritalStatusValid,
    education = "",
    educationValid,
    knowAboutUs = "",
    harvester = {
      id: "2",
      name: "Logistics",
    },
    knowAboutUsValid,
    height,
    weight,
    bmi,
    deported,
    deportedValid,
    visaCancelledValid,
    visaDeniedValid,
    candina,
    candinaValid,
    formState,
    unsavedChanges,
    // isFormValid,
    onInputChange,
    onSelectCountryChange,
    onSelectPhoneChange,
    onSelectChange,
  } = useForm(
    userData.applicationData.applicationProfile.profile,
    formValidations
  );

  useEffect(() => {
    const isAnyFieldInvalid = [
      firstNameValid,
      lastNameValid,
      // identificationValid,
      dateBirthValid,
      phoneValid,
      countryBirthValid,
      countryResidencyValid,
      addressValid,
      airportValid,
      genderValid,
      maritalStatusValid,
      educationValid,
      knowAboutUsValid,
      deportedValid,
      // Validar provincia, distrito y corregimiento si countryResidency es "160"
      ...(countryResidency === "160"
        ? [
            !province?.id, // Verifica si `province` tiene `id`
            !district?.id, // Verifica si `district` tiene `id`
            !corregimiento?.id, // Verifica si `corregimiento` tiene `id`
          ]
        : []),
    ].some((fieldValid) => fieldValid);

    setIsFormValid(!isAnyFieldInvalid);
    formValid(!isAnyFieldInvalid);
  }, [
    firstNameValid,
    lastNameValid,
    dateBirthValid,
    phoneValid,
    countryBirthValid,
    countryResidencyValid,
    addressValid,
    airportValid,
    genderValid,
    maritalStatusValid,
    educationValid,
    knowAboutUsValid,
    deportedValid,
    province?.id,
    district?.id,
    corregimiento?.id,
    formValid,
    countryResidency,
  ]);

  const [dataPanama, setPanama] = useState(
    formState.countryResidency?.Id === "160" ? true : false
  );

  useEffect(() => {
    if (formState.countryResidency?.Id === "160") {
      setPanama(true);
    } else {
      setPanama(false);
    }
  }, [formState]);

  // CARGAR CAMPOS al store en vivo
  useEffect(() => {
    if (unsavedChanges) {
      console.log("cambios");
      dispatch(updateApplicationProfileProfile(formState));
      onUnsavedChange(unsavedChanges);
    }
  }, [formState]);

  useEffect(() => {
    // if(weight?.kg !== userData.applicationProfile.profile.weight?.kg )
    setValueBMI(bmiCalc(weight?.kg, height?.m));
    onInputChange({
      target: { name: "bmi", value: bmiCalc(weight?.kg, height?.m) },
    });
    onUnsavedChange(false);
  }, [weight, height]);

  /* VARIABLE PARA LA FUNCION DEL MODAL*/
  const [isOpen, setIsOpen] = useState(false);

  /* VARIABLES DE LA FUNCION PARA guarar el url de la imagen */
  const [imagePreviewUrl, setImagePreviewUrl] = useState(photoURL);

  /* FUNCION PARA ABRIR EL MODAL */
  const openModal = () => setIsOpen(true);

  /* FUNCION PARA CERRAR EL, MODAL */
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    if (province && distritosData) {
      const provinceId = province?.id;

      // Actualiza los districts basados en el province seleccionado
      const updatedDistricts = distritosData.filter(
        (district) => district.id_provincia == provinceId
      );
      setFilteredDistricts(updatedDistricts);

      // Si hay un district seleccionado, asegúrate de que siga siendo válido
      if (district && corregimientosData) {
        const districtId = district?.id;
        const isValidDistrict = updatedDistricts.some(
          (district) => district.Id == districtId
        );

        if (!isValidDistrict) {
          setSelectedDistrict(null); // Reset si el district ya no es válido
          setFilteredCorregimientos([]); // Limpia corregimientos
        } else {
          // Actualiza corregimientos si el district es válido
          const updatedCorregimientos = corregimientosData.filter(
            (corregimiento) => corregimiento.id_distrito == districtId
          );
          setFilteredCorregimientos(updatedCorregimientos);
        }
      } else {
        setFilteredCorregimientos([]); // Limpia corregimientos si no hay district seleccionado
      }
    } else {
      // Si no hay province seleccionada, resetea todos los filtros
      setFilteredDistricts([]);
      setFilteredCorregimientos([]);
      setSelectedDistrict(null);
    }
  }, [provinciasData, distritosData, corregimientosData]);

  return (
    <>
      {/* {!isLoaded ? (
        <LoadingState />
      ) : ( */}
      <>
        <form className={disabledStyle}>
          <fieldset disabled={disabled}>
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
                isValid={firstNameValid ? false : true}
              />
              {/* INPUT DE APELLIDOS */}
              <InputText
                label="Last Name*"
                helpertext=""
                value={lastName}
                name="lastName"
                onChange={onInputChange}
                classname="text-gray-400 w-full"
                isValid={lastNameValid ? false : true}
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
              <div className="flex flex-row items-center gap-2 justify-between">
                <DatepickerComponent
                  name="dateBirth"
                  label="Date of birth*"
                  datevalue={dateBirth}
                  onChange={onInputChange}
                  classnamedate="px-0 ps-0.5 md:ps-1 w-full h-full"
                  isValid={dateBirthValid ? false : true}
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
                Text=""
                isValid={phone.value}
                initialCountry={phone.data?.countryCode}
                onChange={onSelectPhoneChange}
                helperText={phoneValid}
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
                classNameSelect="relative mt-1 h-full inset-0  w-full"
                text="Country of Birth"
                value={countryBirth}
                initialValue={countryBirth}
                isValid={countryBirthValid ? false : true}
                //   helperText={countryValid}
                Text=""
                onChange={(e, name) => onSelectCountryChange(e, name)}
              />

              {/* COMPONENTE DE COUNTRY OF RESIDENCY */}
              <SelectComponentCountry
                name="countryResidency"
                classNameSelect="relative mt-1 h-full inset-0 w-full"
                text="Country of Residency"
                value={countryResidency}
                initialValue={countryResidency}
                isValid={countryResidencyValid ? false : true}
                //   helperText={countryValid}
                Text=""
                onChange={(e, name) => onSelectCountryChange(e, name)}
              />

              {/* SELECT DE PROVINCIA */}
              <SelectComponents
                className={`text-zinc-400 ${
                  countryResidency?.Id == "160" ? "" : "hidden"
                }`}
                id="province"
                valueDefault="Provincia"
                data={provinciasData}
                name_valor={true}
                idKey="Id"
                valueKey="Provincia"
                name="province"
                Text=""
                isValid={
                  countryResidency?.Id == "160" && province.id ? true : false
                }
                initialValue={province?.id}
                onChange={(e) => onSelectAddressChange(e, "province")}
              />

              {/* SELECT DE DISTRITO */}
              <SelectComponents
                className={`text-zinc-400 ${
                  countryResidency?.Id == "160" ? "" : "hidden"
                }`}
                id="district"
                valueDefault="Distrito"
                data={filteredDistricts}
                name_valor={true}
                idKey="Id"
                valueKey="Distrito"
                name="district"
                Text=""
                isValid={
                  countryResidency?.Id == "160" && district.id ? true : false
                }
                initialValue={district?.id}
                onChange={(e) => onSelectAddressChange(e, "district")}
              />

              {/* SELECT DE CORREGIMIENTO */}
              <SelectComponents
                className={`text-zinc-400 ${
                  countryResidency?.Id == "160" ? "" : "hidden"
                }`}
                id="corregimiento"
                valueDefault="Corregimiento"
                data={filteredCorregimientos}
                name_valor={true}
                idKey="Id"
                valueKey="Corregimiento"
                name="corregimiento"
                Text=""
                isValid={
                  countryResidency?.Id == "160" && corregimiento.id
                    ? true
                    : false
                }
                initialValue={corregimiento?.id}
                onChange={(e) => onSelectAddressChange(e, "corregimiento")}
              />

              {/* INPUT DE DIRECCION */}
              {/* <section className="mb-5"> */}
              <InputText
                label="Address"
                value={address}
                name="address"
                onChange={onInputChange}
                className=""
                isValid={addressValid ? false : true}
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
                isValid={airportValid ? false : true}
              />
              {/* </section> */}

              {/* COMPONENTE DE GENERO */}
              <SelectComponents
                // className="text-zinc-400"
                Text=""
                id="gender"
                valueDefault="Gender"
                data={genderData}
                name_valor={true}
                idKey="Id"
                valueKey="GenderName"
                name="gender"
                initialValue={gender?.id}
                onChange={onSelectChange}
                isValid={genderValid ? false : true}
              />

              {/* COMPONENTE DE ESTADO CIVIL */}
              <SelectComponents
                // className="text-zinc-400"
                valueDefault="Marital Status"
                Text=""
                name_valor={true}
                data={maritalStatusData}
                valueKey="CivilStatusName"
                idKey="Id"
                name="maritalStatus"
                initialValue={maritalStatus?.id}
                onChange={onSelectChange}
                isValid={maritalStatusValid ? false : true}
              />

              {/* COMPONENTE DE EDUCACION */}
              <SelectComponents
                // className="text-zinc-400"
                valueDefault="Higher Education Level"
                Text=""
                data={educationData}
                valueKey="EducationName"
                idKey="Id"
                name="education"
                name_valor={true}
                initialValue={education?.id}
                onChange={onSelectChange}
                isValid={educationValid ? false : true}
              />

              {/* COMPONENTE DE COMO SE ENTERO DE LOGISTIC */}
              <SelectComponents
                name="knowAboutUs"
                valueDefault="How did you know about us?"
                Text=""
                data={appSourceData}
                idKey="Id"
                valueKey="ApplicationSourceName"
                name_valor={true}
                initialValue={knowAboutUs?.id}
                // className="text-gray-400"
                onChange={onSelectChange}
                isValid={knowAboutUsValid ? false : true}
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
                text="Have you ever been deported?"
                name="deported"
                onChange={onInputChange}
                defaultChecked={
                  userData.applicationData.applicationProfile.profile.deported
                }
                isValid={!deportedValid}
              />
              <YesNoInput
                text="Have you ever had a C1-D Visa Cancelled?"
                name="visaCancelled"
                onChange={onInputChange}
                defaultChecked={
                  userData.applicationData.applicationProfile.profile
                    .visaCancelled
                }
                isValid={!visaCancelledValid}
              />
              <YesNoInput
                text="Have you ever had a C1-D Visa Denied?"
                name="visaDenied"
                onChange={onInputChange}
                defaultChecked={
                  userData.applicationData.applicationProfile.profile.visaDenied
                }
                isValid={!visaDeniedValid}
              />
              <YesNoInput
                text="Have you ever had a recruitment process with Cadina?"
                name="candina"
                onChange={onInputChange}
                defaultChecked={
                  userData.applicationData.applicationProfile.profile.candina
                }
                isValid={!candinaValid}
              />
            </section>
          </fieldset>
        </form>
      </>
      {/* )} */}
    </>
  );
};
