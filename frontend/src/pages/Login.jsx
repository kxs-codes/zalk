import { useState } from 'react';
import { useNavigate } from "react-router-dom";

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
        <div className=' h-screen w-screen bg-white flex item-center justify-center'                                                  >
                {/* TODO: Is there a better way to center content on the screen?*/}

            <div>
            <div className='bg-gray-500 rounded-4xl mx-10 flex  items-center '        >
            <form className='  py-40 bg-gray-500  p-6  w-100 h-100 rounded-2xl flex flex-col space-y-4 justify-self-center hover:shadow-2xl  ' onSubmit={onSubmit}>
            <h1 className=' flex font-bold text-2xl'>Welcome Back!</h1>
                <div className=' flex-col'>
                    <label className='text-black text-2xl font-bold flex'>Username</label>
                    <input
                        type='text'
                        placeholder='Enter Username Here '
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='border-1 border-gray-300 w-full pb-4 p-2 rounded'
                    />
               
                    <label className='text-black  text-2xl font-bold flex '>Password</label>
                    <input
                        type='password'
                        placeholder='Enter Password Here...'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border-1 border-gray-300 w-full pb-4 p-2 rounded'
                    />
                </div>
                <button type="submit" className='flex bg-red-900 text-white font-medium  hover:bg-amber-200 rounded-4xl py-3  justify-center'>Login</button>
            </form>
            
            </div>
            </div>  
            
        </div>
    );
}

export default Login;