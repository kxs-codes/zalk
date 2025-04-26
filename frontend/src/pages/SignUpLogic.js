import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// TODO: Reintroduce jwtDecode for token decoding in the future
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
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const createAccount = async () => {
        try {
            const response = await fetch("http://localhost:8080/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.token) {
                // TODO: Decode the token using jwtDecode and store it in localStorage
                localStorage.setItem("accessToken", data.token);
                setToken(data.token);
            }

            return data;
        } catch (error) {
            console.error("Error creating account:", error);
            toast.error("An error occurred. Please try again.", { position: 'top-right' });
            return { token: null, message: "An error occurred." };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await createAccount();

        if (data.token) {
            navigate('/portal');
        } else {
            toast.error(data.message, { position: 'top-right' });
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit
    };
};

export default useSignUp;