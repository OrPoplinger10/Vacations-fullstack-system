import express, {Request, Response, NextFunction} from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import cyber from "../4-utils/cyber";
import followersService from "../5-service/followers-service";

const router = express.Router();

// POST http://localhost:4000/api/followers/
router.post("/follow/", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    
    try {
        
        const token = request.header("authorization").substring(7); 
        const userId = cyber.getTokenAndReturnUser(token).userId;
        const action = request.body?.action; 
        const vacationId = +request.body.vacationId;
        await followersService.updateFollowers(userId, vacationId, action); 
        response.sendStatus(204);
    }
    
    catch(err: any) {
        next(err);
    }

});


export default router