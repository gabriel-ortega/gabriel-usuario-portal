import { createSlice } from "@reduxjs/toolkit";
import { capitalizeFirstLetter } from "../../util/helperFunctions";

const initialState = {
  status: "checking", //'checking', //, 'authenticated', 'not-authenticated'
  emailSent: false,
  role: null,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
  registerForm: {
    firstName: "",
    lastName: "",
    dateBirth: "",
    phone: {
      data: {
        name: "",
        dialCode: "",
        countryCode: "pa",
        format: "",
      },
      value: "",
    },
    address: "",
    country: "",
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
    isChecked: false,
  },
  regStage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.status = "authenticated"; //'checking', //, 'authenticated',
      state.role = payload.role;
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = payload.errorMessage;
    },
    logout: (state, { payload }) => {
      state.status = "not-authenticted"; //'checking', //, 'authenticated',
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      if (payload?.registerForm) {
        state.registerForm = payload.registerForm;
      } else {
        state.registerForm = initialState.registerForm;
      }
      state.regStage = payload?.regStage;
      state.errorMessage = payload?.errorMessage;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
    registerStage: (state, { payload }) => {
      state.regStage = payload;
    },
    setRegister: (state, { payload }) => {
      state.registerForm = payload;
      state.displayName =
        capitalizeFirstLetter(payload.firstName) +
        " " +
        capitalizeFirstLetter(payload.lastName);
    },
    setEmailSent: (state, { payload }) => {
      state.emailSent = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  login,
  logout,
  checkingCredentials,
  setRegister,
  registerStage,
  setEmailSent,
} = authSlice.actions;
