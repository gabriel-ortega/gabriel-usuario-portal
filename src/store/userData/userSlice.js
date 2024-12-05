import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSaving: false,
  isLoading: false,
  applicationStage: null,
  applicationStatus: null,
  // myApplication: {},
  userData: {
    photoURL: "",
    seafarerData: {},
    applicationData: {
      startApplication: {
        vesselType: [{ id: "" }],
        department: [{ id: "" }],
        position: [{ name: "" }],
      },
      applicationProfile: {
        profile: {},
        contacts: {},
        vaccines: { attach: { covid: {}, yellow: {} } },
        lang: {},
      },
      applicationDocument: [],
      applicationCertificates: [],
      skills: {},
    },
  },
};

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setSaving: (state, { payload }) => {
      state.isSaving = payload;
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setUserData: (state, { payload }) => {
      state.isLoading = false;
      state.userData = payload;
      state.applicationStage = payload.applicationStage;
    },
    setApplication: (state, { payload }) => {
      state.myApplication = payload;
    },
    setApplicationData: (state, { payload }) => {
      state.userData.applicationData = payload;
    },
    updateApplicationStage: (state, action) => {
      state.isSaving = false;
      state.applicationStage = action.payload;
    },
    updateApplicationData: (state, { payload }) => {
      state.isSaving = false;
      state.userData.applicationData = payload;
    },
    updateApplicationStart: (state, action) => {
      state.isSaving = false;
      state.userData.applicationData.startApplication = action.payload;
    },
    updateUserPhoto: (state, { payload }) => {
      state.userData.photoURL = payload;
    },
    updateApplicationPhoto: (state, { payload }) => {
      state.userData.applicationData.photoURL = payload;
    },
    updateApplicationProfileProfile: (state, { payload }) => {
      state.userData.applicationData.applicationProfile.profile = payload;
    },
    updateApplicationProfileProfileBMI: (state, { payload }) => {
      state.userData.applicationData.applicationProfile.profile.bmi = payload;
    },
    updateApplicationProfileContacts: (state, { payload }) => {
      state.userData.applicationData.applicationProfile.contacts = payload;
    },
    updateApplicationProfileVaccines: (state, { payload }) => {
      state.userData.applicationData.applicationProfile.vaccines = payload;
    },
    updateApplicationProfileVaccinesAdditional: (state, { payload }) => {
      state.userData.applicationData.applicationProfile.vaccines.additionalVaccines =
        payload;
    },
    updateApplicationProfileVaccinesAttach: (state, { payload }) => {
      state.userData.applicationData.applicationProfile.vaccines.attach =
        payload;
    },
    updateApplicationProfileLangDefault: (state, { payload }) => {
      state.userData.applicationData.applicationProfile.lang.default = payload;
    },
    updateApplicationProfileLangOther: (state, { payload }) => {
      state.userData.applicationData.applicationProfile.lang.other = payload;
    },
    updateApplicationProfileLangMarlins: (state, { payload }) => {
      state.userData.applicationData.applicationProfile.lang.marlins = payload;
    },
    updateApplicationDocument: (state, { payload }) => {
      state.userData.applicationData.applicationDocument = payload;
    },
    updateApplicationDocumentAdditional: (state, { payload }) => {
      state.userData.applicationData.additionalDocuments = payload;
    },
    updateApplicationCertificate: (state, { payload }) => {
      state.userData.applicationData.applicationCertificates = payload;
    },
    updateApplicationCertificateAdditional: (state, { payload }) => {
      state.userData.applicationData.additionalCertificates = payload;
    },
    updateApplicationSkill: (state, { payload }) => {
      state.userData.applicationData.skills = payload;
    },
    updateApplicationOnboardDetails: (state, { payload }) => {
      state.userData.applicationData.onboardJustified = payload;
    },
    updateApplicationOnlandDetails: (state, { payload }) => {
      state.userData.applicationData.onlandJustified = payload;
    },
    updateApplicationReview: (state, { payload }) => {
      state.userData.applicationData.review = payload;
    },
  },
});

export const {
  setSaving,
  setLoading,
  setUserData,
  setApplication,
  setApplicationData,
  updateUserPhoto,
  updateApplicationPhoto,
  updateApplicationStage,
  updateApplicationStart,
  updateApplicationProfileProfile,
  updateApplicationProfileProfileBMI,
  updateApplicationProfileContacts,
  updateApplicationProfileVaccines,
  updateApplicationProfileVaccinesAdditional,
  updateApplicationProfileVaccinesAttach,
  updateApplicationProfileLangDefault,
  updateApplicationProfileLangOther,
  updateApplicationProfileLangMarlins,
  updateApplicationData,
  updateApplicationDocument,
  updateApplicationDocumentAdditional,
  updateApplicationCertificate,
  updateApplicationCertificateAdditional,
  updateApplicationSkill,
  updateApplicationOnboardDetails,
  updateApplicationOnlandDetails,
  updateApplicationReview,
} = userSlice.actions;
