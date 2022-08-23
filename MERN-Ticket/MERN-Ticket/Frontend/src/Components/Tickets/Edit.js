
import { Button, Modal } from 'react-bootstrap';
import React, { useState, useEffect, ngOnInit } from "react";
import { FormGroup, FormControl, InputLabel, Input, makeStyles, Typography } from '@material-ui/core';

import {updateTicket,getTicket } from '../../api/api';

import {useParams , useNavigate } from "react-router-dom";


const initialValue = {
  empid: "",
  ticket_desc:"",
  empname:" ",
}
function Edit() {
 let Navigate= useNavigate();
  const [tickets, setTicket] = useState(initialValue);
  const { empid, ticket_desc, empname } = tickets;
  // console.log(tickets)
  const { id } = useParams();
  // console.log(id);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  useEffect(() => {
    handleShow();
    loadTicketDetails();
}, []);

const loadTicketDetails = async() => {
    const response = await getTicket(id);
    setTicket(response.data);
    // console.log(response.data)
}

const onValueChange = (e) => {
    // console.log(e.target.value);
    setTicket({ ...tickets, [e.target.name]: e.target.value })


  }

  const EditTicket=async(id)=>{
    // console.log(tickets)
    await updateTicket(id, tickets);
    // console.log('edit called')
    handleClose();
    Navigate('/ticket')

    
  }

  const handleClose1=()=>{
    handleClose();
    Navigate('/ticket')
  }
  return (
    <>
    
     <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{background: '#a5cdf0',color: '-moz-initial'}}>
          <FormGroup >
            
            <FormControl>
              <InputLabel htmlFor="my-input">Employee Id</InputLabel>
              <Input onChange={(e) => onValueChange(e)} name='empid' value={empid} id="my-input" />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="my-input">Employee Name</InputLabel>
              <Input onChange={(e) => onValueChange(e)}  name='empname' value={empname} disabled id="my-input" />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="my-input">Discription</InputLabel>
              <Input onChange={(e) => onValueChange(e)} name='ticket_desc' value={ticket_desc} id="my-input" />
            </FormControl>
           
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose1()} style={{ background: '#3d8bdb',
    color: '#fff'}}>
            Close
          </Button>
          <Button variant="primary" onClick={() => EditTicket(id)} style={{ background: '#3d8bdb',
    color: '#fff'}}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit

