import { LoginLayout } from "./layout/LoginLayout";
import { ButtonIcon, InputText } from "../../components/layoutComponents";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import { validateEmail } from "../../util/helperFunctions";
import { useForm } from "../../hooks";
import { useState } from "react";
import { resetPassword } from "../../config/firebase/providers";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/userData";
import { setEmailSent } from "../../store/auth";

const notifySucess = (message) => toast.success(message);
const notifyError = (message) => toast.error(message);

const formData = {
  email: "",
};

const formValidations = {
  email: [(value) => validateEmail(value), "Invalid e-mail address."],
};

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.userData);
  const { emailSent } = useSelector((state) => state.auth);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { email, emailValid, isFormValid, formState, onInputChange } = useForm(
    formData,
    formValidations
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    dispatch(setLoading(true));
    dispatch(setEmailSent(true));
    if (isFormValid) {
      // resetPassword(formState.email).then((result)=>{
      //   if (result.ok = true){
      //     notifySucess("E-mail Sent!")
      //   }else{
      //     notifyError("There was an error. Try again later.")
      //   }
      // });
      // notify()
      toast.promise(
        resetPassword(formState.email).then(dispatch(setLoading(false))),
        {
          loading: "Sending E-mail...",
          success: <b>E-mail Sent!</b>,
          error: <b>Ups! Something went wrong. Try again</b>,
        }
      );
    }
  };

  return (
    <LoginLayout title="Restore Account Password">
      <section className="text-center mt-5 mb-5">
        <span>
          Please supply your account's e-mail address. An e-mail will be sent
          with the instructions to restore your password.
        </span>
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
          label="Send E-mail"
          disabled={isLoading || emailSent}
          onClick={handleSubmit}
        />
      </section>
    </LoginLayout>
  );
};
