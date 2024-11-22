import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ButtonIcon,
  InputText,
  ModalYesNo,
} from "../../../components/layoutComponents";
import {
  HiOutlineArrowSmRight,
  HiOutlineArrowSmLeft,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import TextComponent from "../components/textComponent";
import { Checkbox } from "flowbite-react";
import { useForm } from "../../../hooks";
import {
  registerStage,
  setRegister,
  startCreatingUserwithEmail,
} from "../../../store/auth";
import { validateEmail } from "../../../util/helperFunctions";

const formData = {
  Email: "",
  Password: "",
  ConfirmPassword: "",
};

const formValidations = {
  email: [(value) => validateEmail(value), "Invalid e-mail address."],
  password: [
    (value) => value.length >= 6,
    "The password must be at least 6 characters long.",
  ],
  confirmPassword: [
    (value) => value.length >= 1,
    "The password doesn't match.",
  ],
  // isChecked: [(checked) => !!checked, "You must agree with the terms and conditions of use."]
};

export default function SignUp2() {
  const { registerForm, displayName, errorMessage } = useSelector(
    (state) => state.auth
  );
  const { firstName, lastName } = registerForm;
  const dispatch = useDispatch();

  /* CONDICION PARA LOS INPUTTEXT */
  // const [data, setData] = useState({Email:"", Password:"", ConfirmPassword:""})
  // const changeData = (e) => {
  //   const updatedData = {
  //     ...data,
  //     [e.target.name]: e.target.value,
  //   };
  //   setData(updatedData);
  //   onDataChange(id, updatedData);
  // };

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const handleCancel = () => {
    onConfirm(false);
    onclose;
  };

  const {
    email,
    password,
    confirmPassword,
    // isChecked,
    onInputChange,
    formState,
    isFormValid,
    emailValid,
    passwordValid,
    // confirmPasswordValid,
    // isCheckedValid,
  } = useForm(registerForm, formValidations);

  useEffect(() => {
    dispatch(setRegister(formState));
  }, [formState]);

  /*  MANEJO DEL ENVIO DEL FORMULARIO*/
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  // }

  /* VER CONTRASENA*/
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  /* VER CONFIRMAR CONTRASENA */
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [confirmPasswordValidations, Validate] = useState({
    helpertext: "",
    color: "default",
  });
  // Validar que la contraseña confirmada sea igual
  const validateConfirmPassword = () => {
    let helpertext = "";
    let color = "default";

    if (password === confirmPassword) {
      helpertext = "";
      color = "default"; // "default" podría ser otro valor que representa el estado correcto
    } else {
      helpertext = "The password doesn't match.";
      color = "error";
    }

    return { helpertext: helpertext, color: color };
  };
  const { helpertext } = confirmPasswordValidations;

  // const {color} = confirmPasswordValidations

  /* USO DEL CHECK DE LOS TERMINOS Y CONDICIONES */
  const [isChecked, setIsChecked] = useState(false);
  const handleConfirm = () => {
    setIsChecked(true);
    onclose;
  };

  // CARGAR CAMPOS DEL REGISTER
  useEffect(() => {
    dispatch(setRegister(formState));
  }, [formState]);

  const registerStageSet = () => {
    dispatch(registerStage(1));
  };
  const [formSubmitted, setFormSubmitted] = useState(false);

  const allSet = () => {
    if (!emailValid && !passwordValid && !helpertext && isChecked) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    Validate(validateConfirmPassword());
    if (allSet()) {
      dispatch(startCreatingUserwithEmail(registerForm, displayName));
    }
  };

  return (
    <form className=" justify-center items-center px-4 ">
      <section className="text-center text-red-400 mb-3 mt-3">
        <p>
          {errorMessage
            ? "There already exist an account with that E-mail."
            : ""}
        </p>
      </section>
      {/* INPUT DE EMAIL */}
      <InputText
        type="email"
        label="Email*"
        value={email}
        name="email"
        onChange={onInputChange}
        classname={"mb-5 px-5  "}
        isValid={emailValid && formSubmitted ? false : true}
        helpertext={emailValid && formSubmitted ? emailValid : ""}
        required
      />

      {/* INPUT DE CONTRASENA */}
      <section className="flex ">
        <InputText
          type={showPassword ? "text" : "password"}
          label="Password*"
          value={password}
          name="password"
          onChange={onInputChange}
          classname={"flex-grow w-full px-0 py-2 ps-5 mb-1"}
          isValid={passwordValid && formSubmitted ? false : true}
          helpertext={!!passwordValid && formSubmitted ? passwordValid : ""}
          // helpertext={!!passwordValid && formSubmitted ? passwordValid : ""}
          // color={!!passwordValid && formSubmitted ? "error" : "default"}
          required
        />
        <div
          onClick={toggleShowPassword}
          className="w-6 h-6 -translate-x-8 py-2 cursor-pointer items-start translate-y-4"
        >
          {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
        </div>
      </section>

      {/* INPUT DE CONFIRMAR CONTRASENA */}
      <section className="flex">
        <InputText
          type={showConfirmPassword ? "text" : "password"}
          label="Confirm Password*"
          value={confirmPassword}
          name="confirmPassword"
          onChange={onInputChange}
          classname={"flex-grow w-full px-0 py-2 ps-5 mb-1"}
          isValid={helpertext ? false : true}
          helpertext={helpertext}
          // color={color}
          required
        />
        <div
          onClick={toggleShowConfirmPassword}
          className="w-6 h-6 -translate-x-8 py-2 cursor-pointer items-start translate-y-4"
        >
          {showConfirmPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
        </div>
      </section>

      {/* CHECK DE TERMINOS Y CONDICIONES - CHECK */}
      <section className="text-sm font-sans mb-5 px-1 items-center ml-5">
        <section className="flex flex-row items-center justify-between gap-3">
          <Checkbox
            checked={isChecked}
            // onChange={onInputChange}
            onChange={() => setIsChecked(!isChecked)}
            id="accept"
            className=" text-blue-600 "
          />

          <div className="  ">
            <span className="">I have read and and agree with the </span>
            <span
              onClick={openModal}
              className="text-cyan-600 underline dark:text-cyan-500 hover:cursor-pointer"
            >
              Terms and Condition of Use of the Logistic Portal.
            </span>
          </div>
        </section>
        <section className="md:w-full-lg">
          <section className="mt-2 ml-2">
            <a
              className={`text-sm text-red-600 ${
                !isChecked && formSubmitted ? "" : "hidden"
              } `}
            >
              {"You must agree with the terms and conditions of use."}
            </a>
          </section>
          <ModalYesNo
            text={<TextComponent />}
            size="6xl"
            textyes="ACCEPT"
            textno="CANCEL"
            isOpen={isOpen}
            closeModal={closeModal}
            onConfirm={handleConfirm}
            onCancel={closeModal}
            disableButtonCancel={true}
            className="md:w-full"
          />
        </section>
      </section>

      {/* BOTON DE ATRAS-REGRESAR */}
      <section className="flex items-center justify-center pt-5 ">
        <ButtonIcon
          icon={<HiOutlineArrowSmLeft className="h-5 w-5" />}
          classnamebtn="bg-[#1976d2]  px-7 items-center text-center mr-8"
          label="Back"
          left={true}
          onClick={registerStageSet}
        />
        {/* BOTON DE CONTINUAR */}
        <ButtonIcon
          icon={<HiOutlineArrowSmRight className="h-5 w-5" />}
          classnamebtn="bg-[#1976d2] px-3 items-center text-center"
          label="Create Account"
          onClick={handleSubmit}
          // link="/startapplication"
          left={true}
        />
      </section>
    </form>
  );
}
