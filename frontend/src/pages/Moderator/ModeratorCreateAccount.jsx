import { UserIcon } from "@heroicons/react/24/solid";
import '../../styles/Moderator/ModeratorCreateAccount.css';
import { useModeratorCreateAccount } from "./ModeratorCreateAccountLogic";

const ModeratorCreateAccount = () => {
    const { formData, handleChange, handleSubmit } = useModeratorCreateAccount();

    return (
        <div className="account-container">
            <div className="inner-container">
                <section className="account-section">
                    <h2 className="section-header">
                        <UserIcon className="icon-styling" /> Create User Account
                    </h2>

                    <div className="form-container-styling">
                        <form className="form-tag" onSubmit={handleSubmit}>
                            <div className="input-container">
                                <label htmlFor="account-type">Account Type</label>
                                <select
                                    name="accountType"
                                    id="account-type"
                                    className="select-account"
                                    value={formData.accountType}
                                    onChange={handleChange}
                                >
                                    <option value="student">Student</option>
                                    <option value="educator">Educator</option>
                                    <option value="guardian">Guardian</option>
                                    <option value="advisory">Advisory Member</option>
                                </select>
                            </div>
                            <div className="input-container">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter Email Here..."
                                    className="select-tags"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-container">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Enter Username Here..."
                                    className="select-tags"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-container">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="•••••••••"
                                    className="select-tags"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-container">
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    name="confirmPassword"
                                    placeholder="•••••••••"
                                    className="select-tags"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit" className="button-styling">Sign Up</button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ModeratorCreateAccount;