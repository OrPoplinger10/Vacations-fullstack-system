import { ResourceNotFoundError } from "../2-models/client-errors";
import VacationModel from "../2-models/vacation-model";
import appConfig from "../4-utils/app-config";
import dal from "../4-utils/dal";
import { OkPacket } from "mysql";
import imageHandler from "../4-utils/image-handler";

// Get all vacations from database:
async function getAllVacations(userId: number): Promise <VacationModel[]> { //userId: number

    // Create query
    const sql = `SELECT DISTINCT
    V.*, CONCAT('${appConfig.imagesUrl}' , V.imageName) AS imageUrl,
    EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
    COUNT(F.userId) AS followersCount
    FROM vacations as V LEFT JOIN followers as F
    ON V.vacationId = F.vacationId
    GROUP BY vacationId
    ORDER BY startDate`;

    // Get all vacations:
    const vacations = await dal.execute(sql, [userId]); //, [userId]
      
    // Return Them:
    return vacations;
}

// Get one vacation:
async function getOneVacation(vacationId: number): Promise <VacationModel>{

    // Create query
    const sql = `SELECT *, CONCAT('${appConfig.imagesUrl}', imageName) AS imageUrl
    FROM vacations
    WHERE vacationId = ?`;
    
    // Get one vacation
    const vacations = await dal.execute(sql,[vacationId]);

    // Take first vacation:
    const vacation = vacations[0];

    // If id not found:
    if(!vacation) throw new ResourceNotFoundError(vacationId);

    // Return Them:
    return vacations;
};

// Add vacation:
async function addVacation(vacation: VacationModel): Promise <VacationModel>{

    //Validate:
    vacation.validateVacationPost();

    let imageName = null;
 
    // If we have image:
    if(vacation.image) {

    //Save image
    imageName =  await imageHandler.saveImage(vacation.image);
        
    // Set back image Url:
    vacation.imageUrl = imageName;

    };


    // Create query:
    const sql = `INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`;
     
    // Execute:
    const result: OkPacket = await dal.execute(sql,
    [vacation.vacationDestination, vacation.vacationDescription, vacation.startDate,
    vacation.endDate, vacation.price, vacation.imageUrl]);

    // Set back the created id:
    vacation.vacationId = result.insertId;

    // Remove image file from returned vacation:
    delete vacation.image;
       
    // return vacation
    return vacation;

};

// Update vacation:
async function updateVacation(vacation: VacationModel): Promise <VacationModel>{
    
    //Validate:
    vacation.validatePut();

    // Take original image name
    let imageName = await getVacationImageName(vacation.vacationId);

    // If we have an image to update   
    if(vacation.image) {

    // Update image:
    imageName = await imageHandler.updateImage(vacation.image, imageName);
      
  }

    // Set back image Url, if they didn't send me an image I still want to return the imageUrl of the original image:
    vacation.imageUrl = imageName;

    // Create query:
    const sql = `UPDATE vacations SET
    vacationDestination = ?,
    vacationDescription = ?,
    startDate = ?,
    endDate = ?,
    price = ? ,
    imageName = ?
    WHERE vacationId = ?`;
    
    // Execute
    const result: OkPacket = await dal.execute(sql,
    [vacation.vacationDestination, vacation.vacationDescription, vacation.startDate,
    vacation.endDate, vacation.price, vacation.imageUrl, vacation.vacationId]);
         
    //  If product not found:
    if(result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    // Remove image file from returned vacation:
    delete vacation.image

    //Return vacation
    return vacation;
};

 // Delete vacation:
async function deleteVacation(vacationId: number): Promise <void>{
    
    // Take original image name
    let imageName = await getVacationImageName(vacationId);

    // Create query:
    const sql = `Delete from vacations WHERE vacationId = ?`
    
    // Execute:
    const result: OkPacket = await dal.execute(sql, [vacationId]);
    
    // If product not found:
    if(result.affectedRows === 0) throw new ResourceNotFoundError(vacationId);
    
    //  Delete image from disk:
    await imageHandler.deleteImage(imageName);
}; 


// Get vacations image name from db
async function getVacationImageName(vacationId: number): Promise<string> {

    // Create query
    const sql = `SELECT imageName FROM vacations WHERE vacationId = ?`

    // Get vacation:
    const vacations = await dal.execute(sql,[vacationId]);

    //Extract first vacation:
    const vacation = vacations[0];

    //If id not found:
    if(!vacation) return null;

    //Get image name:
    const imageName = vacation.imageName;

    //Return:
    return imageName;

}

export default{
    getAllVacations,
    getOneVacation,
    addVacation,
    updateVacation,
    deleteVacation,
    
};






