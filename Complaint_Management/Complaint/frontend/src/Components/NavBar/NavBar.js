import React,{useState,useEffect} from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import {useDispatch} from 'react-redux'
import * as actionType from  '../../constants/actionTypes'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  appBar: {
    borderRadius: 30,
    margin: '50px 0',
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
    marginLeft: '10px',
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
  navbar: {
    backgroundColor: '#669999',
    height:'40'
  }
});

function NavBar() {

   const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const user = JSON.parse(localStorage.getItem("profile"))
  const classes = useStyles();
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate("/home");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"))
  }, [user]);
  return (
    <>
    <div  className={classes.navbar}>
    <nav className="navbar navbar-expand-lg navbar-dark">
    <div className="container-fluid">
    <Link to = "home" className="navbar-brand">Complaint Management</Link>
   
    <div className="collapse navbar-collapse ms-1" id="navbarNav">
      <ul className="navbar-nav">

      {user?.result ? (
          <div className={classes.profile}>
            <Button component={Link} to="/complaint" variant="contained" className={classes.logout}>Complaint Box</Button>
                  <Button variant="contained" className={classes.logout} onClick={logout}>Logout</Button>
                              {/* <Avatar className={classes.avatar} alt={user?.result.name} src={user?.reslt.imageUrl}>{user?.result.name.charAt(0)}</Avatar> */}
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>

          </div>
        ) : (
          <>
          <li className="nav-item "  >
          <Link to ="/signin" className="nav-link active" aria-current="page">Login</Link>
          </li>
          <li className="nav-item">
          <Link to = "/signup" className="nav-link active" aria-current="page">Register</Link>
                    </li>
                   
          </>
         
        )}
       </ul>
    </div>
  </div>
        </nav>
        </div>
     </>

  )
}

export default NavBar