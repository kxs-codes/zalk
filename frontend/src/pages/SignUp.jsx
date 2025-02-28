// import useState from 'react';
import { useNavigate } from "react-router-dom";

function SignUp() {
            const navigate = useNavigate();


    const onSubmit = async (e) => {
        e.preventDefault();
        navigate('/student_list');
    }

    return (
            <div className="">
            <p className="text-2xl">Welcome to Zalk! Enter the information below to get started</p>
            <form className="mt-8" onSubmit={onSubmit}>
                <div className="">
                    <label htmlFor="email" className="">
                        Email
                    </label>
                    <input className="" type="text" placeholder="email"/>
                </div>
                <div className="">
                    <label htmlFor="username">
                        Username

                    </label>
                    <input type="text" placeholder="username"/>
                </div>
                <div className="">
                    <label htmlFor="password">
                        Password
                        <input type="password" placeholder="password"/>
                    </label>
                </div>
                <div className="">
                    <label htmlFor="confirm-password">
                        Confirm Password
                        <input type="password" placeholder="confirm password"/>
                    </label>
                </div>
                <div className="">
                    <label htmlFor="account-dropdown-">
                        Account Type
                    </label>
                    <select>
                        <option value="student">Student</option>
                        <option value="educator">Educator</option>
                        <option value="guardian">Guardian</option>
                    </select>
                </div>
                <button type="submit">Sign Up</button>
            </form>
            </div>
                );
}

export default SignUp;