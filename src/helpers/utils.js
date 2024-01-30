export const transformId = (id) => {
  const words = id.split("-");
  const transformedWords = words.map((word, index) => {
    return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
  });
  return transformedWords.join("");
};
