import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import Contact from "../../UserArea/Contact/Contact";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import Vacations from "../../VacationsArea/Vacations/Vacations";
import AdminVacations from "../../AdminArea/AdminVacations/AdminVacations";
import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import AddVacation from "../../AdminArea/AddVacation/AddVacation";
import EditVacation from "../../AdminArea/EditVacation/EditVacation";
import AdminGraph from "../../AdminArea/AdminGraph/AdminGraph";
import VacationBookingPage from "../../VacationsArea/VacationBookingPage/VacationBookingPage";




function Routing(): JSX.Element {
  
  // Token state -> hold user token on site load
  const [token, setToken] = useState<string>("");

  // Is Logged in state -> to hold if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Is Admin state -> to hold if user is admin
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Get user From redux
  useEffect(() => {
    const unsubscribe = authStore.subscribe(() => {
      setToken(authStore.getState().token);
      setIsLoggedIn(authService.verifyLoggedIn());
      setIsAdmin(authService.isAdmin());
    });

    // Set initial values
    setToken(authStore.getState().token);
    setIsLoggedIn(authService.verifyLoggedIn());
    setIsAdmin(authService.isAdmin());

    // Unsubscribe from store
    return unsubscribe;

  }, []);

    return (

      
     <Routes>

     {/* Default Route */}
     <Route path="/" 
        element={isLoggedIn ? ( 
            isAdmin ? ( <Navigate to="/home" replace />
            ) : ( <Navigate to="/home" />)
            ) : ( 
            <Home/>
        )
    }
    />
    
     {/* Auth Routes */}
    <Route path="/login" element={isLoggedIn ? (
         isAdmin ? ( <Navigate to="/admin-vacations" replace />
         ) : ( <Navigate to="/vacations" />) 
         ) : (
           <Login />
         )
     }
    />

    <Route path="/register" element={isLoggedIn ? (
         isAdmin ? ( <Navigate to="/admin-vacations" replace />
         ) : ( <Navigate to="/vacations" />) 
         ) : (
           <Register/>
         )
     }
    />

    {/* User Routes */}
       <Route
        path="/vacations"
        element={
          isLoggedIn ? (
            isAdmin ? (
              <Navigate to="/admin-vacations" replace />
            ) : (
              <Vacations />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

       <Route
        path="/vacations/booking-vacation/:vacationId"
        element={
          isLoggedIn ? (
            isAdmin ? (
              <Navigate to="/admin-vacations" replace />
            ) : (
              <VacationBookingPage />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

       {/* Admin routes */}
       <Route
        path="/admin-vacations"
        element={
          isLoggedIn && isAdmin ? (
            <AdminVacations/>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

        <Route
        path="/admin-graph"
        element={
          isLoggedIn && isAdmin ? (
            <AdminGraph />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      
       <Route
        path="/vacations/add"
        element={
          isLoggedIn && isAdmin ? (
            <AddVacation />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
        
        <Route
        path="/vacations/edit/:vacationId"
        element={
          isLoggedIn && isAdmin ? (
            <EditVacation />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Home Page: */}
     <Route path="/home" element={<Home/>}/>

     {/* Contact Page: */}
     <Route path="/contact" element={<Contact/>}/>

     {/* Page not found */}
     <Route path="*" element={<PageNotFound/>}/>

     </Routes>
        
    );
    
}

export default Routing;







