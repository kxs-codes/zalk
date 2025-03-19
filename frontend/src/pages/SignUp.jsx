import { useNavigate, Link } from "react-router-dom";
import LogoBar from "../components/LogoBar";
import { useState } from "react";
import "../styles/SignUp.css";

const SignUp = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate('/');
    }

    const handleChange = (e) => {
        e.preventDefault();
        setRole(e.target.value);
    }

    return (
        <div className="signup-container">
            <LogoBar />

            <div className="signup-content">
                <div className="signup-image">
                    <img src="/zebra.jpg" alt="zebra" className="signup-zebra" />
                </div>
                <div className="signup-form-container">
                    <p className="signup-header">Welcome to Zalk! Enter the information below to get started!</p>
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="account-type">Account Type</label>
                            <select name="account-type" id="account-type" value={role} onChange={handleChange}>
                                <option value="student">Student</option>
                                <option value="educator">Educator</option>
                                <option value="guardian">Guardian</option>
                                <option value="advisory">Advisory</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter Email Here..." />
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" placeholder="Enter Username Here..." />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" placeholder="•••••••••" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input type="password" id="confirm-password" name="confirm-password" placeholder="•••••••••" />
                        </div>

                        <div>
                            <Link to='/' className="signup-link">Already have an account? Login Here</Link>
                        </div>
                        <button type="submit" className="signup-button">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;