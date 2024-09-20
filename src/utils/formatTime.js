export function extractTime(dateString) {
  // Create a new Date object from the input string
  if (!dateString) return null;
  const date = new Date(dateString);

  // Extract the hours, minutes, and seconds using UTC methods
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  // Format the time string as HH:MM:SS
  const timeStringFormatted = `${hours}:${minutes}:${seconds}`;
  return timeStringFormatted;
}

export default extractTime;
