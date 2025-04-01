import { Link } from 'react-router-dom';
import { useSettingsButton } from './SettingsButtonLogic';

function SettingsButton() {
    const { buttonText } = useSettingsButton();

    return (
        <Link to="/settings">
            <button className="bg-blue-500 text-white p-2 rounded">
                {buttonText}
            </button>
        </Link>
    );
}

export default SettingsButton;
