import { useState } from 'react';
import { useNavigate, Link} from "react-router-dom";
import LogoBar from '../components/LogoBar';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        setUsername('');
        setPassword('');
        navigate('/student-list');
    };

    return (
        <div className=' h-screen w-screen bg-white flex items-center justify-center'>
            <LogoBar/>
              <div>
                <div className=' h-3/4 w-3/4 bg-gray-400 rounded-4xl flex items-center justify-center '> 
                  <img src='src/assets/zebra-sample.png' alt='logo' className=' scale-x-[-1]' />
                   <form className=' bg-[#88888] flex flex-col items-center justify-center w-100 h-100 rounded-2xl hover:shadow-5xl hover:shadow-2xl' onSubmit={onSubmit}>
                     <h1 className=' flex font-bold text-2xl'>Welcome Back!</h1>

                        <div className=' flex-col'>
                            <label className='flex text-black text-2xl font-bold'> Account Type</label>
                            <select className='flex border-1 bg-white border-gray-300 w-full pb-4 p-2 rounded' >
                                <option value="start">-</option>
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                                <option value="guardian">Guardian</option>
                            </select>


                        <label className='  text-black text-2xl font-bold flex'>Username</label>
                        <input
                            type='text'
                            placeholder='Enter Username Here '
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className=' bg-white border-1 border-gray-300 w-full pb-4 p-2 rounded'
                        />

                        <label className='text-black  text-2xl font-bold flex '>Password</label>
                        <input
                            type='password'
                            placeholder='Enter Password Here...'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='border-1 bg-white border-gray-300 w-full pb-4 p-2 rounded'
                        />
                        <div className='flex flex-row justify-between'>
                            <Link to='/forgot-password' className='text-[15px] underline'>Forgot Password?</Link>
                            <Link to='/signup' className=' text-[15px] underline '>Sign Up Here</Link>
                        </div>

                        <div className='flex justify-center'>
                            <button type='submit' className=' bg-red-900 text-white rounded-full px-10 py-4 mt-6'>Login</button>
                        </div>

                    </div>
                </form>
                                <img src='src/assets/zebra-sample.png' alt='avatar' className='' />

            
            </div>
            </div>  
            
    );
}

export default Login;