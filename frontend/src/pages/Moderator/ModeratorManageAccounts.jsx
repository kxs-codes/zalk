import '../../styles/Moderator/ModeratorManageAccounts.css';
import { useModeratorManageAccounts } from "./ModeratorManageAccountsLogic";

const ModeratorManageAccounts = () => {
    const { selectValue, handleChange, filteredAccounts } = useModeratorManageAccounts();

    return (
        <div className="flex items-center justify-center bg-grey-secondary-lighter-1 w-full h-screen">
            <div className="flex flex-col items-center mt-20 h-4/5 w-9/10 shadow-lg bg-white overflow-y-auto rounded-lg">
                <h2 className="header-style">Manage Accounts</h2>
                <div className="select-account-container">
                    <label htmlFor="account-type">Select Account Type</label>
                    <select
                        name="account-type"
                        id="account-type"
                        value={selectValue}
                        onChange={handleChange}
                    >
                        <option value="">Select an Option</option>
                        <option value="student">Student</option>
                        <option value="educator">Educator</option>
                        <option value="guardian">Guardian</option>
                        <option value="advisory">Advisory</option>
                    </select>
                </div>
                {/* TODO: Need to add a Are you sure toast message when deleting an account */}
                <div className="accounts-list">
                    <h2 className="header-list">Available Accounts To Manage</h2>
                    {selectValue &&
                        filteredAccounts.map((account) => (
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
    );
};

export default ModeratorManageAccounts;