// React and core library imports
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

// Third-party libraries
import { ToastContainer } from 'react-toastify';

// Styles
import './App.css';
import './index.css';

// App-specific components and routes
import AppRoutes from './Routes.jsx';
import NavBar from './components/NavBar.jsx';
import PortalLogoBar from './components/PortalLogoBar.jsx';
import { AuthProvider } from './components/AuthProvider.jsx';


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

    // Prop for errors when the user does not select a valid 
    const [roleError, setRoleError] = useState('');

    const isValid = () => {
        return noNavigation.includes(location.pathname) === false && validRoutes.includes(location.pathname) === true;
    }

    return (
        <AuthProvider>
            <div className='flex'>
                {isValid() && <NavBar/>}
                {isValid() && <PortalLogoBar/>}
                <AppRoutes roleError={roleError} setRoleError={setRoleError}/>
                <ToastContainer autoClose={4000} stacked /> {/* Added logic to show toast success/error messages */}
            </div>
        </AuthProvider>
    );
}

export default App;
