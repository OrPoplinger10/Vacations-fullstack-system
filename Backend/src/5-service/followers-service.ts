import { OkPacket } from "mysql";
import dal from "../4-utils/dal";
import socketIoService from "./socketIoService";


async function updateFollowers(userId:number, vacationId: number, action: number): Promise<void>{
    
    // Will add data only if cross exists in database
    const followQuery = `INSERT INTO followers (userId, vacationId) SELECT ?, ? 
    WHERE NOT EXISTS (SELECT 1 FROM followers WHERE userId = ? AND vacationId = ?)`;
    
    const unFollowQuery = "DELETE FROM followers WHERE userId=? AND vacationId=?";
    
    const sql = action === 1 ? followQuery : unFollowQuery;
    
    const response:OkPacket = await dal.execute(sql, [userId, vacationId, userId, vacationId]);

    // If a user follows a vacation send to follow it again
    if(response.affectedRows !== 0){
        const socketServer = socketIoService.getSocketServer();
        socketServer.sockets.emit('update', {vacationId, userId, isFollowing: action}); 
    }
    
}

export default{
  
    updateFollowers
};