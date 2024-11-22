export const capitalizeFirstLetter = (string) => {
    return string.trim().toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
  }