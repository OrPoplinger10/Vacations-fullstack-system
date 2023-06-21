import { useEffect, useState } from "react";
import VacationModel from "../../../models/vacation-model";
import "./AdminVacations.css";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import AdminVacationCard from "../AdminVacationCard/AdminVacationCard";
import { NavLink } from "react-router-dom";
import Pagination from "../../UserArea/Pagination/Pagination";
import Csv from "../../../Services/CsvService";

function AdminVacationsArea(): JSX.Element {
 const [vacations, setVacations] = useState<VacationModel[]>([]);
 const[currentPage, setCurrentPage] = useState(1);
 const[postsPerPage, setPostsPerPage] = useState(8);

    useEffect(()=> {
     dataService.getAllVacations()
     .then(dbVacations => setVacations(dbVacations))
     .catch(err => notifyService.error(err));
    }, [])

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = vacations.slice(firstPostIndex, lastPostIndex);

    function downloadCsv() {
        // Create csv link
        const csvLink = Csv(vacations);
      
        // Add HTML link to DOM
        document.body.appendChild(csvLink);
      
        // Trigger click
        csvLink.click();
      
        // Remove link from DOM
        document.body.removeChild(csvLink);
      }
    

    return (
        <div className="AdminVacations">
            <h1>Admin vacations</h1>
            
        <div className="addCsvGraph">
           <div className="add"> Add vacation : 
           <NavLink to="/vacations/add"><i className="ri-add-line"></i></NavLink>
           </div>
           <div className="csv"> Download Csv : 
           <div className="csvIcon"><i className="ri-download-cloud-2-fill" onClick={downloadCsv}></i></div>
           </div>
           <div className="graph"> Calculation statistics : 
           <NavLink to="/admin-graph"><i className="ri-bar-chart-2-fill"></i></NavLink>
           </div>
           </div>
           
            
         {currentPosts.map(v => <AdminVacationCard key={v.vacationId} vacation={v} /> )}  

         <Pagination
         totalPosts={vacations.length}
         postsPerPage={postsPerPage}
         setCurrentPage={setCurrentPage}
         currentPage={currentPage}
        />
			
        </div>
    );
}

export default AdminVacationsArea;
