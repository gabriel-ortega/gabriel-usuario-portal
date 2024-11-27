export const initialUserDataExternal = (data) => {
  const todayDate = new Date().toISOString();
  const userData = {
    createdOn: todayDate,
    uid: data.uid,
    logisticId: "",
    applicationStage: 1,
    displayName: data.displayName,
    firstName: "",
    lastName: "",
    photoURL: data.photoURL,
    email: data.email,
    recruitmentStage: 1,
    role: 3,
    applicationData: {
      photoURL: data.photoURL,
      startApplication: {
        vesselType: [{ id: "" }],
        department: [{ id: "" }],
        position: [{ name: "" }],
      },
      applicationProfile: {
        profile: {},
        contacts: [],
        vaccines: {},
        lang: { default: {}, marlins: [], other: [] },
      },
      applicationDocument: [],
      applicationCertificates: [],
      skills: { onboard: [], onland: [], skill: [] },
    },
    seafarerData: { applicationDate: "" },
    firstInterview: {},
    secondInterview: {},
    available: true,
    notes: [{ type: 2, Note: "Creation", user: "", createdOn: todayDate }],
  };
  return userData;
};

export const initialUserDataRegistered = (uid, registerForm) => {
  const todayDate = new Date().toISOString();
  const userData = {
    createdOn: todayDate,
    role: 3,
    recruitmentStage: 1,
    logisticId: "",
    applicationStage: 1,
    uid: uid,
    firstName: registerForm.firstName,
    lastName: registerForm.lastName,
    displayName: `${registerForm.firstName} ${registerForm.lastName}`,
    email: registerForm.email,
    applicationData: {
      startApplication: {
        vesselType: [{ id: "" }],
        department: [{ id: "" }],
        position: [{ name: "" }],
      },
      applicationProfile: {
        profile: {
          firstName: registerForm.firstName,
          lastName: registerForm.lastName,
          dateBirth: registerForm.dateBirth,
          phone: registerForm.phone,
          countryBirth: registerForm.country,
          address: registerForm.address,
        },
        contacts: {},
        vaccines: {},
        lang: { default: {}, marlins: [], other: [] },
      },
      applicationDocument: [],
      applicationCertificates: [],
      skills: { onboard: [], onland: [], skill: [] },
    },
    seafarerData: { applicationDate: todayDate },
    available: true,
    firstInterview: {},
    secondInterview: {},
    notes: [{ type: 2, Note: "Creation", user: "", createdOn: todayDate }],
  };
  return userData;
};
