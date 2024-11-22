import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import face from "../../assets/imagenes/svg/facebook.svg";
import google from "../../assets/imagenes/svg/google.svg";
// import micro from '../../assets/imagenes/svg/microsoft.svg';
import { InputText, ButtonIcon } from "../../components/layoutComponents";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { LoginLayout } from "./layout/LoginLayout";
import { useForm } from "../../hooks";
import {
  loginUserwithEmail,
  startGoogleSignIn,
  startFacebookSignIn,
} from "../../store/auth";
import { useMemo } from "react";
import { validateEmail } from "../../util/helperFunctions";
import toast from "react-hot-toast";

const formData = {
  email: "",
  password: "",
};

const formValidations = {
  email: [(value) => validateEmail(value), "Invalid e-mail address."],
  password: [(value) => value.length >= 1, "Provide a password."],
};

export const LoginPage = (id, onDataChange) => {
  const { status, errorMessage } = useSelector((state) => state.auth);

  //weas para usar las acciones
  const dispatch = useDispatch();

  //weas para agarrar los input
  const {
    email,
    password,
    emailValid,
    passwordValid,
    isFormValid,
    formState,
    onInputChange,
  } = useForm(formData, formValidations);
  const isAuthenticating = useMemo(() => status === "checking", [status]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  /*  MANEJO DEL ENVIO DEL FORMULARIO*/
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (isFormValid) {
      dispatch(loginUserwithEmail({ email, password }));
    }
  };

  //handle para el sign in con GOOGLE
  const onGoogleSignIn = (event) => {
    event.preventDefault();
    dispatch(startGoogleSignIn());
  };

  //handle para el sign in con GOOGLE
  const onFacebookSignIn = (event) => {
    event.preventDefault();
    toast.error("Currently Out of Service :(");
    // dispatch(startFacebookSignIn())
  };

  /* VER CONTRASENA*/
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginLayout title="Log in">
      <form className=" justify-center items-center px-4" label="login">
        <section className="flex items-center justify-center pt-2 mb-7 space-x-10">
          <Link
            disabled={isAuthenticating}
            to="/"
            className="w-12 h-12"
            variant="body2"
            onClick={onGoogleSignIn}
          >
            <img src={google} alt="Google" />
          </Link>
          <Link
            disabled={isAuthenticating}
            to="/"
            className="w-12 h-15"
            variant="body2"
            onClick={onFacebookSignIn}
          >
            <img src={face} alt="Facebook" width={"100px"} />
          </Link>
          {/* <Link
              disabled={isAuthenticating}
              to="/" 
              className="w-12 h-12" 
              variant="body2" 
              onClick={onGoogleSignIn}
              >
              <img src={micro} alt="Microsoft" />
              </Link> */}
        </section>
        <section className="text-center text-red-400 mb-3 mt-3">
          <p>{errorMessage ? "Invalid E-mail or Password" : ""}</p>
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
          helpertext={emailValid}
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
            helpertext={passwordValid}
            required
          />

          <div
            onClick={toggleShowPassword}
            className="w-6 h-6 -translate-x-8 py-2 cursor-pointer items-start translate-y-4"
          >
            {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
          </div>
        </section>
        <section className="text-end mb-4 mr-7">
          <Link
            className="text-blue-500 "
            to="/auth/accountrestore"
            variant="body2"
          >
            {" "}
            Reset password{" "}
          </Link>
        </section>

        {/* BOTON DE CONTINUAR */}
        <section className="flex items-center justify-center mb-2">
          <ButtonIcon
            disabled={isAuthenticating}
            type={"submit"}
            classnamebtn="bg-[#1976d2] px-12 items-center text-center"
            label="SIGN IN"
            onClick={handleSubmit}
          />
        </section>

        <h2 className="text-center text-base md:text-lg md:mb-3 mb-5 ">Or</h2>

        <section className="flex items-center justify-center mb-2 ">
          <ButtonIcon
            disabled={isAuthenticating}
            classnamebtn="bg-[#1976d2] px-4 items-center text-center"
            label="CREATE ACCOUNT"
            link="/auth/register"
          />
        </section>
        <section className="mt-7 py-5 flex-auto">
          <h2 className="text-center text-base md:text-base">
            {" "}
            Copyright ©
            <a
              href="https://panamamarinelogistic.com.pa"
              className="underline"
              target="_blank"
            >
              {" "}
              LOGISTIC INTERNATIONAL SERVICES CORPORATION
            </a>{" "}
            {new Date().getFullYear()}
            {"."}
          </h2>
        </section>
      </form>
    </LoginLayout>
  );
};
