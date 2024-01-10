// Helper function to add ordinal suffix to the day
const addOrdinalSuffix = (day: number) => {
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }

  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};

export const formatDate = (inputDate: Date) => {
  const date = new Date(inputDate);

  // Get day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  // Add ordinal suffix to the day
  const dayWithSuffix = addOrdinalSuffix(day);

  // Format the date string
  const formattedDate = `${dayWithSuffix} ${month} ${year}`;

  return formattedDate;
};
