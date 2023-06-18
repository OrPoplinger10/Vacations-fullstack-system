import Header from "../Header/Header";
import Routing from "../Routing/Routing";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
			
            <Header />

            <Routing />
            
        </div>
    );
}

export default Layout;
