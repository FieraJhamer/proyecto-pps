export const compareDates = (date1, date2, limitDays) => {
    if (!date1 || !date2) return "#FFCC00";
  
    const d1 = new Date(date1);
    const d2 = new Date(date2);
  
    const timeDifference = Math.abs(d2 - d1);
    const daysDifference = timeDifference / (1000 * 3600 * 24);
  
    if (daysDifference <= limitDays) {
      return "#4CD964";
    } else {
      return "#FF3B30";
    }
  };