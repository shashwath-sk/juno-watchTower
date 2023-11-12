function getCurrentDate() {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = now.getFullYear();
    const formattedDate = `${day} ${month}, ${year}`;
  
    return formattedDate;
  }
  
export default getCurrentDate