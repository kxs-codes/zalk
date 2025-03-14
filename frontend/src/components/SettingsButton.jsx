import { Link } from 'react-router-dom';

function SettingsButton() {
    return (
        <Link to="/settings">
            <button className="bg-blue-500 text-white p-2 rounded">
                Go to Settings
            </button>
        </Link>
    );
}

export default SettingsButton;
