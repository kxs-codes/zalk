import { Link } from 'react-router-dom';
import LogoBar from '../components/LogoBar';
import '../styles/Login.css';
import useLogin from './LoginLogic.js';

function Login({ role, setRole }) {
  const {username, setUsername, password, setPassword, onSubmit, handleChange} = useLogin(role, setRole)

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
