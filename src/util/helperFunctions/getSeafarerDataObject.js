// export const getSeafarerDataObject = (applicantData) => {
//   const replaceApplicationWithSeafarer = (key) =>
//     key.replace("application", "seafarer");

//   const transformObjectKeys = (obj) => {
//     const transformedObj = {};
//     for (const key in obj) {
//       const newKey = replaceApplicationWithSeafarer(key);
//       if (
//         typeof obj[key] === "object" &&
//         obj[key] !== null &&
//         !Array.isArray(obj[key])
//       ) {
//         // Si el valor es un objeto, aplicar la transformación recursivamente
//         transformedObj[newKey] = transformObjectKeys(obj[key]);
//       } else {
//         // De lo contrario, copiar el valor directamente
//         transformedObj[newKey] = obj[key];
//       }
//     }
//     return transformedObj;
//   };

//   // return transformObjectKeys(applicantData);

//   // Transformar el objeto y reemplazar "application" por "seafarer"
//   let transformedData = transformObjectKeys(applicantData);

//   // Extraer los arreglos dentro de startApplication al nivel superior
//   const { vesselType, department, position } = transformedData.startApplication;

//   transformedData = {
//     ...transformedData,
//     vesselType,
//     department,
//     position,
//   };

//   // // // Eliminar el objeto startApplication ahora vacío
//   delete transformedData.startApplication;

//   return transformedData;
// };

export const getSeafarerDataObject = (applicantData) => {
  const replaceApplicationWithSeafarer = (key) =>
    key.replace("application", "seafarer");

  const transformObjectKeys = (obj) => {
    const transformedObj = {};
    for (const key in obj) {
      const newKey = replaceApplicationWithSeafarer(key);
      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        // Si el valor es un objeto, aplicar la transformación recursivamente
        transformedObj[newKey] = transformObjectKeys(obj[key]);
      } else {
        // De lo contrario, copiar el valor directamente
        transformedObj[newKey] = obj[key];
      }
    }
    return transformedObj;
  };

  // Transformar el objeto y reemplazar "application" por "seafarer"
  let transformedData = transformObjectKeys(applicantData);

  // Filtrar los documentos y certificados incompletos
  const filterIncompleteItemsCertificate = (items) => {
    return items.filter((item) => {
      // Verificar si el campo "data" y otros campos específicos están llenos
      return (
        item.data.country ||
        item.data.certificateNumber ||
        item.data.issueDate ||
        item.data.expirationDate
      );
    });
  };
  const filterIncompleteItemsDocument = (items) => {
    return items.filter((item) => {
      // Verificar si el campo "data" y otros campos específicos están llenos
      return (
        item.data.country ||
        item.data.documentNumber ||
        item.data.placeIssue ||
        item.data.issueDate ||
        item.data.expirationDate
      );
    });
  };

  // Filtrar los elementos en los arreglos applicationDocument y applicationCertificate
  if (transformedData.seafarerDocument) {
    transformedData.seafarerDocument = filterIncompleteItemsDocument(
      transformedData.seafarerDocument
    );
  }

  if (transformedData.seafarerCertificates) {
    transformedData.seafarerCertificates = filterIncompleteItemsCertificate(
      transformedData.seafarerCertificates
    );
  }

  // Extraer los arreglos dentro de startApplication al nivel superior
  const { vesselType, department, position } = transformedData.startApplication;

  transformedData = {
    ...transformedData,
    vesselType,
    department,
    position,
  };

  // Eliminar el objeto startApplication ahora vacío
  delete transformedData.startApplication;

  return transformedData;
};
