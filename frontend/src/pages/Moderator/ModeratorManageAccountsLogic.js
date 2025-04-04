import { useState } from "react";

export const useModeratorManageAccounts = () => {
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