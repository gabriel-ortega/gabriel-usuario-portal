export function compareData(obj1, obj2) {
  const differences = {};

  const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  allKeys.forEach((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (Array.isArray(value1) && Array.isArray(value2)) {
      // Comparar arreglos
      const arrayDifferences = compareArrays(value1, value2);
      if (arrayDifferences.length > 0) {
        differences[key] = arrayDifferences;
      }
    } else if (isObject(value1) && isObject(value2)) {
      // Comparar objetos anidados
      const nestedDifferences = compareData(value1, value2);
      if (Object.keys(nestedDifferences).length > 0) {
        differences[key] = nestedDifferences;
      }
    } else if (value1 !== value2) {
      // Comparar valores primitivos
      differences[key] = {
        value1: value1 === undefined ? null : value1,
        value2: value2 === undefined ? null : value2,
      };
    }
  });

  return differences;
}

// Función para comparar arreglos
function compareArrays(arr1, arr2) {
  const differences = [];

  const maxLength = Math.max(arr1.length, arr2.length);
  for (let i = 0; i < maxLength; i++) {
    const value1 = arr1[i];
    const value2 = arr2[i];

    if (isObject(value1) && isObject(value2)) {
      const nestedDifferences = compareData(value1, value2);
      if (Object.keys(nestedDifferences).length > 0) {
        differences.push({ index: i, differences: nestedDifferences });
      }
    } else if (value1 !== value2) {
      differences.push({
        index: i,
        value1: value1 === undefined ? null : value1,
        value2: value2 === undefined ? null : value2,
      });
    }
  }

  return differences;
}

// Función para verificar si un valor es un objeto
function isObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}
