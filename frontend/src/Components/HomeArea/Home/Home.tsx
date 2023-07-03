import { NavLink } from "react-router-dom";
import "./Home.css";

;

function Home(): JSX.Element {

    return (
        <div className="Home">
          <h1 className = "titleHome">
            <div className="halfOfTitleHome">
          Create the best vacation for you  
          </div>
          <br/>
          and your family
          </h1>
          <p className="subTitleHome">
          Travel to your favorite city 
          <br/>
          with respectful of the environment!
         </p>
         <button className="bthHome">
         <NavLink to="/contact"> Contact Us</NavLink>
         </button>
         
        </div>
    );
}

export default Home;
