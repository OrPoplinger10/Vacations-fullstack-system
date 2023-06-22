import Joi from "joi";
import { ValidationError } from "./client-errors";

class ContactModel {

    public contactId: number;
    public fullName: string;
    public email: string;
    public phone: string;
    public message: string;

   public constructor(contact: ContactModel) {

    this.contactId = contact.contactId;
    this.fullName = contact.fullName;
    this.email = contact.email;
    this.phone = contact.phone;
    this.message = contact.message;

   }

   private static postValidationSchema = Joi.object ({

    contactId: Joi.number().forbidden().positive().integer(),
    fullName: Joi.string().required().min(4).max(50),
    email: Joi.string().email().required(),
    phone: Joi.string().regex(/^\d{5,14}$/).required(),
    message: Joi.string().required().min(7).max(1000),
    
})

public validateContactPost(): void {

    const result = ContactModel.postValidationSchema.validate(this);
    if(result.error)throw new ValidationError(result.error.message);

}

}

export default ContactModel