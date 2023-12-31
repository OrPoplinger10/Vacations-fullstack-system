import express, {Request, Response, NextFunction} from "express";
import UserModel from "../2-models/user-model";
import authService from "../5-service/auth-service";
import CredentialsModel from "../2-models/credentials-model";

const router = express.Router();

// POST http://localhost:4000/api/vacations/auth/register
router.post("/auth/register", async(request: Request, response: Response, next: NextFunction) => {
    try{

        const user = new UserModel(request.body);
        const token = await authService.register(user);
        response.status(201).json(token);

    }
    catch(err: any){

        next(err)
    }

});

// POST http://localhost:4000/api/vacations/auth/login
router.post("/auth/login", async(request: Request, response: Response, next: NextFunction) => {
    try{

        const credentials = new CredentialsModel(request.body);
        const token = await authService.login(credentials);
        response.json(token);

        
    }
    catch(err: any){

        next(err)
    }

});


export default router