import { Button, Card, CardContent, CardMedia, Chip, Icon, Typography } from "@mui/material";
import "./AdminVacationCard.css";
import VacationModel from "../../../models/vacation-model";
import { NavLink } from "react-router-dom";
import AdminLogicIcons from "../AdminLogicIcons/AdminLogicIcons";

interface AdminVacationCardProps {
    vacation: VacationModel;
	
}

function AdminVacationCard(props: AdminVacationCardProps): JSX.Element {

    function formattingDate(propsDate:string): string{
        const date = new Date (propsDate)
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0")
        const localDateString = `${year}-${month}-${day}`;
        return localDateString
      }
  
    return (
    <div className="AdminVacationCard">

       <AdminLogicIcons vacationId={props.vacation.vacationId}/>
       <Card sx={{ maxWidth: 300 }}>
       <CardMedia
           component = "img"
           sx={{ height: 150}}
           image= { props.vacation.imageUrl}
           />
       <CardContent>
       <Button className="adminCardDate" variant="outlined">
           {formattingDate(props.vacation.startDate)} - {formattingDate(props.vacation.endDate)}
       </Button>
       <Typography className="adminCardDestination" gutterBottom variant="h5" component="div">
           {props.vacation.vacationDestination}
       </Typography>
       <Typography className="adminCardDescription" variant="body2" color="text.secondary">
           {props.vacation.vacationDescription}
       </Typography>
       <Button className="adminCardButton" variant="contained">
           $ {props.vacation.price} 
       </Button>
       </CardContent>
    
       </Card>
			
			
        </div>
    );
}

export default AdminVacationCard;
