import './App.css';
import AppRoutes from './Routes.jsx';
import NavBar from './components/NavBar.jsx';

function App() {  
  return (
      <div className='flex'>
          <NavBar/>
          <AppRoutes/>
      </div>
  );
}

export default App;
