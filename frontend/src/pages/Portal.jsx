import { useLocation, Navigate } from 'react-router-dom';
import {useEffect} from "react";
import StudentPortal from './Student/StudentPortal.jsx';
import EducationPortal from './AdvisoryEducator/EducationPortal.jsx';
import GuardianPortal from "./Guardian/GuardianPortal.jsx";
import ModeratorPortal from './Moderator/ModeratorPortal.jsx';

// eslint-disable-next-line react/prop-types
const Portal = ({ setRoleError }) => {
  const location = useLocation();
  const role = location.state?.role;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dict = {
    "student": <StudentPortal />,
    "educator": <EducationPortal />,
    "guardian": <GuardianPortal />,
    "moderator": <ModeratorPortal />,
    "advisor": <EducationPortal />
  };

  useEffect(() => {
    if (!(role in dict)) {
      setRoleError("Account type not selected.");
    }
  }, [role, dict, setRoleError]);

  if (role in dict) {
    return dict[role];
  } else {
    return <Navigate to="/" />;
  }
};

export default Portal;
