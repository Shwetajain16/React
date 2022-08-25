import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import { BrowserRouter as Router, Route ,Navigate, Routes} from "react-router-dom";
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import Home from './Components/Home/Home';
import Edit from './Components/Complaints/Edit';
import Complaint from './Components/Complaints/Complaint';

function App() {
  return (
    <div className="App">
      <Router>
      <NavBar></NavBar>
      <Routes>
        <Route exact path="home" element={<Home/>} /> 
        <Route exact path="/signin" element={<Signin/>} />
        <Route exact path="/signup" element={<Signup/>} />
        <Route exact path="/complaint" element={<Complaint/>} />
        <Route exact path="/edit/:id" element={<Edit/>} />
      </Routes>
      </Router>
      
    </div>
  );
}

export default App;
