import { useState } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import '../../styles/Moderator/ModeratorCreateAccount.css';

const ModeratorCreateAccount = () => {
    const [formData, setFormData] = useState({
        accountType: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    }
    const handleSubmit = (e) => {
        e.preventdefault();

        // TODO: send to backend (Backend Deadline)
    }
    return (
        <div className="account-container">
            <div className="inner-container">
                <section className="account-section">
                    <h2 className="section-header"><UserIcon className="icon-styling"/> Create User Account</h2>

                    <div className="form-container-styling">
                        <form className="form-tag" onSubmit={handleSubmit}>
                            <div className="input-container">
                                <label htmlFor="account-type">Account Type</label>
                                <select name="account-type" id="account-type" className="select-account" value={formData.accountType} onChange={handleChange}>
                                    <option value="student">Student</option>
                                    <option value="educator">Educator</option>
                                    <option value="guardian">Guardian</option>
                                    <option value="advisory">Advisory Member</option>
                                </select>
                            </div>                            
                            <div className="input-container">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="Enter Email Here..." className="select-tags" value={formData.email} onChange={handleChange} />
                            </div>

                            <div className="input-container">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" name="username" placeholder="Enter Username Here..." className="select-tags" value={formData.username} onChange={handleChange} />
                            </div>

                            <div className="input-container">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" placeholder="•••••••••" className="select-tags" value={formData.password} onChange={handleChange} />
                            </div>

                            <div className="input-container">
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <input type="password" id="confirm-password" name="confirm-password" placeholder="•••••••••" className="select-tags" value={formData.confirmPassword} onChange={handleChange}  />
                            </div>
                            <button type="submit" className="button-styling">Sign Up</button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ModeratorCreateAccount;