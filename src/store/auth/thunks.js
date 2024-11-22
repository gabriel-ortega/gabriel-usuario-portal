import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  createuserWithEmail,
  signInWithGoogle,
  loginUserwithEmailAndPassword,
  logoutFirebase,
  signInWithFacebook,
} from "../../config/firebase/providers";
import { checkingCredentials, login, logout } from "./";
import { FirebaseDB } from "../../config/firebase/config";
import { getUserData } from "../userData";
import {
  initialUserDataExternal,
  initialUserDataRegistered,
} from "./../../util/initialUserData";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    // setea el stado de checking
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();
    const { uid, displayName, photoURL, email } = result;

    const userData = initialUserDataExternal(result);

    if (!result.ok) return dispatch(logout(result.errorMessage));

    if (result.isNewUser) {
      console.log("Entro a actualizar la data de " + uid);
      const docRef = doc(FirebaseDB, `usersData/${uid}`);
      await setDoc(docRef, userData);
    }
    dispatch(login(result));
    dispatch(getUserData(uid));
  };
};

export const startFacebookSignIn = () => {
  return async (dispatch) => {
    // setea el stado de checking
    dispatch(checkingCredentials());
    const result = await signInWithFacebook();
    const { uid, displayName, photoURL, email } = result;

    // Esta funcion genera la data inicial para guardar hecha afuera solo para que este codigo este mas limpio
    const userData = initialUserDataExternal(result);

    if (!result.ok) return dispatch(logout(result.errorMessage));

    if (result.isNewUser) {
      console.log("Entro a actualizar la data de " + uid);
      const docRef = doc(FirebaseDB, `usersData/${uid}`);
      await setDoc(docRef, userData);
    }
    dispatch(login(result));
  };
};

export const startCreatingUserwithEmail = (
  { email, password },
  displayName
) => {
  return async (dispatch, getState) => {
    // setea el stado de checking
    dispatch(checkingCredentials());

    // atrapo el formulario de registro
    const { registerForm } = getState().auth;

    // creo el usuario con correo y contraseña
    const { ok, uid, photoURL, errorMessage } = await createuserWithEmail({
      email,
      password,
      displayName,
    });

    console.log("se esta creando la cuenta");

    if (!ok)
      return dispatch(logout({ errorMessage, regStage: 2, registerForm }));

    // Esta funcion genera la data inicial para guardar hecha afuera solo para que este codigo este mas limpio
    const dataToSave = initialUserDataRegistered(uid, registerForm);

    console.log("Entro a actualizar la data de " + uid);
    const docRef = doc(FirebaseDB, `usersData/${uid}`);
    await setDoc(docRef, dataToSave);

    // logea al usuario creado
    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const loginUserwithEmail = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await loginUserwithEmailAndPassword({ email, password });
    if (!result.ok) return dispatch(logout(result));
    dispatch(login(result));
    const existe = await dispatch(getUserData(result.uid));
    if (!existe) {
      dispatch(startLogout());
    }
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(logout());
  };
};
