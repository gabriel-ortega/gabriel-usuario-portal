import {
  collection,
  query,
  where,
  limit,
  getDocs,
  or,
  getCountFromServer,
  orderBy,
  startAfter,
  getDoc,
  doc,
} from "firebase/firestore";
import { FirebaseDB } from "../config/firebase/config";

const bd_server = import.meta.env.VITE_BD_SERVER;
const firebaseServer = import.meta.env.VITE_FIREBASE_FUNCTIONS;
const localServer = "192.168.1.41:4000";

export async function fetchApplicationsReport(
  filters = { startDate: "", endDate: "" }
) {
  const { startDate, endDate } = filters;
  const url = `${firebaseServer}/applications${
    startDate ? `?startDate=${startDate}` : ""
  }${endDate ? `${startDate ? "&" : "?"}endDate=${endDate}` : ""}`;

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Procesar la respuesta
    return data;
  } catch (error) {
    console.error("Error fetching applications report:", error);
  }
}
export async function fetchFirstInterviewsReport(
  filters = { startDate: "", endDate: "" }
) {
  const { startDate, endDate } = filters;
  const url = `${firebaseServer}/firstinterviews${
    startDate ? `?startDate=${startDate}` : ""
  }${endDate ? `${startDate ? "&" : "?"}endDate=${endDate}` : ""}`;
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Procesar la respuesta
    return data;
  } catch (error) {
    console.error("Error fetching applications report:", error);
  }
}

export async function fetchSecondInterviewsReport(
  filters = { startDate: "", endDate: "" }
) {
  const { startDate, endDate } = filters;
  const url = `${firebaseServer}/secondinterviews${
    startDate ? `?startDate=${startDate}` : ""
  }${endDate ? `${startDate ? "&" : "?"}endDate=${endDate}` : ""}`;

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Procesar la respuesta
    return data;
  } catch (error) {
    console.error("Error fetching applications report:", error);
  }
}
export async function fetchGapPoolReport() {
  const url = `${firebaseServer}/gappool`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Agrega si es necesario
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Procesar la respuesta
    return data;
  } catch (error) {
    console.error("Error fetching applications report:", error);
  }
}

export async function fetchExpiredDocumentsReport(months) {
  const url = `${firebaseServer}/expireddocuments?months=${
    months ? months : 1
  }`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Agrega si es necesario
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Procesar la respuesta
    return data;
  } catch (error) {
    console.error("Error fetching documents report:", error);
  }
}

export async function exportAnyExcel(json, fileName = "report") {
  const response = await fetch(`${bd_server}/reporte/dinamico`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });

  if (response.ok) {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = `${fileName}.xlsx`; // Nombre del archivo que se descargará
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } else {
    console.error("Error al descargar el archivo:", response.statusText);
  }
}

export async function exportApplicationsExcel(json) {
  const response = await fetch(`${bd_server}/reporte/application`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });

  if (response.ok) {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "Applications list.xlsx"; // Nombre del archivo que se descargará
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } else {
    console.error("Error al descargar el archivo:", response.statusText);
  }
}


export async function downloadExcelDocumentExpired(filters = [],url,nameDocument) {
  try {
    const response = await fetch(`${bd_server}/reporte/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({filters}),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    // Convertir la respuesta en un Blob
    const blob = await response.blob();

    // Crear una URL para el blob y descargar el archivo
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${nameDocument}.xlsx`;
    link.click();
    URL.revokeObjectURL(downloadUrl); // Limpia la URL
  } catch (error) {
    console.error("Error al descargar el reporte:", error.message);
    throw error; // Permitir manejar el error en el componente si es necesario
  }
}


export async function downloadExcel(filters = [],url,nameDocument) {
  try {
    const response = await fetch(`${bd_server}/reporte/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    // Convertir la respuesta en un Blob
    const blob = await response.blob();

    // Crear una URL para el blob y descargar el archivo
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${nameDocument}.xlsx`;
    link.click();
    URL.revokeObjectURL(downloadUrl); // Limpia la URL
  } catch (error) {
    console.error("Error al descargar el reporte:", error.message);
    throw error; // Permitir manejar el error en el componente si es necesario
  }
}

export async function exportAllSeafarerExcel(json) {
  const response = await fetch(`${bd_server}/reporte/application`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });

  if (response.ok) {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "Applications list.xlsx"; // Nombre del archivo que se descargará
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } else {
    console.error("Error al descargar el archivo:", response.statusText);
  }
}
export async function exportGappoolExcel(json) {
  const response = await fetch(`${bd_server}/reporte/application`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });

  if (response.ok) {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "Applications list.xlsx"; // Nombre del archivo que se descargará
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } else {
    console.error("Error al descargar el archivo:", response.statusText);
  }
}

export async function countSeafarersData() {
  try {
    const collRef = collection(FirebaseDB, "globalSearchIndex");

    // Crear la consulta sin límite
    const countQuery = query(collRef);

    // Usar getCountFromServer para obtener el número total de documentos
    const snapshot = await getCountFromServer(countQuery);

    // Retornar el número total de documentos
    return snapshot.data().count;
  } catch (error) {
    console.error("Error counting seafarers data:", error);
    return 0;
  }
}

export async function countApplicationsData() {
  try {
    const collRef = collection(FirebaseDB, "applications");

    // Crear la consulta sin límite
    const countQuery = query(collRef);

    // Usar getCountFromServer para obtener el número total de documentos
    const snapshot = await getCountFromServer(countQuery);

    // Retornar el número total de documentos
    return snapshot.data().count;
  } catch (error) {
    console.error("Error counting applications data:", error);
    return 0;
  }
}

export async function countGappoolData() {
  try {
    const collRef = collection(FirebaseDB, "usersData");

    // Crear la consulta sin límite
    const countQuery = query(collRef, where("recruitmentStage", "==", 4));

    // Usar getCountFromServer para obtener el número total de documentos
    const snapshot = await getCountFromServer(countQuery);

    // Retornar el número total de documentos
    return snapshot.data().count;
  } catch (error) {
    console.error("Error counting seafarers data:", error);
    return 0;
  }
}

export async function fetchProfileUpdatesBatch(lastVisibleDoc = null) {
  try {
    const collRef = collection(FirebaseDB, "profileUpdates");

    // Crear la consulta con el límite de 20 documentos y la condición de `recruitmentStage`
    let profileUpdatesQuery = query(
      collRef,
      orderBy("createdOn", "desc"),
      limit(20)
    );

    // Si hay un documento visible, significa que es una página siguiente
    if (lastVisibleDoc) {
      profileUpdatesQuery = query(
        collRef,
        orderBy("createdOn", "desc"),
        startAfter(lastVisibleDoc),
        limit(20)
      );
    }

    // Obtener los documentos de la consulta
    const snapshot = await getDocs(profileUpdatesQuery);

    // Mapear los documentos a un arreglo
    const profileUpdates = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Obtener el último documento visible para la siguiente página
    const newLastVisible = snapshot.docs[snapshot.docs.length - 1];

    return {
      data: profileUpdates,
      lastVisible: newLastVisible, // Último documento para paginación
    };
  } catch (error) {
    console.error("Error fetching profile updates:", error);
    return { data: [], lastVisible: null };
  }
}

// export async function fetchSeafarersData(lastVisible = null) {
//   try {
//     const collRef = collection(FirebaseDB, "usersData");

//     // Crear la consulta
//     let firstQuery = query(
//       collRef,
//       where("role", "==", 3),
//       where("recruitmentStage", ">", 1),
//       limit(25)
//     );

//     // Si hay un documento visible anterior, agregar el startAfter para paginación
//     if (lastVisible) {
//       firstQuery = query(
//         collRef,
//         where("role", "==", 3),
//         where("recruitmentStage", ">", 1),
//         startAfter(lastVisible),
//         limit(25)
//       );
//     }

//     const documentSnapshots = await getDocs(firstQuery);

//     if (documentSnapshots.empty) {
//       return { data: [], lastVisible: null };
//     }

//     // Obtener los datos de los documentos
//     const seafarersData = documentSnapshots.docs.map((doc) => {
//       const data = doc.data();
//       return {
//         ...data,
//         uid: doc.id,
//       };
//     });

//     // Ordenar los datos por "createdOn"
//     const sortedSeafarers = seafarersData.sort((a, b) => {
//       return new Date(a.createdOn) - new Date(b.createdOn);
//     });

//     // Obtener el último documento visible
//     const lastVisibleDoc =
//       documentSnapshots.docs[documentSnapshots.docs.length - 1];

//     // Devolver los datos ordenados y el último documento visible para la paginación
//     return { data: sortedSeafarers, lastVisible: lastVisibleDoc };
//   } catch (error) {
//     console.error("Error fetching seafarers data:", error);
//     return { data: [], lastVisible: null };
//   }
// }

export async function fetchSeafarersData(
  filters,
  pageSize = 50,
  lastVisible = null
) {
  try {
    const collRef = collection(FirebaseDB, "usersData");
    const formattedStartDate = filters.applicationDateStart
      ? `${filters.applicationDateStart}T00:00:00.000Z`
      : null;
    const formattedEndDate = filters.applicationDateEnd
      ? `${filters.applicationDateEnd}T23:59:59.999Z`
      : null;
    let queryConstraints = [];

    queryConstraints.push(where("role", "==", 3));
    queryConstraints.push(where("recruitmentStage", ">", 1));

    // Agregar filtros dinámicos según los valores de `filters`
    if (filters.department?.id) {
      queryConstraints.push(where("department", "==", filters.department.id));
    }
    if (filters.position?.id) {
      queryConstraints.push(where("position", "==", filters.position.id));
    }
    if (filters.residency?.Id) {
      queryConstraints.push(
        where(
          "seafarerData.seafarerProfile.profile.countryResidency.Id",
          "==",
          filters.residency.Id
        )
      );
    }
    if (filters.nationality?.Id) {
      queryConstraints.push(
        where(
          "seafarerData.seafarerProfile.profile.countryBirth.Id",
          "==",
          filters.nationality.Id
        )
      );
    }
    if (filters.stage?.id) {
      queryConstraints.push(where("status", "==", Number(filters.stage.id)));
    }
    if (filters.applicationSource?.id) {
      queryConstraints.push(
        where(
          "seafarerData.seafarerProfile.profile.knowAboutUs.id",
          "==",
          filters.applicationSource.id
        )
      );
    }
    if (filters.harvester?.id) {
      queryConstraints.push(where("harvester.id", "==", filters.harvester.id));
    }
    if (filters.recruitmentDepartment?.id) {
      queryConstraints.push(
        where("vesselType", "==", filters.recruitmentDepartment.id)
      );
    }

    // Filtrar por rango de fechas
    if (filters.applicationDateStart) {
      queryConstraints.push(where("createdOn", ">=", formattedStartDate));
    }
    if (filters.applicationDateEnd) {
      queryConstraints.push(where("createdOn", "<=", formattedEndDate));
    }

    // Agregar paginación
    if (lastVisible) {
      queryConstraints.push(startAfter(lastVisible));
    }

    queryConstraints.push(limit(pageSize));
    // Crear la consulta con los filtros
    const queryRef = query(collRef, ...queryConstraints);
    const documentSnapshots = await getDocs(queryRef);

    // Obtener el último documento visible para la paginación
    // const newLastVisible = documentSnapshots.docs.length;
    const newLastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    // Procesar los datos
    const seafarersData = documentSnapshots.docs.map((doc) => {
      const data = doc.data();
      return { ...data, uid: doc.id };
    });

    return { seafarersData, lastVisible: newLastVisible };
  } catch (error) {
    console.error("Error fetching seafarers data:", error);
    return { seafarersData: [], lastVisible: null, error: error };
  }
}

export async function fetchApplicationsData(
  filters,
  pageSize = 100,
  lastVisible = null
) {
  try {
    const collRef = collection(FirebaseDB, "applications");
    const formattedStartDate = filters.applicationDateStart
      ? `${filters.applicationDateStart}T00:00:00.000Z`
      : null;
    const formattedEndDate = filters.applicationDateEnd
      ? `${filters.applicationDateEnd}T23:59:59.999Z`
      : null;
      console.log(formattedStartDate)
    let queryConstraints = [];

    // Agregar filtros dinámicos según los valores de `filters`
    if (filters.department?.id) {
      queryConstraints.push(where("department", "==", filters.department.id));
    }
    if (filters.position?.id) {
      queryConstraints.push(where("position", "==", filters.position.id));
    }
    if (filters.residency?.Id) {
      queryConstraints.push(
        where(
          "latestVersion.applicationProfile.profile.countryResidency.Id",
          "==",
          filters.residency.Id
        )
      );
    }
    if (filters.nationality?.Id) {
      queryConstraints.push(
        where(
          "latestVersion.applicationProfile.profile.countryBirth.Id",
          "==",
          filters.nationality.Id
        )
      );
    }
    if (filters.status?.id) {
      queryConstraints.push(where("status", "==", Number(filters.status.id)));
    }
    if (filters.applicationSource?.id) {
      queryConstraints.push(
        where(
          "latestVersion.applicationProfile.profile.knowAboutUs.id",
          "==",
          filters.applicationSource.id
        )
      );
    }
    if (filters.harvester?.id) {
      queryConstraints.push(where("harvester.id", "==", filters.harvester.id));
    }
    if (filters.recruitmentDepartment?.id) {
      queryConstraints.push(
        where("vesselType", "==", filters.recruitmentDepartment.id)
      );
    }

    // Filtrar por rango de fechas
    if (filters.applicationDateStart) {
      queryConstraints.push(where("createdOn", ">=", formattedStartDate));
    }
    if (filters.applicationDateEnd) {
      queryConstraints.push(where("createdOn", "<=", formattedEndDate));
    }
    if (filters.read === true || filters.read === false) {
      queryConstraints.push(where("isRead", "==", filters.read));
    }

    // Ordenar por fecha de creación y limitar la cantidad de resultados
    queryConstraints.push(orderBy("createdOn", "desc"));
    queryConstraints.push(limit(pageSize));
    console.log(lastVisible);

    // Agregar paginación
    if (lastVisible) {
      // console.log(lastVisible);
      queryConstraints.push(startAfter(lastVisible));
    }

    // Crear la consulta con los filtros
    const queryRef = query(collRef, ...queryConstraints);
    const documentSnapshots = await getDocs(queryRef);

    // Obtener el último documento visible para la paginación
    const newLastVisible = documentSnapshots.docs.length;

    // Procesar los datos
    const seafarersData = documentSnapshots.docs.map((doc) => {
      const data = doc.data();
      return {
        applicationData: { ...data, uid: doc.id },
      };
    });

    return { seafarersData, lastVisible: newLastVisible };
  } catch (error) {
    console.error("Error fetching applications data:", error);
    return { seafarersData: [], lastVisible: null };
  }
}

export async function fetchSeafarersDataFilter(id) {
  try {
    const collRef = collection(FirebaseDB, "usersData");
    const first = query(
      collRef,
      (where("role", "==", "applicant"), where("id", "==", id))
    );

    const documentSnapshots = await getDocs(first);

    if (documentSnapshots) {
      const newSeafarers = documentSnapshots.docs.map((doc) => doc.data());

      return newSeafarers;
    }
  } catch (error) {
    console.error("Error fetching seafarers data:", error);
    return [];
  }
}

export async function fetchFirstInterviewsPending() {
  try {
    const collRef = collection(FirebaseDB, "usersData");
    const first = query(
      collRef,
      or(
        where("firstInterview.status", "==", "Pending"),
        where("firstInterview.status", "==", "Review"),
        where("firstInterview.status", "==", "Appointed")
      ),
      limit(25)
    );

    const documentSnapshots = await getDocs(first);

    if (documentSnapshots) {
      const interviews = documentSnapshots.docs.map((doc) => doc.data());

      return interviews;
    }
  } catch (error) {
    console.error("Error fetching seafarers data:", error);
    return [];
  }
}

export async function fetchFirstInterviewsCompleted() {
  try {
    const collRef = collection(FirebaseDB, "usersData");
    const first = query(
      collRef,
      or(
        where("firstInterview.status", "==", "Approved"),
        where("firstInterview.status", "==", "Disapproved"),
        where("firstInterview.status", "==", "Retired")
      ),
      limit(25)
    );

    const documentSnapshots = await getDocs(first);

    if (documentSnapshots) {
      const interviews = documentSnapshots.docs.map((doc) => doc.data());

      return interviews;
    }
  } catch (error) {
    console.error("Error fetching seafarers data:", error);
    return [];
  }
}
export async function fetchSecondInterviewsPending() {
  try {
    const collRef = collection(FirebaseDB, "usersData");
    const first = query(
      collRef,
      or(
        where("secondInterview.status", "==", "Pending"),
        where("secondInterview.status", "==", "Review"),
        where("secondInterview.status", "==", "Appointed")
      ),
      limit(25)
    );

    const documentSnapshots = await getDocs(first);

    if (documentSnapshots) {
      const interviews = documentSnapshots.docs.map((doc) => doc.data());

      return interviews;
    }
  } catch (error) {
    console.error("Error fetching seafarers data:", error);
    return [];
  }
}

export async function fetchSecondInterviewsCompleted() {
  try {
    const collRef = collection(FirebaseDB, "usersData");
    const first = query(
      collRef,
      or(
        where("secondInterview.status", "==", "Approved"),
        where("secondInterview.status", "==", "Disapproved"),
        where("secondInterview.status", "==", "Retired")
      ),
      limit(25)
    );

    const documentSnapshots = await getDocs(first);

    if (documentSnapshots) {
      const interviews = documentSnapshots.docs.map((doc) => doc.data());

      return interviews;
    }
  } catch (error) {
    console.error("Error fetching seafarers data:", error);
    return [];
  }
}

export async function getInterviewers() {
  try {
    const collRef = collection(FirebaseDB, "usersData");
    const first = query(
      collRef,
      or(where("role", "==", 1), where("role", "==", 2)),
      limit(25)
    );

    const documentSnapshots = await getDocs(first);

    if (documentSnapshots) {
      const interviewers = documentSnapshots.docs.map((doc) => {
        const data = doc.data();
        return { ...data, id: doc.id };
      });
      return interviewers;
    }
  } catch (error) {
    console.error("Error fetching seafarers data:", error);
    return [];
  }
}

export async function fetchGapPoolData(lastVisibleDoc = null) {
  try {
    const collRef = collection(FirebaseDB, "usersData");

    let querySnapshot;
    if (lastVisibleDoc) {
      // Si hay un documento visible, significa que es una página siguiente
      querySnapshot = query(
        collRef,
        where("recruitmentStage", "==", 4),
        startAfter(lastVisibleDoc),
        limit(25)
      );
    } else {
      // Si no hay documento visible, cargar la primera página
      querySnapshot = query(
        collRef,
        where("recruitmentStage", "==", 4),
        limit(25)
      );
    }

    const documentSnapshots = await getDocs(querySnapshot);

    if (!documentSnapshots.empty) {
      const seafarersData = documentSnapshots.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          uid: doc.id,
        };
      });

      // Ordenar por logisticId en orden ascendente
      const sortedSeafarersData = seafarersData.sort((a, b) => {
        const logisticIdA = parseInt(a.logisticId, 10);
        const logisticIdB = parseInt(b.logisticId, 10);
        return logisticIdA - logisticIdB;
      });

      // Guardar el último documento visible para la paginación
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      return {
        data: sortedSeafarersData,
        lastVisible, // Último documento visible para la siguiente página
      };
    } else {
      return { data: [], lastVisible: null };
    }
  } catch (error) {
    console.error("Error fetching seafarers data:", error);
    return { data: [], lastVisible: null };
  }
}

export async function fetchAllGapPoolData() {
  try {
    const collRef = collection(FirebaseDB, "usersData");

    const querySnapshot = query(collRef, where("recruitmentStage", "==", 4));

    const documentSnapshots = await getDocs(querySnapshot);

    if (!documentSnapshots.empty) {
      const seafarersData = documentSnapshots.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          uid: doc.id,
        };
      });

      // Ordenar por logisticId en orden ascendente
      const sortedSeafarersData = seafarersData.sort((a, b) => {
        const logisticIdA = parseInt(a.logisticId, 10);
        const logisticIdB = parseInt(b.logisticId, 10);
        return logisticIdA - logisticIdB;
      });
      return sortedSeafarersData;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching seafarers data:", error);
    return [];
  }
}

// export async function fetchHiringActiveData(lastVisibleDoc = null) {
//   try {
//     // Paso 1: Obtener datos de la colección "hirings"
//     const collRef = collection(FirebaseDB, "hirings");
//     let querySnapshot;

//     if (lastVisibleDoc) {
//       // Si hay un documento visible, significa que es una página siguiente
//       querySnapshot = query(
//         collRef,
//         where("status.id", "==", "1"),
//         startAfter(lastVisibleDoc),
//         limit(10)
//       );
//     } else {
//       // Si no hay documento visible, cargar la primera página
//       querySnapshot = query(
//         collRef,
//         where("status.id", "==", "1")
//         , limit(10)
//       );
//     }

//     const documentSnapshots = await getDocs(querySnapshot);

//     if (!documentSnapshots.empty) {
//       const hiringsData = documentSnapshots.docs.map((doc) => {
//         const data = doc.data();
//         return {
//           ...data,
//           id: data.id || doc.id, // Añadir id si no existe
//         };
//       });

//       if (hiringsData.length > 0) {
//         // Paso 2: Obtener los UID de los datos de hirings
//         const hiringUids = hiringsData.map((hiring) => hiring.uid);

//         // Paso 3: Hacer la consulta a la colección "userData" para traer los seafarers con "where in"
//         const userCollRef = collection(FirebaseDB, "usersData");

//         // Verificar que el número de UIDs no supere los 10, como es el límite para "where in"
//         if (hiringUids.length <= 10) {
//           const seafarersQuery = query(
//             userCollRef,
//             where("uid", "in", hiringUids)
//           );
//           const seafarerSnapshots = await getDocs(seafarersQuery);

//           // Paso 4: Combinar datos de "hirings" con "seafarerData"
//           const seafarerData = seafarerSnapshots.docs.map((doc) => doc.data());

//           const combinedData = hiringsData.map((hiring) => {
//             const relatedSeafarer = seafarerData.find(
//               (seafarer) => seafarer.uid === hiring.uid
//             );
//             return {
//               ...hiring,
//               seafarer: relatedSeafarer || {}, // Añadir el seafarer relacionado o un objeto vacío si no se encuentra
//             };
//           });

//           // Ordenar por logisticId
//           const sortedActiveHirings = combinedData.sort((a, b) => {
//             const logisticIdA = parseInt(a.seafarer?.logisticId, 10);
//             const logisticIdB = parseInt(b.seafarer?.logisticId, 10);
//             return logisticIdA - logisticIdB;
//           });

//           // Paso 5: Retornar la lista ordenada junto con el último documento visible para paginación
//           const lastVisible =
//             documentSnapshots.docs[documentSnapshots.docs.length - 1];
//           return {
//             data: sortedActiveHirings,
//             lastVisible, // Esto se usará para la siguiente página
//           };
//         } else {
//           throw new Error(
//             "La consulta excede el límite de 10 UID en 'where in'"
//           );
//         }
//       } else {
//         return { data: [], lastVisible: null };
//       }
//     }
//   } catch (error) {
//     console.error("Error fetching seafarers data:", error);
//     return { data: [], lastVisible: null };
//   }
// }

export async function fetchHiringActiveData(lastVisibleDoc = null) {
  try {
    // Paso 1: Obtener datos de la colección "hirings"
    const collRef = collection(FirebaseDB, "hirings");
    let querySnapshot;

    if (lastVisibleDoc) {
      // Cargar la siguiente página
      querySnapshot = query(
        collRef,
        where("status.id", "==", "1")
        // startAfter(lastVisibleDoc),
        // limit(10) // Puedes ajustar el límite si es necesario
      );
    } else {
      // Cargar la primera página
      querySnapshot = query(
        collRef,
        where("status.id", "==", "1")
        // limit(10) // Puedes ajustar el límite si es necesario
      );
    }

    const documentSnapshots = await getDocs(querySnapshot);

    if (!documentSnapshots.empty) {
      const hiringsData = documentSnapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id, // Asigna el ID si no está en los datos
      }));

      // Paso 2: Traer datos de "usersData" para cada "hiring" individualmente
      const seafarerDataPromises = hiringsData.map(async (hiring) => {
        const userCollRef = collection(FirebaseDB, "usersData");
        const seafarerQuery = query(
          userCollRef,
          where("uid", "==", hiring.uid)
        );
        const seafarerSnapshot = await getDocs(seafarerQuery);

        const seafarerData =
          seafarerSnapshot.docs.length > 0
            ? seafarerSnapshot.docs[0].data()
            : {};

        // Combina el hiring con el seafarer correspondiente
        return {
          ...hiring,
          seafarer: seafarerData,
        };
      });

      // Espera a que todas las consultas se completen
      const combinedData = await Promise.all(seafarerDataPromises);

      // Paso 3: Ordenar por `logisticId`
      const sortedActiveHirings = combinedData.sort((a, b) => {
        const logisticIdA = parseInt(a.seafarer?.logisticId || 0, 10);
        const logisticIdB = parseInt(b.seafarer?.logisticId || 0, 10);
        return logisticIdB - logisticIdA;
      });

      // Paso 4: Retornar los datos ordenados junto con el último documento visible para la paginación
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      return {
        data: sortedActiveHirings,
        lastVisible, // Para la siguiente página
      };
    } else {
      return { data: [], lastVisible: null };
    }
  } catch (error) {
    console.error("Error fetching seafarers data:", error);
    return { data: [], lastVisible: null };
  }
}

// export async function fetchActiveEmbarksData() {
//   try {
//     // Paso 1: Obtener datos de la colección "embarks"
//     const collRef = collection(FirebaseDB, "embarks");
//     const first = query(
//       collRef,
//       or(where("status", "==", "2"), where("status", "==", "3")),
//       limit(25)
//     );
//     const documentSnapshots = await getDocs(first);

//     if (documentSnapshots) {
//       const embarksData = documentSnapshots.docs.map((doc) => {
//         const data = doc.data();
//         if (!data.id) {
//           return { ...data, id: doc.id };
//         } else {
//           return {
//             ...data,
//           };
//         }
//       });

//       if (embarksData.length > 0) {
//         // Paso 2: Obtener los UID de los datos de embarks
//         const embarkUids = embarksData.map((embark) => embark.uid);

//         // Paso 3: Hacer la consulta a la colección "userData" para traer los seafarers
//         const userCollRef = collection(FirebaseDB, "usersData");
//         const seafarersQuery = query(
//           userCollRef,
//           where("uid", "in", embarkUids)
//         );
//         const seafarerSnapshots = await getDocs(seafarersQuery);

//         const seafarerData = seafarerSnapshots.docs.map((doc) => doc.data());

//         // Paso 4: Obtener los contractId de los embarks
//         const contractIds = embarksData.map((embark) => embark.contractId);

//         // Paso 5: Hacer la consulta a la colección "contracts" para obtener los contratos relacionados
//         const contractCollRef = collection(FirebaseDB, "hirings");
//         const contractsQuery = query(
//           contractCollRef,
//           where("id", "in", contractIds)
//         );
//         const contractSnapshots = await getDocs(contractsQuery);

//         const contractData = contractSnapshots.docs.map((doc) => {
//           const data = doc.data();
//           if (!data.id) {
//             return { ...data, id: doc.id };
//           } else {
//             return {
//               ...data,
//             };
//           }
//         });

//         // Paso 6: Combinar datos de "embarks", "seafarerData" y "contractData"
//         const combinedData = embarksData.map((embark) => {
//           const relatedSeafarer = seafarerData.find(
//             (seafarer) => seafarer.uid === embark.uid
//           );
//           const relatedContract = contractData.find(
//             (contract) => contract.id === embark.contractId
//           );
//           return {
//             ...embark,
//             seafarer: relatedSeafarer || {}, // Añadir el seafarer relacionado o un objeto vacío si no se encuentra
//             contract: relatedContract || {}, // Añadir el contrato relacionado o un objeto vacío si no se encuentra
//           };
//         });

//         // Paso 7: Ordenar los datos por seafarer.logisticId
//         const sortedActiveEmbarks = combinedData.sort((a, b) => {
//           const logisticIdA = parseInt(a.seafarer?.logisticId, 10);
//           const logisticIdB = parseInt(b.seafarer?.logisticId, 10);
//           return logisticIdA - logisticIdB;
//         });

//         // Paso 8: Obtener el mes actual
//         const currentDate = new Date(); // Fecha actual
//         const currentYear = currentDate.getFullYear();
//         const currentMonth = currentDate.getMonth() + 1; // Mes actual (1-12)

//         // Paso 9: Clasificar los embarks en endingEmbarks y pendingEmbarks
//         const endingEmbarks = sortedActiveEmbarks.filter((embark) => {
//           const estimatedSignOffDate = new Date(embark.estimatedSignOffDate);
//           const estimatedYear = estimatedSignOffDate.getFullYear();
//           const estimatedMonth = estimatedSignOffDate.getMonth() + 1;

//           // Verificar que la fecha de finalización coincida con el mes y año actuales
//           return (
//             estimatedYear === currentYear && estimatedMonth === currentMonth
//           );
//         });

//         const pendingEmbarks = sortedActiveEmbarks.filter((embark) => {
//           const estimatedSignOffDate = new Date(embark.estimatedSignOffDate);
//           const estimatedYear = estimatedSignOffDate.getFullYear();
//           const estimatedMonth = estimatedSignOffDate.getMonth() + 1;

//           // Verificar que la fecha de finalización sea anterior al mes y año actuales
//           return (
//             estimatedYear < currentYear ||
//             (estimatedYear === currentYear && estimatedMonth < currentMonth)
//           );
//         });

//         // Paso 10: Retornar el objeto con sortedActiveHirings, endingEmbarks y pendingEmbarks
//         return {
//           sortedActiveEmbarks,
//           endingEmbarks,
//           pendingEmbarks,
//         };
//       } else {
//         return {
//           sortedActiveEmbarks: embarksData,
//           endingEmbarks: [],
//           pendingEmbarks: [],
//         };
//       }
//     }
//   } catch (error) {
//     console.error("Error fetching seafarers data:", error);
//     return {
//       sortedActiveEmbarks: [],
//       endingEmbarks: [],
//       pendingEmbarks: [],
//     };
//   }
// }

export async function fetchActiveEmbarksData() {
  try {
    // Paso 1: Obtener solo datos de la colección "embarks" con status == 2
    const collRef = collection(FirebaseDB, "embarks");
    const first = query(collRef, where("status", "==", 2));
    const documentSnapshots = await getDocs(first);

    if (documentSnapshots) {
      // Inicializar arrays para endingEmbarks, pendingEmbarks y sortedActiveEmbarks
      const endingEmbarks = [];
      const pendingEmbarks = [];
      const sortedActiveEmbarks = [];

      // Paso 2: Recorrer cada embarque activo y obtener usuario y contrato asociado
      for (let embarkDoc of documentSnapshots.docs) {
        const embark = { ...embarkDoc.data(), id: embarkDoc.id };

        // Consultar datos del usuario
        const userCollRef = collection(FirebaseDB, "usersData");
        const userQuery = query(userCollRef, where("uid", "==", embark.uid));
        const userSnapshots = await getDocs(userQuery);

        const relatedSeafarer = userSnapshots.docs.length
          ? userSnapshots.docs[0].data()
          : {};

        // Consultar datos del contrato
        const contractCollRef = collection(FirebaseDB, "hirings");
        const contractQuery = query(
          contractCollRef,
          where("id", "==", embark.contractId)
        );
        const contractSnapshots = await getDocs(contractQuery);

        const relatedContract = contractSnapshots.docs.length
          ? contractSnapshots.docs[0].data()
          : {};

        // Combinar datos del embarque con datos de usuario y contrato
        const combinedEmbark = {
          ...embark,
          seafarer: relatedSeafarer,
          contract: relatedContract,
        };

        // Agregar el embarque combinado a sortedActiveEmbarks
        sortedActiveEmbarks.push(combinedEmbark);

        // Clasificar en endingEmbarks o pendingEmbarks según estimatedSignOffDate
        const estimatedSignOffDate = new Date(embark.estimatedSignOffDate);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const estimatedYear = estimatedSignOffDate.getFullYear();
        const estimatedMonth = estimatedSignOffDate.getMonth() + 1;

        if (estimatedYear === currentYear && estimatedMonth === currentMonth) {
          endingEmbarks.push(combinedEmbark);
        } else if (
          estimatedYear < currentYear ||
          (estimatedYear === currentYear && estimatedMonth < currentMonth)
        ) {
          pendingEmbarks.push(combinedEmbark);
        }
      }

      // Ordenar sortedActiveEmbarks por logisticId del seafarer
      sortedActiveEmbarks.sort((a, b) => {
        const logisticIdA = parseInt(a.seafarer?.logisticId, 10);
        const logisticIdB = parseInt(b.seafarer?.logisticId, 10);
        return logisticIdA - logisticIdB;
      });

      // Retornar el objeto con sortedActiveEmbarks, endingEmbarks y pendingEmbarks
      return {
        sortedActiveEmbarks,
        endingEmbarks,
        pendingEmbarks,
      };
    } else {
      return {
        sortedActiveEmbarks: [],
        endingEmbarks: [],
        pendingEmbarks: [],
      };
    }
  } catch (error) {
    console.error("Error fetching seafarers data:", error);
    return {
      sortedActiveEmbarks: [],
      endingEmbarks: [],
      pendingEmbarks: [],
    };
  }
}

export async function countDocumentsWithLogisticId() {
  try {
    // Define la colección y la consulta con el filtro
    const coll = collection(FirebaseDB, "globalSearchIndex");
    const q = query(coll, where("logisticId", "!=", ""));

    // Obtener el conteo de documentos que cumplen con la condición
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  } catch (error) {
    console.error("Error counting documents with logisticId:", error);
    return undefined;
  }
}

export async function countTotalEmbarks() {
  try {
    const coll = collection(FirebaseDB, "embarks");
    const snapshot = await getCountFromServer(coll);
    return snapshot.data().count;
  } catch (error) {
    console.error("Error fetching seafarers data:", error);
    return undefined;
  }
}

export async function countCompletedEmbarks() {
  try {
    const coll = collection(FirebaseDB, "embarks");
    const q = query(coll, where("embarkStatus", "==", true));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  } catch (error) {
    console.error("Error fetching seafarers data:", error);
    return undefined;
  }
}
export async function countCanceledEmbarks() {
  try {
    const coll = collection(FirebaseDB, "embarks");
    const q = query(
      coll,
      or(where("status.id", "==", "5"), where("status.id", "==", "6"))
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  } catch (error) {
    console.error("Error fetching seafarers data:", error);
    return undefined;
  }
}

export const getApplicationCV = async (uid, version) => {
  try {
    // console.log(uid, version);
    const response = await fetch(
      `${localServer}/pdf_render/applications?id=` +
        uid +
        "&versions=" +
        version
    );
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response;
    // return data.length ? data : [];
    console.log(data.url);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};



export const getTemplate = async () => {
  try {
    const docRef = doc(FirebaseDB, "citas/template");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const newData = {
        ...data,
        uid: docSnap.id,
      };
      return newData;
    } else {
      console.log("No se encontró el documento");
      return null;
    }
  } catch (error) {
    console.error("Error obteniendo los datos:", error);
  }
};












/* -----------------------FETCH DE TABLAS AUXILIARES----------------------- */
export const getVesselType = async () => {
  try {
    const response = await fetch(`${bd_server}/recruitmentdepartment/`);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();
    return data.length ? data : [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const getCountry = async () => {
  try {
    const response = await fetch(`${bd_server}/countries/`);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();
    return data.length ? data : [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getDepartments = async () => {
  try {
    const response = await fetch(`${bd_server}/departments/`);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();
    return data.length ? data : [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const getPositions = async () => {
  try {
    const response = await fetch(`${bd_server}/positions/`);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();
    return data.length ? data : [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getMaterialStatus = async () => {
  try {
    const response = await fetch(`${bd_server}/maritalstatus/`);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();
    return data.length ? data : [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getEducation = async () => {
  try {
    const response = await fetch(`${bd_server}/education/`);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();
    return data.length ? data : [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getDocument = async () => {
  try {
    const response = await fetch(`${bd_server}/typedocuments/`);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();
    return data.length ? data : [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getVesselTypeName = async () => {
  try {
    const response = await fetch(`${bd_server}/typevessel/`);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();
    return data.length ? data : [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getCertificates = async () => {
  try {
    const response = await fetch(`${bd_server}/courses/`);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();
    return data.length ? data : [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getHarvester = async () => {
  try {
    const response = await fetch(`${bd_server}/harvester/`);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();
    return data.length ? data : [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getApplicationsource = async () => {
  try {
    const response = await fetch(`${bd_server}/applicationsource/`);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();
    return data.length ? data : [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getCompanies = async () => {
  try {
    const response = await fetch(`${bd_server}/companies/`);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();
    return data.length ? data : [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getCorregimientoPanama = async () => {
  try {
    const response = await fetch(`${bd_server}/corregimientopanama/`);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();
    return data.length ? data : [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getDistritoPanama = async () => {
  try {
    const response = await fetch(`${bd_server}/distritopanama/`);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();
    return data.length ? data : [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getGender = async () => {
  try {
    const response = await fetch(`${bd_server}/gender/`);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();
    return data.length ? data : [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getLanguage = async () => {
  try {
    const response = await fetch(`${bd_server}/language/`);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();
    return data.length ? data : [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getProvincias = async () => {
  try {
    const response = await fetch(`${bd_server}/provincias/`);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();
    return data.length ? data : [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getReasons = async () => {
  try {
    const response = await fetch(`${bd_server}/reasons/`);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();
    return data.length ? data : [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const getSignReasons = async () => {
  try {
    const response = await fetch(`${bd_server}/signreasons/`);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();
    return data.length ? data : [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getVaccineDoses = async () => {
  try {
    const response = await fetch(`${bd_server}/vaccinedoses/`);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();
    return data.length ? data : [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getVaccinebrands = async () => {
  try {
    const response = await fetch(`${bd_server}/vaccinebrands/`);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();
    return data.length ? data : [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getVessels = async () => {
  try {
    const response = await fetch(`${bd_server}/vessels/`);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();
    return data.length ? data : [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
