import React from 'react';
import '../styles/LogoBar.css';
import { useLogoBar } from './LogoBarLogic';
const LogoBar = () => {
    const { logoText } = useLogoBar();

    return (
        <div className="logo-bar">
            <p>{logoText}</p>
        </div>
    );
};

export default LogoBar;
