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
        <div className='h-screen w-screen bg-white flex items-center justify-center'>
            <LogoBar />
        
            <div className='bg-gray-400 rounded-4xl'>
                
                <div className=' flex flex-col md:flex-row p-4 md:p-15  items-center justify-center'>
                    <img src='src/assets/zebra-sample.png' alt='logo' className='scale-x-[-1]  w-full md:w-1/2 h-auto hidden md:block' />
                    <form className='flex flex-col items-center justify-center w-full md:w-2xl h-auto max-w-full max-h-full rounded-2xl' onSubmit={onSubmit}>
                        <h1 className='flex font-bold text-2xl mb-4'>Welcome Back!</h1>
                        <div className='flex flex-col w-full'>
                            <label className='text-black text-2xl font-bold mb-2'>Account Type</label>
                            <select className='border-1 bg-white border-gray-300 w-full p-2 rounded mb-4 '>
                                <option value="start">-</option>
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                                <option value="guardian">Guardian</option>
                            </select>
                            <label className='text-black text-2xl font-bold mb-2'>Username</label>
                            <input
                                type='text'
                                placeholder='Enter Username Here'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className='bg-white border-1 border-gray-300 w-full p-2 rounded mb-4'
                            />
                            <label className='text-black text-2xl font-bold mb-2'>Password</label>
                            <input
                                type='password'
                                placeholder='Enter Password Here...'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='bg-white border-1 border-gray-300 w-full p-2 rounded mb-4'
                            />
                            <div className='flex flex-row justify-between mb-4'>
                                <Link to='/forgot-password' className='text-xs underline'>Forgot Password?</Link>
                                <Link to='/signup' className='text-xs underline'>Sign Up Here</Link>
                            </div>
                            <div className='flex justify-center'>
                                <button type='submit' className='bg-red-900 hover:bg-red-950 text-white text-4xl  rounded-full px-10 py-4'>Login</button>
                            </div>
                        </div>
                    </form>
                    <img src='src/assets/zebra-sample.png' alt='logo' className='scale-x w-full md:w-1/2 h-auto' />

                </div>
            </div>
        </div>
    );
}

export default Login;