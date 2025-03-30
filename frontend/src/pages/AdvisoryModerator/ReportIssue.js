// useReportIssues.js
import { useState } from 'react';

const useReportIssues = () => {
    const [issueTitle, setIssueTitle] = useState('');
    const [issueDescription, setIssueDescription] = useState('');
    const [issueCategory, setIssueCategory] = useState('');
    const [dateOccurred, setDateOccurred] = useState('');
    const [timeOccurred, setTimeOccurred] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!issueTitle || !issueDescription || !issueCategory || !dateOccurred || !timeOccurred) {
            setFormError('All fields are required.');
            return;
        }

        setFormError('');
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            alert('Issue reported successfully!');
            setIssueTitle('');
            setIssueDescription('');
            setIssueCategory('');
            setDateOccurred('');
            setTimeOccurred('');
        }, 1000);
    };

    return {
        issueTitle,
        setIssueTitle,
        issueDescription,
        setIssueDescription,
        issueCategory,
        setIssueCategory,
        dateOccurred,
        setDateOccurred,
        timeOccurred,
        setTimeOccurred,
        isSubmitting,
        formError,
        handleSubmit,
    };
};

export default useReportIssues;
