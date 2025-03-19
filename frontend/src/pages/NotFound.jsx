import { Link } from "react-router-dom";
import '../styles/NotFound.css';  // Import the CSS file

const NotFound = () => {
    return(
        <div className="not-found-container">
            <h1 className="not-found-title">404 Page Not Found</h1>
            <div className="not-found-box">
                <p className="mb-2">Oops, looks like you've ventured into the savannah! Here's a link to login to get you back on track so you don't get eaten by lions!</p>
                <Link to='/' className="not-found-link">Login</Link>
            </div>
        </div>
    );
}

export default NotFound;