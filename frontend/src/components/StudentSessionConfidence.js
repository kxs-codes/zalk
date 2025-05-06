import { useState, useEffect, useRef } from "react";
import { toast } from 'react-toastify';

const useStudentSessionConfidence = (userId, setStudentZLO) => {
    const [rangeValue, setRangeValue] = useState(0.50);
    const dialogRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        buttonRef.current?.focus();
    }, []);

    useEffect(() => {
        dialogRef.current?.showModal();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/sessions/submit-confidence?userId=${userId}&confidence=${rangeValue}`,
                {
                    method: "POST"
                }
            );
            const json = await response.json();

            console.log("Response from confidence submission: ", json.response);

            setStudentZLO(json.zloRating);
            dialogRef.current?.close();
   
        } catch (error) {
            console.error("Error submitting confidence:", error);
            toast.error("Error submitting confidence:", error);
        }
    };

    return {
        rangeValue, dialogRef, buttonRef, setRangeValue, handleSubmit
    };
};

export default useStudentSessionConfidence;
