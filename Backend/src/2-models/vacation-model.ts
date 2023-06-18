import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

class VacationModel{ 

  public vacationId: number;
  public vacationDestination: string;
  public vacationDescription: string;
  public startDate: string;
  public endDate: string;
  public price: number;
  public imageUrl: string; // Image full url
  public image: UploadedFile; // Image file

  public constructor(vacation: VacationModel){
      this.vacationId = vacation.vacationId
      this.vacationDestination = vacation.vacationDestination
      this.vacationDescription = vacation.vacationDescription
      this.startDate = vacation.startDate
      this.endDate = vacation.endDate
      this.price = vacation.price
      this.imageUrl = vacation.imageUrl;
      this.image = vacation.image;

  }

  private static postValidationSchema = Joi.object ({

     vacationId: Joi.number().forbidden().positive().integer(),
     vacationDestination: Joi.string().required().min(3).max(50),
     vacationDescription: Joi.string().required().min(10).max(1000),
     startDate: Joi.date().min(new Date()).required(),
     endDate: Joi.date().min(new Date()).required(),
     price: Joi.number().required().positive(),
     imageUrl: Joi.string(),
     image: Joi.any().optional().custom((value, helpers) => {
        if (!value) return value;
        if (!value.name.match(/\.(jpg|jpeg)$/)) {
            return helpers.error('any.invalid');
        }
        return value;
    }, 'JPG image file')
  });

  private static putValidationSchema = Joi.object ({

     vacationId: Joi.number().required().positive().integer(),
     vacationDestination: Joi.string().required().min(3).max(50),
     vacationDescription: Joi.string().required().min(10).max(1000),
     startDate: Joi.date().min(new Date()).required(),
     endDate: Joi.date().min(new Date()).required(),
     price: Joi.number().required().positive(),
     imageUrl: Joi.string(),
     image: Joi.any().optional().custom((value, helpers) => {
      if (!value) return value;
      if (!value.name.match(/\.(jpg|jpeg)$/)) {
          return helpers.error('any.invalid');
      }
      return value;
  }, 'JPG image file')
    
  });

  public validateVacationPost(): void {

      const result = VacationModel.postValidationSchema.validate(this);
      if(result.error)throw new ValidationError(result.error.message);

  }

  public validatePut(): void {

    const result = VacationModel.putValidationSchema.validate(this);
    if(result.error)throw new ValidationError(result.error.message);

}


}

export default VacationModel