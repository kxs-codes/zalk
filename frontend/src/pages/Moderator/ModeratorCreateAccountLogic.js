import { useState } from "react";

export const useModeratorCreateAccount = () => {
    const [formData, setFormData] = useState({
        accountType: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return { formData, handleChange, handleSubmit };
};