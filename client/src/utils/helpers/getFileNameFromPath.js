//@desc Takes in C:/fakepath/...

export const getFileNameFromPath = (filePath) => {
  const splitPath = filePath.split("\\");
  const lastIndex = splitPath.length - 1;
  const fileName = splitPath[lastIndex];
  return fileName;
};
