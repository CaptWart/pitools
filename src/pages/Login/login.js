import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'
import './style.css'
import pi from './images/pi.png'
import logo from './images/pilogo.png'


function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    const handleLogin = (evt) => {
        const data = {username, password} ;

        fetch(process.env.REACT_APP_SERVER+'login', {
            method: 'POST',
            mode: 'cors',
            credentials: "include",
            headers: headers,
            body: JSON.stringify(data)
          })
            .then(response => {
              window.location.href="/user"
            })
    }

    return(
        <div>
            <Header/>
            <div>
            <h2>SSH Key Services</h2>
                <img id='pi' src={pi} alt='pi'/>
                <div id='login'>
                    <img id='logo' src={logo} alt='logo'/>
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <br></br>
                    <Button type='submit' id='lgbutton' onClick={handleLogin} onSubmit={handleLogin}> Login </Button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Login;