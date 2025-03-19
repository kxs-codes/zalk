import { useState } from "react";
import '../../styles/Moderator/ModeratorManageAccounts.css';

const ModeratorManageAccounts = () => {
    const mockAccounts = [
        {
          id: 1,
          type: "Guardian",
          name: "Alice Johnson",
          created: "2023-01-15",
          lastLoggedIn: "2024-03-18",
        },
        {
          id: 2,
          type: "Student",
          name: "Bob Smith",
          created: "2022-07-22",
          lastLoggedIn: "2024-02-28",
        },
        {
          id: 3,
          type: "Student",
          name: "Charlie Davis",
          created: "2023-05-10",
          lastLoggedIn: "2024-03-10",
        },
        {
          id: 4,
          type: "Educator",
          name: "Diana Parker",
          created: "2021-09-05",
          lastLoggedIn: "2024-01-25",
        },
        {
          id: 5,
          type: "Advisory",
          name: "Evan Wright",
          created: "2023-03-30",
          lastLoggedIn: "2024-03-12",
        },
      ];

    const [selectValue, setSelectValue] = useState('');
    
    const handleChange = (e) => {
        setSelectValue(e.target.value);
        console.log(e.target.value);
    }


    return (
        <div className="flex items-center justify-center bg-grey-secondary-lighter-1 w-full h-screen">
            <div className="flex flex-col items-center mt-20 h-4/5 w-9/10 shadow-lg bg-white overflow-y-auto rounded-lg">
            <h2 className="header-style">Manage Accounts</h2>
                 <div className="select-account-container">
                    <label htmlFor="account-type">Select Account Type</label>
                    <select name="account-type" id="account-type" value={selectValue} onChange={handleChange}>
                        <option value="">Select an Option</option>
                        <option value="student">Student</option>
                        <option value="educator">Educator</option>
                        <option value="guardian">Guardian</option>
                        <option value="advisory">Advisory</option>
                    </select>
                 </div>

                <div className="accounts-list">
                    <h2 className="header-list">Available Accounts To Manage</h2>
                    {selectValue && mockAccounts
                        .filter((account) => account.type.toLowerCase() === selectValue.toLowerCase())
                        .map((account) => (
                            <div key={account.id} className="account-card">
                                <div>
                                    <p><strong>{account.name}</strong></p>
                                    <p>Created: {account.created}</p>
                                    <p>Last Logged In: {account.lastLoggedIn}</p>
                                </div>
                                <button>Delete Account</button>
                            </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default ModeratorManageAccounts;