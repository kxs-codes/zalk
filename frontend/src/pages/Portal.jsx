import { Navigate } from 'react-router-dom';
import {useEffect} from "react";
import { useAuth } from '../components/AuthProvider.jsx';
import StudentPortal from './Student/StudentPortal.jsx';
import EducationPortal from './AdvisoryEducator/EducationPortal.jsx';
import GuardianPortal from "./Guardian/GuardianPortal.jsx";
import ModeratorPortal from './Moderator/ModeratorPortal.jsx';
import AdvisoryPortal from './AdvisoryEducator/AdvisoryPortal.jsx';

// eslint-disable-next-line react/prop-types
const Portal = ({ setRoleError }) => {
  const { token } = useAuth(); // Access token from context


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dict = {
    "student": <StudentPortal />,
    "educator": <EducationPortal />,
    "guardian": <GuardianPortal />,
    "moderator": <ModeratorPortal />,
    "advisory_board": <AdvisoryPortal />
  };

  useEffect(() => {
    if (!(token.role in dict)) {
      setRoleError("Account type not selected.");
    }
  }, [token.role, dict, setRoleError]);

  if (token.role in dict) {
    return dict[token.role];
  } else {
    return <Navigate to="/" />;
  }
};

export default Portal;
