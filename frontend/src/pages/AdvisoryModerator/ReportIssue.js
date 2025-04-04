import { useState } from 'react';

const useReportIssues = () => {
    const [issueTitle, setIssueTitle] = useState('');
    const [issueDescription, setIssueDescription] = useState('');
    const [issueCategory, setIssueCategory] = useState('');
    const [dateOccurred, setDateOccurred] = useState('');
    const [timeOccurred, setTimeOccurred] = useState('');
    const [submitterEmail, setSubmitterEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState('');

    // createReport function to send report data to backend
    const createReport = async (newReport) => {
        try {
            const response = await fetch("http://localhost:8080/api/reports/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newReport),
            });

            if (!response.ok) throw new Error("Failed to create report");

            const createdReport = await response.json();
            console.log("Report created:", createdReport);
            return createdReport;
        } catch (error) {
            console.error("Error creating report:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!issueTitle || !issueDescription || !issueCategory || !dateOccurred || !timeOccurred || !submitterEmail) {
            setFormError('All fields are required.');
            return;
        }

        setFormError('');
        setIsSubmitting(true);

        const newReport = {
            reportName: issueTitle,
            reportDescription: issueDescription,
            category: issueCategory,
            status: "Open",  // Default status when created
            submitterEmail: submitterEmail,
            timeOccurred: `${dateOccurred}T${timeOccurred}:00`, // Format as ISO string
        };

        const createdReport = await createReport(newReport);

        if (createdReport) {
            alert('Issue reported successfully!');
            setIssueTitle('');
            setIssueDescription('');
            setIssueCategory('');
            setDateOccurred('');
            setTimeOccurred('');
            setSubmitterEmail('');
        }

        setIsSubmitting(false);
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
        submitterEmail,
        setSubmitterEmail,
        isSubmitting,
        formError,
        handleSubmit,
    };
};

export default useReportIssues;