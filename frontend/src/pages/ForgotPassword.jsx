import React, { useState } from 'react';
import '../styles/ForgotPassword.css'
import LogoBar from '../components/LogoBar';
function ForgetPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset link requested for:", email);
    // Here you'd typically send the email to your backend for processing
    setEmail('');
  };

  return (
    <div className="outer-container">
        <LogoBar /> 
      <div className="white-container">
        <h2 className="page-title">Forgot Password</h2>
        <p className="instruction-text">
          Enter your email address below, and we will send you a link to reset your password.
        </p>
        <form className="forget-password-form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="label">Email Address</label>
          <input
            id="email"
            type="email"
            className="input-field"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="submit-button">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
