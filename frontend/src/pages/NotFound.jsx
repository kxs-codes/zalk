import { Link } from "react-router-dom";
import '../styles/NotFound.css';  
import useNotFoundLogic from "./NotFoundLogic";

const NotFound = () => {
    const { getRedirectLink } = useNotFoundLogic();

    return(
        <div className="not-found-container">
            <h1 className="not-found-title">404 Page Not Found</h1>
            <div className="not-found-box">
                <p className="mb-2">
                    Oops, looks like you've ventured into the savannah! Here's a link to login to 
                    get you back on track so you don't get eaten by lions!</p>
                <Link to={getRedirectLink()} className="not-found-link">Login</Link>
            </div>
        </div>
    );
}

export default NotFound;