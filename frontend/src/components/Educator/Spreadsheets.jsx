import { useState } from 'react';
import { toast } from 'react-toastify';

const useSpreadsheetLogic = () => {
    const [loading, setLoading] = useState(false);

    const downloadSpreadsheet = async (type, id) => {
        setLoading(true);
        try {
            let url = '';
            if (type === 'student') {
                url = `/api/spreadsheet/student/${id}`;
            } else if (type === 'classroom') {
                url = `/api/spreadsheet/classroom/${id}`;
            } else {
                throw new Error('Invalid spreadsheet type');
            }

            console.log('Fetching URL:', url);

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to download spreadsheet');
            }

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', `${type}_spreadsheet.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.success('Spreadsheet downloaded successfully!');
        } catch (error) {
            console.error('Error downloading spreadsheet:', error);
            toast.error('Failed to download spreadsheet.');
        } finally {
            setLoading(false);
        }
    };

    return {
        downloadSpreadsheet,
        loading
    };
};

export default useSpreadsheetLogic;
