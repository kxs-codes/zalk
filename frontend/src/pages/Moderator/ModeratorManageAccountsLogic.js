import { useState } from "react";

export const useModeratorManageAccounts = () => {

    // 1. On change of a value, grab all accounts of that type
    // 2. Save in a state variable filteredAccounts

    const [selectValue, setSelectValue] = useState('');
    const [filteredAccounts, setFilteredAccounts] = useState([]);

    const fetchAccounts = async (accountType) => {
        const response = await fetch(`http://localhost:8080/api/moderator/grab-accounts?accountType=${accountType}`);
        const data = await response.json();
        setFilteredAccounts(data);
    }

    const handleChange = (e) => {
        const accountType = e.target.value;
        setSelectValue(accountType);
        fetchAccounts(accountType)
        console.log(accountType);
    };

    const handleDeletion = async (id, accountType) => {
        console.log("id: ", id, "  type: ", accountType);
        const response = await fetch(`http://localhost:8080/api/moderator/delete-account?id=${id}&accountType=${accountType}`, {
            method: "POST",
        })
        const data = await response.text();

        if (data.includes("Successfully")) {
            setFilteredAccounts((prev) => {
                return prev.filter(account => account.id !== id);
            });
        }

        console.log("Data: ", data);
    }

    return {
        selectValue,
        filteredAccounts,
        handleChange,
        handleDeletion
    };
};