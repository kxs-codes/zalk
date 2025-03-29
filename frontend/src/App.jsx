import './App.css';
import './index.css'
import AppRoutes from './Routes.jsx';
import NavBar from './components/NavBar.jsx';
import { useLocation } from 'react-router-dom';
import PortalLogoBar from './components/PortalLogoBar.jsx';
import { useState } from 'react';

function App() {  
    // Only show navbar when not on these routes below
    // Added Portal Logo Bar to show as well 
    const location = useLocation();
    const noNavigation = ['/','/settings','/signup', 'forgot-password'];
    const validRoutes = ['/', '/settings', '/signup', '/portal', 
                         '/results', '/classrooms', '/improvements', 
                         '/session', '/progress', '/progress/badges', 
                         '/child-progress', '/classrooms/:classroom-id', 
                         '/classroom-progress', '/session-configuration', 
                         '/classrooms-management', 
                         '/create-classroom', '/create-account', '/manage-accounts', '/access-logs', 
                         '/access-reports', '/report-issues', '/view-progress', 
                         '/access-spreadsheet', ];

    // Set the role for use in specific portal returns based on role
    const [role, setRole] = useState('no-role-set');

    const isValid = () => {
        return noNavigation.includes(location.pathname) == false && validRoutes.includes(location.pathname) == true;
    }

    return (
        <div className='flex'>
            {isValid() && <NavBar role={role}/>}
            {isValid() && <PortalLogoBar/>}
            <AppRoutes role={role} setRole={setRole}/>
        </div>
    );
}

export default App;
