import { useState, useEffect } from "react";

function Settings() {
    const [activeTab, setActiveTab] = useState("appearance");
    const [reportText, setReportText] = useState(""); // State to manage report text
    const [bgMusicVolume, setBgMusicVolume] = useState(50); // Background music volume state
    const [sfxVolume, setSfxVolume] = useState(50); // Sound effects volume state
    const [dyslexiaFont, setDyslexiaFont] = useState(false); // Toggle for dyslexia font
    const [closedCaptions, setClosedCaptions] = useState(false); // Toggle for closed captions
    const [isDarkMode, setDarkMode] = useState(false); // State for the Dark mode
    const [isMinimizedView, setIsMinimizedView] = useState(window.innerWidth < 768);
    // State to track if the user is in minimized view

    // Effect that updates isMinimizedView when the window is resized
    useEffect(() => {
        const resizeHandler = () => {
            setIsMinimizedView(window.innerWidth < 768);
        };
        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    const handleReportSubmit = () => {
        // Logic to handle the report submission
        console.log("Report submitted:", reportText);
        setReportText(""); // Clear the text area after submission
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/*Toolbar at the top of the page*/}
            <div className="w-full text-white p-4 shadow-xl flex justify-between items-center" style={{backgroundColor: '#911B0C'}}>
                {/*button to navigate to previous page*/}
                <button
                    onClick={() => window.history.back()}
                    className="text-white border border-[#AD1905] bg-[#AD1905] px-4 py-2 rounded-full hover:bg-[#8e1404] active:bg-[#8e1404]"
                >Back</button>
                <h1 className="text-xl font-semibold text-center flex-1">Settings</h1>
            </div>

            {/*Sidebar on the left-side of the screen*/}
            <div className={`flex ${isMinimizedView ? "flex-col" : "flex-row min-h-screen"}`}>
                <div className={`${isMinimizedView ? "w-full flex justify-around p-4" : "w-1/4 p-4 shadow-2xl min-h-screen"} bg-[#687169]`}>
                <ul className={`${isMinimizedView ? "flex space-x-4": " "}`}>
                        {["appearance", "report issue", "audio", "accessibility"].map((tab) => (
                            <li
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`cursor-pointer py-2 px-4 ${activeTab === tab ? 'bg-[#788279] text-white rounded-l-lg' : 'text-white'} transition-all`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </li>
                        ))}
                    </ul>
                </div>

                {/*Main settings that will be changed on the right side of the screen*/}
                <div className="flex-1 p-8" style={{backgroundColor: '#BBBBBB'}}>
                    {/*Tab for the appearance setting*/}
                    {activeTab === "appearance" && (
                        <div className="relative bg-white p-6 rounded-lg shadow-2xl">
                            <div className="absolute inset-0 bg-[#555555] opacity-70 rounded-lg"></div>
                            <div className="relative z-10">
                                <h2 className="text-xl font-semibold">Appearance</h2>
                                <div className = "border-b-2 border-[#4F4F49] mb-4"></div>
                                {/*Dark Mode Toggle*/}
                                <label className="flex items-center space-x-2 mt-4">
                                    <span>Dark Mode</span>
                                    <input
                                        type="checkbox"
                                        className="toggle"
                                        checked={isDarkMode}
                                        onChange={() => setDarkMode(!isDarkMode)}
                                    />
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Report and Troubleshoot tab*/}
                    {activeTab === "report issue" && (
                        <div className="relative bg-white p-6 rounded-lg shadow-2xl">
                            <div className="absolute inset-0 bg-[#555555] opacity-70 rounded-lg"></div>
                            <div className="relative z-10">
                                <h2 className="text-xl font-semibold">Report/Troubleshoot</h2>
                                <div className="border-b-2 border-[#4F4F49] mb-4"></div>
                                {/*Textbox to write the report*/}
                                <textarea
                                    className="w-full p-2 border-2 border-[#4F4F49] rounded-md"
                                    rows="6"
                                    placeholder="Please submit your issue here..."
                                    value={reportText}
                                    onChange={(e) => setReportText(e.target.value)} // Update the report text on change
                                ></textarea>

                                {/*Button to submit the report*/}
                                <button
                                    onClick={handleReportSubmit}
                                    className="mt-4 bg-[#AD1905] text-white py-2 px-4 rounded-full hover:bg-[#8e1404]">
                                    Submit Report
                                </button>
                            </div>
                        </div>
                    )}

                    {/*Tab for Audio Settings*/}
                    {activeTab === "audio" && (
                        <div className="relative bg-white p-6 rounded-lg shadow-2xl">
                            <div className="absolute inset-0 bg-[#555555] opacity-70 rounded-lg"></div>
                            <div className="relative z-10">
                                <h2 className="text-xl font-semibold">Audio</h2>
                                <div className="border-b-2 border-[#4F4F49] mb-4"></div>
                                {/*Background Music Volume Slider*/}
                                <label className="flex items-center space-x-2 mt-4">
                                    <span>Background Music</span>
                                    <input
                                        type="range"
                                        className="slider"
                                        min="0"
                                        max="100"
                                        value={bgMusicVolume}
                                        onChange={(e) => setBgMusicVolume(e.target.value)}
                                    />
                                    <span>{bgMusicVolume}</span> {/*Displaying background music volume number*/}
                                </label>
                                {/*Sound Effects Volume Slider*/}
                                <label className="flex items-center space-x-2 mt-4">
                                    <span>Sound Effects</span>
                                    <input
                                        type="range"
                                        className="slider"
                                        min="0"
                                        max="100"
                                        value={sfxVolume}
                                        onChange={(e) => setSfxVolume(e.target.value)}
                                    />
                                    <span>{sfxVolume}</span> {/*Displaying sound effects volume number */}
                                </label>
                            </div>
                        </div>
                    )}
                    {/*Tab for Accessibility Settings*/}
                    {activeTab === "accessibility" && (
                        <div className="relative bg-white p-6 rounded-lg shadow-2xl">
                            <div className="absolute inset-0 bg-[#555555] opacity-70 rounded-lg"></div>
                            <div className="relative z-10">
                                <h2 className="text-xl font-semibold">Accessibility</h2>
                                <div className="border-b-2 border-[#4F4F49] mb-4"></div>
                                {/* Dyslexia Font Toggle */}
                                <label className="flex items-center space-x-2 mt-4">
                                    <span>Dyslexia Font</span>
                                    <input
                                        type="checkbox"
                                        className="toggle"
                                        checked={dyslexiaFont}
                                        onChange={() => setDyslexiaFont(!dyslexiaFont)}
                                    />
                                </label>
                                {/*Closed Captions Toggle*/}
                                <label className="flex items-center space-x-2 mt-4">
                                    <span>Closed Captions</span>
                                    <input
                                        type="checkbox"
                                        className="toggle"
                                        checked={closedCaptions}
                                        onChange={() => setClosedCaptions(!closedCaptions)}
                                    />
                                </label>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Settings;