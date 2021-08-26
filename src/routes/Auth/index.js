import './Auth.css';
import React, { useState } from 'react'

const Auth = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const [isRegistering, setIsRegistering] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({user, password});
    }
    const toggleIsRegistering = () => setIsRegistering(!isRegistering);
    
    const [toggleRegisterText, authActionText] = isRegistering ? ["use an existing account", "register"]: ["Create an account", "Login"]
    
    return (
        <div className="auth-container">
            <h1>Auth</h1>

            <form className="auth-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={user} onChange={(e) => setUser(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <span onClick={toggleIsRegistering}>{toggleRegisterText}</span>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Auth;


