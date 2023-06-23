import { NavLink } from "react-router-dom";
import "./Copyrights.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

function Copyrights(): JSX.Element {
    
    return (
        
        <div className="Copyrights">
            <div className="waves">
             <div className="wave" id="wave1"></div>
             <div className="wave" id="wave2"></div>
             <div className="wave" id="wave3"></div>
             <div className="wave" id="wave4"></div>
            </div>
            <ul className="social-icon">
            <li><NavLink to="#" className="facebookIcon"><FacebookIcon fontSize="large" /></NavLink></li>
            <li><NavLink to="#" className="twitterIcon"><TwitterIcon fontSize="large" /></NavLink></li>
            <li><NavLink to="#" className="linkedinIcon"><LinkedInIcon fontSize="large" /></NavLink></li>
            <li><NavLink to="#" className="instagramIcon"><InstagramIcon fontSize="large" /></NavLink></li>
            </ul>
            <p className="allRightsReserved">©️ 2023 All Rights Reserved </p>
			
        </div>
        
    );
}

export default Copyrights;
