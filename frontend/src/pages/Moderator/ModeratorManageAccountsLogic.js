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

    const [selectValue, setSelectValue] = useState('');

    const handleChange = (e) => {
        setSelectValue(e.target.value);
        console.log(e.target.value);
    };

    const filteredAccounts = mockAccounts.filter(
        (account) => account.type.toLowerCase() === selectValue.toLowerCase()
    );

    return {
        selectValue,
        handleChange,
        filteredAccounts,
    };
};