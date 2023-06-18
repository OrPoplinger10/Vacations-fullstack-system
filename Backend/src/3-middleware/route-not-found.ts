import { NextFunction, Request, Response } from "express";
import { routeNotFoundError } from "../2-models/client-errors";


function routeNotFound(request: Request, response: Response, next: NextFunction){
     const err = new routeNotFoundError(request.originalUrl);
     next(err);
}

export default routeNotFound;