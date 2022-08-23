import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route,Navigate  } from 'react-router-dom';
import NavBar from './Components/Navbar/NavBar';
import SignUpForm from './Components/Forms/SignUpForm';
import Home from './Components/Home/Home';
import SignInForm from './Components/Forms/SignInForm';
import Dashboard from './Components/Dashboard/Dashboard';
import Filter from './Components/Dashboard/Filter'

function App() {
  const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
        <Route path="/" element={!user ? <Home/> : <Navigate to="/home" />}/>
        <Route path="/signin" element={<SignInForm/>}></Route>
        <Route path="/signUp" element={<SignUpForm />}></Route>
        <Route path="/home" element={<Dashboard />}></Route>
        <Route path="/filter" element={<Filter/>}></Route>
        <Route path="/tickets/search" element={<Filter/>}></Route>
        </Routes>
      </Router>
      
    
    </div>
  );
}

export default App;
