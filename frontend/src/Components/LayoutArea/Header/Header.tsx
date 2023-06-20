import { NavLink} from "react-router-dom";
import "./Header.css";
import UserModel from "../../../models/user-model";
import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";

function Header(): JSX.Element {
    const [user, setUser] = useState<UserModel>();
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    
    useEffect(() => {

        setUser(authStore.getState().user);

         const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
         });

         return () => unsubscribe();

      },[]);

      function logout(): void {
        authService.logout();
        notifyService.success("Waiting for your return!")

      }


    return(
        
         <div className="Header">
               <a className="logo"><i className="ri-plane-fill">
               </i><span>Vacations</span></a>

         <ul className={`navbar${isMenuOpen ? ' open' : ''}`}> 
               <li><NavLink to="/home" className= "homePage">Home</NavLink></li>
               <li><NavLink  to="/vacations" className= "vacationPage">Vacations</NavLink></li>
               <li><NavLink to="contact" className= "contact">Contact Us</NavLink></li>
           </ul>

          { !user &&
             <div className="main">
              <NavLink to="/login" className= "login"><i className="ri-user-fill"></i>Login</NavLink>
              <NavLink to="/register" className= "register">Register</NavLink>
              <div className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'}`}
               id="menu-icon"
               onClick={() => setIsMenuOpen(!isMenuOpen)}
               ></div>
             </div>

           }

           { user && 
             <div className="userLogout">
              <span className ="userMessage">Hello {user.firstName} {user.lastName} </span> 
              <NavLink to="/home" onClick={logout} className="logout"><i className="ri-logout-box-r-line"></i>Logout</NavLink>
              <div className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'}`}
               id="menu-icon"
               onClick={() => setIsMenuOpen(!isMenuOpen)}
               ></div>
            </div>

           }

        </div>
    );
}

export default Header