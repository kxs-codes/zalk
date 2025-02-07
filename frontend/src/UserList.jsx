import {useEffect, useState } from "react";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("http://localhost:8080/api/users");
            const data = await response.json();
            setUsers(data);
            console.log(response);
            console.log(data);
        }
        fetchUsers();
    }, [])

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.description}</li>
                ))}
            </ul>
            <div>
                <form action="http://localhost:8080/api/users" method="POST">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" placeholder="username" required/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default UserList;