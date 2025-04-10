import React, { useState } from 'react';
import './LoginRegister.css';
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
  // const navigate = useNavigate()
  const [action, setAction] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    if (registerData.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    localStorage.setItem(registerData.email, JSON.stringify(registerData));
    toast.success("Registration successful!");
    setIsRegistered(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem(loginData.email);

    if (!storedUser) {
      toast.error("No user found with this email!");
      return;
    }

    const userData = JSON.parse(storedUser);

    if (userData.password !== loginData.password) {
      toast.error("Incorrect password!");
    } else {
      toast.success("Logged in successfully!");
      setTimeout(() => {
        window.location.href = "https://naachiyarconstruction.netlify.app/";
      }, 1000);
      
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const registerLink = () => setAction('active');
  const loginLink = () => setAction('');

  return (
    <>
      <ToastContainer position="top-center"/>
      {isRegistered ? (
        <div className="wrapper">
          <div className="form-box success">
            <h1>Registered Successfully!</h1>
            <button onClick={() => {
              setIsRegistered(false);
              setAction('');
              setRegisterData({ username: '', email: '', password: '' });
            }}>
              Go Back to Login
            </button>
          </div>
        </div>
      ) : (
        <div className={`wrapper ${action}`}>
          <div className="form-box login">
            <form onSubmit={handleLogin}>
              <h1>Login</h1>
              <div className="input">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                />
                <FaEnvelope className="icon" />
              </div>
              <div className="input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />
                
                <span className="icon eye-icon" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="remember">
                <label><input type="checkbox" /> Remember Me</label>
                <a href="#">Lost Password</a>
              </div>
              <button type="submit">Login</button>
              <div className="signup-link">
                <p>Don't have any account? <a href="#" onClick={registerLink}>Register</a></p>
              </div>
            </form>
          </div>

          <div className="form-box register">
            <form onSubmit={handleRegister}>
              <h1>Registration</h1>
              <div className="input">
                <input
                  type="text"
                  placeholder="Username"
                  required
                  value={registerData.username}
                  onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                />
                <FaUser className="icon" />
              </div>
              <div className="input">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                />
                <FaEnvelope className="icon" />
              </div>
              <div className="input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  required
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                />
                
                <span className="icon eye-icon" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="remember">
                <label><input type="checkbox" required /> I agree to the terms & conditions</label>
              </div>
              <button type="submit">Register</button>
              <div className="signup-link">
                <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginRegister;
