import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ButtonIcon,
  DatepickerComponent,
  InputText,
  SelectComponentCountry,
  SelectComponenteCountryCode,
} from "../../../components/layoutComponents";
import { HiOutlineArrowSmRight, HiOutlineArrowSmLeft } from "react-icons/hi";
import { useForm } from "../../../hooks";
import { registerStage, setRegister } from "../../../store/auth";
import { ageCalc, capitalizeFirstLetter } from "../../../util/helperFunctions";

const formData = {
  firstName: "",
  lastName: "",
  dateBirth: "",
  phone: "",
  address: "",
  country: "",
};

const formValidations = {
  firstName: [(value) => value.length >= 1, "This field is mandatory."],
  lastName: [(value) => value.length >= 1, "This field is mandatory."],
  dateBirth: [
    (datevalue) => datevalue && ageCalc(datevalue),
    "You must be +18 to create an account.",
  ],
  country: [(value) => value.Id >= 1, "This field is mandatory."],
  phone: [
    (value) => value.value.length >= 5,
    "Please enter a valid phone number.",
  ],
  address: [(value) => value.length >= 1, "This field is mandatory."],
};

export default function SignUp() {
  const dispatch = useDispatch();

  const { registerForm } = useSelector((state) => state.auth);

  const {
    firstName,
    lastName,
    dateBirth,
    phone,
    address,
    country,
    displayName = "",
    formState,
    dateBirthValid,
    firstNameValid,
    lastNameValid,
    addressValid,
    isFormValid,
    countryValid,
    phoneValid,

    onInputChange,
    onSelectCountryChange,
    onSelectPhoneChange,
  } = useForm(registerForm, formValidations);

  // MANTENER DATOS 1
  const registerStageSet = () => {
    dispatch(registerStage(2));
  };
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleContinue = () => {
    setFormSubmitted(true);
    if (isFormValid) {
      registerStageSet();
    }
  };

  // CARGAR CAMPOS DEL REGISTER
  useEffect(() => {
    dispatch(setRegister(formState));
  }, [formState]);

  return (
    <form className=" justify-center items-center px-4">
      {/* FIRST NAMES INPUT */}
      <InputText
        label="First Names"
        value={firstName}
        name="firstName"
        onChange={onInputChange}
        classname={"mb-5 px-5"}
        isValid={firstNameValid && formSubmitted ? false : true}
        helpertext={firstNameValid}
      />

      {/* LAST NAME INPUTS */}
      <InputText
        label="Last Names"
        value={lastName}
        name="lastName"
        onChange={onInputChange}
        classname={"mb-5 px-5"}
        isValid={lastNameValid && formSubmitted ? false : true}
        helpertext={lastNameValid}
      />

      {/* BIRTH DATE INPUT */}
      <section className="mb-5 px-5">
        <DatepickerComponent
          label="Date of Birth"
          name="dateBirth"
          datevalue={dateBirth}
          onChange={onInputChange}
          isValid={dateBirthValid && formSubmitted ? false : true}
          helpertext={!!dateBirthValid && formSubmitted ? dateBirthValid : ""}
        />
      </section>

      {/* COUNTRY INPUT */}
      <section className="mb-5 px-5">
        <SelectComponentCountry
          name="country"
          classNameSelect="relative mt-1 h-full inset-0 z-40 w-full"
          text="Country of birth"
          value={country}
          initialValue={country}
          isValid={countryValid && formSubmitted ? false : true}
          helperText={countryValid}
          // onChange={(e) =>{console.log(e)}}

          onChange={onSelectCountryChange}
        />
      </section>

      {/* PHONE NUMBER INPUT */}
      <SelectComponenteCountryCode
        classNamePhone="px-5 block  inset-0 z-30"
        text="Select country code and enter your phone"
        label="Phone number"
        value={phone}
        data={phone.value}
        initialCountry={phone.data.countryCode}
        helperText={phoneValid && formSubmitted ? true : false}
        //  onChange={(e) =>{console.log(e)}}

        onChange={onSelectPhoneChange}
      />

      {/* ADDRESS INPUT */}
      <section className="mb-5 px-5 mt-5">
        <InputText
          label="Address"
          value={address}
          name="address"
          onChange={onInputChange}
          className={""}
          isValid={addressValid && formSubmitted ? false : true}
          helpertext={addressValid}
        />
      </section>

      {/* BOTON DE ATRAS-REGRESAR */}
      <section className="flex items-center justify-center pt-5 ">
        <ButtonIcon
          icon={<HiOutlineArrowSmLeft className="h-5 w-5" />}
          classnamebtn="bg-[#1976d2]  px-7 items-center text-center mr-8"
          label="Back"
          left={true}
          link="/auth"
        />
        {/* BOTON DE CONTINUAR */}
        <ButtonIcon
          icon={<HiOutlineArrowSmRight className="h-5 w-5" />}
          classnamebtn="bg-[#1976d2] px-3 items-center text-center"
          label="Continue"
          onClick={handleContinue}
        />
      </section>
    </form>
  );
}
