import VacationModel from "../models/vacation-model";


function Csv(vacations: VacationModel[]) {
  
  // Create csv :     
  let csvContent = "vacation.destination,vacation.followersCount\n"; // CSV content
  
  // Add vacations to csv:
  vacations.forEach((vacation) => {
    const row = `${vacation.vacationDestination},${vacation.followersCount}\n`; // CSV row
    csvContent += row;
  });
  
  // Create Blob : 
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  
  // Create link:
  const link = document.createElement("a");
  link.setAttribute("href", URL.createObjectURL(blob));
  link.setAttribute("download", "vacations.csv"); // Set the filename for the downloaded file

  return link;
  }

export default Csv;