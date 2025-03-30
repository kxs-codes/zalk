// ReportIssues.jsx
import '../../styles/AdvisoryModerator/pages/ReportIssues.css';
import useReportIssues from './ReportIssue.js';

const ReportIssues = () => {
    const {
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
    } = useReportIssues();

    return (
        <div className="report-issues-container">
            <div className="report-issues-form-container">
                <h2 className="report-title">Report an Issue</h2>

                {formError && <div className="error-message">{formError}</div>}

                <form onSubmit={handleSubmit} className="report-form">
                    <div className="form-group">
                        <label htmlFor="issueTitle">Issue Title</label>
                        <input
                            type="text"
                            id="issueTitle"
                            value={issueTitle}
                            onChange={(e) => setIssueTitle(e.target.value)}
                            placeholder="Enter the title of your report"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="issueCategory">Issue Category</label>
                        <select
                            id="issueCategory"
                            value={issueCategory}
                            onChange={(e) => setIssueCategory(e.target.value)}
                            required
                        >
                            <option value="">Select a category</option>
                            <option value="Bug">Bug</option>
                            <option value="Feature Request">Feature Request</option>
                            <option value="UI/UX Issue">UI/UX Issue</option>
                            <option value="Performance Issue">Performance Issue</option>
                        </select>
                    </div>

                    <div className="date-time-group">
                        <label htmlFor="dateOccurred">Date Occurred</label>
                        <input
                            type="date"
                            id="dateOccurred"
                            value={dateOccurred}
                            onChange={(e) => setDateOccurred(e.target.value)}
                            className="date-time-input"
                            required
                        />
                    </div>

                    <div className="date-time-group">
                        <label htmlFor="timeOccurred">Time Occurred</label>
                        <input
                            type="time"
                            id="timeOccurred"
                            value={timeOccurred}
                            onChange={(e) => setTimeOccurred(e.target.value)}
                            className="date-time-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="issueDescription">Issue Description</label>
                        <textarea
                            id="issueDescription"
                            value={issueDescription}
                            onChange={(e) => setIssueDescription(e.target.value)}
                            rows="5"
                            placeholder="Describe your report..."
                            required
                        />
                    </div>

                    <div className="submit-container">
                        <button type="submit" className="submit-button" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit Issue'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportIssues;
