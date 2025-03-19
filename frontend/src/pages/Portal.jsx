import { useLocation } from 'react-router-dom';
import StudentPortal from './Student/StudentPortal.jsx';
import EducatorPortal from './Educator/Portal';
import GuardianPortal from "./Guardian/GuardianPortal.jsx";
import ModeratorPortal from './Moderator/ModeratorPortal.jsx';

const Portal = () => {
    // 1. Grab the useNavigate() data passed into /portal route with useLocation()
    const location = useLocation();
    const role = location.state?.role;

    // 2. Map the role with the correct portal
    const dict = {
        "student": <StudentPortal/>,
        "educator": <EducatorPortal/>,
        "guardian": <GuardianPortal/>,
        "moderator": <ModeratorPortal/>
    };

    // 3. Return the proper portal
    return dict[role] || <div>invalid role</div>;
}

export default Portal;