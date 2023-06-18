import axios from "axios";
import { authStore } from "../Redux/AuthState";

class InterceptorService {

    // create interceptor:
    public create(): void {

        // Register to any request
        axios.interceptors.request.use(requestObject => {

            // If we have a token
            if (authStore.getState().token) {

                // Add  authorization header , containing the token:
                requestObject.headers.Authorization = "Bearer " + authStore.getState().token;
                
            }

            //  Return to update returnObject
            return requestObject
        })
    }

}
const interceptorService = new InterceptorService();

export default interceptorService