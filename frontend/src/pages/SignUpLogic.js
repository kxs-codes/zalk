import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// TODO: Reintroduce jwtDecode for token decoding in the future
import { useAuth } from "../components/AuthProvider";

const useSignUp = () => {
    // Use the navigate hook to programmatically navigate to different pages
    const navigate = useNavigate();

    // Access the setToken function from the AuthProvider context
    const { setToken } = useAuth();

    // State to hold form data, initialized with empty values
    const [formData, setFormData] = useState({
        accountType: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    // Handle input changes and update corresponding formData fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,  // Copy the existing formData
            [name]: value  // Update the field that was changed
        }));
    };

    // Function to create an account by making a POST request to the backend
    const createAccount = async () => {
        try {
            // Make a POST request with formData as JSON in the body
            const response = await fetch("http://localhost:8080/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" // Specify content type as JSON
                },
                body: JSON.stringify(formData)  // Send form data as a JSON string
            });

            // Parse the response to JSON
            const data = await response.json();

            // Check if the response contains a success message
            if (data.message) {
                // If the message indicates success, show a success toast
                if (data.message.includes("successfully")) {
                    toast.success(data.message, { position: 'top-right' });
                    return { success: true, message: data.message };
                } else {
                    // If the message indicates failure, show an error toast
                    toast.error(data.message, { position: 'top-right' });
                    return { success: false, message: data.message };
                }
            }

            // Return an error if the response format is unexpected
            return { success: false, message: "Unexpected response format." };
        } catch (error) {
            // Handle errors that occur during the request
            console.error("Error creating account:", error);
            toast.error("An error occurred. Please try again.", { position: 'top-right' });
            return { success: false, message: "An error occurred." };
        }
        console.log("Sending signup data:", formData);  // Log form data to the console (optional for debugging)
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match", { position: 'top-right' });
            return;  // Prevent form submission if passwords don't match
        }

        // Call createAccount and handle the response
        const data = await createAccount();

        // If account creation is successful, show a success toast and navigate to the login page
        if (data.success) {
            toast.success("Account created! Redirecting to login...", { position: 'top-right' });
            setTimeout(() => {
                navigate('/');  // Redirect to login page after a 2-second delay
            }, 2000); // Delay the redirect to allow the success toast to display
        }
    };

    // Return form data, handleChange, and handleSubmit so they can be used in the component
    return {
        formData,
        handleChange,
        handleSubmit
    };
};

export default useSignUp;