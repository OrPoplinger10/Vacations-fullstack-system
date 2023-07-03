import express, {Request, Response, NextFunction} from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import OrderModel from "../2-models/order-model";
import ordersService from "../5-service/orders-service";


const router = express.Router();


// POST http://localhost:4000/api/orders
router.post("/orders/:vacationId([0-9]+)", verifyLoggedIn ,async(request: Request, response: Response, next: NextFunction) => {

    try{
        
        request.body.vacationId = +request.params.vacationId;
        const order = new OrderModel(request.body);
        const addedOrder = await ordersService.addOrder(order);
        response.status(201).json(addedOrder);

    }
    catch(err: any){

        next(err)
    }
});

export default router