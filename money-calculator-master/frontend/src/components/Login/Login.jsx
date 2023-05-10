import React, { useRef, useState } from 'react'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch (e) {
            setError("Failed to Login");
        }
        setLoading(false);
    };
    return (
        <div className="container login">
            <div className="header">
                <h1>Login</h1>
            </div>
            {error && <p>{error}</p>}
            <div className="input_area">
                <input type="email" placeholder="Email" ref={emailRef} />
                <input type="password" placeholder="Password" ref={passwordRef} />
            </div>
            <div className="actions">
                <button disabled={loading} type="submit" value="Login" onClick={handleSubmit}>Login</button>
                <p>
                    Don't Have a account ?
                    <Link to="/signup" className="Sign_up_link">Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login