import VacationModel from "../../../models/vacation-model";
import "./VacationCard.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {  Button, Card, CardContent, CardMedia, Fab, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { vacationsStore } from "../../../Redux/VacationsState";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import { authStore } from "../../../Redux/AuthState";
import { NavLink } from "react-router-dom";

interface VacationCardProps {
    vacation: VacationModel;	
}


function VacationCard(props: VacationCardProps): JSX.Element {

  const user = authStore.getState().user;

  const {vacation} = props; // extract vacation from VacationCardProps

  const [isFollowing, setIsFollowing] = useState<number>(vacation.isFollowing);

  const [followersCount, setFollowersCount] = useState<number>(vacation.followersCount);

useEffect(()=>{
        
  const unsubscribe = vacationsStore.subscribe(()=>{
      
     
      const action = vacationsStore.getState().lastAction;
          
      // If it was like, render component
      if(action === "UpdateFollow"){
          const localVacations = vacationsStore.getState().vacations;
          const index = localVacations.findIndex((v)=> v.vacationId === vacation.vacationId);
          setIsFollowing(localVacations[index]?.isFollowing);
          setFollowersCount(localVacations[index]?.followersCount);
      }
  });
  
  return () => unsubscribe();

},[]);

async function handleLike(vacationId: number){
  
  // Prevent admin to create follows:
  if (user.roleId === 1) return;
  
  try{

      const v = vacationsStore.getState().vacations;

      const currentFollowState = v.find(v => v.vacationId === vacationId).isFollowing; 
      
      const newFollowState = currentFollowState === 1 ? 0 : 1;

      await dataService.updateFollow(vacationId, newFollowState);
              
  }catch(e:any){
      notifyService.error(e);
  }

}

function formattingDate(propsDate:string): string{
  const date = new Date (propsDate)
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0")
  const localDateString = `${year}-${month}-${day}`;
  return localDateString
}
    return (
      
      <div className="VacationCard">

      {user.roleId === 2 && <div className="likesBar">       
     <Fab variant="extended"
    style={{color: isFollowing ===1 ? "red": "#da9c9cc9"}} onClick={() => handleLike(vacation.vacationId)}>
    <FavoriteIcon className="navigateLike" sx={{ mr: 1 }} />
     {followersCount}
   </Fab>
   </div>}

      <Card sx={{ maxWidth: 300 }}>
       <CardMedia
       component = "img"
        sx={{ height: 150}}
        image= { props.vacation.imageUrl}
       />
       <CardContent>
       <Button className="date" variant="outlined">
        {formattingDate(props.vacation.startDate)} - {formattingDate(props.vacation.endDate)}
       </Button>
        <Typography className="destinationVacationCard" gutterBottom variant="h5" component="div">
          {props.vacation.vacationDestination}
        </Typography>
        <Typography className="descriptionVacationCard" variant="body2" color="text.secondary">
          {props.vacation.vacationDescription}
        </Typography>
        <NavLink to={"/vacations/booking-vacation/" + props.vacation.vacationId}>
        <Button className="button" variant="contained">
          $ {props.vacation.price} 
       </Button>
       </NavLink>
       </CardContent>
    
       </Card>

        </div>
    );
}

export default VacationCard;
