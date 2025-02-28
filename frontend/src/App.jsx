import {Routes, Route} from 'react-router-dom'
import './App.css'
import StudentList from './pages/StudentList.jsx';
import Login from "./pages/Login.jsx";

// TODO -> Change the routes to the `useRoutes` method so we can promote minimal code


function App() {  
  return (
        <>
                <Routes>
                    <Route path ="/" element={<Login/>}/>
                    <Route path = "/student_list" element={<StudentList/>}/>
                </Routes>

        </>
  );
}

export default App;
