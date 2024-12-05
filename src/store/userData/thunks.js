import {
  doc,
  getDoc,
  getDocs,
  collection,
  setDoc,
  updateDoc,
  getDocFromCache,
  addDoc,
  where,
  query,
} from "firebase/firestore";
import { FirebaseDB, FirebaseStorage } from "../../config/firebase/config";
import {
  setSaving,
  setLoading,
  setUserData,
  updateApplicationData,
  updateApplicationStage,
  updateUserPhoto,
  setApplication,
  setApplicationData,
  updateApplicationPhoto,
} from "./userSlice";
import {
  deleteObject,
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytes,
} from "firebase/storage";
import {
  setApplicationView,
  setCurrentEmbark,
  setCurrentHiring,
  setDashboardData,
  setEmbarks,
  setFirstInterview,
  setHirings,
  setProfileUpdateData,
  setProfileView,
  setSecondInterview,
  updateSeafarerComments,
  updateSeafarerPhoto,
  updateSeafarerSignature,
} from "../currentViews/viewSlice";
import { createuserWithEmail } from "../../config/firebase/providers";

export const getDashboardData = () => {
  return async (dispatch) => {
    const docRef = doc(FirebaseDB, `dashboard/data`);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    const formatedDate = data.updatedAt.toDate().toISOString();
    const updatedData = { ...data, updatedAt: formatedDate };
    dispatch(setDashboardData(updatedData));
  };
};

export const createApplication = (userData) => {
  return async (dispatch) => {
    const { uid, identification } = userData;
    const toSave = [userData.applicationData];
    const date = new Date().toISOString();
    const data = {
      identification: identification,
      versions: toSave,
      status: 1,
      createdOn: date,
      uid: uid,
      isRead: false,
      vesselType: userData.applicationData.startApplication.vesselType[0].id,
      department: userData.applicationData.startApplication.department[0].id,
      position: userData.applicationData.startApplication.position[0].id,
    };
    const profileUpdate = {
      identification: identification,
      recruitmentStage: 13,
    };
    const docRef = doc(FirebaseDB, `applications/${uid}`);
    const profileRef = doc(FirebaseDB, `usersData/${uid}`);
    await setDoc(docRef, data);
    await updateDoc(profileRef, profileUpdate);
  };
};

export const createSeafarer = (data, createAccount = false) => {
  return async (dispatch) => {
    const { email, password, displayName, seafarerData } = data;

    if (createAccount) {
      const { ok, uid } = await createuserWithEmail({
        email,
        password,
        displayName,
      });
      if (!ok) {
        return false;
      }
      const docRef = doc(FirebaseDB, `usersData/${uid}`);
      await setDoc(docRef, seafarerData);
      return uid;
    } else {
      const docRef = doc(collection(FirebaseDB, "usersData")); // ID generado automáticamente
      await setDoc(docRef, { ...seafarerData, uid: docRef.id });
      return docRef.id; // Devuelve el ID generado
    }
  };
};

export const submitProfileUpdate = (uid, userData) => {
  return async (dispatch) => {
    try {
      const toSave = userData;
      const date = new Date().toISOString();

      const data = {
        seafarerData: toSave,
        status: 1,
        createdOn: date,
        uid: uid,
        isRead: false,
      };

      const profileUpdate = {
        profileUpdate: true,
      };

      // Referencia a la colección
      const collectionRef = collection(FirebaseDB, "profileUpdates");

      // Crear un nuevo documento con ID automático
      const docRef = await addDoc(collectionRef, data);

      // Actualizar el campo 'id' en el documento recién creado
      await updateDoc(docRef, { id: docRef.id });

      // Actualizar el documento del usuario en 'usersData'
      const profileRef = doc(FirebaseDB, `usersData/${uid}`);
      await updateDoc(profileRef, profileUpdate);

      console.log(`Profile update submitted successfully for UID: ${uid}`);
    } catch (error) {
      console.error("Error submitting profile update:", error);
    }
  };
};

export const setLogisticId = (uid) => {
  return async (dispatch) => {
    const date = new Date().toISOString();
    const data = {
      uid: uid,
      createdOn: date,
    };

    try {
      // Usa addDoc para agregar el documento con un ID generado automáticamente
      const docRef = await addDoc(collection(FirebaseDB, `gappool`), data);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
};

export const submitRetireRequest = (uid, reason) => {
  return async (dispatch) => {
    const date = new Date().toISOString();
    const data = {
      status: 1,
      createdOn: date,
      reason: reason,
      uid: uid,
    };
    const profileUpdate = {
      retireRequest: true,
    };
    try {
      const docRef = doc(collection(FirebaseDB, "retireRequests"));

      const profileRef = doc(FirebaseDB, `usersData/${uid}`);
      await setDoc(docRef, data);
      await updateDoc(profileRef, profileUpdate);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
};

export const updateRetireRequest = (id, status) => {
  return async (dispatch) => {
    const date = new Date().toISOString();
    const data = {
      status: status,
      modifiedOn: date,
    };
    const docRef = doc(FirebaseDB, `retireRequests/${id}`);
    await updateDoc(docRef, data);
  };
};

export const getProfileUpdate = (id) => {
  return async (dispatch) => {
    try {
      const docRef = doc(FirebaseDB, `profileUpdates/${id}`);

      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      dispatch(setProfileUpdateData({ ...data, id: docSnap.id }));
      return true;
    } catch (error) {
      return false;
    }
  };
};

export const getApplication = (uid, skip) => {
  return async (dispatch) => {
    // dispatch(setLoading(true));
    const docRef = doc(FirebaseDB, `applications/${uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const latestVersion = docSnap.data().versions.length - 1;
      const latest = docSnap.data().versions[latestVersion];
      dispatch(setApplication(docSnap.data()));
      dispatch(setApplicationView(docSnap.data()));
      if (!skip) {
        dispatch(setApplicationData(latest));
      }
      return true;
      // dispatch(setLoading(false));
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return false;
      // dispatch(setLoading(false));
    }
    // dispatch(setLoading(false));
  };
};

export const getApplicationByUid = (uid, skip) => {
  return async (dispatch) => {
    try {
      // Hacer una consulta para buscar el documento donde uid es igual al valor proporcionado
      const applicationsRef = collection(FirebaseDB, "applications");
      const q = query(applicationsRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0]; // Toma el primer documento encontrado
        const docData = docSnap.data();
        const latestVersion = docData.versions.length - 1;
        const latest = docData.versions[latestVersion];

        // Despachar las acciones con los datos obtenidos
        dispatch(setApplication(docData));
        dispatch(setApplicationView(docData));
        if (!skip) {
          dispatch(setApplicationData(latest));
        }
        return true;
      } else {
        console.log("No such document!");
        return false;
      }
    } catch (error) {
      console.error("Error fetching application:", error);
      return false;
    }
  };
};

export const updateUsersData = (uid, data) => {
  return async (dispatch) => {
    dispatch(setSaving(true));
    const date = new Date().toISOString();
    try {
      const docRef = doc(FirebaseDB, `usersData/${uid}`);
      await updateDoc(docRef, { ...data, modifiedOn: date });
      dispatch(setSaving(false));
    } catch (error) {
      console.error("Error updating seafarer:", error);
      dispatch(setSaving(false)); // Ensure saving state is reset even if an error occurs
      // Additional error handling, like dispatching an error action, can be added here
    }
  };
};

export const updateSeafarerDataFirebase = (uid, data, stage) => {
  return async (dispatch) => {
    dispatch(setSaving(true));

    try {
      let toUpdate;
      if (stage) {
        toUpdate = {
          modifiedOn: new Date().toISOString(),
          vesselType: data.vesselType[0].id,
          department: data.department[0].id,
          position: data.position[0].id,
          seafarerData: data,
          recruitmentStage: stage,
        };
      } else {
        toUpdate = {
          modifiedOn: new Date().toISOString(),
          vesselType: data.vesselType[0].id,
          department: data.department[0].id,
          position: data.position[0].id,
          seafarerData: data,
        };
      }
      const docRef = doc(FirebaseDB, `usersData/${uid}`);
      await updateDoc(docRef, toUpdate);

      dispatch(setSaving(false));
    } catch (error) {
      console.error("Error updating seafarer:", error);
      dispatch(setSaving(false)); // Ensure saving state is reset even if an error occurs
      // Additional error handling, like dispatching an error action, can be added here
    }
  };
};
export const updateSeafarerNotes = (uid, notes) => {
  return async (dispatch) => {
    dispatch(setSaving(true));

    try {
      const toUpdate = {
        notes: notes,
      };

      const docRef = doc(FirebaseDB, `usersData/${uid}`);
      await updateDoc(docRef, toUpdate);
      dispatch(updateSeafarerComments(notes));
      dispatch(setSaving(false));
    } catch (error) {
      console.error("Error updating notes:", error);
      dispatch(setSaving(false)); // Ensure saving state is reset even if an error occurs
      // Additional error handling, like dispatching an error action, can be added here
    }
  };
};

export const updateApplicationFirestore = (
  uid,
  data,
  updateStage = false,
  stage
) => {
  return async (dispatch) => {
    dispatch(setSaving(true));

    try {
      const toUpdate = {
        applicationData: data,
        applicationStage: stage,
      };
      const docRef = doc(FirebaseDB, `usersData/${uid}`);
      await updateDoc(docRef, toUpdate);

      if (updateStage === true) {
        dispatch(updateApplicationStage(stage));
      }

      dispatch(setSaving(false));
    } catch (error) {
      console.error("Error updating application:", error);
      dispatch(setSaving(false)); // Ensure saving state is reset even if an error occurs
      // Additional error handling, like dispatching an error action, can be added here
    }
  };
};

export const updateApplicationSent = (uid, data, vesselTypeData) => {
  return async (dispatch) => {
    dispatch(setSaving(true));
    try {
      const { position, department, vesselType } = vesselTypeData;
      const newData = {
        ...data,
        vesselType: vesselType,
        position: position,
        department: department,
      };
      const docRef = doc(FirebaseDB, `applications/${uid}`);
      // await updateDoc(docRef, data);
      await setDoc(docRef, newData);
      dispatch(setSaving(false));
    } catch (error) {
      console.error("Error updating application:", error);
      dispatch(setSaving(false)); // Ensure saving state is reset even if an error occurs
      // Additional error handling, like dispatching an error action, can be added here
    }
  };
};

export const updateApplicationSentStatus = (uid, status) => {
  return async (dispatch) => {
    dispatch(setSaving(true));
    try {
      const data = { status: status };
      const docRef = doc(FirebaseDB, `applications/${uid}`);
      // await updateDoc(docRef, data);
      await updateDoc(docRef, data);
      dispatch(setSaving(false));
    } catch (error) {
      console.error("Error updating application:", error);
      dispatch(setSaving(false)); // Ensure saving state is reset even if an error occurs
      // Additional error handling, like dispatching an error action, can be added here
    }
  };
};

export const getUserData = (uid) => {
  return async (dispatch) => {
    dispatch(setLoading());
    const docRef = doc(FirebaseDB, `usersData/${uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      dispatch(setUserData(docSnap.data()));
      return true;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return false;
    }
  };
};

export const getSeafarerData = (uid) => {
  return async (dispatch) => {
    dispatch(setLoading());
    const docRef = doc(FirebaseDB, `usersData/${uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const newData = {
        ...data,
        uid: docSnap.id,
      };

      dispatch(setProfileView(newData));
      return true;
    } else {
      console.log("No such document!");
      return false;
    }
  };
};

export const uploadApplicationUserPhoto = (file, uid) => {
  return async (dispatch) => {
    // dispatch(setLoading(true));
    const imageRef = ref(FirebaseStorage, `/applicantFiles/${uid}/${uid}-pfp`);
    await uploadBytes(imageRef, file);
    const photURL = await getDownloadURL(imageRef);
    dispatch(updateApplicationPhoto(photURL));
  };
};

export const uploadSeafarerUserPhoto = (file, uid) => {
  return async (dispatch) => {
    // dispatch(setLoading(true));
    const imageRef = ref(FirebaseStorage, `/applicantFiles/${uid}/${uid}-pfp`);
    await uploadBytes(imageRef, file);
    const photURL = await getDownloadURL(imageRef);
    dispatch(updateSeafarerPhoto(photURL));
  };
};

export const deleteSeafarerPhoto = (userData) => {
  return async (dispatch) => {
    const { uid } = userData;
    const imageRef = ref(FirebaseStorage, `/applicantFiles/${uid}/${uid}-pfp`);
    await deleteObject(imageRef);
    const photURL = "";
    dispatch(updateSeafarerPhoto(photURL));
  };
};
export const uploadSeafarerUserSignature = (file, uid) => {
  return async (dispatch) => {
    // dispatch(setLoading(true));
    const imageRef = ref(
      FirebaseStorage,
      `/applicantFiles/${uid}/${uid}-Signature`
    );
    await uploadBytes(imageRef, file);
    const photoURL = await getDownloadURL(imageRef);
    dispatch(updateSeafarerSignature(photoURL));
  };
};

export const deleteSeafarerSignature = (userData) => {
  return async (dispatch) => {
    const { uid } = userData;
    const imageRef = ref(
      FirebaseStorage,
      `/applicantFiles/${uid}/${uid}-Signature`
    );
    await deleteObject(imageRef);
    const photURL = "";
    dispatch(updateSeafarerSignature(photURL));
  };
};

export const deleteApplicationPhoto = (userData) => {
  return async (dispatch) => {
    const { uid } = userData;
    const imageRef = ref(FirebaseStorage, `/applicantFiles/${uid}/${uid}-pfp`);
    await deleteObject(imageRef);
    const photURL = "";
    dispatch(updateApplicationPhoto(photURL));
  };
};

export const uploadApplicantFile = (
  userData,
  file,
  filePath = "",
  fileName = "unknown-file"
) => {
  return async (dispatch) => {
    const { uid, firstName, lastName } = userData;
    const displayName =
      !firstName || !lastName
        ? `${userData.applicationData?.applicationProfile?.profile?.firstName} ${userData.applicationData?.applicationProfile?.profile?.lastName}`
        : `${firstName} ${lastName}`;
    const { name } = file;
    const fileExtension = name.split(".").pop().toLowerCase();
    const fileLocation = `/applicantFiles/${uid}/${filePath}`;
    const metadata = {
      customMetadata: {
        authoruid: uid,
        authorname: displayName,
      },
    };
    const newFileName = `${displayName}-${fileName}.${fileExtension}`;
    const fileRef = ref(FirebaseStorage, `${fileLocation}/${newFileName}`);
    const upload = await uploadBytes(fileRef, file, metadata);
    const fileURL = await getDownloadURL(fileRef);
    // const lookmetadata = await getMetadata(fileRef);
    // console.log(lookmetadata);
    const attachedFile = {
      url: fileURL,
      name: newFileName,
    };
    return attachedFile;
  };
};

// export const deleteApplicantFile = (
//   userData,
//   fileName = "unknown-file",
//   filePath = ""
// ) => {
//   return async (dispatch) => {
//     const { uid, firstName, lastName } = userData;
//     const displayName = `${firstName} ${lastName}`;
//     const imageRef = ref(
//       FirebaseStorage,
//       `/applicantFiles/${uid}/${filePath}${fileName}`
//     );
//     await deleteObject(imageRef);
//   };
// };
export const deleteApplicantFile = (
  userData,
  fileName = "unknown-file",
  filePath = ""
) => {
  return async (dispatch) => {
    const { uid, firstName, lastName } = userData;
    const displayName = `${firstName} ${lastName}`;
    const imageRef = ref(
      FirebaseStorage,
      `/applicantFiles/${uid}/${filePath}${fileName}`
    );

    try {
      // Comprobar si el archivo existe antes de intentar eliminarlo
      await getMetadata(imageRef);

      // Eliminar el archivo si existe
      await deleteObject(imageRef);
      return true;
    } catch (error) {
      // Si el error es de tipo "object-not-found", significa que no existe
      if (error.code === "storage/object-not-found") {
        console.warn(
          `El archivo no existe en la ruta especificada: ${fileName}`
        );
        return false;
      }
      // Si es otro tipo de error, lanzar el error
      throw error;
    }
  };
};

export const createFirstInterviews = (uid) => {
  return async (dispatch) => {
    // const subcolletion = collection(
    //   FirebaseDB,
    //   `usersData/${uid}`,
    //   "/firstInterviews"
    // );
    const docRef = doc(collection(FirebaseDB, "firstInterviews"));

    const docId = docRef.id;

    await setDoc(docRef, { status: "Pending", uid: uid, id: docId });
    const statusUpdate = {
      firstInterview: { status: "Pending" },
      firstInterviewGoDate: new Date().toISOString(),
    };
    const statusRef = doc(FirebaseDB, `usersData/${uid}`);
    await updateDoc(statusRef, statusUpdate);
  };
};

export const createNewFirstInterviews = (uid, data) => {
  return async (dispatch) => {
    try {
      const subcolletion = collection(
        FirebaseDB,
        `usersData/${uid}`,
        "/firstInterviews"
      );
      addDoc(subcolletion, data);
    } catch (error) {
      console.error("Error creating interview:", error);
    }
  };
};

export const updateFirstInterviewDoc = (uid, id, data, status) => {
  return async (dispatch) => {
    dispatch(setSaving(true));
    try {
      // const docRef = doc(FirebaseDB, `usersData/${uid}/firstInterviews/${id}`);
      const docRef = doc(FirebaseDB, `firstInterviews/${id}`);
      await updateDoc(docRef, data);
      const statusUpdate = {
        firstInterview: { status: status, date: data.interviewDate || "" },
      };
      const statusRef = doc(FirebaseDB, `usersData/${uid}`);
      await updateDoc(statusRef, statusUpdate);
      dispatch(setSaving(false));
    } catch (error) {
      console.error("Error updating interview:", error);
      dispatch(setSaving(false)); // Ensure saving state is reset even if an error occurs
      // Additional error handling, like dispatching an error action, can be added here
    }
  };
};

export const createSecondInterviews = (uid) => {
  return async (dispatch) => {
    // const subcolletion = collection(
    //   FirebaseDB,
    //   `usersData/${uid}`,
    //   "/secondInterviews"
    // );
    const docRef = doc(collection(FirebaseDB, "secondInterviews"));

    const docId = docRef.id;

    await setDoc(docRef, { status: "Pending", uid: uid, id: docId });
    const statusUpdate = {
      secondInterview: { status: "Pending" },
      secondInterviewGoDate: new Date().toISOString(),
    };
    const statusRef = doc(FirebaseDB, `usersData/${uid}`);
    await updateDoc(statusRef, statusUpdate);
  };
};

export const createNewSecondInterviews = (uid, data) => {
  return async (dispatch) => {
    try {
      const subcolletion = collection(
        FirebaseDB,
        `usersData/${uid}`,
        "/secondInterviews"
      );
      addDoc(subcolletion, data);
    } catch (error) {
      console.error("Error creating interview:", error);
    }
  };
};

export const updateSecondInterviewDoc = (uid, id, data, status) => {
  return async (dispatch) => {
    dispatch(setSaving(true));
    try {
      // const docRef = doc(FirebaseDB, `usersData/${uid}/secondInterviews/${id}`);
      const docRef = doc(FirebaseDB, `secondInterviews/${id}`);
      await updateDoc(docRef, data);
      const statusUpdate = {
        secondInterview: { status: status, date: data.interviewDate || "" },
      };
      const statusRef = doc(FirebaseDB, `usersData/${uid}`);
      await updateDoc(statusRef, statusUpdate);
      dispatch(setSaving(false));
    } catch (error) {
      console.error("Error updating interview:", error);
      dispatch(setSaving(false)); // Ensure saving state is reset even if an error occurs
      // Additional error handling, like dispatching an error action, can be added here
    }
  };
};

export const getFirstInterviews = (uid) => {
  return async (dispatch) => {
    dispatch(setLoading());
    // const docRef = collection(
    //   FirebaseDB,
    //   `usersData/${uid}`,
    //   "/firstInterviews"
    // );
    // const docSnap = await getDocs(docRef);
    const docRef = collection(FirebaseDB, `firstInterviews`);
    const q = query(docRef, where("uid", "==", uid));
    const docSnap = await getDocs(q);

    if (docSnap) {
      const interviews = docSnap.docs.map((doc) => {
        const data = doc.data();
        return { ...data, id: doc.id };
      });

      dispatch(setFirstInterview(interviews));
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
};

export const getSecondInterviews = (uid) => {
  return async (dispatch) => {
    dispatch(setLoading());
    // const docRef = collection(
    //   FirebaseDB,
    //   `usersData/${uid}`,
    //   "/secondInterviews"
    // );
    // const docSnap = await getDocs(docRef);
    const docRef = collection(FirebaseDB, `secondInterviews`);
    const q = query(docRef, where("uid", "==", uid));
    const docSnap = await getDocs(q);

    if (docSnap) {
      const interviews = docSnap.docs.map((doc) => {
        const data = doc.data();
        return { ...data, id: doc.id };
      });

      dispatch(setSecondInterview(interviews));
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
};

export const getSeafarerHirings = (uid) => {
  return async (dispatch) => {
    try {
      const docRef = collection(FirebaseDB, `hirings`);
      const q = query(docRef, where("uid", "==", uid));
      const docSnap = await getDocs(q);

      if (docSnap) {
        const hirings = docSnap.docs.map((doc) => {
          const data = doc.data();
          return { ...data, id: doc.id };
        });

        dispatch(setHirings(hirings));
        return true;
      }
    } catch (error) {
      console.error("Error fetching hirings data:", error);
      return false;
    }
  };
};

export const getSeafarerHiringsById = (id) => {
  return async (dispatch) => {
    try {
      const docRef = collection(FirebaseDB, `hirings`);
      const q = query(docRef, where("id", "==", id));
      const docSnap = await getDocs(q);

      if (!docSnap.empty) {
        // Verificar si hay documentos
        const hirings = docSnap.docs.map((doc) => {
          const data = doc.data();
          return { ...data, id: doc.id };
        });
        dispatch(setCurrentHiring(hirings[0]));
        return true; // Retornar true si se encontró algún hiring
      } else {
        console.log("No hirings found for the given ID");
        return false; // Si no se encuentran hirings
      }
    } catch (error) {
      console.error("Error fetching hirings data:", error);
      return false; // Retornar false si hay un error
    }
  };
};

export const createSeafarerHiring = (data, hiringsArray) => {
  return async (dispatch) => {
    try {
      // Generar una referencia de documento con un ID automáticamente
      const docRef = doc(collection(FirebaseDB, "hirings"));

      // Capturar el ID generado
      const documentId = docRef.id;

      // Agregar el ID al objeto data
      const updatedData = { ...data, id: documentId };

      // Guardar el documento con el ID en Firestore
      await setDoc(docRef, updatedData);

      // Si hiringsArray existe, actualizarlo con el nuevo objeto que contiene el ID
      if (hiringsArray) {
        const newArray = [...hiringsArray, updatedData];
        dispatch(setHirings(newArray));
      }
    } catch (error) {
      console.error("Error creating hiring:", error);
    }
  };
};

export const updateSeafarerHiring = (id, data, status) => {
  return async (dispatch) => {
    dispatch(setSaving(true));
    try {
      const docRef = doc(FirebaseDB, `hirings/${id}`);
      await setDoc(docRef, data, { merge: true });
      // const statusUpdate = { secondInterview: { status: status } };
      // const statusRef = doc(FirebaseDB, `usersData/${uid}`);
      // await updateDoc(statusRef, statusUpdate);
      dispatch(setSaving(false));
    } catch (error) {
      console.error("Error updating hiring:", error);
      dispatch(setSaving(false)); // Ensure saving state is reset even if an error occurs
      // Additional error handling, like dispatching an error action, can be added here
    }
  };
};

// export const getSeafarerEmbarksById = (id) => {
//   return async (dispatch) => {
//     try {
//       const docRef = collection(FirebaseDB, `embarks`);
//       const q = query(docRef, where("id", "==", id));
//       const docSnap = await getDocs(q);

//       if (!docSnap.empty) {
//         // Verificamos si hay documentos
//         const embarks = docSnap.docs.map((doc) => {
//           const data = doc.data();
//           return { ...data, id: doc.id };
//         });
//         dispatch(setCurrentEmbark(embarks[0]));
//         return true; // Regresa true si encuentra los embarks
//       } else {
//         console.log("No embarks found for the given ID");
//         return false; // Si no encuentra documentos, retorna false
//       }
//     } catch (error) {
//       console.error("Error fetching embarks data:", error);
//       return false; // Si hay un error, retorna false
//     }
//   };
// };

export const getSeafarerEmbarksById = (id) => {
  return async (dispatch) => {
    try {
      const docRef = doc(FirebaseDB, `embarks`, id); // Buscar documento directamente por ID
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Si el documento existe
        const data = docSnap.data();
        const embark = { ...data, id: docSnap.id }; // Agregar el ID al objeto de datos

        dispatch(setCurrentEmbark(embark)); // Actualizar el estado con el embarque encontrado
        return true; // Retornar true si encuentra el documento
      } else {
        console.log("No embark found for the given ID");
        return false; // Retornar false si no existe el documento
      }
    } catch (error) {
      console.error("Error fetching embark data:", error);
      return false; // Retornar false si ocurre un error
    }
  };
};

export const getSeafarerEmbarksByContract = (contractId) => {
  return async (dispatch) => {
    try {
      const docRef = collection(FirebaseDB, `embarks`);
      const q = query(docRef, where("contractId", "==", contractId));
      const docSnap = await getDocs(q);

      if (docSnap) {
        const embarks = docSnap.docs.map((doc) => {
          const data = doc.data();
          return { ...data, id: doc.id };
        });

        dispatch(setEmbarks(embarks));
        // dispatch(setLoading(false));
      }
    } catch (error) {
      console.error("Error fetching embarks data:", error);
      return false;
    }
  };
};

export const getSeafarerEmbarksBySeafarer = (uid) => {
  return async (dispatch) => {
    try {
      const docRef = collection(FirebaseDB, `embarks`);
      const q = query(docRef, where("uid", "==", uid));
      const docSnap = await getDocs(q);

      if (docSnap) {
        const hirings = docSnap.docs.map((doc) => {
          const data = doc.data();
          return { ...data, id: doc.id };
        });

        dispatch(setEmbarks(hirings));
        // dispatch(setLoading(false));
      }
    } catch (error) {
      console.error("Error fetching embarks data:", error);
      return false;
    }
  };
};

export const createSeafarerEmbark = (data) => {
  return async (dispatch) => {
    const colletion = collection(FirebaseDB, `embarks/`);
    addDoc(colletion, data);
  };
};

export const updateSeafarerEmbark = (id, data, status) => {
  return async (dispatch) => {
    dispatch(setSaving(true));
    try {
      const docRef = doc(FirebaseDB, `embarks/${id}`);
      await setDoc(docRef, data, { merge: true });
      // const statusUpdate = { secondInterview: { status: status } };
      // const statusRef = doc(FirebaseDB, `usersData/${uid}`);
      // await updateDoc(statusRef, statusUpdate);
      dispatch(setSaving(false));
    } catch (error) {
      console.error("Error updating embarks:", error);
      dispatch(setSaving(false)); // Ensure saving state is reset even if an error occurs
      // Additional error handling, like dispatching an error action, can be added here
    }
  };
};
