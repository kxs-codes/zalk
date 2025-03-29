import React from "react";
import useSettings from "./SettingsLogic.js"; 
import '../styles/Settings.css'

function Settings() {
    const {
        activeTab,
        setActiveTab,
        bgMusicVolume,
        setBgMusicVolume,
        sfxVolume,
        setSfxVolume,
        dyslexiaFont,
        setDyslexiaFont,
        closedCaptions,
        setClosedCaptions,
        isDarkMode,
        setDarkMode,
        isMinimizedView,
    } = useSettings();

    return (
        <div className="settings-container">
            <div className="toolbar">
                <button onClick={() => window.history.back()} className="back-button">Back</button>
                <h1 className="title">Settings</h1>
            </div>

            <div className={`sidebar ${isMinimizedView ? "minimized" : "expanded"}`}>
                <div className="sidebar-menu">
                    <ul>
                        {["appearance", "audio", "accessibility"].map((tab) => (
                            <li
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`tab ${activeTab === tab ? "active" : ""}`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="main-content">
                    {activeTab === "appearance" && (
                        <div className="settings-section">
                            <h2 className="section-title">Appearance</h2>
                            <div className="divider"></div>
                            <label className="setting-label">
                                <span>Dark Mode</span>
                                <input
                                    type="checkbox"
                                    className="toggle"
                                    checked={isDarkMode}
                                    onChange={() => setDarkMode(!isDarkMode)}
                                />
                            </label>
                        </div>
                    )}

                    {activeTab === "audio" && (
                        <div className="settings-section">
                            <h2 className="section-title">Audio</h2>
                            <div className="divider"></div>
                            <div className="slider-container">
                                <span>Background Music</span>
                                <input
                                    type="range"
                                    className="slider"
                                    min="0"
                                    max="100"
                                    value={bgMusicVolume}
                                    onChange={(e) => setBgMusicVolume(Number(e.target.value))}
                                />
                                <span>{bgMusicVolume}</span>
                            </div>
                            <div className="slider-container">
                                <span>Sound Effects</span>
                                <input
                                    type="range"
                                    className="slider"
                                    min="0"
                                    max="100"
                                    value={sfxVolume}
                                    onChange={(e) => setSfxVolume(Number(e.target.value))}
                                />
                                <span>{sfxVolume}</span>
                            </div>
                        </div>
                    )}

                    {activeTab === "accessibility" && (
                        <div className="settings-section">
                            <h2 className="section-title">Accessibility</h2>
                            <div className="divider"></div>
                            <label className="setting-label">
                                <span>Dyslexia Font</span>
                                <input
                                    type="checkbox"
                                    className="toggle"
                                    checked={dyslexiaFont}
                                    onChange={() => setDyslexiaFont(!dyslexiaFont)}
                                />
                            </label>
                            <label className="setting-label">
                                <span>Closed Captions</span>
                                <input
                                    type="checkbox"
                                    className="toggle"
                                    checked={closedCaptions}
                                    onChange={() => setClosedCaptions(!closedCaptions)}
                                />
                            </label>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Settings;
