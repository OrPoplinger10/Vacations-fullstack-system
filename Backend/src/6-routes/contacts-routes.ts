import express, {Request, Response, NextFunction} from "express";
import ContactModel from "../2-models/contact-model";
import contactsService from "../5-service/contacts-service";

const router = express.Router();

// POST http://localhost:4000/api/contacts
router.post("/contacts" ,async(request: Request, response: Response, next: NextFunction) => {

    try{
        
        const contact = new ContactModel(request.body);
        const addedContact = await contactsService.addContact(contact);
        response.status(201).json(addedContact);

    }
    catch(err: any){

        next(err)
    }
});

export default router