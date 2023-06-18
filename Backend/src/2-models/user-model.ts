import RoleModel from "./role-model";
import Joi from "joi";
import { ValidationError } from "./client-errors";

class UserModel {

    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: RoleModel;

    public constructor(user: UserModel) {
        this.userId = user.userId
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.email = user.email
        this.password = user.password
        this.roleId = user.roleId 
    } 

    private static postValidationSchema = Joi.object ({

         userId: Joi.number().forbidden().positive().integer(),
         firstName: Joi.string().required().min(2).max(1000),
         lastName: Joi.string().required().min(2).max(1000),
         email: Joi.string().email().required(),
         password: Joi.string().min(4).required(),
         roleId: Joi.number().required().min(1).max(2)
       
      });

      public validatePostRegister(): void {

         const result = UserModel.postValidationSchema.validate(this);
         if(result.error)throw new ValidationError(result.error.message);
  
    }

}

export default UserModel;

