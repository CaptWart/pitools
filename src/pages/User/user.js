import React, { useState, useEffect } from "react";
import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'
import Outgoing from '../../components/Outgoing/outgoing'
import Incoming from '../../components/Incoming/incoming'

import { ButtonGroup, ToggleButton } from 'react-bootstrap'

import './style.css'

function User(){
    const [user, setUser] = useState([]);
    const [radioValue, setRadioValue] = useState('1');
    const [outgoingView, setOutgoingView] = useState('show')
    const [incomingView, setIncomingView] = useState('hidden')


    const radios = [
        { name: 'Outgoing', value: '1' },
        { name: 'Incoming', value: '2' },
    ];

    useEffect(() => {
        if(radioValue == 1){
            setOutgoingView('hidden');
            setIncomingView('show');
        }
        else{
            setOutgoingView('show');
            setIncomingView('hidden');
        }
    }, [radioValue]); 


    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    const handleLogout = (evt) => {
        fetch(process.env.REACT_APP_SERVER+'logout', {
            method: 'get',
            headers,
              credentials: 'include'
          })
            .then(response => {
                window.location.href = "/login";
            })
    }
  

    React.useEffect(function effectFunction() {
        async function fetchUser() {
            const response = await fetch(process.env.REACT_APP_SERVER+'user', { method: "GET", credentials: 'include' })
            if(!response || response.status === 500 || response.status === 401){
                window.location.href = "/login";
            }
            else{
                const json = await response.json();
                setUser(json)
            }
        }
        fetchUser()

    }, []);

    useEffect(() => {
        
    }, [user.id]); 

    return(
        <div>
            <Header/>

            <h2>SSH Key Services</h2>
            <ButtonGroup toggle>
                {radios.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    type="radio"
                    variant="secondary"
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                    {radio.name}
                </ToggleButton>
                ))}
            </ButtonGroup>
            <div id={incomingView}>
                <Outgoing>{user.id}</Outgoing>
            </div>
            <div id={outgoingView}>
                <Incoming/>
            </div>

            <Footer/>
        </div>
    )
}

export default User;