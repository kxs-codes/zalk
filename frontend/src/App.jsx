import './App.css';
import AppRoutes from './Routes.jsx';
import NavBar from './components/NavBar.jsx';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function App() {  
    // Only show navbar when not on these routes below
    const location = useLocation();
    const noNavigation = ['/','/settings','/signup'];

    // Set the role for use in specific portal returns based on role
    const [role, setRole] = useState('no-role-set');

    return (
        <div className='flex'>
            {noNavigation.includes(location.pathname) == false && <NavBar/>}
            <AppRoutes role={role} setRole={setRole}/>
        </div>
       
    );
}

export default App;
