import { createStore } from "redux";
import OrderModel from "../models/order-model";

// Order State - the application level state regarding orders:
export class orderState {
    public orders: OrderModel[] = [];
    
}

// Orders Action type - Which actions we can perform on our Orders global state:
export enum OrdersActionType {

    AddOrder

}

// orders Action - Interface describing an object for preforming one action on our Orders global state:
export interface OrdersAction {
    type: OrdersActionType; // Which operation we're going to preform.
    payload: any; // What is the data related to that operation.
}

// orders reducer - the main functions performing the needed action:
export function ordersReducer(currentState = new orderState(), action: OrdersAction): orderState {

    // Duplicate current state into a new state:
    const newState = {...currentState};

    // Perform the needed action on the newState:
    switch(action.type) {

        case OrdersActionType.AddOrder: // Here, the payload is a order is all orders for adding.
            newState.orders.push(action.payload);
        break;

}

// Return the newState:
return newState;

}

//Orders store - The manager object, handling redux:
export const ordersStore = createStore(ordersReducer);