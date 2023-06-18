import "./PageNotFound.css";
import imageSource from  "../../../../src/Assets/images/page-not-found.jpg";

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">

   <img src = {imageSource} />
			
        </div>
    );
}

export default PageNotFound;
