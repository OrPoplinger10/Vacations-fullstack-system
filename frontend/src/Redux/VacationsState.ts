import { createStore } from "redux";
import VacationModel from "../Models/Vacation-model";
import { authStore } from "./AuthState";

// Vacation State - the application level state regarding vacations:
export class vacationState {
    public vacations: VacationModel[] = [];
    public lastAction: string = ""; // add lastAction property
    
}

// Vacations Action type - Which actions we can perform on our vacations global state:
export enum VacationsActionType {

    FetchVacations,
    AddVacation,
    UpdateVacation,
    UpdateFollow,
    DeleteVacation
}

// Vacations Action - Interface describing an object for preforming one action on our Vacations global state:
export interface VacationsAction {
    type: VacationsActionType; // Which operation we're going to preform.
    payload: any; // What is the data related to that operation.
}

// Vacations reducer - the main functions performing the needed action:
export function vacationsReducer(currentState = new vacationState(), action: VacationsAction): vacationState {

    // Duplicate current state into a new state:
    const newState = {...currentState};

    // Perform the needed action on the newState:
    switch(action.type) {
        
        case VacationsActionType.FetchVacations: // Here, the payload is all vacations for saving.
            newState.vacations = action.payload;
        break;

        case VacationsActionType.AddVacation: // Here, the payload is a vacation is all vacations for adding.
            newState.vacations.push(action.payload);
        break;

        case VacationsActionType.UpdateVacation: // Here, the payload is a vacation object for update.
        const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
        if(indexToUpdate >= 0) {
            newState.vacations[indexToUpdate] = action.payload;

        }
        break;

        case VacationsActionType.UpdateFollow: 
        const currentUser = authStore.getState().user;
        const index = newState.vacations.findIndex((v)=> v.vacationId === action.payload.vacationId);

        // isFollow update 
        if(action.payload.userId === currentUser.userId){
            newState.vacations[index].isFollowing = action.payload.isFollowing;
        }
        
        // followersCount update
        if(action.payload.isFollowing === 1){
            ++newState.vacations[index].followersCount;
        } else {
            --newState.vacations[index].followersCount;
        }
        break;

        case VacationsActionType.DeleteVacation: // Here, the payload is the vacation id for deleting.
        const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload)
        if(indexToDelete >= 0) {
            newState.vacations.splice(indexToDelete, 1);

        }
        break;


    }

    // Here we store the current action as the lastAction property, then subscribe components can handle specific actions :
    newState.lastAction = VacationsActionType[action.type]; 

    // Return the newState:
    return newState;

}

// Vacations store - The manager object, handling redux:
export const vacationsStore = createStore(vacationsReducer);

