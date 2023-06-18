import { NavLink, Navigate, useNavigate, useParams } from "react-router-dom";
import "./AdminLogicIcons.css";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";

interface AdminLogicIconsProps{
    vacationId: number;
}

function AdminLogicIcons(props:AdminLogicIconsProps): JSX.Element {

    // get Id from parent element - 'vacationCard'
    const vacationId = props.vacationId;

    const navigate = useNavigate();

    async function deleteVacation() {
        try{
            const ok = window.confirm("Are you sure?");
            if(!ok) return;

            await dataService.deleteVacation(vacationId);
            notifyService.success("vacation has been deleted")
            navigate("/vacations")

        }
        catch(err:any) {
            notifyService.error(err)
        }

    }
    
    return (
        <div className="AdminLogicIcons">

<div className="editAndDelete">
          <div className="delete">
          <NavLink to="#" onClick={deleteVacation}><i className="ri-delete-bin-fill"></i></NavLink>
          </div>
          <div className="edit">
          <NavLink to={"/vacations/edit/" + vacationId}><i className="ri-settings-5-fill"></i></NavLink> 
         </div>
          </div>
        
        </div>
    );
}

export default AdminLogicIcons;
