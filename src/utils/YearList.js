export const getYearsList = (startYear = 1990) => {
  const currentYear = new Date().getFullYear(); // Get the current year
  const years = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

  return years;
};
