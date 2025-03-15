import './App.css';
import AppRoutes from './Routes.jsx';
import NavBar from './components/NavBar.jsx';
import EducatorPortal from './pages/EducatorPortal.jsx';
import { useLocation } from 'react-router-dom';

function App() {  
    // Only show navbar when not on these routes below
    const location = useLocation();
    const noNavigation = ['/','/settings','/signup'];

    return (
        // <div className='flex'>
        //     {noNavigation.includes(location.pathname) == false && <NavBar/>}
        //     <AppRoutes/>
        // </div>
        <div>
            <EducatorPortal />
        </div>
    );
}

export default App;
