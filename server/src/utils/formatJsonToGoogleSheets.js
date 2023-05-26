export const formatJsonToGoogleSheets = (json) => {
  // Grab all header cells
  const headerRows = Object.keys(json[0]);

  // Sets up data cells below header
  const dataRows = [];
  json.forEach((lead) => {
    dataRows.push(Object.values(lead));
  });

  return [headerRows, ...dataRows];
};
