import { useNavigate } from "react-router-dom";

const usePortalNavigation = () => {
    const navigate = useNavigate();
    const startSession = () => {
        navigate("/session");
    };
    return { startSession };
};

const StudentPortalLogic = {
    usePortalNavigation
};

export default StudentPortalLogic;