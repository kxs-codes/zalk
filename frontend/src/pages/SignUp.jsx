import {  Link } from "react-router-dom";
import LogoBar from "../components/LogoBar";
import "../styles/SignUp.css";
import useSignUp from "./SignUpLogic";

const SignUp = () => {
    const {formData, handleChange, handleSubmit} = useSignUp();

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
                            <select name="accountType" id="account-type" value={formData.accountType} onChange={handleChange}>
                                <option value="" disabled>Select Account Type</option>
                                <option value="student">Student</option>
                                <option value="educator">Educator</option>
                                <option value="guardian">Guardian</option>
                                <option value="advisory_board">Advisory</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email Here..." />
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username"value={formData.username} onChange={handleChange} placeholder="Enter Username Here..." />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password"value={formData.password} onChange={handleChange} placeholder="•••••••••" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input type="password" id="confirm-password" name="confirmPassword"value={formData.confirmPassword} onChange={handleChange} placeholder="•••••••••" />
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