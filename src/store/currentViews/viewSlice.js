import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  interviewers: [],
  application: {},
  profile: {},
  hirings: [],
  embarks: [],
  firstInterview: [],
  secondInterview: [],
  currentInterview: {},
  currentHiring: {},
  currentEmbark: {},
};

export const viewSlice = createSlice({
  name: "currentViews",
  initialState,
  reducers: {
    setInterviewers: (state, { payload }) => {
      state.interviewers = payload;
    },
    setApplicationView: (state, { payload }) => {
      state.application = payload;
    },
    updateApplication: (state, { payload }) => {
      state.application = payload;
    },
    setIsRead: (state, { payload }) => {
      state.application.isRead = payload;
    },
    updateReviewVersion: (state, { payload }) => {
      state.application.versions[payload.version] = payload.applicationData;
    },
    setProfileView: (state, { payload }) => {
      state.profile = payload;
    },
    updateSeafarerStage: (state, { payload }) => {
      state.profile.recruitmentStage = payload;
    },
    updateSeafarerPhoto: (state, { payload }) => {
      state.profile.photoURL = payload;
      state.profile.seafarerData.photoURL = payload;
    },
    updateSeafarerSignature: (state, { payload }) => {
      state.profile.signature = payload;
    },
    updateSeafarerIdentification: (state, { payload }) => {
      state.profile.identification = payload;
    },
    updateSeafarerData: (state, { payload }) => {
      state.profile.seafarerData = payload;
    },
    updateSeafarerProfileData: (state, { payload }) => {
      state.profile.seafarerData.seafarerProfile = payload;
    },
    updateProfileData: (state, { payload }) => {
      state.profile.seafarerData.seafarerProfile.profile = payload;
    },
    updateSeafarerPosition: (state, { payload }) => {
      state.profile.seafarerData.position = payload;
    },
    updateSeafarerDepartment: (state, { payload }) => {
      state.profile.seafarerData.department = payload;
    },
    updateSeafarerVesselType: (state, { payload }) => {
      state.profile.seafarerData.vesselType = payload;
    },
    updateSeafarerDocuments: (state, { payload }) => {
      state.profile.seafarerData.seafarerDocument = payload;
    },
    updateSeafarerAdditionalDocuments: (state, { payload }) => {
      state.profile.seafarerData.additionalDocuments = payload;
    },
    updateSeafarerCertificates: (state, { payload }) => {
      state.profile.seafarerData.seafarerCertificates = payload;
    },
    updateSeafarerAdditionalCertificates: (state, { payload }) => {
      state.profile.seafarerData.additionalCertificates = payload;
    },
    updateSeafarerSkills: (state, { payload }) => {
      state.profile.seafarerData.skills = payload;
    },
    updateSeafarerComments: (state, { payload }) => {
      state.profile.notes = payload;
    },
    updateSeafarerOnboardDetails: (state, { payload }) => {
      state.profile.seafarerData.onboardJustified = payload;
    },
    updateSeafarerOnlandDetails: (state, { payload }) => {
      state.profile.seafarerData.onlandJustified = payload;
    },
    setFirstInterview: (state, { payload }) => {
      state.firstInterview = payload;
    },
    setSecondInterview: (state, { payload }) => {
      state.secondInterview = payload;
    },
    updateFirstInterview: (state, { payload }) => {
      state.firstInterview = payload;
    },
    updateSecondInterview: (state, { payload }) => {
      state.secondInterview = payload;
    },
    setCurrentInterview: (state, { payload }) => {
      state.currentInterview = payload;
    },
    setHirings: (state, { payload }) => {
      state.hirings = payload;
    },
    setCurrentHiring: (state, { payload }) => {
      state.currentHiring = payload;
    },
    setEmbarks: (state, { payload }) => {
      state.embarks = payload;
    },
    setCurrentEmbark: (state, { payload }) => {
      state.currentEmbark = payload;
    },
    setPositions: (state, { payload }) => {
      state.positions = payload;
    },
    setDepartments: (state, { payload }) => {
      state.departments = payload;
    },
    setVesselTypes: (state, { payload }) => {
      state.vesselTypes = payload;
    },
    setVessels: (state, { payload }) => {
      state.vessels = payload;
    },
    setCompanies: (state, { payload }) => {
      state.companies = payload;
    },
    setSignOffReasons: (state, { payload }) => {
      state.signOffReasons = payload;
    },
    setProfileUpdateData: (state, { payload }) => {
      state.profileUpdate = payload;
    },
  },
});

export const {
  setInterviewers,
  setApplicationView,
  updateApplication,
  setIsRead,
  updateReviewVersion,
  setProfileView,
  updateSeafarerStage,
  updateSeafarerPhoto,
  updateSeafarerSignature,
  updateSeafarerIdentification,
  updateSeafarerData,
  updateSeafarerProfileData,
  updateProfileData,
  updateSeafarerPosition,
  updateSeafarerDepartment,
  updateSeafarerVesselType,
  updateSeafarerDocuments,
  updateSeafarerAdditionalDocuments,
  updateSeafarerCertificates,
  updateSeafarerAdditionalCertificates,
  updateSeafarerSkills,
  updateSeafarerComments,
  updateSeafarerOnboardDetails,
  updateSeafarerOnlandDetails,
  setFirstInterview,
  setSecondInterview,
  updateFirstInterview,
  updateSecondInterview,
  setCurrentInterview,
  setHirings,
  setCurrentHiring,
  setEmbarks,
  setCurrentEmbark,
  setPositions,
  setDepartments,
  setVesselTypes,
  setVessels,
  setCompanies,
  setSignOffReasons,
  setProfileUpdateData,
} = viewSlice.actions;
