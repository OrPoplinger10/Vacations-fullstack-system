import Joi from "joi";
import { ValidationError } from "./client-errors";

class OrderModel {

    public orderId: number;
    public vacationId: number;
    public fullName: string;
    public adults: number;
    public kids: number;
    public roomsNumber: number;
    public phoneNumber: number;

    public constructor(order: OrderModel){
        this.orderId = order.orderId
        this.vacationId = order.vacationId
        this.fullName = order.fullName
        this.adults = order.adults
        this.kids = order.kids
        this.roomsNumber = order.roomsNumber;
        this.phoneNumber = order.phoneNumber
    
    }

    private static postValidationSchema = Joi.object ({

        orderId: Joi.number().forbidden().positive().integer(),
        vacationId: Joi.number().optional().positive().integer(),
        fullName: Joi.string().required().min(4).max(50),
        adults: Joi.number().required().positive().integer().min(1).max(6),
        kids: Joi.number().required().integer(),
        roomsNumber: Joi.number().required().positive().integer().min(1).max(6),
        phoneNumber: Joi.string().regex(/^\d{5,14}$/).required(),
    })

    public validateOrderPost(): void {

        const result = OrderModel.postValidationSchema.validate(this);
        if(result.error)throw new ValidationError(result.error.message);
  
    }

}

export default OrderModel