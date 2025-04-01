import React from 'react';
import '../styles/PortalLogoBar.css';
import { usePortalLogoBar } from './PortalLogoBarLogic';

const PortalLogoBar = () => {
    const { title, userInfo } = usePortalLogoBar();

    return (
        <div className="portal-logo-bar">
            <p className="portal-logo-bar-title">{title}</p>
            <div className="portal-logo-bar-userinfo">
                <p className="user-title">{userInfo.userTitle}</p>
                <p className="user-name">{userInfo.userName}</p>
                {userInfo.profileImage ? (
                    <img
                        src={userInfo.profileImage}
                        alt="User Profile"
                        className="profile-image"
                    />
                ) : (
                    <div className="profile-placeholder"></div>
                )}
            </div>
        </div>
    );
};

export default PortalLogoBar;
