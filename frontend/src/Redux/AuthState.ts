import jwtDecode from "jwt-decode";
import UserModel from "../models/user-model";
import { createStore } from "redux";


// Global Auth State
export class AuthState {

    public token: string = null;
    public user: UserModel = null;

    public constructor() {

        this.token = localStorage.getItem("token");
        if (this.token) {
            this.user = jwtDecode<{ user: UserModel }>(this.token).user; // Extract user from token

        }

    }
}

// Auth Action type:
export enum AuthActionType {

    Register,
    Login,
    Logout


}

// Auth Action:
export interface AuthAction {

    type: AuthActionType;
    payload?: string;

}

// Auth Reducer:
export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {

    // Create new state:
    const newState = { ...currentState };

    // Perform the needed action:
    switch (action.type) {

        case AuthActionType.Register: // Here, the payload is a token
        case AuthActionType.Login: // Here, the payload is a token



            newState.token = action.payload;
            newState.user = jwtDecode<{ user: UserModel }>(action.payload).user; // Extract user from token

            // Save a token on the storage
            localStorage.setItem("token", newState.token);

            break;

        case AuthActionType.Logout: // Here, we don't have any payload;

            newState.token = null;
            newState.user = null;

            // Remove token from the storage
            localStorage.removeItem("token");

            break;

    }

    // Return new state:
    return newState;

}

// Auth store:
export const authStore = createStore(authReducer);