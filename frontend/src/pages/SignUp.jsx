// import useState from 'react';
import { useNavigate } from "react-router-dom";

function SignUp() {
            const navigate = useNavigate();


    const onSubmit = async (e) => {
        e.preventDefault();
        navigate('/student_list');
    }

    return (
        <div className="h-screen w-screen bg-white flex flex-col items-center justify-center">
            <div className=" bg-gray-400 ">
                <p className="text-2xl">Welcome to Zalk! Enter the information below to get started</p>
                    <div className="">
                        <form className=" flex flex-col items-center justify-center" onSubmit={onSubmit}>
                            <div className=" flex flex-col">
                                <label htmlFor="email" className="">
                                    Email
                                </label>
                                <input className="" type="text" placeholder="email"/>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="username"       >
                                    Username

                                </label>
                                <input type="text" placeholder="username"/>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input type="password" placeholder="password"/>
                            </div>
                            <div className=" flex flex-col">
                                <label htmlFor="confirm-password">
                                    Confirm Password
                                </label>
                                <input type="password" placeholder="confirm password"/>

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
            </div>
        </div>
    );
}

export default SignUp;