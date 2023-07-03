import { useEffect, useState } from "react";
import "./Vacations.css";
import VacationModel from "../../../Models/Vacation-model";
import vacationService from "../../../Services/VacationsService";
import notifyService from "../../../Services/NotifyService";
import VacationCard from "../VacationCard/VacationCard";
import Pagination from "../../UserArea/Pagination/Pagination";
import { vacationsStore } from "../../../Redux/VacationsState";
import { Checkbox, FormControlLabel } from "@mui/material";
import Filters from "../../../Models/Filters-model";



function Vacations(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const[currentPage, setCurrentPage] = useState(1);
    const[postsPerPage] = useState(8);
    const [activeFilters, setActiveFilters] = useState([]); 

    useEffect(()=> {
     vacationService.getAllVacations()
     .then(dbVacations => setVacations(dbVacations))
     .catch(err => notifyService.error(err));
    }, [])

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = vacations.slice(firstPostIndex, lastPostIndex);

    useEffect(()=>{
        
        const vacationsData:VacationModel[] = vacationsStore.getState().vacations;  
        const now = new Date();
        
        // Filter object :
        const filterOptions = {
            isFollowing: (v: VacationModel) => v.isFollowing === 1,
            actualVacations: (v: VacationModel) => new Date(v.startDate) > now,
            startedVacations: (v: VacationModel) => (new Date(v.startDate) < now) && (new Date(v.endDate) > now),
        };
        
       
        const selectingFilters = (v: VacationModel) => {  
            return activeFilters.every((filter) => filterOptions[filter as keyof typeof filterOptions](v));
        };
        
        // Filter vacations
        const filtered = vacationsData.filter(selectingFilters);
        
        setVacations(filtered);
         
    
    },[activeFilters]);

    // Change on activeFilter will trigger useEffect with activeFilter dependency and run filter logic
    function handleFilterChange(name: string, checked: boolean){
        if(checked){
            setActiveFilters(prevFilters => [...prevFilters, name]); // Add new filter to active filters 

        } else {
            setActiveFilters(prevFilters => prevFilters.filter(f => f !== name)); // Remove unselected filter from active filters state
        }
    }
    
    return (
        <div className="Vacations">
            <div className="mainTitle">
            <h1 className="mainTitleUser">Our vacations</h1>
            </div>

            <div className="filterMenu">
                <FormControlLabel control={<Checkbox />} onChange={(event) => handleFilterChange(Filters.IS_FOLLOWING, (event.target as HTMLInputElement).checked)} label="Favorites" />
                <FormControlLabel control={<Checkbox />} onChange={(event) => handleFilterChange(Filters.ACTUAL_VACATIONS, (event.target as HTMLInputElement).checked)} label="Actual" />
                <FormControlLabel control={<Checkbox />} onChange={(event) => handleFilterChange(Filters.STARTED_VACATIONS, (event.target as HTMLInputElement).checked)} label="Started" />
            </div>

        {currentPosts.map (v => <VacationCard key={v.vacationId} vacation={v}  /> )}  

        <Pagination
         totalPosts={vacations.length}
         postsPerPage={postsPerPage}
         setCurrentPage={setCurrentPage}
         currentPage={currentPage}
        />
        </div>
    );
}

export default Vacations;
