import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from 'jwt-decode';
import { useAuth } from "../components/AuthProvider";

const useLogin = () => {
    const navigate = useNavigate();
    const { setToken } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accountType, setAccountType] = useState('');

    const authenticate = async () => {
        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"  
            },
            body: JSON.stringify({
                username: username,
                password: password,
                accountType: accountType
            })
        });

        const data = await response.json();

        // Check token contents
        if (data.token) {
            const decodedJwt = jwtDecode(data.token);
            console.log("decoded jwt: ", decodedJwt);

            // Set in the browser
            localStorage.removeItem("accessToken");
            localStorage.setItem("accessToken", JSON.stringify(decodedJwt));
            setToken(decodedJwt);
        } 

        return data;
    }
  
    const onSubmit = async (e) => {
        e.preventDefault();

        // 1. Send username, password, and account type to the backend auth endpoint
        const data = await authenticate();

        // 2. Navigate to portal or return error based on authentication response from backend
        if (data.token && data.token !== null) {
            navigate('/portal');
        } else {
            toast.error(data.message, {position: 'top-right'})
        }
    };
    
    return {
        username,
        setUsername,
        password,
        setPassword,
        accountType,
        setAccountType,
        onSubmit
    }
}

export default useLogin;