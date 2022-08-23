import React,{useState,useEffect} from "react";
import {Navbar,Nav,Container} from 'react-bootstrap';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import {useDispatch} from 'react-redux'
import * as actionType from  '../../constants/actionTypes'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    backgroundColor: '#143F6B',
  },
  heading: {
    color: '#fff',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#3d8bdb'
  },
  logout: {
    background: '#3d8bdb',
    color: '#fff',
    
  },
});
function NavBar(){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const user = JSON.parse(localStorage.getItem("profile"))
  const classes = useStyles();
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate("/home");
    // user = null;
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"))
  }, [user]);
    return (
      <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link to = "home" className="navbar-brand">Ticket</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse ms-1" id="navbarNav">
      <ul className="navbar-nav">

      {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.avatar} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            {/* <Button variant="contained" className={classes.logout} onClick={logout}>Logout</Button> */}
            <Button component={Link} to="/ticket" variant="contained" className={classes.logout} >Manage Ticket</Button>
            <Button variant="contained" className={classes.logout} onClick={logout}>Logout</Button>
          </div>
        ) : (
          <>
           <li className="nav-item ">
          <Link to ="/signin" className="nav-link active" aria-current="page">Sign in</Link>
        </li>
        <li className="nav-item">
          <Link to = "/signup" className="nav-link active" aria-current="page">Sign up</Link>
        </li>
          </>
         
        )}
       </ul>
    </div>
  </div>
</nav>
     </>

    )
}

export default NavBar;