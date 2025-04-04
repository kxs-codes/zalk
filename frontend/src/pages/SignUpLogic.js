import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from 'jwt-decode';
import { useAuth } from "../components/AuthProvider";

const useSignUp = () => {
    const navigate = useNavigate();
    const { setToken } = useAuth();

    const [formData, setFormData] = useState({
        accountType: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const createAccount = async () => {
        const response = await fetch("http://localhost:8080/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"  
            },
            body: JSON.stringify({
                accountType: formData.accountType,
                email: formData.email,
                username: formData.username,
                password: formData.password,
                confirmPassword: formData.confirmPassword
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
  
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Send account creation info to backend
        const data = await createAccount();

        // 2. If success, setToken in state var and localStorage. Else, toast message
        if (data.token && data.token !== null) {
            navigate('/portal');
        } else {
            toast.error(data.message, {position: 'top-right'})
        }
    };
    
    return {
        formData,
        handleChange,
        handleSubmit
    }
}

export default useSignUp;