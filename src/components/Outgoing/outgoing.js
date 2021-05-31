import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'
import Status from '../../components/Status/status'
import Newkey from '../../components/Newkey/newkey'

function Outgoing(props){
        const [output, setOutput] = useState([])
        const [servers, setServers] = useState([])
        const [account, setAccount] = useState()
        const [validServer, setValidServer] = useState(true)
        const [invaldText, setinvalidText] = useState()

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        //for loop this api call for each server.

        const handleServers = (evt) => {

            if ( !account || !account.replace(/\s+/g, '') || servers.length < 1 || !servers ){
                setValidServer(false)
            }
            else{
                const server = (servers.replace(/\n| /g, ',').split(","));
                const regexServer = /(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.)+[a-zA-Z]{2,63}$)/;

                function callback () { 
                    
                    let outputInfo = []
                    const requestToExternalService = async function(d) {
                        // Replace with a promise that does real work here...
                        
                        return new Promise(async resolve => {
                            const data =  {
                                "id": props.children, 
                                "servers": d, 
                                "account": account
                            }
                            const response = await fetch(process.env.REACT_APP_SERVER+'getallinfo', {
                                method: 'POST',
                                mode: 'cors',
                                credentials: "include",
                                headers: headers,
                                body: JSON.stringify(data)
                            })
                            outputInfo.push(await response.json())

                            resolve(outputInfo);
                        });
                      };
                    
                      const promiseChain = server.reduce(
                        (chain, d) => chain.then(() => requestToExternalService(d)),
                        Promise.resolve()
                      );
                    
                      promiseChain.then((result) => setOutput(result));
                }

                var itemsProcessed = 0;
                setValidServer(true)
                let vserver = true

                server.forEach((item, index, array) => {
                    itemsProcessed++;
                    
                    if ( regexServer.test(item) != true ){
                        setValidServer(false)
                        vserver = false;
                    }

                    if(itemsProcessed === array.length && vserver == true) {
                    callback();
                    }

                });


            }

           

        }

        useEffect(() => {
            setinvalidText(
                <div>
                    {
                        validServer == false &&
                        <p style={{color : 'red', fontWeight: 'bold'}}>INVALID ENTRIES CHECK SERVERS AND APPLICATION ACCOUNT</p>
                    }
                </div>

            )

        }, [validServer])

    return(
        <div>
          {invaldText}
          <p>*Create or copy public & private key pairs</p>
            <Form>
                <Form.Control 
                className="serverlist" type="account" placeholder="Application Account" onChange={e => setAccount(e.target.value)} 
                />

                <p>Target Server(s) <br/> ( Separate by comma, space or newline )</p>
                <Form.Control 
                id="serverlist" className="serverlist" as="textarea" rows="3" cols="50" onChange={e => setServers(e.target.value)}
                />
            </Form> 
            <br/>
            <Button onClick={handleServers}> Check Private/Public Access </Button>
            {/* <Newkey>{account}{servers}</Newkey> */}
            <div id='status'>
                <Status>{output}</Status>
            </div>
        </div>
    )
}

export default Outgoing;