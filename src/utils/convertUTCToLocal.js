export const convertUTCToLocal = (utcDate) => {
  if (!utcDate || typeof utcDate !== 'string') {
    console.error('Invalid date string provided');
    return { date: 'Invalid Date', time: 'Invalid Time' };
  }

  // Split the date and time parts
  const [datePart, timePart] = utcDate.split(' ');

  if (!datePart || !timePart) {
    console.error('Date or time part is missing');
    return { date: 'Invalid Date', time: 'Invalid Time' };
  }

  // Split the date into year, month, day (adjusted for ISO format)
  const [year, month, day] = datePart.split('-').map(Number);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    console.error('Invalid date format');
    return { date: 'Invalid Date', time: 'Invalid Time' };
  }

  // Split the time into hours, minutes, seconds
  const [hours, minutes, seconds] = timePart.split(':').map(Number);

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    console.error('Invalid time format');
    return { date: 'Invalid Date', time: 'Invalid Time' };
  }

  // Create a Date object in UTC
  const date = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));

  if (isNaN(date.getTime())) {
    console.error('Invalid Date object created');
    return { date: 'Invalid Date', time: 'Invalid Time' };
  }

  // Format date to "dd month yyyy"
  const dayFormatted = date.getDate().toString().padStart(2, '0');
  const monthFormatted = date.toLocaleString('en-US', { month: 'long' });
  const yearFormatted = date.getFullYear();
  const formattedDate = `${dayFormatted} ${monthFormatted} ${yearFormatted}`;

  // Format time according to local time
  const formattedTime = date.toLocaleTimeString();

  return {
    date: formattedDate,
    time: formattedTime,
  };
};
