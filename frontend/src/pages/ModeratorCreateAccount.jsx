import { useState } from "react";

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
        <section className="w-full flex flex-col items-center justify-center">
            <h2 className="font-semibold text-2xl">Create Account</h2>

            <div className="w-full flex flex-col items-center justify-center p-2">
                <form className="w-11/12 md:w-8/12 lg:w-7/12 bg-grey-secondary-lighter-1 rounded-lg p-8 my-2" onSubmit={handleSubmit}>
                    <div className="flex flex-col justify-center my-2">
                        <label htmlFor="account-type" className="text-left text-lg font-semibold">Account Type</label>
                        <select name="account-type" id="account-type" className="bg-white rounded-lg py-1" value={formData.accountType} onChange={handleChange}>
                            <option value="student">Student</option>
                            <option value="educator">Educator</option>
                            <option value="guardian">Guardian</option>
                            <option value="advisory">Advisory Member</option>
                        </select>
                    </div>
                    
                    <div className="flex flex-col justify-center my-2">
                        <label htmlFor="email" className="text-left text-lg font-semibold">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter Email Here..." className="bg-white rounded-lg px-2 py-1" value={formData.email} onChange={handleChange} />
                    </div>

                    <div className="flex flex-col justify-center my-2">
                        <label htmlFor="username" className="text-left text-lg font-semibold">Username</label>
                        <input type="text" id="username" name="username" placeholder="Enter Username Here..." className="bg-white rounded-lg px-2 py-1" value={formData.username} onChange={handleChange} />
                    </div>

                    <div className="flex flex-col justify-center my-2">
                        <label htmlFor="password" className="text-left text-lg font-semibold">Password</label>
                        <input type="password" id="password" name="password" placeholder="•••••••••" className="bg-white rounded-lg px-2 py-1" value={formData.password} onChange={handleChange} />
                    </div>

                    <div className="flex flex-col justify-center my-2">
                        <label htmlFor="confirm-password" className="text-left text-lg font-semibold">Confirm Password</label>
                        <input type="password" id="confirm-password" name="confirm-password" placeholder="•••••••••" className="bg-white rounded-lg px-2 py-1" value={formData.confirmPassword} onChange={handleChange}  />
                    </div>
                    <button type="submit" className="bg-dark-red-primary-1 hover:bg-red-primary-3 cursor-pointer text-white p-4 my-2 rounded-full">Sign Up</button>
                </form>
            </div>
        </section>
    )
}

export default ModeratorCreateAccount;