import express, {Request, Response, NextFunction} from "express";
import dataService from "../5-service/data-service";
import VacationModel from "../2-models/vacation-model";
import imageHandler from "../4-utils/image-handler";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import verifyAdmin from "../3-middleware/verify-admin";
import cyber from "../4-utils/cyber";
import OrderModel from "../2-models/order-model";
import ContactModel from "../2-models/contact-model";

const router = express.Router();

// GET http://localhost:4000/api/vacations
router.get("/vacations",verifyLoggedIn, async(request: Request, response: Response, next: NextFunction) => {

    try{

        const token = request.header("authorization").substring(7);
        const user = cyber.getTokenAndReturnUser(token)
        const userId = user.userId;
        const vacations = await dataService.getAllVacations(userId); 
         response.json(vacations) ;

    }
    catch(err: any){

        next(err)
    }
});

// GET http://localhost:4000/api/vacation/:vacationId
router.get("/vacations/:vacationId([0-9]+)", verifyLoggedIn , async(request: Request, response: Response, next: NextFunction) => {

    try{

       const vacationId = +request.params.vacationId
       const vacation = await dataService.getOneVacation(vacationId);
       response.json(vacation);

    }
    catch(err: any){

        next(err)
    }
});

// POST http://localhost:4000/api/vacations
router.post("/vacations", verifyAdmin ,async(request: Request, response: Response, next: NextFunction) => {

    try{
        
        //Take image if exist:
        request.body.image = request.files?.image;

        const vacation = new VacationModel(request.body);
        const addedVacation = await dataService.addVacation(vacation);
         response.status(201).json(addedVacation);

    }
    catch(err: any){

        next(err)
    }
});

// PUT http://localhost:4000/api/vacations/:vacationId
router.put("/vacations/:vacationId([0-9]+)", verifyAdmin ,async(request: Request, response: Response, next: NextFunction) => {

    try{

        request.body.vacationId = +request.params.vacationId;

        //Take image if exist:
        request.body.image = request.files?.image;

        const vacation = new VacationModel(request.body);
        const updateVacation = await dataService.updateVacation(vacation);
         response.json(updateVacation);

    }
    catch(err: any){

        next(err)
    }
});

// DELETE http://localhost:4000/api/vacations/:id
router.delete("/vacations/:vacationId([0-9]+)", verifyAdmin ,async(request: Request, response: Response, next: NextFunction) => {

    try{

        const vacationId = +request.params.vacationId;
        await dataService.deleteVacation(vacationId);
         response.sendStatus(204); 

    }
    catch(err: any){

        next(err)
    }
});

// POST http://localhost:4000/api/orders
router.post("/orders/:vacationId([0-9]+)", verifyLoggedIn ,async(request: Request, response: Response, next: NextFunction) => {

    try{
        
        request.body.vacationId = +request.params.vacationId;
        const order = new OrderModel(request.body);
        const addedOrder = await dataService.addOrder(order);
         response.status(201).json(addedOrder);

    }
    catch(err: any){

        next(err)
    }
});

// POST http://localhost:4000/api/contacts
router.post("/contacts" ,async(request: Request, response: Response, next: NextFunction) => {

    try{
        
        const contact = new ContactModel(request.body);
        const addedContact = await dataService.addContact(contact);
         response.status(201).json(addedContact);

    }
    catch(err: any){

        next(err)
    }
});



//GET http://localhost:4000/api/vacations/images/:imageName
router.get("/vacations/images/:imageName", async(request: Request, response: Response, next: NextFunction) => {
    
    try{

       const imageName = request.params.imageName;
       const imagePath = imageHandler.getImagePath(imageName);
       response.sendFile(imagePath);
    
    }
    catch(err: any){

        next(err)
    }

    
});

// POST http://localhost:4000/api/followers/
router.post("/follow/", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    
    try {
        
        const token = request.header("authorization").substring(7); 
        const userId = cyber.getTokenAndReturnUser(token).userId;
        const action = request.body?.action; 
        const vacationId = +request.body.vacationId;
        await dataService.updateFollowers(userId, vacationId, action); 
        response.sendStatus(204);
    }
    
    catch(err: any) {
        next(err);
    }

});


export default router