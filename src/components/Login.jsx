import React from 'react'
import { useState, useEffect } from 'react'
import NavigationBar from './NavigationBar'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { useCookies } from 'react-cookie'
import * as usersApi from '../api/users';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(['admin']);
    const [users, setUsers] = useState([]);
    
    
    const navigate = useNavigate();

    useEffect(() => {
        usersApi.getAll().then(setUsers);
    }, []);

    const handleLogin = () => {
        const user = users.find((u)=> username === u.user && password === u.password )
        console.log(users[0].user, users[0].password)
        console.log(username, password) 
        if (user) {
            setCookie(`${username}`, true, { path: '/', maxAge: 3600, httpOnly: false });
            navigate('/dashboard');
        } else {
            alert('Invalid username or password');
        }
    }

    return (
        <>
            <NavigationBar />
            <div className={'login-container'}>
                <h1 className={'login-header'}>Login</h1>
                <input type={'text'}
                    name={'username'}
                    placeholder={'username'}
                    onChange={(e) => setUsername(e.target.value)}
                    className={'login-input'}
                    autoComplete='off'
                />
                <div />
                <input type={'text'}
                    name={'password'}
                    placeholder={'password'}
                    onChange={(e) => setPassword(e.target.value)}
                    className={'login-input'}
                    autoComplete='off'
                />
                <br />

                <button onClick={handleLogin} className={'login-button'}>Login</button>
            </div>
        </>
    )
}

export default Login