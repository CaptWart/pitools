import React from 'react';
import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'
import Button from 'react-bootstrap/Button'
function Home(){
    return(
        <div>
            <Header/>
            <h1>This is homepage</h1>
            <a href="/login"><Button>Login</Button></a>
            <Footer/>
        </div>
    )
}

export default Home;