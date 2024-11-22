export const formatHeader = (header) => {
  // Elimina los espacios y convierte a minúsculas
  const words = header
    .trim()
    .split(" ")
    .map((word) => word.toLowerCase());

  // Convierte la primera letra de cada palabra (excepto la primera) a mayúscula
  for (let i = 1; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  // Une las palabras en una sola cadena
  return words.join("");
};

export const formatTitleCase = (header) => {
  // Divide la cadena en palabras basadas en camelCase o en espacios
  const words = header
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Separa las palabras basadas en camelCase
    .trim()
    .split(" ");

  // Convierte la primera letra de cada palabra a mayúscula y el resto a minúscula
  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  // Une las palabras con un espacio para crear la cadena final
  return formattedWords.join(" ");
};
