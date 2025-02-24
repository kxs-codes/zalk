import {Routes, Route} from 'react-router-dom'
import './App.css'
import StudentList from './components/StudentList.jsx';
import Login from "./components/Login.jsx";

function App() {  
  return (
        <>
            <main className="main-content">
                <Routes>
                    <Route path = "/student_list" element={<StudentList/>}/>
                    <Route path ="/login" element={<Login/>}/>
                </Routes>
            </main>
        </>
  );
}

export default App;
