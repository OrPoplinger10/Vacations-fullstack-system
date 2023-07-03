import axios from "axios";
import ContactModel from "../Models/Contact-model";
import appConfig from "../Utils/AppConfig";
import { ContactsActionType, contactsStore } from "../Redux/ContactState";

class ContactsService {

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

const contactsService = new ContactsService();

export default contactsService