import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from 'react-bootstrap'
import './style.css'

function Newkey(props) {
    const [show, setShow] = useState(false);
    const [pubkey, setPubkey] = useState(props.children[2]);
    const [privkey, setPrivkey] = useState(props.children[3]);
    const [output, setOutput] = useState([]);
    const [cbutton, setCbutton] = useState(false);
    const [rend, setRend] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const serverList =[props.children[0]]
    const createNewKey = (evt) => {
      let data = { account : props.children[1],
                   servers: props.children[0] }
      fetch(process.env.REACT_APP_SERVER+'generateSSH', {
        method: 'POST',
        mode: 'cors',
        credentials: "include",
        headers: headers,
        body: JSON.stringify(data)
      })
        .then(response => {
        response.json().then(body => 
          {
          setPubkey(body.response.split(',')[0])
          setPrivkey(body.response.split(',')[1])
          setCbutton(true)
          })
      })
    }

    const copyNewKey = (evt) => {
      let outputInfo = []
      const server = (serverList.toString().split(","))

      const requestToExternalService = async function(allServers) {
        // Replace with a promise that does real work here...
        
        return new Promise(async resolve => {
          const data = {
            account : props.children[1],
            publickey : pubkey,
            privatekey : privkey,
            servers : allServers
          }
            const response = await fetch(process.env.REACT_APP_SERVER+'copyall', {
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

    useEffect(() => {
      setRend(output.map((data) => 
      <table className="results">
        <thead>
            <tr>
            <th scope="col">Server</th>
            <th scope="col">Result</th>
            </tr>
        </thead>
        <tbody>
          <tr>
              <td>
                {data.server}
              </td>
              <td>
                {data.result}
              </td>
          </tr>
        </tbody>
      </table>
      ))
    }, [output])

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Click me!
        </Button>
  
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Key</Modal.Title>
          </Modal.Header>
          <Modal.Body></Modal.Body>
            <Form.Control 
                className="serverlist" type="account" defaultValue={props.children[1]} readOnly
                />
                      <p>Target Server(s) <br/> ( Separate by comma, space or newline )</p>    
            <Form.Control 
                  className="serverlist" as="textarea" rows="3" cols="50" defaultValue={serverList.toString()} readOnly
            />
            <p>Public Key</p>
            <Form.Control
                  id="serverlist"
                  rows="3" 
                  cols="50"
                  readOnly
                  as="textarea"
                  defaultValue={pubkey}
            />
          <Modal.Footer>
            {
              props.children.length == 3 &&
              <Button variant="primary" onClick={createNewKey}>
                Create New Key
              </Button>
            }
            {
              props.children.length == 4 &&
              <Button variant="primary" onClick={copyNewKey}>
                Copy New Key
              </Button>
            }
            {
              cbutton == true &&
              <Button variant="primary" onClick={copyNewKey}>
                Copy New Key
              </Button>
            }
            
          </Modal.Footer>
          {rend}
        </Modal>
      </>
    );
  }
  

  export default Newkey;