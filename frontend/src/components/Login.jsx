import { useState } from 'react';
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        setUsername('');
        setPassword('');
        navigate('/student_list');


        // TODO: Implement the connection with Spring Boot Security so it will authenticate and redirect
    };

    return (
        <>
            <div>
                <h1>Login</h1>
            </div>
            <form className='loginForm' onSubmit={onSubmit}>
                <div className='username'>
                    <label>Username</label>
                    <input
                        type='text'
                        placeholder='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='password'>
                    <label>Password</label>
                    <input
                        type='password'
                        placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="submitButton">Login</button>
            </form>
        </>
    );
}

export default Login;