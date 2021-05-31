import React, { useState, useEffect } from "react";
import { Form, Button } from 'react-bootstrap'
import Status from '../../components/Status/status'

function Incoming(props){
        const [output, setOutput] = useState([])
        const [servers, setServers] = useState([])
        const [account, setAccount] = useState()
        const [publickey, setPublickey] = useState()
        const [validEntry, setValidEntry] = useState(true)
        const [invaldText, setinvalidText] = useState()

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        const copyKey = (evt) => {

            if ( !account || !account.replace(/\s+/g, '') || servers.length < 1 || !servers || !publickey ){
                setValidEntry(false)
            }
            else{

                const server = (servers.replace(/\n| /g, ',').split(","))
                const regexServer = /(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.)+[a-zA-Z]{2,63}$)/;
                function callback () {
                    let outputInfo = []
    
                    const requestToExternalService = async function(allServers) {
                        // Replace with a promise that does real work here...
                        
                        return new Promise(async resolve => {
                            const data =  {
                                "id": props.children, 
                                "servers": allServers, 
                                "account": account,
                                "pubkey": publickey
                            }
                            const response = await fetch(process.env.REACT_APP_SERVER+'copykey', {
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
                        (chain, allServers) => chain.then(() => requestToExternalService(allServers)),
                        Promise.resolve()
                    );
                    
                    promiseChain.then((result) => setOutput(result));
                }

                var itemsProcessed = 0;
                setValidEntry(true)
                let vserver = true

                server.forEach((item, index, array) => {
                    itemsProcessed++;
                    
                    if ( regexServer.test(item) != true ){
                        setValidEntry(false)
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
                        validEntry == false &&
                        <p style={{color : 'red', fontWeight: 'bold'}}>INVALID ENTRIES CHECK SERVERS AND APPLICATION ACCOUNT</p>
                    }
                </div>

            )

        }, [validEntry])

    return(
        <div>
          {invaldText}
            <p>*Copy public key pair</p>
            <Form>
                <Form.Control id="serverlist" type="email" placeholder="Application Account" onChange={e => setAccount(e.target.value)} />
                <p>Public Key</p>
                <Form.Control 
                id="serverlist" as="textarea" rows="3" cols="50" onChange={e => setPublickey(e.target.value)}
                />
                <br/>
                <p>Target Server(s) <br/> ( Separate by comma, space or newline )</p>
                <Form.Control 
                id="serverlist" as="textarea" rows="3" cols="50" onChange={e => setServers(e.target.value)}
                />
                <br/>
            </Form>
               
            <Button onClick={copyKey}> Copy Key </Button>
            <div id='status'>
                <Status>{output}</Status>
            </div>
        </div>
    )
}

export default Incoming;