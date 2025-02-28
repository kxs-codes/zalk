// import useState from 'react';
import { useNavigate } from "react-router-dom";

function SignUp() {
    {/* Declaration of function */}
    const navigate = useNavigate();


    const onSubmit = async (e) => {
        e.preventDefault();
        navigate('/student_list');
    }

    return (
        <>
            <div className="" onSubmit={onSubmit}>
            <p className="text-2xl">Welcome to Zalk! Enter the information below to get started</p>
            <form className="mt-8">
                <div className="">
                    <label className="">
                        Email
                    </label>
                    <input className="" type="text" placeholder="email"/>
                </div>
                <div className="" id={"username"}>
                    <label>
                        Username

                    </label>
                    <input type="text" placeholder="username"/>
                </div>
                <div className="" id={"password"}>
                    <label>
                        Password
                        <input type="password" placeholder="password"/>
                    </label>
                </div>
                <div className="" id={"confirmPassword"}>
                    <label>
                        Confirm Password
                        <input type="password" placeholder="confirm password"/>
                    </label>
                </div>
                <div className="" id={"Account-Type-Dropdown"}>
                    <label>
                        Account Type
                    </label>
                    <select>
                        <option value="student">Student</option>
                        <option value="educator">Educator</option>
                    </select>
                </div>
                <button type="submit">Sign Up</button>
            </form>
            </div>
        </>
    );
}

export default SignUp;