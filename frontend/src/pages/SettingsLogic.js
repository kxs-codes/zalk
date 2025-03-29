import { useState, useEffect } from "react";

const useSettings = () => {
    const [activeTab, setActiveTab] = useState("appearance");
    const [bgMusicVolume, setBgMusicVolume] = useState(50);
    const [sfxVolume, setSfxVolume] = useState(50);
    const [dyslexiaFont, setDyslexiaFont] = useState(false);
    const [closedCaptions, setClosedCaptions] = useState(false);
    const [isDarkMode, setDarkMode] = useState(false);
    const [isMinimizedView, setIsMinimizedView] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMinimizedView(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return {
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
    };
};

export default useSettings;
