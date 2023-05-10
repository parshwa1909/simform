import React, { useRef, useState } from 'react'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch (error) {
            setError("Failed to Signup");
        }
        setLoading(false);
    };
    return (
        <div class="container singup">
            <div class="header">
                <h1>SignUp</h1>
            </div>
            {error && <p>{error}</p>}
            <div class="input_area">
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" ref={emailRef} />
                <input type="password" placeholder="Password" ref={passwordRef} />
            </div>
            <div class="actions">
                <button disabled={loading} type="submit" value="Login" onClick={handleSubmit}>Sign Up</button>
                <p>
                    Have a account ?
                    <Link to="/login" class="Sign_up_link">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup;