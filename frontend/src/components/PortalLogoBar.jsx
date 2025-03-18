import React from 'react';
import '../styles/PortalLogoBar.css';

const PortalLogoBar = () => {
  // TODO: Implement dynamic Title, username, and user image once available
  return (
    <div className="portal-logo-bar">
      <p className="portal-logo-bar-title">
        ZALK: Advanced Learning and Knowledge
      </p>
      <div className="portal-logo-bar-userinfo">
        <p className="user-title">Title</p>
        <p className="user-name">Username</p>
        <div className="profile-placeholder"></div>
      </div>
    </div>
  );
};

export default PortalLogoBar;
