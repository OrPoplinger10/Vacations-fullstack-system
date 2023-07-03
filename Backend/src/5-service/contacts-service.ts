import { OkPacket } from "mysql";
import ContactModel from "../2-models/contact-model";
import dal from "../4-utils/dal";

// Add contact
async function addContact(contact: ContactModel): Promise <ContactModel> {

    // Validate:
    contact.validateContactPost();

    // Create query:
    const sql =`INSERT INTO contacts VALUES(DEFAULT, ?, ?, ?, ?)`;

    // Execute:
    const result: OkPacket =await dal.execute(sql,[
    contact.fullName, contact.email, contact.phone, contact.message]);

    // Set back the created id:
    contact.contactId = result.insertId;

    // return contact
    return contact

}

export default{
 
    addContact,
    
};