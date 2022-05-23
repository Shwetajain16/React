import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { Alert } from "react-bootstrap"
import AddTicket from "../components/AddTicket"
import Ticketrecord from './Ticketrecord';
import { getTicket } from '../store/actions/ticketaction';
import Swal from 'sweetalert2'

import AuthenticationService from '../services/AuthenticationService';
import { connect } from 'react-redux';
import 'animate.css';
import { color } from '@mui/system';
import { red } from '@mui/material/colors';

class Profile extends Component {

  constructor(props) {
    super(props);
    // Swal.fire({
    //   title: 'Login Successfully',
    //   //icon: 'success',
    //   timer :2800,
    // //backdrop: '#ffffff',
    // imageUrl:'https://media.istockphoto.com/photos/like-or-thumbs-up-glossy-icon-picture-id175485478',
    // imageHeight:100,
    // imageWidth:150,
      
    //   showClass: {
    //     popup: 'animate__animated animate__fadeInDown'
    //   },
    //   hideClass: {
    //     popup: 'animate__animated animate__fadeOutUp'
    //   }
    // })
    this.state = {user: undefined};
    this.state = {tickets: undefined};
  }

  

  componentDidMount() {
    const user = AuthenticationService.getCurrentUser();
    this.setState({user: user});
    this.props.getTicket();
    // console.log(this.tickets)
  }

  render() {
    let userInfo = "";
    const user = this.state.user;
    // login
    if (user && user.accessToken) {

      userInfo = (
        <>
        <h1> Generate Your Ticket</h1>
       
                <div style={{marginTop:"20px"}}>      
                      <AddTicket user={user}/>
                      <Ticketrecord user={user}/>
                </div>
                </>
              );
    } else { // not login
      userInfo = <div style={{marginTop:"20px"}}>
                    <Alert variant="primary">
                      <h2>Profile Component</h2>
                      <Button color="success"><Link to="/signin"><span style={{color:"white"}}>Login</span></Link></Button>
                    </Alert>
                  </div>
    }

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
        {userInfo}
        </Container>
      </div>
    );
  }
}
function mapStateToProps(state){
  return{
    tickets:state.tickets,
  };
}

export default connect(mapStateToProps,{getTicket}) (Profile);
