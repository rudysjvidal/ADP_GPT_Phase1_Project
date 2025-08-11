import React from 'react'
import { useState } from 'react'
import NavigationBar from './NavigationBar'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { useCookies } from 'react-cookie'

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(['admin']);
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username == 'admin' && password == 'admin') {
            setCookie('admin', true, { path: '/' });
            navigate('/dashboard');
        } else {
            alert("Invalid username or password");
        }
    }

    return (
        <>
            <NavigationBar />
            <div className={'login-container'}>
                <input type={'text'}
                    name={'username'}
                    placeholder={'username'}
                    onChange={(e) => setUsername(e.target.value)}
                    className={'login-input'}
                />
                <div />
                <input type={'text'}
                    name={'password'}
                    placeholder={'password'}
                    onChange={(e) => setPassword(e.target.value)}
                    className={'login-input'}
                />
                <br />

                <button onClick={handleLogin} className={`px-4 py-2 rounded font-medium transition-all duration-300 ${location.pathname === '/login'
                        ? 'text-blue-400 bg-slate-700'
                        : 'text-slate-300 hover:text-slate-100 hover:bg-slate-700'
                    }`}>Login</button>
            </div>
        </>
    )
}

export default Login