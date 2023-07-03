import { OkPacket } from "mysql";
import OrderModel from "../2-models/order-model";
import dal from "../4-utils/dal";

// Add order:
async function addOrder(order: OrderModel): Promise <OrderModel>{

    //Validate:
    order.validateOrderPost();

    // Create query:
    const sql = `INSERT INTO orders VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`;
     
    // Execute:
    const result: OkPacket = await dal.execute(sql,
    [order.vacationId, order.fullName, order.adults,
   order.kids, order.roomsNumber,order.phoneNumber]);

    // Set back the created id:
   order.orderId = result.insertId;
       
    // return vacation
    return order;

};

export default{
    
    addOrder
   
};