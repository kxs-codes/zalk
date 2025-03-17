// import useState from 'react';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        navigate('/student_list');
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <div className="w-screen flex items-center fixed top-0 left-0 bg-red-primary-3 text-white">
                <p className="bg-dark-red-primary-1 w-3/4 py-3 pl-5 rounded-r-full text-left font-bold text-3xl md:text-4xl lg:text-5xl">Zebra Advanced Learning and Knowledge</p>
            </div>

            <div className="w-11/12 h-10/12 bg-gray-400 flex flex-row items-center rounded-3xl mt-20 border-2 border-red-500">
                <div className="w-2/4 md:w-2/5 lg:w-1/4">
                    <img src="/zebra.webp" alt="zebra" className="p-8 rounded-lg overflow-hidden" />
                </div>
                <div className="w-2/4 md:w-3/5 lg:w-3/4 flex flex-col items-center justify-center">
                    <p className="font-bold text-xl">Welcome to Zalk! Enter the information below to get started!</p>
                    <form className="border-2 border-red-500 w-11/12 md:w-8/12 lg:w-1/2 bg-grey-secondary-lighter-1 rounded-lg p-8 my-2">
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
                        <div className="flex flex-col justify-center my-2">
                            <label htmlFor="account-type" className="text-left text-lg font-semibold">Account Type</label>
                            <select name="account-type" id="account-type" className="bg-white rounded-lg py-1">
                                <option value="student">Student</option>
                                <option value="educator">Educator</option>
                                <option value="guardian">Guardian</option>
                            </select>
                        </div>
                        <button type="submit" className="bg-dark-red-primary-1 text-white p-4 my-2 rounded-full">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
        // <div className="h-screen w-screen bg-white flex flex-col items-center justify-center">
        //     <div className="bg-gray-400">
        //         <p className="text-2xl">Welcome to Zalk! Enter the information below to get started</p>
                
        //             <div className="">
        //                 <form className=" flex flex-col items-center justify-center" onSubmit={onSubmit}>
        //                     <div className=" flex flex-col">
        //                         <label htmlFor="email" className="">
        //                             Email
        //                         </label>
        //                         <input className="" type="text" placeholder="email"/>
        //                     </div>
        //                     <div className="flex flex-col">
        //                         <label htmlFor="username"       >
        //                             Username

        //                         </label>
        //                         <input type="text" placeholder="username"/>
        //                     </div>
        //                     <div className="flex flex-col">
        //                         <label htmlFor="password">
        //                             Password
        //                         </label>
        //                         <input type="password" placeholder="password"/>
        //                     </div>
        //                     <div className=" flex flex-col">
        //                         <label htmlFor="confirm-password">
        //                             Confirm Password
        //                         </label>
        //                         <input type="password" placeholder="confirm password"/>

        //                     </div>
        //                     <div className="">
        //                         <label htmlFor="account-dropdown-">
        //                             Account Type
        //                         </label>
        //                         <select>
        //                             <option value="student">Student</option>
        //                             <option value="educator">Educator</option>
        //                             <option value="guardian">Guardian</option>
        //                         </select>
        //                     </div>
        //                     <button type="submit">Sign Up</button>
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
    );
}

export default SignUp;