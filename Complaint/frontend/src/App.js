import logo from './logo.svg';
import './App.css';
import Navbar from '../src/Navbar/Navbar';
import { BrowserRouter as Router, Route ,Navigate, Routes} from "react-router-dom";
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Home from './Components/Home/Home';
import Complaints from './Components/Complaints/Complaints';
import EditComplaint from './Components/Complaints/EditComplaint';
import React from 'react';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar></Navbar>
      <Routes>
        <Route exact path="home" element={<Home/>} /> 
        <Route exact path="/signin" element={<Login/>} />
        <Route exact path="/signup" element={<Signup/>} />
        <Route exact path="/complaint" element={<Complaints/>} />
        <Route exact path="/edit/:id" element={<EditComplaint/>} />
      </Routes>
      </Router>
      
    </div>
  );
}

export default App;
