import { useState, useEffect } from "react";
import "../styles/Settings.css"; // Import the corresponding CSS file

function Settings() {
    const [activeTab, setActiveTab] = useState("appearance");
    const [bgMusicVolume, setBgMusicVolume] = useState(50); // Background music volume state
    const [sfxVolume, setSfxVolume] = useState(50); // Sound effects volume state
    const [dyslexiaFont, setDyslexiaFont] = useState(false); // Toggle for dyslexia font
    const [closedCaptions, setClosedCaptions] = useState(false); // Toggle for closed captions
    const [isDarkMode, setDarkMode] = useState(false); // State for Dark mode
    const [isMinimizedView, setIsMinimizedView] = useState(window.innerWidth < 768);

    // Effect that updates isMinimizedView when the window is resized
    useEffect(() => {
        const resizeHandler = () => {
            setIsMinimizedView(window.innerWidth < 768);
        };
        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    return (
        <div className="settings-container">
            {/* Toolbar at the top of the page */}
            <div className="toolbar">
                {/* Button to navigate to previous page */}
                <button
                    onClick={() => window.history.back()}
                    className="back-button"
                >Back</button>
                <h1 className="title">Settings</h1>
            </div>

            {/* Sidebar on the left side of the screen */}
            <div className={`sidebar ${isMinimizedView ? "minimized" : "expanded"}`}>
                <div className="sidebar-menu">
                    <ul>
                        {["appearance", "audio", "accessibility"].map((tab) => (
                            <li
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`tab ${activeTab === tab ? 'active' : ''}`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main settings that will be changed on the right side of the screen */}
                <div className="main-content">
                    {/* Tab for the appearance setting */}
                    {activeTab === "appearance" && (
                        <div className="settings-section">
                            <h2 className="section-title">Appearance</h2>
                            <div className="divider"></div>
                            {/* Dark Mode Toggle */}
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

                    {/* Tab for Audio Settings */}
                    {activeTab === "audio" && (
                        <div className="settings-section">
                            <h2 className="section-title">Audio</h2>
                            <div className="divider"></div>
                            {/* Background Music Volume Slider */}
                            <div className="slider-container">
                                <span>Background Music</span>
                                <input
                                    type="range"
                                    className="slider"
                                    min="0"
                                    max="100"
                                    value={bgMusicVolume}
                                    onChange={(e) => setBgMusicVolume(e.target.value)}
                                />
                                <span>{bgMusicVolume}</span>
                            </div>
                            {/* Sound Effects Volume Slider */}
                            <div className="slider-container">
                                <span>Sound Effects</span>
                                <input
                                    type="range"
                                    className="slider"
                                    min="0"
                                    max="100"
                                    value={sfxVolume}
                                    onChange={(e) => setSfxVolume(e.target.value)}
                                />
                                <span>{sfxVolume}</span>
                            </div>
                        </div>
                    )}

                    {/* Tab for Accessibility Settings */}
                    {activeTab === "accessibility" && (
                        <div className="settings-section">
                            <h2 className="section-title">Accessibility</h2>
                            <div className="divider"></div>
                            {/* Dyslexia Font Toggle */}
                            <label className="setting-label">
                                <span>Dyslexia Font</span>
                                <input
                                    type="checkbox"
                                    className="toggle"
                                    checked={dyslexiaFont}
                                    onChange={() => setDyslexiaFont(!dyslexiaFont)}
                                />
                            </label>
                            {/* Closed Captions Toggle */}
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