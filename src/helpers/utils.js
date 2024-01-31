export const transformId = (id) => {
  const words = id.split("-");
  const transformedWords = words.map((word, index) => {
    return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
  });
  return transformedWords.join("");
};

export const formatHash = (txHash, chars = 6) => {
  return `${txHash.substring(0, chars + 2)}...${txHash.substring(txHash.length - chars)}`;
};
