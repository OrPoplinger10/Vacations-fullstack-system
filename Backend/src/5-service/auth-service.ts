import { OkPacket } from "mysql";
import { UnauthorizedError, ValidationError } from "../2-models/client-errors";
import RoleModel from "../2-models/role-model";
import UserModel from "../2-models/user-model";
import dal from "../4-utils/dal";
import cyber from "../4-utils/cyber";
import CredentialsModel from "../2-models/credentials-model";

//Register new user:
async function register(user: UserModel): Promise<string> {
    
    // Validation
    user.validatePostRegister();

    // if email taken:
    const isTaken = await isEmailTaken(user.email);
    if(isTaken) throw new ValidationError(`Email ${user.email} already taken`);

    // Hash password:
    user.password = cyber.hashPassword(user.password);

   //  // set role as a regular user:
    user.roleId = RoleModel.User;

    // create query:
    const sql = `INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?)`;

    // Execute:
    const result: OkPacket = await dal.execute(sql,[
    user.firstName, user.lastName, user.email,
    user.password, user.roleId]);

    // Set back auto-increment id:
    user.userId = result.insertId;

    // Create token:
    const token = cyber.createToken(user);

    // Return:
    return token;

};

//Is email exists:
async function isEmailTaken(email: string): Promise<boolean> {

   // create query
   const sql = `SELECT EXISTS(SELECT * FROM users WHERE email = ?) AS isTaken `;

   // Execute
   const arr = await dal.execute(sql, [email]);
   
   // Get is taken value:
   const isTaken = arr[0].isTaken;

   // return true if email is taken:
   return isTaken === 1;

};

// Login:
async function login(credentials: CredentialsModel): Promise<string> {

   // Validation
   credentials.validatePostLogin();

//    Hash password:
   credentials.password = cyber.hashPassword(credentials.password);

   // Create query
   const sql = ` SELECT * FROM users WHERE 
   email = ? AND 
   password = ?`;

   //Execute:
   const users = await dal.execute(sql, [credentials.email, credentials.password]);
 
   //Extract count:
   const user = users[0];

   // If user not exist:
   if(!user) throw new UnauthorizedError("Incorrect username or password");

   // Create token:
   const token = cyber.createToken(user);

   //Return:
   return token;

}

export default {
    register,
    login
    
};