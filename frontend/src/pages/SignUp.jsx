// import useState from 'react';
import { useNavigate, Link } from "react-router-dom";
import LogoBar from "../components/LogoBar";

const SignUp = () => {
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        navigate('/student_list');
    }

    return (
        <div className="mt-30 md:mt-5 lg:mt-5 w-screen h-screen flex flex-col items-center justify-center">
            <LogoBar/>

            <div className="w-11/12 bg-gray-400 flex flex-col-reverse md:flex-row items-center rounded-3xl mt-30">
                <div className="w-2/4 md:w-2/5 lg:w-1/4">
                    <img src="/zebra.jpg" alt="zebra" className="w-full p-8 rounded-full scale-x-[-1]" />
                </div>
                <div className="w-7/8 md:w-3/5 lg:w-3/4 flex flex-col items-center justify-center p-2">
                    <p className="font-bold text-xl">Welcome to Zalk! Enter the information below to get started!</p>
                    <form className="w-11/12 md:w-8/12 lg:w-1/2 bg-grey-secondary-lighter-1 rounded-lg p-8 my-2">
                        <div className="flex flex-col justify-center my-2">
                            <label htmlFor="account-type" className="text-left text-lg font-semibold">Account Type</label>
                            <select name="account-type" id="account-type" className="bg-white rounded-lg py-1">
                                <option value="student">Student</option>
                                <option value="educator">Educator</option>
                                <option value="guardian">Guardian</option>
                            </select>
                        </div>
                        
                        <div className="flex flex-col justify-center my-2">
                            <label htmlFor="email" className="text-left text-lg font-semibold">Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter Email Here..." className="bg-white rounded-lg px-2 py-1" />
                        </div>

                        <div className="flex flex-col justify-center my-2">
                            <label htmlFor="username" className="text-left text-lg font-semibold">Username</label>
                            <input type="text" id="username" name="username" placeholder="Enter Username Here..." className="bg-white rounded-lg px-2 py-1" />
                        </div>

                        <div className="flex flex-col justify-center my-2">
                            <label htmlFor="password" className="text-left text-lg font-semibold">Password</label>
                            <input type="password" id="password" name="password" placeholder="•••••••••" className="bg-white rounded-lg px-2 py-1" />
                        </div>

                        <div className="flex flex-col justify-center my-2">
                            <label htmlFor="confirm-password" className="text-left text-lg font-semibold">Confirm Password</label>
                            <input type="password" id="confirm-password" name="confirm-password" placeholder="•••••••••" className="bg-white rounded-lg px-2 py-1"  />
                        </div>

                        <div>
                            <Link to='/' className="hover:underline">Already have an account? Login Here</Link>
                        </div>
                        <button type="submit" className="bg-dark-red-primary-1 text-white p-4 my-2 rounded-full">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;