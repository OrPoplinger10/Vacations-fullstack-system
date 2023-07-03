import axios from "axios";
import appConfig from "../Utils/AppConfig";
import VacationModel from "../Models/Vacation-model";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";

class VacationsService {

    // Get all vacations
    public async getAllVacations(): Promise<VacationModel[]>{

     // Take vacations from global state
     let vacations = vacationsStore.getState().vacations;

     // If we don't have vacations - get them from backend:
     if(vacations.length === 0) {

        // Get response REST API vacations:
        const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);

        // Extract vacations:
         vacations =  response.data;

        // Update global store:
        vacationsStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations });

     }

     // return:
     return vacations;
        
    }

    // Get One vacation
    public async getOneVacation(vacationId: number): Promise<VacationModel>{

        // Take vacations from global state
       let vacations = vacationsStore.getState().vacations;

       // Find the needed vacation:
       let vacation = vacations.find(v => v.vacationId === vacationId);

       // If vacation doesn't exist - get it from backend:
       if(!vacation) {

          // Get one vacation from REST API vacations:
          const response = await axios.get<VacationModel>(appConfig.vacationsUrl + vacationId);

          // Extract vacations:
          vacation = response.data;
          
          // No need to update global state
          
       }

        // return:
        return vacation;
           
       }

    // Add vacation:
    public async addVacation(vacation: VacationModel): Promise<void>{

        // Create header for sending image inside the body:
        const headers = { "Content-Type": "multipart/form-data" }

        // Send vacation to server:
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, vacation, {headers});
   
        // Get the added vacation:
        const addedVacation =  response.data;

        // Add that vacations to the global state:
        vacationsStore.dispatch({ type: VacationsActionType.AddVacation, payload: addedVacation });
           
       }

       // edit vacation
       public async editVacation(vacation: VacationModel): Promise<void>{

         // Create header for sending image inside the body:
         const headers = { "Content-Type": "multipart/form-data" }

        // Send vacation to server:
        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationId, vacation, { headers });
   
        // Get the updated vacation:
        const updatedVacation =  response.data;

        // Update global store with the updateVacations:
        vacationsStore.dispatch({ type: VacationsActionType.UpdateVacation, payload: updatedVacation });
         
       }

       // delete vacation
       public async deleteVacation(vacationId: number): Promise<void>{

        // Delete vacation on server:
        const response = await axios.delete<VacationModel>(appConfig.vacationsUrl + vacationId);

         // Delete that vacation from our global store:
         vacationsStore.dispatch({ type: VacationsActionType.DeleteVacation, payload: vacationId });
        
       }

}

const vacationService = new VacationsService();

export default vacationService