import '../../styles/Moderator/ModeratorManageAccounts.css';
import { useModeratorManageAccounts } from "./ModeratorManageAccountsLogic";

const ModeratorManageAccounts = () => {
    const { selectValue, filteredAccounts, handleChange, handleDeletion } = useModeratorManageAccounts();

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
                        <option value="advisory_board">Advisory</option>
                    </select>
                </div>
                <div className="accounts-list">
                    <h2 className="header-list">Available Accounts To Manage</h2>
                    {selectValue && (
                        <table className="accounts-table">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAccounts.map((account) => (
                                    <tr key={account.id}>
                                        <td>{account.username}</td>
                                        <td>
                                            <button onClick={() => handleDeletion(account.id, selectValue)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModeratorManageAccounts;