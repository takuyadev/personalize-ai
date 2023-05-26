// @desc Formats Google sheets into readable JSON file
// ! LIMITATIONS: Columns must be on first row, and values should be on the bottom of each column or it will not map correctly!

export const formatSheetValuesToJson = (sheet) => {
  // Seperate headers from columns
  const [columnHeader, ...columns] = sheet;

  // Setup return array
  const output = columns.map((rows) => {
    const object = {};

    // For every cell in a row, set value to object
    // Use combination of the header and index to return name, and use property name
    rows.forEach((cell, i) => {
      object[columnHeader[i]] = cell;
    });

    // After object is mapped return newly mapped value
    return object;
  });

  //   Return final output
  return output;
};
