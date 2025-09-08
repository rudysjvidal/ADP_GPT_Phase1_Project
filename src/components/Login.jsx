import React from 'react'
import { useState, useEffect } from 'react'
import NavigationBar from './NavigationBar'
import { useNavigate } from 'react-router-dom'
import './Login.css'
// import { useCookies } from 'react-cookie'
// import * as usersApi from '../api/users';
import { loginBasic } from '../auth';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleLogin = async () => {
    try {
        await loginBasic({ email, password });
        navigate("/dashboard");
    } catch (e) {
        setError("Invalid email or password");
        console.error(e);
    }
    };


    return (
        <>
            <NavigationBar />
            <div className={'login-container'}>
                <h1 className={'login-header'}>Login</h1>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                    autoComplete="username"
                />
                <div />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    autoComplete="current-password"
                />

                <div className="mt-3 text-sm text-slate-600">
                    Don’t have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className="text-blue-600 hover:underline"
                    >
                        Register here
                    </button>
                </div>
                <br />

                {error && <div style={{ color: 'crimson', marginBottom: 8 }}>{error}</div>}


                <button onClick={handleLogin} className={'login-button'}>Login</button>
            </div>
        </>
    )
}

export default Login