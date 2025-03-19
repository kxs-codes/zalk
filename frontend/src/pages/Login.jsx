import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LogoBar from '../components/LogoBar';
import '../styles/Login.css';

function Login({ role, setRole }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    setUsername('');
    setPassword('');
    // Navigate to portal, passing role in state
    navigate('/portal', { state: { role } });
  };

  const handleChange = (e) => {
    setRole(e.target.value);
    console.log('role:', e.target.value);
  };

  return (
    <div className="login-page">
      {/* This bar has the red background and your logo/title text */}
      <LogoBar />

      {/* Main container for the gray background and the login form */}
      <div className="main-container">
        <div className="login-wrapper">
          {/* Left Zebra */}
          <img
            src="/transparent-zebra.png"
            alt="zebra-left"
            className="zebra-img"
          />

          {/* The Login Form */}
          <form className="form-container" onSubmit={onSubmit}>
            <h1 className="login-title">Welcome Back!</h1>

            <label className="login-label">Account Type</label>
            <select
              className="login-select"
              value={role}
              onChange={handleChange}
            >
              <option value="start">-</option>
              <option value="student">Student</option>
              <option value="educator">Educator</option>
              <option value="guardian">Guardian</option>
              <option value="moderator">Moderator</option>
              <option value="advisor">Advisor</option>
            </select>

            <label className="login-label">Username</label>
            <input
              type="text"
              placeholder="Enter Username Here"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
            />

            <label className="login-label">Password</label>
            <input
              type="password"
              placeholder="Enter Password Here..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />

            <div className="login-links">
              <Link to="/forgot-password" className="login-link">
                Forgot Password?
              </Link>
              <Link to="/signup" className="login-link">
                Sign Up Here
              </Link>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          {/* Right Zebra (flipped horizontally) */}
          <img
            src="/transparent-zebra.png"
            alt="zebra-right"
            className="zebra-img flip-x"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
