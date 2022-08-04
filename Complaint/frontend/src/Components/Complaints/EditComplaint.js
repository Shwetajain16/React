
import { Button, Modal } from 'react-bootstrap';
import React, { useState, useEffect, ngOnInit } from "react";
import { FormGroup, FormControl, InputLabel, Input, makeStyles, Typography } from '@material-ui/core';

import {updateComplaint,getComplaint } from '../../api/api';

import {useParams , useNavigate } from "react-router-dom";


const initialValue = {
  title: "",
  complaint_desc:"",
  username:" ",
}
function Edit() {
 let Navigate= useNavigate();
  const [complaints, setComplaint] = useState(initialValue);
  const { title, complaint_desc, username } = complaints;
  // console.log(tickets)
  const { id } = useParams();
  // console.log(id);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  useEffect(() => {
    handleShow();
    loadComplaintDetails();
}, []);

const loadComplaintDetails = async() => {
    const response = await getComplaint(id);
    setComplaint(response.data);
    // console.log(response.data)
}

const onValueChange = (e) => {
    // console.log(e.target.value);
    setComplaint({ ...complaints, [e.target.name]: e.target.value })


  }

  const EditTicket=async(id)=>{
    // console.log(tickets)
    await updateComplaint(id,complaints);
    // console.log('edit called')
    handleClose();
    Navigate('/complaints')

    
  }

  const handleClose1=()=>{
    handleClose();
    Navigate('/complaints')
  }
  return (
    <>
    
     <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Complaint Here</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{background: '#a5cdf0',color: '-moz-initial'}}>
          <FormGroup >
            
            <FormControl>
              <InputLabel htmlFor="my-input">Title</InputLabel>
              <Input onChange={(e) => onValueChange(e)} name='title' value={title} id="my-input" />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="my-input">User Name</InputLabel>
              <Input onChange={(e) => onValueChange(e)}  name='username' value={username} disabled id="my-input" />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="my-input">Discription</InputLabel>
              <Input onChange={(e) => onValueChange(e)} name=' complaint_desc' value={ complaint_desc} id="my-input" />
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

