import { Request } from "express";
import UserModel from "../2-models/user-model";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../2-models/client-errors";
import RoleModel from "../2-models/role-model";
import crypto from "crypto"

const secretKey = "SoR7Token10PrO89";

// Return new token
function createToken(user: UserModel): string {

    // Delete password before creating token:
    delete user.password

    // Create container containing the user:
    const container = { user };

    // Create option:
    const options = { expiresIn: "3h"};

    // Create token (We need to install a library to create a token(jsonwebtoken));
    const token = jwt.sign(container, secretKey , options);

    //Return
    return token;

}

// The token is in the header named authorization
// authorization: "Bearer the-token"
async function verifyToken(request: Request): Promise<boolean> {

   return new Promise<boolean>((resolve, reject) => {

   //Extract header:
   const header = request.header("authorization") // "Bearer the-token"
      
   //If no header
   if(!header) {

     reject(new UnauthorizedError("You must be a logged in user !"));
     return;

    }

   // Extract token:
   const token = header.substring(7);

   // If no token
   if(!token) {

       reject(new UnauthorizedError("Incorrect email or password"));
       return;

    }   

   // Verify:
   jwt.verify(token, secretKey, (err) => {

    if(err) {

       reject(new UnauthorizedError("Expired token"));
       return;

    }    
              
   // Everything went successfully:
    resolve(true);

    });
  
    });

}

async function verifyAdmin(request: Request): Promise<boolean> {

  return new Promise<boolean>((resolve, reject) => {

  //Extract header:
  const header = request.header("authorization") // "Bearer the-token"
 
  //If no header
   if(!header) {
 
   reject(new UnauthorizedError("Incorrect email or password"));
    return;
 
    }
 
   // Extract token:
   const token = header.substring(7);
     
   // If no token
   if(!token) {
 
     reject(new UnauthorizedError("Incorrect email or password"));
     return;
 
    }   
 
   // Verify:
   jwt.verify(token, secretKey, (err, container: {user: UserModel}) => {
 
   if(err) {
 
     reject(new UnauthorizedError("Expired token"));
     return;
 
    }    
             
   //Extract user from token:
    const user = container.user;
    
 
   // If user is not admin:
   if(user.roleId !== RoleModel.Admin) {

     reject(new UnauthorizedError("Access denied"));
     return;  
     

    }
             
   // Everything went successfully
    resolve(true);
 
    });
   
    });
 
 }

 // Hash password:
function hashPassword(plainText: string): string {
   
   const salt = "StrongPassword71098-98Password!!";
    
   // Hash with salt:
   // HMAC = Hash based Message Authentication code
   const hashedText = crypto.createHmac("sha512", salt).update(plainText).digest("hex");

   return hashedText;
           
}

function getTokenAndReturnUser(token: string): UserModel {
    
   // Verify:
   const decodedToken = jwt.verify(token, secretKey) as any

   const { user } = decodedToken;

   return user;

 
    };

export default {
    createToken,
    verifyToken,
    verifyAdmin,
    hashPassword,
    getTokenAndReturnUser
}