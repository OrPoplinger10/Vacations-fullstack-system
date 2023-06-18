import Joi from "joi";
import { ValidationError } from "./client-errors";

class CredentialsModel {

    public email: string;
    public password: string;
    
    public constructor(credentials: CredentialsModel) {
        
        this.email = credentials.email
        this.password = credentials.password
          
    } 

    private static postValidationSchema = Joi.object ({

         email: Joi.string().email().required(),
         password: Joi.string().min(4).required()
       
      });

    public validatePostLogin(): void {

         const result = CredentialsModel.postValidationSchema.validate(this);
         if(result.error)throw new ValidationError(result.error.message);
  
    }

    
}

export default CredentialsModel;

