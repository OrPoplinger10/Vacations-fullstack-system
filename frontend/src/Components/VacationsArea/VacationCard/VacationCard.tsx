import VacationModel from "../../../models/vacation-model";
import "./VacationCard.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {  Button, Card, CardContent, CardMedia, Fab, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { vacationsStore } from "../../../Redux/VacationsState";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import { authStore } from "../../../Redux/AuthState";
import { NavLink, useNavigate } from "react-router-dom";

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

const navigate = useNavigate();

// React.MouseEvent is a generic type provided by React that represents the mouse event. In this case:
// React.MouseEvent<HTMLButtonElement> specifies a mouse event that occurs on the <button> element.
  function handleClickBooking(event: React.MouseEvent<HTMLButtonElement>, vacationId: number, startDate: string, endDate: string) {

    // This prevents the default behavior of the button click, which is to navigate to a new page:
    event.preventDefault();

    // returns the current date in the format YYYY-MM-DD:
    // We only need the date part, so we split the string into a "T" character and take the first element of the array.
    const currentDate = new Date().toISOString().split("T")[0];

    if (currentDate >= startDate && currentDate <= endDate) {
      // Display a message to the user indicating the vacation is ongoing:
      alert("This vacation is currently ongoing.");
    } else if (currentDate > endDate) {
      // Display a message to the user indicating the vacation has ended:
      alert("This vacation has already ended.");
    } else {
      // Navigate to the booking page:
      navigate(`/vacations/booking-vacation/${vacationId}`);
    }
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
        <Button className="button" variant="contained"
        //The purpose of this code is to connect the button click event to the handleClickBooking function and pass relevant information to it to properly validate the button.
        onClick={(event) => handleClickBooking(event, props.vacation.vacationId, props.vacation.startDate, props.vacation.endDate)}>
          $ {props.vacation.price} 
       </Button>
       
       </CardContent>
    
       </Card>

        </div>
    );
}

export default VacationCard;
