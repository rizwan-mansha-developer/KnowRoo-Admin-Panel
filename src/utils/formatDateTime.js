export function extractDate(dateString) {
  // Create a new Date object from the input string
  if (!dateString) return null;
  const date = new Date(dateString);

  date.setUTCDate(date.getUTCDate() + 1);
  // Extract day, month, and year using UTC methods
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
  const year = date.getUTCFullYear();
  // Format the date string
  // const dateStringFormatted = `${day}-${month}-${year}`;
  const dateStringFormatted = `${year}-${month}-${day}`;
  return dateStringFormatted;
}
export default extractDate;
