import { useLocation } from 'react-router-dom';
import StudentPortal from './StudentPortal';
import EducatorPortal from './EducatorPortal';

const Portal = () => {
    // 1. Grab the useNavigate() data passed into /portal route with useLocation()
    const location = useLocation();
    const role = location.state?.role;

    // 2. Map the role with the correct portal
    const dict = {
        "student": <StudentPortal/>,
        "educator": <EducatorPortal/>,
        // "guardian": <GuardianPortal/>,
        // "admin": <AdminPortal/>,
        // "moderator": <ModeratorPortal/>
    };

    // 3. Return the proper portal
    return dict[role] || <div>invalid role</div>;
}

export default Portal;