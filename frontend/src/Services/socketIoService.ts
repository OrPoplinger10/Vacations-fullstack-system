import { io } from "socket.io-client";
import appConfig from "../Utils/AppConfig";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";

const socketService = io(appConfig.socketUrl);

// Socket service that listens to update msg from server, and pass it to redux store
async function startSocketListener(){
    
    
    socketService.on('update', (vacation:any) => {

        vacationsStore.dispatch({type: VacationsActionType.UpdateFollow, payload:{
            vacationId: vacation.vacationId, 
            isFollowing: vacation.isFollowing,
            userId: vacation.userId
        }
        });
              
    });

}

export default startSocketListener;