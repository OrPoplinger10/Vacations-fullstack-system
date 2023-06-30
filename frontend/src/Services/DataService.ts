import axios from "axios";
import appConfig from "../Utils/AppConfig";
import VacationModel from "../models/vacation-model";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";
import OrderModel from "../models/order-model";
import { OrdersActionType, ordersStore } from "../Redux/OrdersState";
import ContactModel from "../models/contact-model";
import { ContactsActionType, contactsStore } from "../Redux/ContactState";

class DataService {

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

        // Follow update: expected input is vacationId, action [1 or 0]
      public async updateFollow(vacationId: number, action:number): Promise<void> { 

      const data = { vacationId, action }; // Contain data 
      
      await axios.post(appConfig.followUrl, data);
  }

       // delete vacation
       public async deleteVacation(vacationId: number): Promise<void>{

        // Delete vacation on server:
        const response = await axios.delete<VacationModel>(appConfig.vacationsUrl + vacationId);

         // Delete that vacation from our global store:
         vacationsStore.dispatch({ type: VacationsActionType.DeleteVacation, payload: vacationId });
        
       }

       // Add order:
    public async addOrder(order: OrderModel): Promise<void>{

      // Send order to server:
      const response = await axios.post<OrderModel>(appConfig.ordersUrl + order.vacationId, order);
 
      // Get the added order:
      const addedOrder =  response.data;

      // Add that order to the global state:
      ordersStore.dispatch({ type: OrdersActionType.AddOrder, payload: addedOrder });
         
     }

     // Add contact:
     public async addContacts(contact: ContactModel): Promise<void> {

     // send contact to server:
     const response = await axios.post<ContactModel>(appConfig.contactsUrl, contact)

     // Get the added contact:
     const addedContact = response.data;

     // Add that contact to the global state:
     contactsStore.dispatch({ type: ContactsActionType.addContacts, payload: addedContact });

     }

}

const dataService = new DataService();

export default dataService