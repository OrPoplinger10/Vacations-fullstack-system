import axios from "axios";
import OrderModel from "../Models/Order-model";
import appConfig from "../Utils/AppConfig";
import { OrdersActionType, ordersStore } from "../Redux/OrdersState";

class OrdersService {

    // Add order:
    public async addOrder(order: OrderModel): Promise<void>{

        // Send order to server:
        const response = await axios.post<OrderModel>(appConfig.ordersUrl + order.vacationId, order);
   
        // Get the added order:
        const addedOrder =  response.data;
  
        // Add that order to the global state:
        ordersStore.dispatch({ type: OrdersActionType.AddOrder, payload: addedOrder });
           
       }

}

const ordersService = new OrdersService();

export default ordersService