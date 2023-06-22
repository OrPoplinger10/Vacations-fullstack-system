import { createStore } from "redux";
import ContactModel from "../models/contact-model";

// Contact State - the application level state regarding contacts:
export class contactState {
    public contacts: ContactModel[] = [];
    
}

// Contacts Action type - Which actions we can perform on our Contacts global state:
export enum ContactsActionType {

    FetchContacts,
    addContacts

}

// Contacts Action - Interface describing an object for preforming one action on our Contacts global state:
export interface ContactsAction {
    type: ContactsActionType; // Which operation we're going to preform.
    payload: any; // What is the data related to that operation.
}

// Contacts reducer - the main functions performing the needed action:
export function contactsReducer(currentState = new contactState(), action: ContactsAction): contactState {

    // Duplicate current state into a new state:
    const newState = {...currentState};

    // Perform the needed action on the newState:
    switch(action.type) {

        case ContactsActionType.FetchContacts: // Here, the payload is all Contacts for saving.
            newState.contacts = action.payload;
        break;

        case ContactsActionType.addContacts: // Here, the payload is a contact is all Contacts for adding.
            newState.contacts.push(action.payload);
        break;

}

// Return the newState:
return newState;

}

//Contacts store - The manager object, handling redux:
export const contactsStore = createStore(contactsReducer);
