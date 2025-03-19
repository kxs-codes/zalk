

const ModeratorManageAccounts = () => {
    const mockAccounts = [
        {
          id: 1,
          type: "Admin",
          name: "Alice Johnson",
          created: "2023-01-15",
          lastLoggedIn: "2024-03-18",
        },
        {
          id: 2,
          type: "User",
          name: "Bob Smith",
          created: "2022-07-22",
          lastLoggedIn: "2024-02-28",
        },
        {
          id: 3,
          type: "User",
          name: "Charlie Davis",
          created: "2023-05-10",
          lastLoggedIn: "2024-03-10",
        },
        {
          id: 4,
          type: "Admin",
          name: "Diana Parker",
          created: "2021-09-05",
          lastLoggedIn: "2024-01-25",
        },
        {
          id: 5,
          type: "Moderator",
          name: "Evan Wright",
          created: "2023-03-30",
          lastLoggedIn: "2024-03-12",
        },
      ];


    return (
        <div className="flex items-center justify-center bg-grey-secondary-lighter-1 w-full h-screen">
            <div className="flex flex-col items-center mt-20 h-4/5 w-9/10 shadow-lg bg-white overflow-y-auto rounded-lg">
                {/* gonna have choose account type, 
                    populate row by row of accounts of that type from mock data,
                    for each row, will be name of account, created, last logged in, delete account btn in red
                 */}
                 <h2>Manage Accounts</h2>
                 <label htmlFor="account-type">Select Account Type</label>
                 <select name="account-type" id="account-type">
                    <option value="student">student</option>
                    <option value="educator">educator</option>
                    <option value="guardian">guardian</option>
                    <option value="advisory">advisory</option>
                 </select>
                 <div>
                    <h2>Available Accounts To Manage</h2>
                    <div>
                        
                    </div>
                 </div>
            </div>
        </div>
    )
}

export default ModeratorManageAccounts;