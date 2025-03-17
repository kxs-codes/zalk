import './App.css';
import AppRoutes from './Routes.jsx';
import NavBar from './components/NavBar.jsx';
import { useLocation } from 'react-router-dom';
import PortalLogoBar from './components/PortalLogoBar.jsx';
import { useState } from 'react';

function App() {  
    // Only show navbar when not on these routes below
    // Added Portal Logo Bar to show as well 
    const location = useLocation();
    const noNavigation = ['/','/settings','/signup'];

    // Set the role for use in specific portal returns based on role
    const [role, setRole] = useState('no-role-set');

    return (
        <div className='flex'>
            {noNavigation.includes(location.pathname) == false && <NavBar/>}
            {noNavigation.includes(location.pathname) == false && <PortalLogoBar/>}
            <AppRoutes/>
            <AppRoutes role={role} setRole={setRole}/>
        </div>
       
    );
}

export default App;
