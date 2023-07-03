import axios from "axios";
import appConfig from "../Utils/AppConfig";

class FollowersService {

   // Follow update: expected input is vacationId, action [1 or 0]
   public async updateFollow(vacationId: number, action:number): Promise<void> { 

    const data = { vacationId, action }; // Contain data 
    
    await axios.post(appConfig.followUrl, data);
}

}

const followersService = new FollowersService()

export default followersService