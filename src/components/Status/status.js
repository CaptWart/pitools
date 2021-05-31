import React, { useState, useEffect } from "react";
import { Accordion, Card } from 'react-bootstrap'
import './style.css'
import Newkey from '../../components/Newkey/newkey'

function Status(props){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    const [rend, setRend] = useState([])
    const [noServers, setNoServers] = useState('none')
    const [servers, setServers] = useState([])
    const [nokeys, setNokeys] = useState('inline')
    const [account, setAccount] = useState()

    let allServers = []

    Object.keys(props.children).forEach(([key]) => 
    {
        allServers.push(props.children[key].server)

    })
    //setServers(allServers)
// this was here to see how things would look when it gets added
    useEffect(() => {
        setNokeys('inline')
        
        setRend(props.children.map((data) =>
        
        <tr>
            {setNoServers('inline')}
            {setAccount(data.account)}
            {setServers(allServers)}
            <td>
                {data.server}
            </td>
            <td id='keys'>
            {
                /^ssh-rsa/.test(data.result.replace(/(\r\n|\n|\r)/gm, '\n').split(",")[0]) && 
                <Accordion defaultActiveKey="1">
                <Card>
                    <Card.Header>
                    <Accordion.Toggle variant="link" eventKey="0">
                        Show Keys
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <div id='results'>
                            {data.result.replace(/(\r\n|\n|\r)/gm, '\n').split(",")[0]}
                            <br/>
                            Click below to copy key to all
                            <br/>
                            {setNokeys('none')}
                            <Newkey>{allServers}{data.account}{data.result.split(",")[0]}{data.result.split(",")[1]}</Newkey>
                        </div>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                </Accordion>
            }
            {
                (data.result.replace(/(\r\n|\n|\r)/gm, '\n').split(",")[0] == 'Key does not exist') && 
                <div>
                    key does not exist
                </div>
            }
            {
                (data.result.replace(/(\r\n|\n|\r)/gm, '\n').split(",")[0] == "Can't connect") && 
                <div>
                    Can't connect
                </div>
            }
            {
                (data.result.substring(0,4) == "sudo") && 
                <div>
                    Account does not exist
                </div>
            }
            </td>

        </tr>
        ))

    }, [props])

    useEffect(() => {
    }, [noServers])

    return(
        <div style={{display: noServers}}>
        <h1>Status</h1>
        
        <div style={{display: nokeys}}>
        <p>Click below to create new key</p>
        <Newkey>{[servers]}{account}</Newkey>
        </div>

        <table className="table">
            <thead>
                <tr>
                <th scope="col">Server</th>
                <th scope="col">Key</th>
                </tr>
            </thead>
            <tbody>
   
                    {rend}
   
            </tbody>
        </table>

      </div>
      )

}

export default Status;