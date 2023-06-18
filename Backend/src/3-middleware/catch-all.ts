import { NextFunction, Request, Response } from "express";


function catchAll(err: any, request: Request, response: Response, next: NextFunction){

     // Display error
     console.log(err);

     // find status cost:
     // const statusCode = err.status ? err.status : 500; //Ternary
     const statusCode = err.status || 500; //Short Circuit

     // Send back error details:
     response.status(statusCode).send(err.message);
}

export default catchAll;